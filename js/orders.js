/**
 * SEVEN STAR RESTAURANT — ORDER MANAGEMENT SERVICE
 * Handles order creation, status workflows, tracking lookups,
 * and customer profile aggregations.
 */

const ORDER_STATUS_LABELS = {
  placed: { label: "Order Placed", step: 1, color: "var(--color-muted-blue)" },
  accepted: { label: "Order Accepted", step: 2, color: "var(--color-muted-blue)" },
  preparing: { label: "Preparing in Kitchen", step: 3, color: "var(--color-primary-red)" },
  ready: { label: "Ready for Pickup / Out for Delivery", step: 4, color: "var(--color-warm-brown)" },
  completed: { label: "Delivered / Completed", step: 5, color: "var(--color-olive-green)" },
  cancelled: { label: "Cancelled", step: 0, color: "#8E3B3A" }
};

const OrderService = {
  /**
   * Generate clean realistic Order ID
   */
  generateOrderId() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `SSR-${randomNum}`;
  },

  /**
   * Get all orders
   */
  getOrders(filters = {}) {
    let orders = StorageService.get(STORAGE_KEYS.ORDERS, SEED_DATA.orders);

    // Filter by Status
    if (filters.status && filters.status !== "all") {
      orders = orders.filter((o) => o.status === filters.status);
    }

    // Filter by Type (delivery/pickup)
    if (filters.type && filters.type !== "all") {
      orders = orders.filter((o) => o.orderType === filters.type);
    }

    // Search query
    if (filters.query && filters.query.trim() !== "") {
      const q = filters.query.trim().toLowerCase();
      orders = orders.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q) ||
          o.customer.phone.includes(q) ||
          (o.payment && o.payment.transactionId && o.payment.transactionId.toLowerCase().includes(q))
      );
    }

    // Default sort: latest orders first
    orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    return orders;
  },

  /**
   * Get single order by ID
   */
  getOrderById(id) {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    const orders = StorageService.get(STORAGE_KEYS.ORDERS, SEED_DATA.orders);
    return orders.find((o) => o.id.toUpperCase() === cleanId) || null;
  },

  /**
   * Track order by Order ID and Phone Number
   */
  trackOrder(orderId, phone) {
    if (!orderId) return null;
    const cleanId = orderId.trim().toUpperCase();
    const cleanPhone = phone ? phone.trim().replace(/\D/g, "") : "";
    const orders = StorageService.get(STORAGE_KEYS.ORDERS, SEED_DATA.orders);

    return (
      orders.find((o) => {
        const idMatch = o.id.toUpperCase() === cleanId;
        if (!cleanPhone) return idMatch;
        const oPhone = (o.customer.phone || "").replace(/\D/g, "");
        return idMatch && (oPhone.endsWith(cleanPhone) || cleanPhone.endsWith(oPhone));
      }) || null
    );
  },

  /**
   * Create and store a new order from checkout
   */
  createOrder(orderPayload) {
    const orders = StorageService.get(STORAGE_KEYS.ORDERS, []);
    const orderId = this.generateOrderId();
    const nowIso = new Date().toISOString();

    const newOrder = {
      id: orderId,
      orderDate: nowIso,
      customer: {
        name: (orderPayload.customer.name || "").trim(),
        phone: (orderPayload.customer.phone || "").trim(),
        email: (orderPayload.customer.email || "").trim(),
        address: (orderPayload.customer.address || "").trim(),
        notes: (orderPayload.customer.notes || "").trim()
      },
      orderType: orderPayload.orderType || "delivery",
      status: "placed",
      payment: {
        method: orderPayload.payment.method, // 'cod' | 'online'
        status: orderPayload.payment.method === "online" ? "paid" : "pending",
        transactionId: orderPayload.payment.transactionId || (orderPayload.payment.method === "online" ? `TXN-DEMO-${Math.floor(100000 + Math.random() * 900000)}` : null),
        paymentGateway: orderPayload.payment.gateway || (orderPayload.payment.method === "online" ? "Simulated Online Gateway" : "Cash on Delivery / Pickup")
      },
      items: orderPayload.items || [],
      pricing: orderPayload.pricing,
      statusTimeline: [
        {
          status: "placed",
          time: nowIso,
          note: "Order placed successfully by customer."
        }
      ]
    };

    orders.unshift(newOrder);
    StorageService.set(STORAGE_KEYS.ORDERS, orders);

    // Update or insert customer record
    this._upsertCustomer(newOrder.customer, newOrder.pricing.grandTotal);

    // Clear cart
    CartService.clearCart();

    // Broadcast event
    window.dispatchEvent(
      new CustomEvent("sevenstar:order_created", { detail: newOrder })
    );

    return { success: true, order: newOrder };
  },

  /**
   * Update status of an existing order
   */
  updateOrderStatus(orderId, newStatus, optionalNote = "") {
    const orders = StorageService.get(STORAGE_KEYS.ORDERS, []);
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx === -1) {
      return { success: false, message: "Order not found" };
    }

    const order = orders[idx];
    order.status = newStatus;

    // If order is completed, mark payment as paid if it was COD
    if (newStatus === "completed" && order.payment.status !== "paid") {
      order.payment.status = "paid";
    }

    // Append to timeline
    const defaultNote = ORDER_STATUS_LABELS[newStatus]?.label || newStatus;
    order.statusTimeline.push({
      status: newStatus,
      time: new Date().toISOString(),
      note: optionalNote || `Status updated to ${defaultNote}`
    });

    orders[idx] = order;
    StorageService.set(STORAGE_KEYS.ORDERS, orders);

    window.dispatchEvent(
      new CustomEvent("sevenstar:order_updated", { detail: order })
    );

    return { success: true, order };
  },

  /**
   * Upsert customer record
   */
  _upsertCustomer(customerInfo, orderAmount) {
    if (!customerInfo.phone) return;
    const customers = StorageService.get(STORAGE_KEYS.CUSTOMERS, []);
    const phoneClean = customerInfo.phone.replace(/\D/g, "");

    const existingIdx = customers.findIndex(
      (c) => (c.phone || "").replace(/\D/g, "") === phoneClean
    );

    if (existingIdx > -1) {
      customers[existingIdx].totalOrders = (customers[existingIdx].totalOrders || 1) + 1;
      customers[existingIdx].totalSpend = (customers[existingIdx].totalSpend || 0) + Number(orderAmount);
      customers[existingIdx].address = customerInfo.address || customers[existingIdx].address;
      customers[existingIdx].email = customerInfo.email || customers[existingIdx].email;
      customers[existingIdx].lastOrderDate = new Date().toISOString();
    } else {
      const newCust = {
        id: "CUST-" + String(customers.length + 1).padStart(3, "0"),
        name: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email,
        address: customerInfo.address,
        totalOrders: 1,
        totalSpend: Number(orderAmount),
        registeredDate: new Date().toISOString(),
        lastOrderDate: new Date().toISOString()
      };
      customers.push(newCust);
    }

    StorageService.set(STORAGE_KEYS.CUSTOMERS, customers);
  }
};


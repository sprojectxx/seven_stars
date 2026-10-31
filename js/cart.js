/**
 * SEVEN STAR RESTAURANT — SHOPPING CART SERVICE
 * Handles item additions, variant pricing, quantities, coupon discounts,
 * delivery calculations, and LocalStorage persistence.
 */

const CartService = {
  /**
   * Retrieve active cart structure
   */
  getCart() {
    const defaultCart = { items: [], coupon: null };
    return StorageService.get(STORAGE_KEYS.CART, defaultCart);
  },

  /**
   * Save cart structure
   */
  _saveCart(cart) {
    StorageService.set(STORAGE_KEYS.CART, cart);
    window.dispatchEvent(new CustomEvent("sevenstar:cart_updated", { detail: cart }));
  },

  /**
   * Get total quantity of items in cart (for header badge)
   */
  getItemCount() {
    const cart = this.getCart();
    return cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  },

  /**
   * Add item to cart
   */
  addItem(item, variantName = null, quantity = 1, specialNotes = "") {
    if (!item) return false;
    const cart = this.getCart();

    // Determine variant & price
    let selectedVariant = null;
    let price = item.price;

    if (item.variants && item.variants.length > 0) {
      if (variantName) {
        selectedVariant = item.variants.find((v) => v.name === variantName) || item.variants[0];
      } else {
        selectedVariant = item.variants[0];
      }
      price = selectedVariant.price;
    }

    const variantLabel = selectedVariant ? selectedVariant.name : "Standard";
    const cartItemId = `${item.id}-${variantLabel.replace(/\s+/g, "_")}`;

    // Check if same item & variant exists in cart
    const existingIndex = cart.items.findIndex((ci) => ci.cartItemId === cartItemId);

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += Number(quantity);
      cart.items[existingIndex].itemTotal = cart.items[existingIndex].quantity * cart.items[existingIndex].price;
      if (specialNotes) {
        cart.items[existingIndex].notes = specialNotes;
      }
    } else {
      cart.items.push({
        cartItemId,
        id: item.id,
        name: item.name,
        category: item.category,
        image: item.image,
        isVeg: item.isVeg,
        variant: variantLabel,
        price: Number(price),
        quantity: Number(quantity),
        itemTotal: Number(price) * Number(quantity),
        notes: specialNotes || ""
      });
    }

    this._saveCart(cart);
    return true;
  },

  /**
   * Update quantity of a cart item
   */
  updateQuantity(cartItemId, delta) {
    const cart = this.getCart();
    const index = cart.items.findIndex((ci) => ci.cartItemId === cartItemId);
    if (index === -1) return false;

    cart.items[index].quantity += delta;

    if (cart.items[index].quantity <= 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].itemTotal = cart.items[index].quantity * cart.items[index].price;
    }

    this._saveCart(cart);
    return true;
  },

  /**
   * Remove item from cart
   */
  removeItem(cartItemId) {
    const cart = this.getCart();
    cart.items = cart.items.filter((ci) => ci.cartItemId !== cartItemId);
    this._saveCart(cart);
    return true;
  },

  /**
   * Clear entire cart
   */
  clearCart() {
    this._saveCart({ items: [], coupon: null });
  },

  /**
   * Apply coupon code
   */
  applyCoupon(couponCode) {
    const code = (couponCode || "").trim().toUpperCase();
    const coupons = StorageService.get(STORAGE_KEYS.COUPONS, SEED_DATA.coupons);
    const coupon = coupons.find((c) => c.code.toUpperCase() === code && c.isActive);

    if (!coupon) {
      return { success: false, message: "Invalid or expired coupon code." };
    }

    const cart = this.getCart();
    const subtotal = cart.items.reduce((sum, item) => sum + item.itemTotal, 0);

    if (subtotal < coupon.minOrder) {
      return {
        success: false,
        message: `This coupon requires a minimum order of €${coupon.minOrder.toFixed(2)}. Current subtotal is €${subtotal.toFixed(2)}.`
      };
    }

    cart.coupon = coupon;
    this._saveCart(cart);
    return {
      success: true,
      message: `Coupon "${coupon.code}" applied successfully!`,
      coupon
    };
  },

  /**
   * Remove applied coupon
   */
  removeCoupon() {
    const cart = this.getCart();
    cart.coupon = null;
    this._saveCart(cart);
    return true;
  },

  /**
   * Calculate full breakdown of cart totals
   */
  getCartTotals(orderType = "delivery") {
    const cart = this.getCart();
    const settings = StorageService.get(STORAGE_KEYS.SETTINGS, SEED_DATA.restaurant).settings;

    const subtotal = Math.round(cart.items.reduce((sum, item) => sum + item.itemTotal, 0) * 100) / 100;

    // Discount calculation
    let discount = 0;
    if (cart.coupon && subtotal >= cart.coupon.minOrder) {
      if (cart.coupon.discountType === "percentage") {
        discount = Math.round(((subtotal * cart.coupon.value) / 100) * 100) / 100;
        if (cart.coupon.maxDiscount && discount > cart.coupon.maxDiscount) {
          discount = cart.coupon.maxDiscount;
        }
      } else {
        discount = Math.min(subtotal, cart.coupon.value);
      }
    }

    const discountedSubtotal = Math.round(Math.max(0, subtotal - discount) * 100) / 100;

    // Packaging charge: €0.50 for delivery, €0 for pickup
    const packagingCharge = orderType === "delivery" && subtotal > 0 ? (settings.packagingCharge ?? 0.50) : 0;

    // Delivery charge: Free above threshold (€10), else standard €2.00
    let deliveryFee = 0;
    if (orderType === "delivery" && subtotal > 0) {
      if (subtotal >= (settings.freeDeliveryThreshold ?? 10)) {
        deliveryFee = 0;
      } else {
        deliveryFee = settings.deliveryFee ?? 2.00;
      }
    }

    // GST / VAT calculation: 5% on discounted subtotal + packaging
    const gstRate = (settings.gstPercentage || 5) / 100;
    const gst = Math.round((discountedSubtotal + packagingCharge) * gstRate * 100) / 100;

    // Grand total
    const grandTotal = Math.round((discountedSubtotal + packagingCharge + deliveryFee + gst) * 100) / 100;

    return {
      subtotal,
      discount,
      coupon: cart.coupon,
      packagingCharge,
      deliveryFee,
      freeDeliveryThreshold: settings.freeDeliveryThreshold || 500,
      isFreeDelivery: deliveryFee === 0 && orderType === "delivery" && subtotal > 0,
      gstRate: settings.gstPercentage || 5,
      gst,
      grandTotal,
      itemCount: this.getItemCount()
    };
  }
};


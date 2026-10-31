/**
 * SEVEN STAR RESTAURANT — ANALYTICS & REPORTS SERVICE
 * Calculates real-time restaurant statistics, category revenue distributions,
 * top-selling menu items, and daily financial metrics.
 */

const ReportsService = {
  /**
   * Get primary dashboard KPI metrics
   */
  getDashboardStats() {
    const orders = StorageService.get(STORAGE_KEYS.ORDERS, []);
    const menuItems = StorageService.get(STORAGE_KEYS.MENU, []);

    const totalOrders = orders.length;
    const newOrders = orders.filter((o) => o.status === "placed").length;
    const pendingOrders = orders.filter((o) => ["accepted", "preparing", "ready"].includes(o.status)).length;
    const completedOrders = orders.filter((o) => o.status === "completed").length;
    const cancelledOrders = orders.filter((o) => o.status === "cancelled").length;

    // Total revenue from all non-cancelled orders
    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + (o.pricing?.grandTotal || 0), 0);

    // Completed revenue
    const completedRevenue = orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + (o.pricing?.grandTotal || 0), 0);

    const averageOrderValue = totalOrders - cancelledOrders > 0
      ? Math.round(totalRevenue / (totalOrders - cancelledOrders))
      : 0;

    return {
      totalOrders,
      newOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      totalRevenue,
      completedRevenue,
      averageOrderValue,
      totalMenuItems: menuItems.length,
      availableMenuItems: menuItems.filter((i) => i.isAvailable !== false).length
    };
  },

  /**
   * Get top-selling dishes ordered by total quantity sold
   */
  getTopSellingItems(limit = 6) {
    const orders = StorageService.get(STORAGE_KEYS.ORDERS, []);
    const itemMap = {};

    orders.forEach((order) => {
      if (order.status === "cancelled") return;
      (order.items || []).forEach((item) => {
        if (!itemMap[item.id]) {
          itemMap[item.id] = {
            id: item.id,
            name: item.name,
            isVeg: item.isVeg,
            category: item.category || "General",
            totalQuantity: 0,
            totalRevenue: 0
          };
        }
        itemMap[item.id].totalQuantity += Number(item.quantity || 1);
        itemMap[item.id].totalRevenue += Number(item.itemTotal || item.price * item.quantity);
      });
    });

    const sorted = Object.values(itemMap).sort((a, b) => b.totalQuantity - a.totalQuantity);
    return sorted.slice(0, limit);
  },

  /**
   * Get category sales distribution
   */
  getCategoryBreakdown() {
    const orders = StorageService.get(STORAGE_KEYS.ORDERS, []);
    const categories = StorageService.get(STORAGE_KEYS.CATEGORIES, SEED_DATA.categories);
    const catMap = {};

    categories.forEach((cat) => {
      catMap[cat.id] = {
        id: cat.id,
        name: cat.name,
        ordersCount: 0,
        totalRevenue: 0
      };
    });

    orders.forEach((order) => {
      if (order.status === "cancelled") return;
      (order.items || []).forEach((item) => {
        const catId = item.category || "indian-main-course";
        if (!catMap[catId]) {
          catMap[catId] = { id: catId, name: catId, ordersCount: 0, totalRevenue: 0 };
        }
        catMap[catId].ordersCount += Number(item.quantity || 1);
        catMap[catId].totalRevenue += Number(item.itemTotal || item.price * item.quantity);
      });
    });

    return Object.values(catMap);
  },

  /**
   * Group sales by Day
   */
  getDailySales(days = 7) {
    const orders = StorageService.get(STORAGE_KEYS.ORDERS, []);
    const dailyMap = {};

    orders.forEach((order) => {
      if (order.status === "cancelled") return;
      const dateStr = order.orderDate.split("T")[0];
      if (!dailyMap[dateStr]) {
        dailyMap[dateStr] = {
          date: dateStr,
          orders: 0,
          revenue: 0
        };
      }
      dailyMap[dateStr].orders += 1;
      dailyMap[dateStr].revenue += (order.pricing?.grandTotal || 0);
    });

    const list = Object.values(dailyMap).sort((a, b) => new Date(b.date) - new Date(a.date));
    return list.slice(0, days);
  },

  /**
   * Payment method breakdown (Online vs COD)
   */
  getPaymentBreakdown() {
    const orders = StorageService.get(STORAGE_KEYS.ORDERS, []);
    let onlineCount = 0;
    let onlineAmount = 0;
    let codCount = 0;
    let codAmount = 0;

    orders.forEach((o) => {
      if (o.status === "cancelled") return;
      if (o.payment?.method === "online") {
        onlineCount++;
        onlineAmount += (o.pricing?.grandTotal || 0);
      } else {
        codCount++;
        codAmount += (o.pricing?.grandTotal || 0);
      }
    });

    return {
      online: { count: onlineCount, amount: onlineAmount },
      cod: { count: codCount, amount: codAmount }
    };
  }
};


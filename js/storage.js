/**
 * SEVEN STAR RESTAURANT — STORAGE SERVICE LAYER
 * Centralized abstraction for LocalStorage operations, cross-tab synchronization,
 * and future backend API readiness.
 */

const STORAGE_KEYS = {
  MENU: "sevenstar_menu",
  CATEGORIES: "sevenstar_categories",
  ORDERS: "sevenstar_orders",
  CART: "sevenstar_cart",
  CUSTOMERS: "sevenstar_customers",
  STAFF: "sevenstar_staff",
  SETTINGS: "sevenstar_settings",
  COUPONS: "sevenstar_coupons",
  RESERVATIONS: "sevenstar_reservations",
  ACTIVE_USER: "sevenstar_auth_user",
  LAST_SEEN_ORDER_ID: "sevenstar_last_seen_order_id"
};

const StorageService = {
  /**
   * Safe getter from LocalStorage
   */
  get(key, fallback = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null || item === undefined || item === "undefined") {
        return fallback;
      }
      return JSON.parse(item);
    } catch (e) {
      console.warn(`[StorageService] Error reading key "${key}":`, e);
      return fallback;
    }
  },

  /**
   * Safe setter to LocalStorage
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch an internal custom event so the current window/tab also hears about the update
      window.dispatchEvent(new CustomEvent("sevenstar:storage_update", {
        detail: { key, value }
      }));
      return true;
    } catch (e) {
      console.error(`[StorageService] Error saving key "${key}":`, e);
      return false;
    }
  },

  /**
   * Remove a key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      window.dispatchEvent(new CustomEvent("sevenstar:storage_update", {
        detail: { key, value: null }
      }));
      return true;
    } catch (e) {
      console.error(`[StorageService] Error removing key "${key}":`, e);
      return false;
    }
  },

  /**
   * Initialize and seed LocalStorage if missing or empty
   */
  init() {
    if (typeof SEED_DATA === "undefined") {
      console.error("[StorageService] SEED_DATA is not loaded.");
      return;
    }

    const currentVersion = localStorage.getItem("sevenstar_version");
    if (currentVersion !== "v2_eur") {
      this.resetToSeed();
      localStorage.setItem("sevenstar_version", "v2_eur");
      return;
    }

    if (!localStorage.getItem(STORAGE_KEYS.MENU)) {
      this.set(STORAGE_KEYS.MENU, SEED_DATA.menuItems);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      this.set(STORAGE_KEYS.CATEGORIES, SEED_DATA.categories);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      this.set(STORAGE_KEYS.ORDERS, SEED_DATA.orders);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CART)) {
      this.set(STORAGE_KEYS.CART, { items: [], coupon: null });
    }
    if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
      this.set(STORAGE_KEYS.CUSTOMERS, SEED_DATA.customers);
    }
    if (!localStorage.getItem(STORAGE_KEYS.STAFF)) {
      this.set(STORAGE_KEYS.STAFF, SEED_DATA.staff);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      this.set(STORAGE_KEYS.SETTINGS, SEED_DATA.restaurant);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COUPONS)) {
      this.set(STORAGE_KEYS.COUPONS, SEED_DATA.coupons);
    }
    if (!localStorage.getItem(STORAGE_KEYS.RESERVATIONS)) {
      this.set(STORAGE_KEYS.RESERVATIONS, SEED_DATA.reservations);
    }

    // Set last seen order ID for admin notification tracking
    if (!localStorage.getItem(STORAGE_KEYS.LAST_SEEN_ORDER_ID)) {
      const orders = this.get(STORAGE_KEYS.ORDERS, []);
      if (orders.length > 0) {
        localStorage.setItem(STORAGE_KEYS.LAST_SEEN_ORDER_ID, orders[0].id);
      }
    }
  },

  /**
   * Force reset all data back to original pristine seed
   */
  resetToSeed() {
    try {
      this.set(STORAGE_KEYS.MENU, SEED_DATA.menuItems);
      this.set(STORAGE_KEYS.CATEGORIES, SEED_DATA.categories);
      this.set(STORAGE_KEYS.ORDERS, SEED_DATA.orders);
      this.set(STORAGE_KEYS.CART, { items: [], coupon: null });
      this.set(STORAGE_KEYS.CUSTOMERS, SEED_DATA.customers);
      this.set(STORAGE_KEYS.STAFF, SEED_DATA.staff);
      this.set(STORAGE_KEYS.SETTINGS, SEED_DATA.restaurant);
      this.set(STORAGE_KEYS.COUPONS, SEED_DATA.coupons);
      this.set(STORAGE_KEYS.RESERVATIONS, SEED_DATA.reservations);
      localStorage.setItem(STORAGE_KEYS.LAST_SEEN_ORDER_ID, SEED_DATA.orders[0]?.id || "");
      console.log("[StorageService] LocalStorage successfully reset to seed data.");
      return true;
    } catch (e) {
      console.error("[StorageService] Failed to reset storage:", e);
      return false;
    }
  }
};

// Initialize immediately upon script evaluation
StorageService.init();

// Listen to native browser cross-window / cross-tab storage changes
window.addEventListener("storage", (e) => {
  if (e.key && e.key.startsWith("sevenstar_")) {
    window.dispatchEvent(new CustomEvent("sevenstar:storage_update", {
      detail: { key: e.key, value: StorageService.get(e.key) }
    }));
  }
});


/**
 * SEVEN STAR RESTAURANT — ADMIN PORTAL CONTROLLER
 * Handles administration modules, real-time order polling, audio chime alerts,
 * role-based UI security, and management workflows.
 */

const AdminApp = {
  activeOrderPollTimer: null,

  /**
   * Initialize Admin Layout & Common Controls
   */
  init(requiredRole = null) {
    // 1. Auth Guard
    if (!AuthService.requireAuth(requiredRole)) {
      return;
    }

    const user = AuthService.getCurrentUser();
    this.renderAdminHeader(user);

    // 2. Start Order Monitor for Real-Time Sound & Toast Alerts
    this.startOrderMonitor();

    // 3. Mark active sidebar link
    this.highlightActiveNavLink();
  },

  /**
   * Render Admin Header Profile & Notification Indicator
   */
  renderAdminHeader(user) {
    const userRoleEl = document.getElementById("admin-user-role");
    const userNameEl = document.getElementById("admin-user-name");
    if (userRoleEl && user) {
      userRoleEl.textContent = user.role.toUpperCase();
      userRoleEl.className = `role-badge role-${user.role}`;
    }
    if (userNameEl && user) {
      userNameEl.textContent = user.name;
    }

    // Role-based UI adjustments (e.g. disable reset/delete for staff)
    if (user && user.role !== "admin") {
      document.body.classList.add("role-staff-view");
      const adminOnlyElements = document.querySelectorAll(".admin-only");
      adminOnlyElements.forEach((el) => {
        el.style.display = "none";
      });
    }
  },

  /**
   * Highlight current admin page in navigation
   */
  highlightActiveNavLink() {
    const currentFile = window.location.pathname.split("/").pop() || "dashboard.html";
    const links = document.querySelectorAll(".admin-nav a");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === currentFile) {
        link.classList.add("active");
      }
    });
  },

  /**
   * Web Audio API synthesized chime for order alerts (zero external audio file dependency)
   */
  playOrderChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Play soft pleasant two-tone restaurant bell chime
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880, now + 0.15);
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.35); // D6

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.3);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.9);
    } catch (e) {
      console.log("[AdminApp] Audio chime not allowed yet or not supported:", e);
    }
  },

  /**
   * Monitor for incoming new orders (polling + cross-window storage events)
   */
  startOrderMonitor() {
    const checkOrders = () => {
      const orders = OrderService.getOrders();
      if (!orders || orders.length === 0) return;

      const latestOrder = orders[0];
      const lastSeenId = localStorage.getItem(STORAGE_KEYS.LAST_SEEN_ORDER_ID);

      if (lastSeenId && latestOrder.id !== lastSeenId && latestOrder.status === "placed") {
        // We have a genuine new order!
        localStorage.setItem(STORAGE_KEYS.LAST_SEEN_ORDER_ID, latestOrder.id);
        this.playOrderChime();
        SevenStar.showToast(
          `🔔 <strong>New Order ${latestOrder.id}!</strong> Total: ${SevenStar.formatINR(latestOrder.pricing.grandTotal)}`,
          "success"
        );

        // Dispatch alert event for pages to re-render tables
        window.dispatchEvent(new CustomEvent("sevenstar:new_order_alert", { detail: latestOrder }));
      }
    };

    // Polling every 3.5 seconds
    if (this.activeOrderPollTimer) clearInterval(this.activeOrderPollTimer);
    this.activeOrderPollTimer = setInterval(checkOrders, 3500);

    // Cross-tab storage listener
    window.addEventListener("sevenstar:storage_update", (e) => {
      if (e.detail?.key === STORAGE_KEYS.ORDERS) {
        checkOrders();
      }
    });
  },

  /**
   * Helper: Order status badge pill HTML
   */
  getStatusBadge(status) {
    const meta = ORDER_STATUS_LABELS[status] || { label: status, color: "#666" };
    return `<span class="status-badge status-${status}">${meta.label}</span>`;
  },

  /**
   * Helper: Order status dropdown changer for table rows
   */
  renderStatusSelect(orderId, currentStatus) {
    const statuses = [
      { id: "placed", label: "Placed" },
      { id: "accepted", label: "Accepted" },
      { id: "preparing", label: "Preparing" },
      { id: "ready", label: "Ready / Out" },
      { id: "completed", label: "Completed" },
      { id: "cancelled", label: "Cancelled" }
    ];

    let options = statuses
      .map(
        (s) =>
          `<option value="${s.id}" ${s.id === currentStatus ? "selected" : ""}>${s.label}</option>`
      )
      .join("");

    return `
      <select class="status-select status-select-${currentStatus}" onchange="AdminApp.handleStatusChange('${orderId}', this.value, this)">
        ${options}
      </select>
    `;
  },

  /**
   * Handle status change event from order tables
   */
  handleStatusChange(orderId, newStatus, selectEl) {
    const res = OrderService.updateOrderStatus(orderId, newStatus);
    if (res.success) {
      SevenStar.showToast(`Order <strong>${orderId}</strong> marked as <em>${ORDER_STATUS_LABELS[newStatus]?.label}</em>`, "success");
      if (selectEl) {
        selectEl.className = `status-select status-select-${newStatus}`;
      }
      // Re-trigger page updates
      window.dispatchEvent(new CustomEvent("sevenstar:order_status_modified", { detail: res.order }));
    } else {
      SevenStar.showToast(res.message || "Failed to update status", "error");
    }
  },

  /**
   * Format full ISO date for admin lists
   */
  formatDateTime(isoStr) {
    if (!isoStr) return "—";
    const d = new Date(isoStr);
    return d.toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }
};


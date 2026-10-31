/**
 * SEVEN STAR RESTAURANT — CUSTOMER MAIN UI CONTROLLER
 * Handles global header, navigation, mobile drawer, toasts,
 * cart badges, and shared UI helpers.
 */

const SevenStar = {
  /**
   * Currency formatter in Euro (€)
   */
  formatINR(amount) {
    const num = Number(amount) || 0;
    return "€" + num.toFixed(2);
  },

  formatEuro(amount) {
    const num = Number(amount) || 0;
    return "€" + num.toFixed(2);
  },

  formatPrice(amount) {
    const num = Number(amount) || 0;
    return "€" + num.toFixed(2);
  },

  /**
   * Veg / Non-Veg SVG icon generator
   */
  getDietaryBadge(isVeg) {
    if (isVeg) {
      return `
        <span class="dietary-icon veg" title="Vegetarian" aria-label="Vegetarian">
          <span class="dietary-box">
            <span class="dietary-dot"></span>
          </span>
          <span class="dietary-text">VEG</span>
        </span>
      `;
    }
    return `
      <span class="dietary-icon non-veg" title="Non-Vegetarian" aria-label="Non-Vegetarian">
        <span class="dietary-box">
          <span class="dietary-triangle"></span>
        </span>
        <span class="dietary-text">NON-VEG</span>
      </span>
    `;
  },

  /**
   * Universal Toast Notification
   */
  showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    
    // Choose icon
    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg viewBox="0 0 24 24" class="toast-svg"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
    } else if (type === "error") {
      iconSvg = `<svg viewBox="0 0 24 24" class="toast-svg"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
    } else {
      iconSvg = `<svg viewBox="0 0 24 24" class="toast-svg"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon-wrap">${iconSvg}</div>
      <div class="toast-msg">${message}</div>
      <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">&times;</button>
    `;

    container.appendChild(toast);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      toast.classList.add("toast-fade-out");
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  },

  /**
   * Update header cart counter badge & floating takeaway bar
   */
  updateCartBadge() {
    const badge = document.querySelector(".header-cart-count");
    const count = CartService.getItemCount();
    if (badge) {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.add("has-items");
        badge.style.display = "inline-flex";
      } else {
        badge.classList.remove("has-items");
        badge.style.display = "none";
      }
    }

    // Floating Takeaway bottom bar
    const floatingBar = document.getElementById("takeaway-floating-bar");
    if (floatingBar) {
      if (count > 0) {
        const totals = CartService.getCartTotals("pickup");
        const countEl = document.getElementById("floating-bar-count");
        const totalEl = document.getElementById("floating-bar-total");
        if (countEl) countEl.textContent = `${count} ${count === 1 ? 'Item' : 'Items'}`;
        if (totalEl) totalEl.textContent = this.formatINR(totals.grandTotal);
        floatingBar.style.display = "flex";
      } else {
        floatingBar.style.display = "none";
      }
    }
  },

  /**
   * Initialize Global Navbar, Mobile Drawer, and Cart Listeners
   */
  initHeader() {
    this.updateCartBadge();

    // Listen to cart update event
    window.addEventListener("sevenstar:cart_updated", () => {
      this.updateCartBadge();
    });

    // Mobile Hamburger Toggle
    const mobileToggle = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    const mobileOverlay = document.querySelector(".mobile-nav-overlay");

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener("click", () => {
        mobileToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        if (mobileOverlay) mobileOverlay.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
      });

      if (mobileOverlay) {
        mobileOverlay.addEventListener("click", () => {
          mobileToggle.classList.remove("active");
          navMenu.classList.remove("active");
          mobileOverlay.classList.remove("active");
          document.body.classList.remove("no-scroll");
        });
      }
    }

    // Highlight current page in navbar
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === currentPath || (currentPath === "" && href === "index.html")) {
        link.classList.add("active");
      }
    });
  },

  /**
   * Quick Add to Cart button handler from card
   */
  quickAddToCart(itemId, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const item = MenuService.getItemById(itemId);
    if (!item) return;

    if (!item.isAvailable) {
      this.showToast("This item is currently sold out.", "error");
      return;
    }

    CartService.addItem(item, null, 1);
    this.showToast(`Added <strong>${item.name}</strong> to your cart!`, "success");

    // Optional animation on the button clicked
    if (e && e.currentTarget) {
      const btn = e.currentTarget;
      const originalText = btn.innerHTML;
      btn.innerHTML = `✓ Added`;
      btn.classList.add("added-feedback");
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove("added-feedback");
      }, 1200);
    }
  }
};

// Auto-run header initialization on DOM load
document.addEventListener("DOMContentLoaded", () => {
  SevenStar.initHeader();
});


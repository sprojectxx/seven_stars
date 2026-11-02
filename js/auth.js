/**
 * SEVEN STAR RESTAURANT — DEMO AUTHENTICATION SERVICE
 * Simulated Role-Based Access Control (Admin / Staff)
 *
 * NOTE: This is a frontend demo authentication system using LocalStorage.
 * In a production environment, this is replaced by secure JWT / session tokens
 * validated against a hardened backend server.
 */

const DEMO_CREDENTIALS = [
  {
    email: "admin@sevenstar.com",
    password: "admin123",
    role: "admin",
    name: "General Manager & Admin",
    title: "Seven Stars Indian Takeaway Management"
  },
  {
    email: "staff@sevenstar.com",
    password: "staff123",
    role: "staff",
    name: "Dispatch & Kitchen Staff",
    title: "Order Dispatch Team"
  }
];

const AuthService = {
  /**
   * Quick 1-click Admin Login
   */
  quickLoginAdmin() {
    const sessionUser = {
      email: "admin@sevenstar.com",
      role: "admin",
      name: "General Manager & Admin",
      title: "Seven Stars Indian Takeaway Management",
      token: "admin-token-" + Date.now(),
      loginTime: new Date().toISOString()
    };
    StorageService.set(STORAGE_KEYS.ACTIVE_USER, sessionUser);
    return sessionUser;
  },

  /**
   * Quick 1-click Staff Login
   */
  quickLoginStaff() {
    const sessionUser = {
      email: "staff@sevenstar.com",
      role: "staff",
      name: "Dispatch & Kitchen Staff",
      title: "Order Dispatch Team",
      token: "staff-token-" + Date.now(),
      loginTime: new Date().toISOString()
    };
    StorageService.set(STORAGE_KEYS.ACTIVE_USER, sessionUser);
    return sessionUser;
  },

  /**
   * Authenticate with email/username & password (flexible & forgiving)
   */
  login(identifier, password) {
    const cleanId = (identifier || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    // 1. Direct username or role matches
    if (
      cleanId === "admin" ||
      cleanId.startsWith("admin") ||
      cleanId === "manager" ||
      cleanId === "chef" ||
      cleanId === "owner" ||
      cleanId.includes("admin") ||
      cleanId === "admin@sevenstar.com" ||
      cleanId === "admin@seven-stars.co.uk" ||
      cleanId === "orders@seven-stars.co.uk" ||
      cleanId === "sprojectxx@gmail.com"
    ) {
      return { success: true, user: this.quickLoginAdmin() };
    }

    if (
      cleanId === "staff" ||
      cleanId.startsWith("staff") ||
      cleanId.includes("staff") ||
      cleanId === "staff@sevenstar.com"
    ) {
      return { success: true, user: this.quickLoginStaff() };
    }

    // 2. Check pre-configured demo credentials or registered staff in storage
    let user = DEMO_CREDENTIALS.find(
      (c) => c.email.toLowerCase() === cleanId && (cleanPass === "" || c.password === cleanPass || cleanPass === "admin123" || cleanPass === "admin")
    );

    if (!user) {
      const staffList = StorageService.get(STORAGE_KEYS.STAFF, []);
      const matchedStaff = staffList.find(
        (s) => s.email.toLowerCase() === cleanId
      );
      if (matchedStaff) {
        user = {
          email: matchedStaff.email,
          role: matchedStaff.role || "staff",
          name: matchedStaff.name,
          title: matchedStaff.title || "Restaurant Associate"
        };
      }
    }

    // 3. Permissive Fallback: If user enters ANY non-empty credential, grant admin access
    if (!user && cleanId) {
      user = {
        email: cleanId.includes("@") ? cleanId : `${cleanId}@sevenstar.com`,
        role: "admin",
        name: cleanId.toUpperCase(),
        title: "Administrator"
      };
    }

    if (user) {
      const sessionUser = {
        email: user.email,
        role: user.role,
        name: user.name,
        title: user.title,
        token: "demo-token-" + Math.random().toString(36).substring(2, 10),
        loginTime: new Date().toISOString()
      };
      StorageService.set(STORAGE_KEYS.ACTIVE_USER, sessionUser);
      return { success: true, user: sessionUser };
    }

    return {
      success: false,
      message: "Please enter your username or email to sign in."
    };
  },


  /**
   * Get current authenticated user
   */
  getCurrentUser() {
    return StorageService.get(STORAGE_KEYS.ACTIVE_USER, null);
  },

  /**
   * Check if user is logged in
   */
  isAuthenticated() {
    const user = this.getCurrentUser();
    return !!(user && user.email);
  },

  /**
   * Check role permissions
   */
  hasRole(requiredRole) {
    const user = this.getCurrentUser();
    if (!user) return false;
    if (user.role === "admin") return true; // Admin has super-access
    return user.role === requiredRole;
  },

  /**
   * Log out active session
   */
  logout() {
    StorageService.remove(STORAGE_KEYS.ACTIVE_USER);
    window.location.href = "index.html";
  },

  /**
   * Page guard to enforce auth on admin subpages
   */
  requireAuth(requiredRole = null) {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = "index.html";
      return false;
    }
    if (requiredRole && requiredRole === "admin" && user.role !== "admin") {
      alert("Access restricted. This section requires Administrator privileges.");
      window.location.href = "dashboard.html";
      return false;
    }
    return true;
  }
};


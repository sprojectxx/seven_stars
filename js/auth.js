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
    name: "Chef Rajeshwar Rao",
    title: "General Manager & Executive Chef"
  },
  {
    email: "staff@sevenstar.com",
    password: "staff123",
    role: "staff",
    name: "Pooja Sharma",
    title: "Order Dispatch & Guest Host"
  }
];

const AuthService = {
  /**
   * Authenticate with email & password
   */
  login(email, password) {
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    // Check pre-configured demo credentials or registered staff
    let user = DEMO_CREDENTIALS.find(
      (c) => c.email.toLowerCase() === cleanEmail && c.password === cleanPass
    );

    // Also check staff in storage in case new staff were added
    if (!user) {
      const staffList = StorageService.get(STORAGE_KEYS.STAFF, []);
      const matchedStaff = staffList.find(
        (s) => s.email.toLowerCase() === cleanEmail
      );
      // For newly created demo staff, accept default demo password 'staff123'
      if (matchedStaff && (cleanPass === "staff123" || cleanPass === "admin123")) {
        user = {
          email: matchedStaff.email,
          role: matchedStaff.role || "staff",
          name: matchedStaff.name,
          title: matchedStaff.title || "Restaurant Associate"
        };
      }
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
      message: "Invalid email or password. Please use the demo credentials provided."
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


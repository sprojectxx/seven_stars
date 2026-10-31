# Seven Star Take Away — Express Kitchen Prototype Website

A handcrafted, premium-quality **Take Away Restaurant** website prototype developed exclusively using **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)** with **Browser LocalStorage** for demo data persistence.

Built specifically for a dedicated **Take Away Kitchen** where the menu and ordering features live directly on the main page with smooth horizontal side-scrolling category shelves and clean category filtering.

---

## 🌟 Brand Identity & Color Palette

The design strictly implements the required 5-color corporate palette:

| Colour | RGB | HEX | Suggested Usage |
|---|---|---|---|
| **Primary Red** | 165, 36, 34 | `#A52422` | Brand identity, primary CTAs, order highlights, active states |
| **Warm Brown** | 114, 87, 82 | `#725752` | Subheadings, secondary badges, dividers, price labels |
| **Light Blue** | 205, 230, 245 | `#CDE6F5` | Subtle UI containers, announcement highlights, tags |
| **Olive Green** | 106, 153, 78 | `#6A994E` | Vegetarian indicators, success alerts, delivered status |
| **Muted Blue** | 80, 128, 142 | `#50808E` | Secondary buttons, informational pills, icon badges |

Balanced with luxurious neutral shades: Warm Cream (`#FAF7F2`), Royal Dark Charcoal (`#1E1A18`), and Crisp White (`#FFFFFF`).

---

## 🚀 Quick Start / How to Run

1. Open the project folder in any modern browser directly by opening `index.html`, or
2. Use **VS Code Live Server** (right click `index.html` &rarr; *Open with Live Server*).
3. No server setup, Node.js, databases, or npm installations are required.

---

## 🔐 Demo Login Credentials

The prototype features a simulated Role-Based Access Control (RBAC) system stored in browser LocalStorage.

Access URL: [`admin/index.html`](admin/index.html) (or click the top bar link on any page).

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Administrator** | `admin@sevenstar.com` | `admin123` | Full access to KPIs, Orders, Menu CRUD, Staff Accounts, Financial Reports, Settings & Reset Data |
| **Staff Member** | `staff@sevenstar.com` | `staff123` | Operational access to Orders, Order Status Workflows, and Menu stock availability toggles |

*Tip: The login page includes 1-click auto-fill buttons for both roles.*

---

## 📂 Project Architecture

```
seven-star-restaurant/
│
├── index.html                  # Main Page: Hero, Direct Take Away Menu, Side-Scrolling Shelves, Category Filters, Floating Cart Bar
├── contact.html                # Take Away Pickup Counter Location, Pickup Timings & Hotline
├── cart.html                   # Takeaway Cart with quantity controls, packaging fee & instant checkout
├── checkout.html               # Express Checkout (Defaults to Counter Pickup, optional Delivery, COD & Online)
├── food-details.html           # Item details (Portions, portion pricing, chef notes, quantity selector)
├── order-confirmation.html     # Confirmation receipt, printable A4 Tax Invoice & 80mm Thermal POS slip
├── menu.html                   # Instant redirect to index.html
├── about.html                  # Instant redirect to index.html
│
├── admin/
│   ├── index.html              # Branded simulated login screen with quick-fill
│   ├── dashboard.html          # Dynamic KPI cards, live order audio chime, top selling dishes
│   ├── orders.html             # Order management queue with search & status changers
│   ├── order-details.html      # Kitchen order ticket (KOT), customer address, A4 & POS print
│   ├── menu-management.html    # Add, edit, delete dishes, and live in-stock toggle switch
│   ├── customers.html          # Aggregated customer order history & lifetime spend
│   ├── staff.html              # Staff accounts & role permission management
│   ├── reports.html            # Financial metrics, category revenue, daily sales summary
│   └── settings.html           # Restaurant settings & 1-Click "Reset Demo Data" button
│
├── css/
│   ├── style.css               # Core CSS variables, side-scrolling shelf tracks, floating cart bar, design system
│   ├── responsive.css          # Responsive styling for Desktop, Tablet, and Mobile devices
│   ├── admin.css               # SaaS administration dashboard styling
│   └── print.css               # Optimized print layouts for A4 Tax Invoices & 80mm Thermal Slips
│
└── js/
    ├── data.js                 # Seed data: 24 authentic takeaway dishes, sample orders, customers, staff
    ├── storage.js              # Centralized LocalStorage service layer with cross-tab sync
    ├── auth.js                 # Simulated authentication & RBAC guards
    ├── menu.js                 # Menu search, category filtering, and CRUD operations
    ├── cart.js                 # Shopping cart arithmetic, portion pricing & packaging calculations
    ├── orders.js               # Order creation, unique ID generator, status lifecycle
    ├── reports.js              # Analytics engine calculating revenue, AOV, and top sellers
    ├── main.js                 # Takeaway UI controller, floating cart bar sync, live cart badge, toasts
    └── admin.js                # Admin controller, Web Audio synth chime, real-time polling
```

---

## 🍽️ Key Take Away Features

### 1. Main Page Take Away Ordering Experience
- **Direct Main Page Menu**: Customers explore and order directly on `index.html` without navigating away.
- **Horizontal Side-Scrolling Shelves**: Each category is laid out in a horizontal side-scrolling row with left/right `<` `>` arrow buttons, CSS scroll-snap, touch-swipe on mobile/tablet, and smooth mouse drag-to-scroll on desktop.
- **Category Filtering**: High-contrast category filter buttons (`★ All Categories`, `Starters`, `Soups`, `Indian Main Course`, `Biryani`, `Chinese`, `Tandoori`, `Beverages`, `Desserts`) instantly filter the visible shelves.
- **Instant "+ Add" Dish Cards**: Add any dish with 1-click; live feedback animation and immediate cart syncing.
- **Floating Takeaway Bottom Bar**: Automatically slides up from the bottom of the screen showing current item count, order total in €, and quick links to "Review Cart" or "Proceed to Checkout".

### 2. Express Take Away Checkout & Receipts
- **Pickup-First Checkout**: Defaults to "Take Away Counter Pickup" with packaging fees; home delivery toggle is available.
- **Double-Format Printing**:
  - **A4 Formal Tax Invoice** with GSTIN, itemized rates, packaging, and totals.
  - **80mm Thermal POS Kitchen Slip** formatted specifically for receipt slip printers.

### 3. Admin & Kitchen Management Portal (`/admin/`)
- Dynamic KPIs (Total Orders, Pending Orders, Total Sales, Menu Count) calculated live from LocalStorage.
- Real-time polling detection and Web Audio API synthesized kitchen alert chime upon receiving new orders.
- Full order lifecycle actions (Accept, Prepare, Ready for Pickup, Complete, Cancel).
- Menu CRUD (Add dish, edit prices/images/veg status, delete, toggle in-stock/sold out).
- 1-Click "Reset Demo Data" button in Settings to return the prototype to its pristine factory state at any time.

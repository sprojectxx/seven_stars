/**
 * SEVEN STAR RESTAURANT — MENU SERVICE
 * Business logic for retrieving, filtering, searching, and managing menu items.
 */

const MenuService = {
  /**
   * Get all menu categories
   */
  getCategories() {
    return StorageService.get(STORAGE_KEYS.CATEGORIES, SEED_DATA.categories);
  },

  /**
   * Get category by ID or slug
   */
  getCategoryById(idOrSlug) {
    const categories = this.getCategories();
    return categories.find((c) => c.id === idOrSlug || c.slug === idOrSlug) || null;
  },

  /**
   * Get filtered, searched, and sorted menu items
   */
  getItems(filters = {}) {
    let items = StorageService.get(STORAGE_KEYS.MENU, SEED_DATA.menuItems);

    // Filter by Category
    if (filters.category && filters.category !== "all") {
      items = items.filter((item) => item.category === filters.category);
    }

    // Filter by Dietary (Veg / Non-Veg)
    if (filters.dietary) {
      if (filters.dietary === "veg") {
        items = items.filter((item) => item.isVeg === true);
      } else if (filters.dietary === "non-veg") {
        items = items.filter((item) => item.isVeg === false);
      }
    }

    // Filter by Availability (for customer view, optionally hide or mark)
    if (filters.onlyAvailable) {
      items = items.filter((item) => item.isAvailable !== false);
    }

    // Search query in name, description, category
    if (filters.query && filters.query.trim() !== "") {
      const q = filters.query.trim().toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
          items.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          items.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          items.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "popularity":
          // Priority to Bestseller & Chef's Special
          items.sort((a, b) => {
            const score = (x) => (x.badge === "Bestseller" ? 2 : x.badge ? 1 : 0);
            return score(b) - score(a);
          });
          break;
        default:
          break;
      }
    }

    return items;
  },

  /**
   * Get single item by ID
   */
  getItemById(id) {
    const items = StorageService.get(STORAGE_KEYS.MENU, SEED_DATA.menuItems);
    return items.find((item) => item.id === id) || null;
  },

  /**
   * Get related dishes (from same category, excluding current)
   */
  getRelatedItems(itemId, limit = 3) {
    const current = this.getItemById(itemId);
    if (!current) return [];
    const allInCat = this.getItems({ category: current.category });
    return allInCat.filter((item) => item.id !== itemId).slice(0, limit);
  },

  /**
   * Admin: Add new menu item
   */
  addItem(itemData) {
    const items = StorageService.get(STORAGE_KEYS.MENU, []);
    
    // Generate clean ID
    const nextNum = items.length + 1;
    const newId = "ITEM-" + String(nextNum).padStart(3, "0");

    const newItem = {
      id: newId,
      name: itemData.name.trim(),
      category: itemData.category,
      price: Number(itemData.price),
      description: itemData.description.trim(),
      isVeg: Boolean(itemData.isVeg),
      image: itemData.image || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      isAvailable: itemData.isAvailable !== undefined ? Boolean(itemData.isAvailable) : true,
      badge: itemData.badge || null,
      spiceLevel: itemData.spiceLevel || "Medium",
      prepTime: itemData.prepTime || "15-20 min",
      calories: itemData.calories || "350 kcal",
      variants: itemData.variants && itemData.variants.length > 0
        ? itemData.variants
        : [{ name: "Standard Portion", price: Number(itemData.price) }]
    };

    items.unshift(newItem);
    StorageService.set(STORAGE_KEYS.MENU, items);
    window.dispatchEvent(new CustomEvent("sevenstar:menu_updated", { detail: { action: "add", item: newItem } }));
    return { success: true, item: newItem };
  },

  /**
   * Admin: Update existing menu item
   */
  updateItem(id, itemData) {
    const items = StorageService.get(STORAGE_KEYS.MENU, []);
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) {
      return { success: false, message: "Item not found" };
    }

    const updated = {
      ...items[idx],
      name: itemData.name !== undefined ? itemData.name.trim() : items[idx].name,
      category: itemData.category !== undefined ? itemData.category : items[idx].category,
      price: itemData.price !== undefined ? Number(itemData.price) : items[idx].price,
      description: itemData.description !== undefined ? itemData.description.trim() : items[idx].description,
      isVeg: itemData.isVeg !== undefined ? Boolean(itemData.isVeg) : items[idx].isVeg,
      image: itemData.image || items[idx].image,
      isAvailable: itemData.isAvailable !== undefined ? Boolean(itemData.isAvailable) : items[idx].isAvailable,
      badge: itemData.badge !== undefined ? itemData.badge : items[idx].badge,
      spiceLevel: itemData.spiceLevel || items[idx].spiceLevel,
      prepTime: itemData.prepTime || items[idx].prepTime,
      calories: itemData.calories || items[idx].calories,
      variants: itemData.variants || items[idx].variants
    };

    items[idx] = updated;
    StorageService.set(STORAGE_KEYS.MENU, items);
    window.dispatchEvent(new CustomEvent("sevenstar:menu_updated", { detail: { action: "update", item: updated } }));
    return { success: true, item: updated };
  },

  /**
   * Admin: Toggle item availability
   */
  toggleAvailability(id) {
    const items = StorageService.get(STORAGE_KEYS.MENU, []);
    const item = items.find((i) => i.id === id);
    if (!item) return false;
    item.isAvailable = !item.isAvailable;
    StorageService.set(STORAGE_KEYS.MENU, items);
    window.dispatchEvent(new CustomEvent("sevenstar:menu_updated", { detail: { action: "toggle", item } }));
    return item.isAvailable;
  },

  /**
   * Admin: Delete menu item
   */
  deleteItem(id) {
    let items = StorageService.get(STORAGE_KEYS.MENU, []);
    const initialLen = items.length;
    items = items.filter((i) => i.id !== id);
    if (items.length === initialLen) {
      return { success: false, message: "Item not found" };
    }
    StorageService.set(STORAGE_KEYS.MENU, items);
    window.dispatchEvent(new CustomEvent("sevenstar:menu_updated", { detail: { action: "delete", id } }));
    return { success: true };
  }
};


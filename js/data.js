/**
 * SEVEN STARS INDIAN TAKEAWAY — DATA LAYER
 * Seed Data extracted directly from Seven Stars Indian Takeaway Menu
 * All prices in Euro (€) with authentic takeaway dishes, set meals, and options.
 */

const SEED_DATA = {
  restaurant: {
    name: "Seven Stars Indian Takeaway",
    tagline: "Authentic Indian Takeaway & Express Kitchen",
    founded: "2012",
    gstNumber: "GB45783801772",
    phone: "01772 457 008",
    altPhone: "01772 457 838",
    email: "orders@seven-stars.co.uk",
    supportEmail: "takeaway@seven-stars.co.uk",
    website: "www.seven-stars.justeat.co.uk",
    address: {
      line1: "360 Leyland Lane",
      line2: "Leyland",
      city: "Preston",
      state: "Lancashire",
      pincode: "PR25 1TB",
      country: "United Kingdom"
    },
    timings: {
      dinner: "5:00 PM – 11:00 PM",
      days: "7 Days a Week (Open Daily)"
    },
    deliveryInfo: {
      radius: "3 mile radius",
      freeThreshold: 10.00,
      note: "FREE LOCAL DELIVERY ON ORDERS OVER €10 within 3 mile radius",
      extraCharges: [
        { area: "Croston", fee: 3.00 },
        { area: "Clayton Brook", fee: 3.00 },
        { area: "Buckshaw Village", fee: 2.00 },
        { area: "Eccleston", fee: 2.00 },
        { area: "Euxton", fee: 3.00 }
      ]
    },
    settings: {
      currency: "€",
      currencyCode: "EUR",
      gstPercentage: 5,
      packagingCharge: 0.50,
      deliveryFee: 2.00,
      freeDeliveryThreshold: 10.00,
      acceptingOrders: true,
      soundNotifications: true
    }
  },

  coupons: [
    {
      code: "SEVENSTAR10",
      description: "10% off on all orders above €15",
      discountType: "percentage",
      value: 10,
      minOrder: 15,
      maxDiscount: 10,
      isActive: true
    },
    {
      code: "WELCOME50",
      description: "Flat €2.00 off on your order above €12",
      discountType: "flat",
      value: 2.00,
      minOrder: 12,
      maxDiscount: 2.00,
      isActive: true
    },
    {
      code: "FEAST20",
      description: "20% off on feast orders above €30",
      discountType: "percentage",
      value: 20,
      minOrder: 30,
      maxDiscount: 15,
      isActive: true
    }
  ],

  categories: [
    {
      id: "set-meals",
      name: "Set Meals",
      slug: "set-meals",
      description: "Complete royal takeaway banquets for 1 to 4 persons with starters, mains, curries, sides & breads.",
      icon: "utensils",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "biryani",
      name: "Biryani Dishes",
      slug: "biryani",
      description: "Special flavoured basmati rice with aromatic spices. Served with mixed vegetable curry.",
      icon: "bowl-rice",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "curries",
      name: "Traditional Curries",
      slug: "curries",
      description: "Classic rich curries including Chicken Tikka Masala, Bhuna, Rogan, and delicate Korma.",
      icon: "fire",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "kebab-rolls",
      name: "Kebab Rolls",
      slug: "kebab-rolls",
      description: "Wrapped with fresh salad and choice of chilli or garlic sauce. Also includes burgers & donner.",
      icon: "flame",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "vegetable-dishes",
      name: "Vegetable Dishes",
      slug: "vegetable-dishes",
      description: "Authentic vegetarian sides and curries cooked with delicate spices (€3.90 each).",
      icon: "leaf",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "rice",
      name: "Rice",
      slug: "rice",
      description: "Fragrant basmati pilau, fried, flavoured, and chef special rice varieties.",
      icon: "bowl-rice",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "bread",
      name: "Bread",
      slug: "bread",
      description: "Fresh clay oven baked tandoori naans, rotis, parathas, puris, and chapatis.",
      icon: "cookie",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "english-dishes",
      name: "English Dishes",
      slug: "english-dishes",
      description: "Served hot with crispy chips and garden fresh side salad.",
      icon: "utensils",
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "starters",
      name: "Sundries & Starters",
      slug: "starters",
      description: "Crispy poppadoms, chips, kebabs, samosas, and house chutneys & pickles.",
      icon: "utensils",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "desserts",
      name: "Desserts & Drinks",
      slug: "desserts",
      description: "Chocolate fudge cake, pineapple fritter, and chilled soft drinks.",
      icon: "glass",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
    }
  ],

  menuItems: [
    // --- SET MEALS ---
    {
      id: "ITEM-SM-1",
      name: "Set Meal For 1 Person",
      category: "set-meals",
      price: 16.95,
      description: "Poppadom, Chutney, Seekh kebab starter, Chicken bhuna, Vegetable bhaji, Pilau rice.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Great Value",
      spiceLevel: "Medium",
      prepTime: "20 min",
      calories: "850 kcal",
      variants: [{ name: "Standard Set (1 Person)", price: 16.95 }]
    },
    {
      id: "ITEM-SM-2",
      name: "Set Meal For 2 Person",
      category: "set-meals",
      price: 26.95,
      description: "Poppadoms (2), Chutney, Onion bhaji, Chicken tikka, Chicken tikka masala, Meat bhuna, Vegetable bhaji, Saag aloo, Pilau rice (2), Plain naan.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Bestseller",
      spiceLevel: "Medium",
      prepTime: "25 min",
      calories: "1650 kcal",
      variants: [{ name: "Standard Set (2 Persons)", price: 26.95 }]
    },
    {
      id: "ITEM-SM-3",
      name: "Set Meal For 3 Person",
      category: "set-meals",
      price: 36.95,
      description: "Poppadoms (3), Chutney, Meat samosa, Chicken tikka, Seekh kebab, Chicken tikka masala, Meat rogan, Chicken bhuna, Vegetable bhaji, Bombay potato, Pilau rice (2), Plain naan.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Family Feast",
      spiceLevel: "Medium",
      prepTime: "30 min",
      calories: "2450 kcal",
      variants: [{ name: "Standard Set (3 Persons)", price: 36.95 }]
    },
    {
      id: "ITEM-SM-4",
      name: "Set Meal For 4 Person",
      category: "set-meals",
      price: 44.95,
      description: "Poppadoms (4), Chutney, Meat samosa, Chicken tikka, Seekh kebab, Onion bhaji, Chicken tikka masala, Chicken korma, Chicken bhuna, Meat rogan, Vegetable bhaji, Aloo gobi, Pilau rice (3), Plain naan (2).",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Royal Banquet",
      spiceLevel: "Medium",
      prepTime: "35 min",
      calories: "3200 kcal",
      variants: [{ name: "Standard Set (4 Persons)", price: 44.95 }]
    },

    // --- BIRYANI DISHES ---
    {
      id: "ITEM-BIR-1",
      name: "Chicken Biryani",
      category: "biryani",
      price: 9.95,
      description: "Flavoured basmati rice cooked with tender spiced chicken. Served with mixed vegetable curry.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Popular",
      spiceLevel: "Medium",
      prepTime: "20 min",
      calories: "720 kcal",
      variants: [{ name: "Standard Portion", price: 9.95 }]
    },
    {
      id: "ITEM-BIR-2",
      name: "Chicken Tikka Biryani",
      category: "biryani",
      price: 10.95,
      description: "Charcoal roasted chicken tikka cubes tossed in aromatic spiced basmati rice. Served with mixed vegetable curry.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Bestseller",
      spiceLevel: "Medium",
      prepTime: "20 min",
      calories: "740 kcal",
      variants: [{ name: "Standard Portion", price: 10.95 }]
    },
    {
      id: "ITEM-BIR-3",
      name: "King Prawn Biryani",
      category: "biryani",
      price: 11.95,
      description: "Succulent jumbo king prawns simmered with spiced basmati rice and fresh herbs. Served with mixed vegetable curry.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Chef's Special",
      spiceLevel: "Medium",
      prepTime: "22 min",
      calories: "680 kcal",
      variants: [{ name: "Standard Portion", price: 11.95 }]
    },
    {
      id: "ITEM-BIR-4",
      name: "Meat Biryani",
      category: "biryani",
      price: 10.95,
      description: "Slow-braised spiced meat cooked with fragrant basmati and whole spices. Served with mixed vegetable curry.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Medium",
      prepTime: "22 min",
      calories: "790 kcal",
      variants: [{ name: "Standard Portion", price: 10.95 }]
    },
    {
      id: "ITEM-BIR-5",
      name: "Meat Tikka Biryani",
      category: "biryani",
      price: 10.95,
      description: "Tender tandoori grilled meat tikka pieces layered with aromatic basmati rice. Served with mixed vegetable curry.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Medium",
      prepTime: "22 min",
      calories: "770 kcal",
      variants: [{ name: "Standard Portion", price: 10.95 }]
    },
    {
      id: "ITEM-BIR-6",
      name: "Prawn Biryani",
      category: "biryani",
      price: 10.95,
      description: "Tender prawns tossed in basmati rice with toasted cumin and coriander. Served with mixed vegetable curry.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Medium",
      prepTime: "20 min",
      calories: "650 kcal",
      variants: [{ name: "Standard Portion", price: 10.95 }]
    },
    {
      id: "ITEM-BIR-7",
      name: "Special Mixed Biryani",
      category: "biryani",
      price: 10.95,
      description: "House deluxe biryani with chicken tikka, lamb tikka & king prawn. Served with mixed vegetable curry.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "House Special",
      spiceLevel: "Medium",
      prepTime: "25 min",
      calories: "820 kcal",
      variants: [{ name: "Standard Portion", price: 10.95 }]
    },
    {
      id: "ITEM-BIR-8",
      name: "Vegetable Biryani",
      category: "biryani",
      price: 8.75,
      description: "Basmati rice layered with garden vegetables, saffron and warm spices. Served with mixed vegetable curry.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Vegetarian",
      spiceLevel: "Mild",
      prepTime: "18 min",
      calories: "540 kcal",
      variants: [{ name: "Standard Portion", price: 8.75 }]
    },

    // --- TRADITIONAL CURRIES ---
    {
      id: "ITEM-CUR-1",
      name: "Chicken Tikka Masala",
      category: "curries",
      price: 9.95,
      description: "Nation's favourite curry with roasted chicken tikka simmered in a velvety tomato, cream, and almond sauce.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Bestseller",
      spiceLevel: "Mild",
      prepTime: "18 min",
      calories: "680 kcal",
      variants: [{ name: "Standard Portion", price: 9.95 }]
    },
    {
      id: "ITEM-CUR-2",
      name: "Chicken Bhuna",
      category: "curries",
      price: 9.50,
      description: "Tender chicken cooked slowly with fried onions, ripe tomatoes, ginger, and thick spiced reduction.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Medium",
      prepTime: "18 min",
      calories: "590 kcal",
      variants: [{ name: "Standard Portion", price: 9.50 }]
    },
    {
      id: "ITEM-CUR-3",
      name: "Meat Rogan (Rogan Josh)",
      category: "curries",
      price: 10.50,
      description: "Rich Kashmiri spiced tender meat simmered with browned onions, sweet paprika, and cardamom.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Recommended",
      spiceLevel: "Medium",
      prepTime: "20 min",
      calories: "690 kcal",
      variants: [{ name: "Standard Portion", price: 10.50 }]
    },
    {
      id: "ITEM-CUR-4",
      name: "Chicken Korma",
      category: "curries",
      price: 9.50,
      description: "Delicate and mild chicken curry enriched with cream, coconut, and ground almonds.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Mild",
      spiceLevel: "Mild",
      prepTime: "15 min",
      calories: "620 kcal",
      variants: [{ name: "Standard Portion", price: 9.50 }]
    },
    {
      id: "ITEM-CUR-5",
      name: "Meat Bhuna",
      category: "curries",
      price: 10.50,
      description: "Tender chunks of meat sautéed in hot spices, fresh coriander, garlic, and rich thick gravy.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Medium",
      prepTime: "20 min",
      calories: "690 kcal",
      variants: [{ name: "Standard Portion", price: 10.50 }]
    },

    // --- KEBAB ROLLS & BURGERS ---
    {
      id: "ITEM-KR-1",
      name: "Seekh Kebab Roll",
      category: "kebab-rolls",
      price: 6.95,
      description: "Spiced minced lamb kebab flame-grilled and wrapped with crisp salad & choice of chilli or garlic sauce.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Popular",
      spiceLevel: "Medium",
      prepTime: "12 min",
      calories: "520 kcal",
      variants: [
        { name: "With Chilli Sauce", price: 6.95 },
        { name: "With Garlic Sauce", price: 6.95 }
      ]
    },
    {
      id: "ITEM-KR-2",
      name: "Chicken Tikka Kebab Roll",
      category: "kebab-rolls",
      price: 6.95,
      description: "Tandoori seasoned chicken tikka cubes rolled in warm flatbread with salad and sauce.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Bestseller",
      spiceLevel: "Medium",
      prepTime: "12 min",
      calories: "490 kcal",
      variants: [
        { name: "With Chilli Sauce", price: 6.95 },
        { name: "With Garlic Sauce", price: 6.95 }
      ]
    },
    {
      id: "ITEM-KR-3",
      name: "Mixed Kebab Roll",
      category: "kebab-rolls",
      price: 7.60,
      description: "Delicious combination of seekh kebab and chicken tikka wrapped with fresh salad and sauce.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Special",
      spiceLevel: "Medium",
      prepTime: "14 min",
      calories: "580 kcal",
      variants: [
        { name: "With Chilli Sauce", price: 7.60 },
        { name: "With Garlic Sauce", price: 7.60 }
      ]
    },
    {
      id: "ITEM-KR-4",
      name: "Chicken & Donner Mix",
      category: "kebab-rolls",
      price: 7.60,
      description: "Tender chicken and seasoned donner meat served with salad, sauce and choice of chips or fresh naan.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Customer Favourite",
      spiceLevel: "Medium",
      prepTime: "15 min",
      calories: "680 kcal",
      variants: [
        { name: "With Naan", price: 7.60 },
        { name: "With Chips", price: 7.60 }
      ]
    },
    {
      id: "ITEM-KR-5",
      name: "Donner Kebab",
      category: "kebab-rolls",
      price: 6.90,
      description: "Sliced seasoned donner meat with fresh salad, house sauce, and choice of chips or fresh naan.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "10 min",
      calories: "640 kcal",
      variants: [
        { name: "With Naan", price: 6.90 },
        { name: "With Chips", price: 6.90 }
      ]
    },
    {
      id: "ITEM-KR-6",
      name: "Chicken Burger Meal",
      category: "kebab-rolls",
      price: 6.95,
      description: "Crispy coated chicken or cheese burger meal served with golden chips and a chilled can of Pepsi.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Complete Meal",
      spiceLevel: "Mild",
      prepTime: "12 min",
      calories: "780 kcal",
      variants: [
        { name: "Chicken Burger Meal (with Chips & Pepsi)", price: 6.95 },
        { name: "Cheese Burger Meal (with Chips & Pepsi)", price: 6.95 }
      ]
    },

    // --- VEGETABLE DISHES (All €3.90) ---
    {
      id: "ITEM-VEG-1",
      name: "Vegetable Bhaji",
      category: "vegetable-dishes",
      price: 3.90,
      description: "Fresh mixed garden vegetables cooked dry with diced onions, tomatoes, and ground herbs.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Medium",
      prepTime: "12 min",
      calories: "180 kcal",
      variants: [{ name: "Standard Portion", price: 3.90 }]
    },
    {
      id: "ITEM-VEG-2",
      name: "Mushroom Bhaji",
      category: "vegetable-dishes",
      price: 3.90,
      description: "Plump button mushrooms sautéed in a rich garlic, onion, and tomato reduction.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "12 min",
      calories: "160 kcal",
      variants: [{ name: "Standard Portion", price: 3.90 }]
    },
    {
      id: "ITEM-VEG-3",
      name: "Saag Bhaji",
      category: "vegetable-dishes",
      price: 3.90,
      description: "Fresh spinach leaves finely chopped and stir-fried with fragrant garlic and mild spices.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "12 min",
      calories: "150 kcal",
      variants: [{ name: "Standard Portion", price: 3.90 }]
    },
    {
      id: "ITEM-VEG-4",
      name: "Cauliflower Bhaji",
      category: "vegetable-dishes",
      price: 3.90,
      description: "Tender florets of cauliflower gently braised with cumin, turmeric, and fresh coriander.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "12 min",
      calories: "170 kcal",
      variants: [{ name: "Standard Portion", price: 3.90 }]
    },
    {
      id: "ITEM-VEG-5",
      name: "Bombay Potato",
      category: "vegetable-dishes",
      price: 3.90,
      description: "Crispy baby potatoes tossed with mustard seeds, ground spices, and fresh herbs.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Popular",
      spiceLevel: "Medium",
      prepTime: "12 min",
      calories: "220 kcal",
      variants: [{ name: "Standard Portion", price: 3.90 }]
    },
    {
      id: "ITEM-VEG-6",
      name: "Saag Aloo",
      category: "vegetable-dishes",
      price: 3.90,
      description: "Classic pairing of tender spinach and diced potatoes cooked with cumin and garlic.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Classic",
      spiceLevel: "Mild",
      prepTime: "14 min",
      calories: "210 kcal",
      variants: [{ name: "Standard Portion", price: 3.90 }]
    },
    {
      id: "ITEM-VEG-7",
      name: "Aloo Gobi",
      category: "vegetable-dishes",
      price: 3.90,
      description: "Potato and cauliflower braised with onions, ginger, turmeric, and toasted spices.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "14 min",
      calories: "200 kcal",
      variants: [{ name: "Standard Portion", price: 3.90 }]
    },
    {
      id: "ITEM-VEG-8",
      name: "Tarka Daal",
      category: "vegetable-dishes",
      price: 3.90,
      description: "Yellow lentils cooked until creamy and tempered with browned garlic, cumin, and butter.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Comfort Food",
      spiceLevel: "Mild",
      prepTime: "12 min",
      calories: "190 kcal",
      variants: [{ name: "Standard Portion", price: 3.90 }]
    },
    {
      id: "ITEM-VEG-9",
      name: "Saag Paneer",
      category: "vegetable-dishes",
      price: 3.90,
      description: "Fresh spinach cooked with cubes of tender Indian cottage cheese (paneer) and light cream.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1567184109411-b28f27027318?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Bestseller",
      spiceLevel: "Mild",
      prepTime: "14 min",
      calories: "260 kcal",
      variants: [{ name: "Standard Portion", price: 3.90 }]
    },
    {
      id: "ITEM-VEG-10",
      name: "Bhindi Bhaji",
      category: "vegetable-dishes",
      price: 3.90,
      description: "Fresh tender okra cooked dry with sliced onions, diced tomatoes, and aromatic spices.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Medium",
      prepTime: "14 min",
      calories: "160 kcal",
      variants: [{ name: "Standard Portion", price: 3.90 }]
    },
    {
      id: "ITEM-VEG-11",
      name: "Aloo Chilli",
      category: "vegetable-dishes",
      price: 3.90,
      description: "Diced potatoes tossed in a fiery blend of green chillies, onions, and spicy tomato sauce.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Spicy",
      spiceLevel: "Hot",
      prepTime: "12 min",
      calories: "210 kcal",
      variants: [{ name: "Standard Portion", price: 3.90 }]
    },

    // --- RICE ---
    {
      id: "ITEM-RIC-1",
      name: "Boiled Rice",
      category: "rice",
      price: 2.70,
      description: "Steamed pure white long-grain basmati rice.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "None",
      prepTime: "10 min",
      calories: "240 kcal",
      variants: [{ name: "Portion", price: 2.70 }]
    },
    {
      id: "ITEM-RIC-2",
      name: "Pilau Rice",
      category: "rice",
      price: 2.90,
      description: "Fragrant basmati rice gently cooked with whole spices, cinnamon, and golden saffron.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Popular",
      spiceLevel: "Mild",
      prepTime: "10 min",
      calories: "260 kcal",
      variants: [{ name: "Portion", price: 2.90 }]
    },
    {
      id: "ITEM-RIC-3",
      name: "Chef Special Rice",
      category: "rice",
      price: 3.60,
      description: "Basmati rice wok-tossed with egg, garden green peas, and chef's special blend of spices.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "House Special",
      spiceLevel: "Mild",
      prepTime: "12 min",
      calories: "320 kcal",
      variants: [{ name: "Portion", price: 3.60 }]
    },
    {
      id: "ITEM-RIC-4",
      name: "Egg Fried Rice",
      category: "rice",
      price: 3.60,
      description: "Basmati rice stir-fried with scrambled eggs, scallions, and delicate seasonings.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "12 min",
      calories: "310 kcal",
      variants: [{ name: "Portion", price: 3.60 }]
    },
    {
      id: "ITEM-RIC-5",
      name: "Vegetable Fried Rice",
      category: "rice",
      price: 3.60,
      description: "Basmati rice wok-fried with finely diced mixed vegetables and herbs.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "12 min",
      calories: "280 kcal",
      variants: [{ name: "Portion", price: 3.60 }]
    },
    {
      id: "ITEM-RIC-6",
      name: "Peshwari Rice",
      category: "rice",
      price: 3.60,
      description: "Sweet basmati rice prepared with desiccated coconut, ground almonds, and sultanas.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Sweet",
      spiceLevel: "None",
      prepTime: "12 min",
      calories: "340 kcal",
      variants: [{ name: "Portion", price: 3.60 }]
    },
    {
      id: "ITEM-RIC-7",
      name: "Chilli Rice",
      category: "rice",
      price: 3.60,
      description: "Spicy basmati rice tossed with hot green chillies, cumin seeds, and fresh coriander.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Spicy",
      spiceLevel: "Hot",
      prepTime: "12 min",
      calories: "270 kcal",
      variants: [{ name: "Portion", price: 3.60 }]
    },
    {
      id: "ITEM-RIC-8",
      name: "Onion Rice",
      category: "rice",
      price: 3.60,
      description: "Basmati rice sautéed with deep golden caramelized onions and subtle spices.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "12 min",
      calories: "290 kcal",
      variants: [{ name: "Portion", price: 3.60 }]
    },
    {
      id: "ITEM-RIC-9",
      name: "Mushroom Fried Rice",
      category: "rice",
      price: 3.60,
      description: "Basmati rice wok-tossed with sliced button mushrooms and mild herbs.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "12 min",
      calories: "280 kcal",
      variants: [{ name: "Portion", price: 3.60 }]
    },
    {
      id: "ITEM-RIC-10",
      name: "Keema Fried Rice",
      category: "rice",
      price: 3.60,
      description: "Basmati rice stir-fried with spiced minced meat, onions, and coriander.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Hearty",
      spiceLevel: "Medium",
      prepTime: "12 min",
      calories: "350 kcal",
      variants: [{ name: "Portion", price: 3.60 }]
    },
    {
      id: "ITEM-RIC-11",
      name: "Fried Rice",
      category: "rice",
      price: 3.60,
      description: "Lightly seasoned fried basmati rice with spring onions and garlic oil.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "10 min",
      calories: "270 kcal",
      variants: [{ name: "Portion", price: 3.60 }]
    },
    {
      id: "ITEM-RIC-12",
      name: "Garlic Fried Rice",
      category: "rice",
      price: 3.60,
      description: "Basmati rice sautéed with golden roasted crushed garlic and butter.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "10 min",
      calories: "290 kcal",
      variants: [{ name: "Portion", price: 3.60 }]
    },

    // --- BREAD ---
    {
      id: "ITEM-BRD-1",
      name: "Plain Naan",
      category: "bread",
      price: 2.70,
      description: "Traditional soft leavened bread baked fresh on the inner walls of the tandoor oven.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Classic",
      spiceLevel: "None",
      prepTime: "8 min",
      calories: "260 kcal",
      variants: [{ name: "Standard Naan", price: 2.70 }]
    },
    {
      id: "ITEM-BRD-2",
      name: "Garlic Naan",
      category: "bread",
      price: 2.90,
      description: "Clay oven baked naan topped with freshly minced garlic and fresh coriander.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Bestseller",
      spiceLevel: "None",
      prepTime: "8 min",
      calories: "280 kcal",
      variants: [{ name: "Standard Naan", price: 2.90 }]
    },
    {
      id: "ITEM-BRD-3",
      name: "Garlic & Cheese Naan",
      category: "bread",
      price: 3.50,
      description: "Stuffed with melted cheese and generously coated with fresh garlic butter.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Chef's Special",
      spiceLevel: "None",
      prepTime: "10 min",
      calories: "360 kcal",
      variants: [{ name: "Standard Naan", price: 3.50 }]
    },
    {
      id: "ITEM-BRD-4",
      name: "Cheese Naan",
      category: "bread",
      price: 2.90,
      description: "Warm tandoori naan stuffed generously with gooey melted cheddar cheese.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Popular",
      spiceLevel: "None",
      prepTime: "10 min",
      calories: "340 kcal",
      variants: [{ name: "Standard Naan", price: 2.90 }]
    },
    {
      id: "ITEM-BRD-5",
      name: "Keema Naan",
      category: "bread",
      price: 2.90,
      description: "Tandoori naan stuffed with finely spiced minced meat and herbs.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "10 min",
      calories: "350 kcal",
      variants: [{ name: "Standard Naan", price: 2.90 }]
    },
    {
      id: "ITEM-BRD-6",
      name: "Peshwari Naan",
      category: "bread",
      price: 2.90,
      description: "Sweet naan bread stuffed with coconut powder, ground almonds, and sultanas.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Sweet",
      spiceLevel: "None",
      prepTime: "10 min",
      calories: "360 kcal",
      variants: [{ name: "Standard Naan", price: 2.90 }]
    },
    {
      id: "ITEM-BRD-7",
      name: "Plain Paratha",
      category: "bread",
      price: 2.70,
      description: "Layered, flaky unleavened flatbread shallow fried with butter ghee.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "None",
      prepTime: "8 min",
      calories: "310 kcal",
      variants: [{ name: "Standard Paratha", price: 2.70 }]
    },
    {
      id: "ITEM-BRD-8",
      name: "Tandoori Roti",
      category: "bread",
      price: 1.95,
      description: "Healthy whole wheat unleavened bread baked crisp in the clay tandoor.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Healthy",
      spiceLevel: "None",
      prepTime: "8 min",
      calories: "180 kcal",
      variants: [{ name: "Standard Roti", price: 1.95 }]
    },
    {
      id: "ITEM-BRD-9",
      name: "Puri",
      category: "bread",
      price: 1.49,
      description: "Golden puffed unleavened deep-fried Indian bread.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "None",
      prepTime: "6 min",
      calories: "170 kcal",
      variants: [{ name: "Standard Puri", price: 1.49 }]
    },
    {
      id: "ITEM-BRD-10",
      name: "Chapati",
      category: "bread",
      price: 1.50,
      description: "Traditional thin soft whole wheat flatbread made freshly on the hot plate.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "None",
      prepTime: "6 min",
      calories: "150 kcal",
      variants: [{ name: "Standard Chapati", price: 1.50 }]
    },

    // --- ENGLISH DISHES ---
    {
      id: "ITEM-ENG-1",
      name: "Chicken Omelette",
      category: "english-dishes",
      price: 6.90,
      description: "Fluffy seasoned egg omelette with tender chicken breast, served with golden chips and side salad.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Served with Chips & Salad",
      spiceLevel: "None",
      prepTime: "15 min",
      calories: "580 kcal",
      variants: [{ name: "With Chips & Salad", price: 6.90 }]
    },
    {
      id: "ITEM-ENG-2",
      name: "Mushroom Omelette",
      category: "english-dishes",
      price: 6.90,
      description: "Fresh egg omelette folded with sliced button mushrooms, served with chips and crisp salad.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Served with Chips & Salad",
      spiceLevel: "None",
      prepTime: "15 min",
      calories: "520 kcal",
      variants: [{ name: "With Chips & Salad", price: 6.90 }]
    },
    {
      id: "ITEM-ENG-3",
      name: "Scampi",
      category: "english-dishes",
      price: 6.90,
      description: "Breaded crispy wholetail scampi fried golden and served with chips, fresh lemon and salad.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Served with Chips & Salad",
      spiceLevel: "None",
      prepTime: "15 min",
      calories: "620 kcal",
      variants: [{ name: "With Chips & Salad", price: 6.90 }]
    },
    {
      id: "ITEM-ENG-4",
      name: "Chicken Nuggets",
      category: "english-dishes",
      price: 6.90,
      description: "Tender chicken breast nuggets fried until crispy golden, accompanied by chips and salad.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Served with Chips & Salad",
      spiceLevel: "None",
      prepTime: "12 min",
      calories: "590 kcal",
      variants: [{ name: "With Chips & Salad", price: 6.90 }]
    },
    {
      id: "ITEM-ENG-5",
      name: "Fish Fingers",
      category: "english-dishes",
      price: 6.90,
      description: "Breaded tender white fish fillets fried crisp and served with golden chips and side salad.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Served with Chips & Salad",
      spiceLevel: "None",
      prepTime: "12 min",
      calories: "560 kcal",
      variants: [{ name: "With Chips & Salad", price: 6.90 }]
    },

    // --- SUNDRIES & STARTERS ---
    {
      id: "ITEM-STR-1",
      name: "Plain Poppadom",
      category: "starters",
      price: 0.80,
      description: "Crispy, thin spiced lentil flat cracker fried fresh for crunch.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Essential",
      spiceLevel: "None",
      prepTime: "5 min",
      calories: "70 kcal",
      variants: [{ name: "1 Pc", price: 0.80 }]
    },
    {
      id: "ITEM-STR-2",
      name: "Chips",
      category: "starters",
      price: 2.70,
      description: "Generous portion of hot, golden crispy potato chips.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "None",
      prepTime: "8 min",
      calories: "380 kcal",
      variants: [{ name: "Portion", price: 2.70 }]
    },
    {
      id: "ITEM-STR-3",
      name: "Masala Chips",
      category: "starters",
      price: 3.50,
      description: "Crispy chips tossed in chef's signature tangy and fiery spice blend.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Spicy",
      spiceLevel: "Medium",
      prepTime: "10 min",
      calories: "410 kcal",
      variants: [{ name: "Portion", price: 3.50 }]
    },
    {
      id: "ITEM-STR-4",
      name: "Onion Bhaji",
      category: "starters",
      price: 3.90,
      description: "Crisp fried onion clusters bound in seasoned gram flour batter, served with fresh mint dip.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Popular Starter",
      spiceLevel: "Mild",
      prepTime: "12 min",
      calories: "280 kcal",
      variants: [{ name: "Portion (3 Pcs)", price: 3.90 }]
    },
    {
      id: "ITEM-STR-5",
      name: "Meat Samosa",
      category: "starters",
      price: 3.90,
      description: "Crispy golden triangular pastry stuffed with delicately spiced minced meat.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Classic",
      spiceLevel: "Medium",
      prepTime: "10 min",
      calories: "320 kcal",
      variants: [{ name: "Portion (2 Pcs)", price: 3.90 }]
    },
    {
      id: "ITEM-STR-6",
      name: "Chicken Tikka Starter",
      category: "starters",
      price: 4.50,
      description: "Boneless chicken chunks marinated in yoghurt and house tandoori spices, flame grilled.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Bestseller",
      spiceLevel: "Medium",
      prepTime: "15 min",
      calories: "340 kcal",
      variants: [{ name: "Starter Portion", price: 4.50 }]
    },
    {
      id: "ITEM-STR-7",
      name: "Seekh Kebab Starter",
      category: "starters",
      price: 4.50,
      description: "Minced lamb blended with herbs, ginger, garlic, and spices, skewered and grilled.",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Popular",
      spiceLevel: "Medium",
      prepTime: "15 min",
      calories: "360 kcal",
      variants: [{ name: "Starter Portion (2 Skewers)", price: 4.50 }]
    },
    {
      id: "ITEM-STR-8",
      name: "Chutney (Mango)",
      category: "starters",
      price: 0.80,
      description: "Sweet and tangy artisanal mango preserve dip.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "None",
      prepTime: "2 min",
      calories: "50 kcal",
      variants: [{ name: "Dip Cup", price: 0.80 }]
    },
    {
      id: "ITEM-STR-9",
      name: "Lime Pickle",
      category: "starters",
      price: 0.80,
      description: "Spicy and sour traditional Indian preserved lime pickle.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Spicy",
      spiceLevel: "Hot",
      prepTime: "2 min",
      calories: "45 kcal",
      variants: [{ name: "Dip Cup", price: 0.80 }]
    },
    {
      id: "ITEM-STR-10",
      name: "Chilli Pickle",
      category: "starters",
      price: 0.80,
      description: "Zesty green and red chilli pickle for extra heat.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Extra Hot",
      spiceLevel: "Hot",
      prepTime: "2 min",
      calories: "45 kcal",
      variants: [{ name: "Dip Cup", price: 0.80 }]
    },
    {
      id: "ITEM-STR-11",
      name: "Mint Sauce",
      category: "starters",
      price: 0.80,
      description: "Cooling spiced yoghurt dip with fresh garden mint and herbs.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "None",
      prepTime: "2 min",
      calories: "40 kcal",
      variants: [{ name: "Dip Cup", price: 0.80 }]
    },
    {
      id: "ITEM-STR-12",
      name: "Onion Salad",
      category: "starters",
      price: 0.80,
      description: "Diced crisp onions tossed with cucumber, fresh coriander, and lemon dressing.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "Mild",
      prepTime: "3 min",
      calories: "35 kcal",
      variants: [{ name: "Dip Cup", price: 0.80 }]
    },

    // --- DESSERTS & DRINKS ---
    {
      id: "ITEM-DES-1",
      name: "Chocolate Fudge Cake",
      category: "desserts",
      price: 3.50,
      description: "Decadent dark chocolate sponge layered with rich fudge icing.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Sweet Treat",
      spiceLevel: "None",
      prepTime: "5 min",
      calories: "420 kcal",
      variants: [{ name: "Slice", price: 3.50 }]
    },
    {
      id: "ITEM-DES-2",
      name: "Pineapple Fritter",
      category: "desserts",
      price: 3.50,
      description: "Sweet juicy pineapple ring fried in light golden batter and drizzled with syrup.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: "Special",
      spiceLevel: "None",
      prepTime: "8 min",
      calories: "310 kcal",
      variants: [{ name: "Serving", price: 3.50 }]
    },
    {
      id: "ITEM-STR-13",
      name: "Soft Drink Can (330ml)",
      category: "desserts",
      price: 1.50,
      description: "Chilled 330ml soda can (Pepsi, Diet Pepsi, 7Up, Tango).",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "None",
      prepTime: "2 min",
      calories: "140 kcal",
      variants: [
        { name: "Pepsi Can (330ml)", price: 1.50 },
        { name: "Diet Pepsi Can (330ml)", price: 1.50 },
        { name: "7Up Can (330ml)", price: 1.50 }
      ]
    },
    {
      id: "ITEM-STR-14",
      name: "Soft Drink Bottle (1.5L)",
      category: "desserts",
      price: 3.70,
      description: "Large 1.5L soft drink bottle for family dining.",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      isAvailable: true,
      badge: null,
      spiceLevel: "None",
      prepTime: "2 min",
      calories: "500 kcal",
      variants: [
        { name: "Pepsi Bottle (1.5L)", price: 3.70 },
        { name: "Diet Pepsi Bottle (1.5L)", price: 3.70 }
      ]
    }
  ],

  customers: [
    {
      id: "CUST-001",
      name: "Marcus Davies",
      phone: "07700 900123",
      email: "marcus.davies@example.com",
      address: "14 Meadow Croft, Leyland, Preston, PR25 2EX",
      totalOrders: 6,
      totalSpend: 168.40,
      lastOrderDate: "2026-10-31T20:15:00.000Z"
    },
    {
      id: "CUST-002",
      name: "Sarah Jenkins",
      phone: "07700 900456",
      email: "sarah.j@example.com",
      address: "28 Church Road, Leyland, PR25 3AA",
      totalOrders: 4,
      totalSpend: 114.80,
      lastOrderDate: "2026-10-31T19:40:00.000Z"
    },
    {
      id: "CUST-003",
      name: "Oliver Robinson",
      phone: "07700 900789",
      email: "oliver.r@example.com",
      address: "360 Leyland Lane Pickup Counter",
      totalOrders: 5,
      totalSpend: 98.50,
      lastOrderDate: "2026-10-31T18:25:00.000Z"
    },
    {
      id: "CUST-004",
      name: "Emma Watson",
      phone: "07700 900321",
      email: "emma.w@example.com",
      address: "7 Golden Hill Lane, Leyland, PR25 3NP",
      totalOrders: 3,
      totalSpend: 78.90,
      lastOrderDate: "2026-10-31T14:10:00.000Z"
    }
  ],

  orders: [
    {
      id: "SSR-1024",
      orderDate: "2026-10-31T20:15:00.000Z",
      customer: {
        name: "Marcus Davies",
        phone: "07700 900123",
        email: "marcus.davies@example.com",
        address: "14 Meadow Croft, Leyland, Preston, PR25 2EX",
        notes: "Ring bell twice, leave on porch if raining."
      },
      orderType: "delivery",
      status: "preparing",
      payment: {
        method: "online",
        status: "paid",
        transactionId: "TXN-EUR-884210",
        paymentGateway: "Simulated Card (Mastercard •••• 4012)"
      },
      items: [
        {
          id: "ITEM-SM-2",
          name: "Set Meal For 2 Person",
          variant: "Standard Set (2 Persons)",
          price: 26.95,
          quantity: 1,
          itemTotal: 26.95,
          isVeg: false
        },
        {
          id: "ITEM-STR-2",
          name: "Chips",
          variant: "Portion",
          price: 2.70,
          quantity: 1,
          itemTotal: 2.70,
          isVeg: true
        }
      ],
      pricing: {
        subtotal: 29.65,
        discount: 2.97,
        couponCode: "SEVENSTAR10",
        deliveryFee: 0,
        packagingCharge: 0.50,
        gst: 1.36,
        grandTotal: 28.54
      },
      statusTimeline: [
        { status: "placed", time: "2026-10-31T20:15:00.000Z", note: "Order placed online" },
        { status: "accepted", time: "2026-10-31T20:17:00.000Z", note: "Order confirmed by restaurant" },
        { status: "preparing", time: "2026-10-31T20:20:00.000Z", note: "Chef preparing tandoor and curries" }
      ]
    },
    {
      id: "SSR-1023",
      orderDate: "2026-10-31T19:40:00.000Z",
      customer: {
        name: "Sarah Jenkins",
        phone: "07700 900456",
        email: "sarah.j@example.com",
        address: "28 Church Road, Leyland, PR25 3AA",
        notes: "Medium spice please."
      },
      orderType: "delivery",
      status: "ready",
      payment: {
        method: "cod",
        status: "pending",
        transactionId: null,
        paymentGateway: "Cash on Delivery"
      },
      items: [
        {
          id: "ITEM-BIR-2",
          name: "Chicken Tikka Biryani",
          variant: "Standard Portion",
          price: 10.95,
          quantity: 1,
          itemTotal: 10.95,
          isVeg: false
        },
        {
          id: "ITEM-BRD-2",
          name: "Garlic Naan",
          variant: "Standard Naan",
          price: 2.90,
          quantity: 2,
          itemTotal: 5.80,
          isVeg: true
        },
        {
          id: "ITEM-DES-1",
          name: "Chocolate Fudge Cake",
          variant: "Slice",
          price: 3.50,
          quantity: 1,
          itemTotal: 3.50,
          isVeg: true
        }
      ],
      pricing: {
        subtotal: 20.25,
        discount: 2.00,
        couponCode: "WELCOME50",
        deliveryFee: 0,
        packagingCharge: 0.50,
        gst: 0.94,
        grandTotal: 19.69
      },
      statusTimeline: [
        { status: "placed", time: "2026-10-31T19:40:00.000Z", note: "Order placed online" },
        { status: "accepted", time: "2026-10-31T19:42:00.000Z", note: "Order confirmed" },
        { status: "preparing", time: "2026-10-31T19:45:00.000Z", note: "In kitchen" },
        { status: "ready", time: "2026-10-31T20:10:00.000Z", note: "Dispatched with driver" }
      ]
    },
    {
      id: "SSR-1022",
      orderDate: "2026-10-31T18:25:00.000Z",
      customer: {
        name: "Oliver Robinson",
        phone: "07700 900789",
        email: "oliver.r@example.com",
        address: "Seven Stars Takeaway Pickup Counter (360 Leyland Lane)",
        notes: "Counter pickup around 7:00 PM"
      },
      orderType: "pickup",
      status: "completed",
      payment: {
        method: "online",
        status: "paid",
        transactionId: "TXN-EUR-662319",
        paymentGateway: "Simulated Card (Visa •••• 4242)"
      },
      items: [
        {
          id: "ITEM-KR-4",
          name: "Chicken & Donner Mix",
          variant: "With Naan",
          price: 7.60,
          quantity: 2,
          itemTotal: 15.20,
          isVeg: false
        },
        {
          id: "ITEM-STR-13",
          name: "Soft Drink Can (330ml)",
          variant: "Pepsi Can (330ml)",
          price: 1.50,
          quantity: 2,
          itemTotal: 3.00,
          isVeg: true
        }
      ],
      pricing: {
        subtotal: 18.20,
        discount: 0,
        couponCode: null,
        deliveryFee: 0,
        packagingCharge: 0,
        gst: 0.91,
        grandTotal: 19.11
      },
      statusTimeline: [
        { status: "placed", time: "2026-10-31T18:25:00.000Z", note: "Order placed" },
        { status: "accepted", time: "2026-10-31T18:27:00.000Z", note: "Order accepted" },
        { status: "preparing", time: "2026-10-31T18:30:00.000Z", note: "Prepared in kitchen" },
        { status: "ready", time: "2026-10-31T18:50:00.000Z", note: "Ready at pickup counter" },
        { status: "completed", time: "2026-10-31T19:10:00.000Z", note: "Handed over to customer" }
      ]
    },
    {
      id: "SSR-1021",
      orderDate: "2026-10-31T14:10:00.000Z",
      customer: {
        name: "Emma Watson",
        phone: "07700 900321",
        email: "emma.w@example.com",
        address: "7 Golden Hill Lane, Leyland, PR25 3NP",
        notes: "Leave with security desk."
      },
      orderType: "delivery",
      status: "completed",
      payment: {
        method: "online",
        status: "paid",
        transactionId: "TXN-EUR-441209",
        paymentGateway: "Simulated Online Banking"
      },
      items: [
        {
          id: "ITEM-CUR-1",
          name: "Chicken Tikka Masala",
          variant: "Standard Portion",
          price: 9.95,
          quantity: 1,
          itemTotal: 9.95,
          isVeg: false
        },
        {
          id: "ITEM-RIC-2",
          name: "Pilau Rice",
          variant: "Portion",
          price: 2.90,
          quantity: 1,
          itemTotal: 2.90,
          isVeg: true
        },
        {
          id: "ITEM-BRD-3",
          name: "Garlic & Cheese Naan",
          variant: "Standard Naan",
          price: 3.50,
          quantity: 1,
          itemTotal: 3.50,
          isVeg: true
        }
      ],
      pricing: {
        subtotal: 16.35,
        discount: 1.64,
        couponCode: "SEVENSTAR10",
        deliveryFee: 0,
        packagingCharge: 0.50,
        gst: 0.76,
        grandTotal: 15.97
      },
      statusTimeline: [
        { status: "placed", time: "2026-10-31T14:10:00.000Z", note: "Order placed" },
        { status: "accepted", time: "2026-10-31T14:12:00.000Z", note: "Order accepted" },
        { status: "preparing", time: "2026-10-31T14:15:00.000Z", note: "Kitchen preparation" },
        { status: "ready", time: "2026-10-31T14:40:00.000Z", note: "Out for delivery" },
        { status: "completed", time: "2026-10-31T15:05:00.000Z", note: "Delivered successfully" }
      ]
    }
  ],

  staff: [
    {
      id: "STAFF-001",
      name: "Chef Rajeshwar Rao",
      email: "admin@sevenstar.com",
      role: "admin",
      title: "General Manager & Executive Chef",
      phone: "01772 457 008",
      status: "active",
      lastLogin: "2026-10-31T21:45:00Z"
    },
    {
      id: "STAFF-002",
      name: "Pooja Sharma",
      email: "staff@sevenstar.com",
      role: "staff",
      title: "Order Dispatch & Guest Host",
      phone: "01772 457 838",
      status: "active",
      lastLogin: "2026-10-31T20:10:00Z"
    }
  ],

  reservations: []
};

// Freeze seed data so it cannot be mutated accidentally in memory
if (typeof Object.freeze === "function") {
  Object.freeze(SEED_DATA);
}

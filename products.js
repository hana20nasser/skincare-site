// Lumière – Products Catalogue
const products = [
    // ── CLEANSERS ──────────────────────────────────────────────────────────
    {
        id: 1,
        name: "Anne Semonin Gentle Purifying Gel Cleanser",
        category: "cleanser",
        price: 38.00,
        rating: 4.8,
        reviews: 112,
        image: "images/Anne Semonin Gentle Purifying Gel Cleanser.jpg",
        description: "A gentle gel cleanser that purifies and refreshes without stripping the skin's natural moisture barrier.",
        ingredients: "Aloe Vera, Chamomile Extract, Glycerin, Panthenol",
        skinType: "all",
        featured: true
    },
    {
        id: 2,
        name: "Ela De Pure Gentle Gel Wash",
        category: "cleanser",
        price: 26.00,
        rating: 4.7,
        reviews: 88,
        image: "images/Ela De Pure Gentle Gel Wash.jpg",
        description: "A mild pH-balanced gel wash that removes impurities while preserving the skin's protective barrier.",
        ingredients: "Ceramides, Hyaluronic Acid, Centella Asiatica",
        skinType: "sensitive",
        featured: false
    },
    {
        id: 3,
        name: "Mitudo Skin Balance Cleanser",
        category: "cleanser",
        price: 29.00,
        rating: 4.6,
        reviews: 74,
        image: "images/Mitudo Skin Balance Cleanser.jpg",
        description: "Balances oily zones while hydrating dry areas — perfect for combination skin.",
        ingredients: "Niacinamide, Green Tea, Willow Bark Extract",
        skinType: "combination",
        featured: false
    },

    // ── SERUMS & ESSENCES ──────────────────────────────────────────────────
    {
        id: 4,
        name: "IPrime C-Prime Brightening Serum",
        category: "serum",
        price: 52.00,
        rating: 4.9,
        reviews: 231,
        image: "images/IPrime C-Prime Brightening Serum.jpg",
        description: "A powerful Vitamin C brightening serum that fades dark spots and boosts radiance from within.",
        ingredients: "Vitamin C 15%, Ferulic Acid, Vitamin E, Niacinamide",
        skinType: "all",
        featured: true
    },
    {
        id: 5,
        name: "Niacinamide Skin Refining Serum",
        category: "serum",
        price: 34.00,
        rating: 4.8,
        reviews: 189,
        image: "images/Niacinamide Skin Refining Serum.jpg",
        description: "Minimizes pores, controls sebum, and evens skin tone with 10% pure Niacinamide.",
        ingredients: "Niacinamide 10%, Zinc PCA, Hyaluronic Acid",
        skinType: "oily",
        featured: true
    },
    {
        id: 6,
        name: "Ela De Pure Retinol Repair Serum",
        category: "serum",
        price: 59.00,
        rating: 4.7,
        reviews: 143,
        image: "images/Ela De Pure Retinol Repair Serum.jpg",
        description: "A gentle 0.3% Retinol serum that smooths fine lines and renews skin texture overnight.",
        ingredients: "Retinol 0.3%, Squalane, Peptides, Bakuchiol",
        skinType: "dry",
        featured: false
    },
    {
        id: 7,
        name: "Mizon Peptide 500 Ampoule",
        category: "serum",
        price: 41.00,
        rating: 4.8,
        reviews: 167,
        image: "images/Mizon Peptide 500 Ampoule.jpg",
        description: "A concentrated peptide ampoule that firms skin and visibly reduces expression lines.",
        ingredients: "Peptide Complex 500ppm, Adenosine, Collagen",
        skinType: "dry",
        featured: false
    },
    {
        id: 8,
        name: "Mixsoon Ginseng Renewal Essence",
        category: "serum",
        price: 47.00,
        rating: 4.9,
        reviews: 204,
        image: "images/Mixsoon Ginseng Renewal Essence.jpg",
        description: "A luxurious ginseng-infused essence that energizes dull skin and promotes cellular renewal.",
        ingredients: "Ginseng Root Extract, Fermented Saccharomyces, Adenosine",
        skinType: "all",
        featured: true
    },
    {
        id: 9,
        name: "The Ordinary Dynamic Expression Lines Serum",
        category: "serum",
        price: 22.00,
        rating: 4.5,
        reviews: 312,
        image: "images/The Ordinary Dynamic Expression Lines Serum.jpg",
        description: "A targeted treatment for dynamic expression lines using peptide technology.",
        ingredients: "Argireline Solution, Leuphasyl, SNAP-8",
        skinType: "all",
        featured: false
    },

    // ── MOISTURIZERS ──────────────────────────────────────────────────────
    {
        id: 10,
        name: "Lady Hydrating Glow Cream",
        category: "moisturizer",
        price: 43.00,
        rating: 4.8,
        reviews: 198,
        image: "images/Lady Hydrating Glow Cream.jpg",
        description: "A dewy, lightweight cream that floods skin with hydration and delivers a lit-from-within glow.",
        ingredients: "Hyaluronic Acid, Squalane, Rose Hip Oil, Ceramides",
        skinType: "dry",
        featured: true
    },
    {
        id: 11,
        name: "Farm Stay V8 Hyaluronic Acid Cream",
        category: "moisturizer",
        price: 31.00,
        rating: 4.7,
        reviews: 145,
        image: "images/Farm Stay V8 Hyaluronic Acid Cream.jpg",
        description: "8-type Hyaluronic Acid complex delivers multi-depth hydration that lasts all day.",
        ingredients: "Hyaluronic Acid Complex (8 types), Ceramides, Panthenol",
        skinType: "all",
        featured: false
    },
    {
        id: 12,
        name: "Dr.Ceuracle Skin Barrier Gel Cream",
        category: "moisturizer",
        price: 48.00,
        rating: 4.9,
        reviews: 221,
        image: "images/Dr.Ceuracle Skin Barrier Gel Cream.jpg",
        description: "A gel-cream formula that repairs the skin barrier and soothes reactive skin instantly.",
        ingredients: "Centella Asiatica, Ceramide NP, Madecassoside, Cica",
        skinType: "sensitive",
        featured: true
    },
    {
        id: 13,
        name: "SKIN1004 Centella Calming Cream",
        category: "moisturizer",
        price: 29.00,
        rating: 4.8,
        reviews: 276,
        image: "images/SKIN1004 Centella Calming Cream.jpg",
        description: "Pure Madagascar Centella soothes redness and irritation while rebuilding the moisture barrier.",
        ingredients: "Centella Asiatica 100%, Madecassoside, Asiaticoside",
        skinType: "sensitive",
        featured: false
    },
    {
        id: 14,
        name: "Nuance Firming Day Cream",
        category: "moisturizer",
        price: 55.00,
        rating: 4.7,
        reviews: 132,
        image: "images/Nuance Firming Day Cream.jpg",
        description: "A firming day cream with collagen-boosting actives that lift and plump for a youthful complexion.",
        ingredients: "Collagen Peptides, Retinyl Palmitate, Vitamin C, Shea Butter",
        skinType: "dry",
        featured: true
    },

    // ── SUN CARE ──────────────────────────────────────────────────────────
    {
        id: 15,
        name: "Missha Aqua Sun Essence SPF45",
        category: "sunscreen",
        price: 27.00,
        rating: 4.9,
        reviews: 389,
        image: "images/Missha Aqua Sun Essence SPF45.jpg",
        description: "A watery-light SPF45 PA+++ essence that feels invisible on skin and hydrates all day.",
        ingredients: "Niacinamide, Hyaluronic Acid, Aloe Vera, Ethylhexyl Methoxycinnamate",
        skinType: "all",
        featured: true
    },
    {
        id: 16,
        name: "S One Daily UV Sun Cream SPF50",
        category: "sunscreen",
        price: 24.00,
        rating: 4.7,
        reviews: 214,
        image: "images/S One Daily UV Sun Cream SPF50.jpg",
        description: "Lightweight SPF50 PA++++ daily shield with zero white cast — suitable for all skin tones.",
        ingredients: "Zinc Oxide, Titanium Dioxide, Niacinamide, Birch Sap",
        skinType: "all",
        featured: false
    },
    {
        id: 17,
        name: "Paradox Oil-Control Tinted Sunscreen",
        category: "sunscreen",
        price: 33.00,
        rating: 4.8,
        reviews: 176,
        image: "images/Paradox Oil-Control Tinted Sunscreen.jpg",
        description: "A tinted SPF50 sunscreen that controls shine and provides natural coverage throughout the day.",
        ingredients: "Silica, Niacinamide, Micro Powder, Iron Oxides",
        skinType: "oily",
        featured: false
    },
    {
        id: 18,
        name: "EOBIÔ Hydrating Sun Block SPF50",
        category: "sunscreen",
        price: 36.00,
        rating: 4.6,
        reviews: 98,
        image: "images/EOBI\u00d4 Hydrating Sun Block SPF50.jpg",
        description: "A deeply hydrating SPF50 block that protects and nourishes in one step.",
        ingredients: "Ceramides, Hyaluronic Acid, Glycerin, UV Filters",
        skinType: "dry",
        featured: false
    },

    // ── TONERS ────────────────────────────────────────────────────────────
    {
        id: 19,
        name: "I'm From Rice Toner",
        category: "toner",
        price: 38.00,
        rating: 4.9,
        reviews: 342,
        image: "images/I'm From Rice Toner.jpg",
        description: "77.78% rice extract brightens, nourishes, and softens skin with every swipe.",
        ingredients: "Rice Extract 77.78%, Niacinamide, Adenosine, Panthenol",
        skinType: "all",
        featured: true
    },
    {
        id: 20,
        name: "SKIN1004 Centella Soothing Toner",
        category: "toner",
        price: 25.00,
        rating: 4.8,
        reviews: 263,
        image: "images/SKIN1004 Centella Soothing Toner.jpg",
        description: "A calming water toner that instantly relieves redness and preps skin for layering.",
        ingredients: "Centella Asiatica Extract, Madecassoside, Allantoin",
        skinType: "sensitive",
        featured: false
    },
    {
        id: 21,
        name: "The Ordinary Exfoliating Glycolic Toner 7%",
        category: "toner",
        price: 18.00,
        rating: 4.6,
        reviews: 445,
        image: "images/The Ordinary Exfoliating Glycolic Toner 7%.jpg",
        description: "7% Glycolic Acid toner that resurfaces, brightens, and unclogs pores gently.",
        ingredients: "Glycolic Acid 7%, Ginseng Root Extract, Aloe Vera",
        skinType: "oily",
        featured: false
    },

    // ── MASKS ─────────────────────────────────────────────────────────────
    {
        id: 22,
        name: "Besoma EGF Glow Brightening Mask",
        category: "mask",
        price: 36.00,
        rating: 4.8,
        reviews: 119,
        image: "images/Besoma EGF Glow Brightening Mask.jpg",
        description: "An EGF-infused sheet mask that boosts cell renewal and delivers an instant glass-skin glow.",
        ingredients: "EGF (Epidermal Growth Factor), Niacinamide, Centella",
        skinType: "all",
        featured: false
    },
    {
        id: 23,
        name: "Ela De Pure Snail Renewal Mask",
        category: "mask",
        price: 28.00,
        rating: 4.7,
        reviews: 94,
        image: "images/Ela De Pure Snail Renewal Mask.jpg",
        description: "Snail mucin-rich mask that repairs damaged skin and leaves it visibly smoother overnight.",
        ingredients: "Snail Secretion Filtrate 80%, Peptides, Ceramides",
        skinType: "dry",
        featured: false
    },

    // ── BODY CARE ─────────────────────────────────────────────────────────
    {
        id: 24,
        name: "Beauty Pie Skin Recovery Night Oil",
        category: "body",
        price: 44.00,
        rating: 4.8,
        reviews: 87,
        image: "images/Beauty Pie Skin Recovery Night Oil.jpg",
        description: "A luxurious botanical night oil that deeply nourishes and restores skin while you sleep.",
        ingredients: "Rosehip Oil, Squalane, Marula Oil, Vitamin E",
        skinType: "dry",
        featured: false
    },
    {
        id: 25,
        name: "Plantadea Sensitive Skin Repair Oil",
        category: "body",
        price: 39.00,
        rating: 4.7,
        reviews: 73,
        image: "images/Plantadea Sensitive Skin Repair Oil.jpg",
        description: "A calming plant-based repair oil formulated for sensitive and reactive skin types.",
        ingredients: "Jojoba Oil, Chamomile Extract, Sea Buckthorn, Vitamin E",
        skinType: "sensitive",
        featured: false
    },
    {
        id: 26,
        name: "Faberlic Ideal Body Sculpt Cream",
        category: "body",
        price: 32.00,
        rating: 4.5,
        reviews: 61,
        image: "images/Faberlic Ideal Body Sculpt Cream.jpg",
        description: "A firming body cream that tightens and sculpts skin with regular use.",
        ingredients: "Caffeine, L-Carnitine, Hyaluronic Acid, Aloe Vera",
        skinType: "all",
        featured: false
    },
    {
        id: 27,
        name: "Emporio Armani Sensual Body Wash",
        category: "body",
        price: 48.00,
        rating: 4.6,
        reviews: 55,
        image: "images/Emporio Armani Sensual Body Wash.jpg",
        description: "A luxurious, sensual body wash that cleanses and perfumes skin with a lingering fragrance.",
        ingredients: "Moisturizing Complex, Vitamin E, Floral Extracts",
        skinType: "all",
        featured: false
    },
    {
        id: 28,
        name: "Nécessaire Hydrating Body Lotion",
        category: "body",
        price: 35.00,
        rating: 4.8,
        reviews: 204,
        image: "images/N\u00e9cessaire Hydrating Body Lotion.jpg",
        description: "A clean, science-backed body lotion packed with vitamins and niacinamide for silky skin.",
        ingredients: "Niacinamide, Vitamin C, Vitamin E, AHA, Ceramides",
        skinType: "all",
        featured: false
    },

    // ── HAIR CARE ─────────────────────────────────────────────────────────
    {
        id: 29,
        name: "Ela De Pure Deep Clean Shampoo",
        category: "hair",
        price: 23.00,
        rating: 4.6,
        reviews: 131,
        image: "images/Ela De Pure Deep Clean Shampoo.jpg",
        description: "A deep-cleansing shampoo that removes buildup, balances scalp, and leaves hair silky.",
        ingredients: "Salicylic Acid, Biotin, Panthenol, Tea Tree Oil",
        skinType: "all",
        featured: false
    },

    // ── HAND CARE ─────────────────────────────────────────────────────────
    {
        id: 30,
        name: "Lernberger Stafsing Silky Hand Lotion",
        category: "hand",
        price: 19.00,
        rating: 4.7,
        reviews: 167,
        image: "images/Lernberger Stafsing Silky Hand Lotion.jpg",
        description: "A fast-absorbing silky hand lotion that softens and protects hands without greasiness.",
        ingredients: "Shea Butter, Glycerin, Vitamin E, Ceramides",
        skinType: "all",
        featured: false
    },
    {
        id: 31,
        name: "Hydrating Antibacterial Hand Gel",
        category: "hand",
        price: 12.00,
        rating: 4.5,
        reviews: 88,
        image: "images/Hydrating Antibacterial Hand Gel.jpg",
        description: "A moisturizing antibacterial gel that sanitizes while keeping hands soft and hydrated.",
        ingredients: "Aloe Vera, Glycerin, Ethanol 70%, Vitamin E",
        skinType: "all",
        featured: false
    },

    // ── POWDER / FINISH ───────────────────────────────────────────────────
    {
        id: 32,
        name: "Innisfree Soft Blur Powder",
        category: "powder",
        price: 21.00,
        rating: 4.7,
        reviews: 223,
        image: "images/Innisfree Soft Blur Powder.jpg",
        description: "A featherlight setting powder that blurs pores and controls shine for a matte-velvet finish.",
        ingredients: "Kaolin, Silica, Jeju Green Tea, Mica",
        skinType: "oily",
        featured: false
    },

    // ── LIP CARE ─────────────────────────────────────────────────────────
    {
        id: 33,
        name: "Laneige Berry Lip Sleeping Mask",
        category: "lip",
        price: 24.00,
        rating: 4.9,
        reviews: 512,
        image: "images/Laneige Berry Lip Sleeping Mask.jpg",
        description: "The cult-favourite overnight lip mask that repairs and plumps lips while you sleep.",
        ingredients: "Berry Mix Complex, Hyaluronic Acid, Vitamin C, Shea Butter",
        skinType: "all",
        featured: true
    }
];
module.exports = products;

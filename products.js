// Anua Product Catalog Data
const ANUA_PRODUCTS = [
  {
    id: "anua-gua-sha-cream",
    name: "Collagen Retinol Refining Gua Sha Cream",
    category: "RETINOL COLLECTION",
    tags: ["NEW", "SPECIAL FREE GIFT"],
    price: 35.00,
    originalPrice: 42.00,
    rating: 4.9,
    reviewsCount: 38,
    image: "./assets/anua_gua_sha_cream.jpg",
    volume: "50ml / 1.69 fl. oz.",
    badgeType: "purple",
    featuredHero: true,
    isBestseller: true,
    description: "Visibly firming and refining face cream with integrated ergonomic ceramic Gua Sha applicator. Formulated with low-molecular collagen, micro-encapsulated pure retinol, and adenosine to lift, contour, and sculpt facial lines effortlessly.",
    ingredients: "Micro-encapsulated Retinol 0.1%, Low-Molecular Marine Collagen, Adenosine, Niacinamide, Shea Butter, Centella Asiatica.",
    benefits: [
      "Built-in ergonomic Gua Sha sculpting head",
      "Visibly tightens jawline and nasolabial folds",
      "Deep moisture replenishment with marine collagen",
      "Gentle micro-dosed retinol for zero downtime"
    ],
    usage: "Gently squeeze tube to dispense a nickel-sized amount onto the ceramic head. Massage in upward sweeping strokes along jawline, cheekbones, and neck every evening."
  },
  {
    id: "anua-eye-patch",
    name: "Retinol Berry Revitalizing Eye Patch",
    category: "RETINOL COLLECTION",
    tags: ["NEW DROP", "TIKTOK VIRAL"],
    price: 30.00,
    originalPrice: 38.00,
    rating: 5.0,
    reviewsCount: 7,
    image: "./assets/anua_eye_patch.jpg",
    volume: "60 Patches | 90g e",
    badgeType: "black",
    featuredHero: true,
    isBestseller: true,
    description: "Cooling hydrogel eye patches soaked in concentrated Retinol, Wild Berry Antioxidant Complex, and Multi-Peptides. Instantly depuffs under-eye bags, brightens stubborn dark circles, and hydrates tired eyes.",
    ingredients: "Pure Retinol, Wild Cranberry Extract, Blueberry Fruit Extract, 5-Peptide Complex, Hyaluronic Acid, Allantoin.",
    benefits: [
      "Instantly cools and reduces morning puffiness",
      "Fades dark circles and under-eye discoloration",
      "Melts fine lines with gentle retinoid infusion",
      "Anti-slip hydrogel hugs eye contours firmly"
    ],
    usage: "Use the enclosed spatula to lift a patch and apply under each eye for 15-20 minutes. Tap remaining essence into skin until fully absorbed."
  },
  {
    id: "anua-retinol-serum",
    name: "Retinol 0.3+ Niacin Renewing Serum",
    category: "RETINOL COLLECTION",
    tags: ["TIKTOK VIRAL", "BEST SELLER"],
    price: 35.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviewsCount: 1420,
    image: "./assets/anua_retinol_hero.jpg",
    volume: "30ml / 1.01 fl. oz.",
    badgeType: "purple",
    featuredHero: false,
    isBestseller: true,
    description: "Potent 0.3% pure stabilized retinol combined with 5% Niacinamide and soothing ceramides for comprehensive overnight skin resurfacing, pore tightening, and radiant barrier renewal.",
    ingredients: "Stabilized Retinol 0.3%, Niacinamide 5%, Ceramide NP, Panthenol (Vitamin B5), Tocopherol (Vitamin E).",
    benefits: [
      "Accelerates skin cell renewal overnight",
      "Smooths bumpy texture and unclogs stubborn pores",
      "Minimizes post-acne dark marks and hyperpigmentation",
      "Barrier-safe formula buffered with ceramides"
    ],
    usage: "Apply 2-3 drops to dry, cleansed skin 2-3 times per week initially, building up to nightly use. Follow with moisturizer and always wear sunscreen."
  },
  {
    id: "anua-glass-skin-set",
    name: "7 Day Korean Glass Skin Routine Set",
    category: "VALUE SETS",
    tags: ["SAVE 22%", "BEST SELLER", "SPECIAL FREE GIFT"],
    price: 136.00,
    originalPrice: 175.00,
    rating: 5.0,
    reviewsCount: 2944,
    image: "./assets/anua_glass_skin_set.jpg",
    volume: "Full-Size 4-Piece Box",
    badgeType: "gold",
    featuredHero: false,
    isBestseller: true,
    description: "The viral Korean glass skin routine celebrated worldwide: Heartleaf 77% Soothing Toner (250ml), Niacinamide 10% + TXA 4% Dark Spot Serum (30ml), Heartleaf Pore Cleansing Oil (200ml), and Heartleaf 70% Intense Calming Cream (50ml).",
    ingredients: "77% Korean Heartleaf Extract, 10% Niacinamide, 4% Tranexamic Acid, Jojoba Seed Oil, Ceramide NP.",
    benefits: [
      "TikTok's #1 viral Korean skincare regimen",
      "Calms redness, irritation, and breakouts within 24 hours",
      "Dissolves stubborn blackheads and sebum plugs",
      "Fades hyperpigmentation and produces luminescent glass skin"
    ],
    usage: "Step 1: Oil cleanse with Cleansing Oil. Step 2: Hydrate and balance with 77% Toner. Step 3: Treat with Dark Spot Serum. Step 4: Lock in moisture with Calming Cream."
  },
  {
    id: "anua-pdrn-glow-set",
    name: "PDRN Plump & Dewy Glow Set",
    category: "VIRAL PDRN",
    tags: ["SAVE 31%", "38% OFF WITH CODE", "SPECIAL FREE GIFT"],
    price: 91.00,
    originalPrice: 132.00,
    rating: 4.9,
    reviewsCount: 223,
    image: "./assets/anua_pdrn_glow_set.jpg",
    volume: "3-Piece Hydration Vault",
    badgeType: "cyan",
    featuredHero: false,
    isBestseller: true,
    description: "Salmon DNA PDRN & multi-molecular Hyaluronic Acid power duo for cellular plumping, bouncy volume, and incandescent dewiness. Includes PDRN Hyaluronic Serum (30ml), PDRN Plumping Toner Mist (150ml), and Gentle Barrier Cream (50ml).",
    ingredients: "Salmon PDRN (Sodium DNA), 8-tier Multi-Molecular Hyaluronic Acid, Beta-Glucan, Squalane, Ceramide Complex.",
    benefits: [
      "Stimulates natural skin repair at cellular level",
      "Plumps hollow contours and fine dehydration lines",
      "Delivers high-gloss, wet-dew skin finish",
      "Strengthens compromised skin barrier"
    ],
    usage: "Mist face generously with PDRN Toner, apply 3 drops of PDRN Serum, and seal with Gentle Barrier Cream morning and night."
  },
  {
    id: "anua-cleansing-duo",
    name: "Double Cleansing Duo Set",
    category: "VALUE SETS",
    tags: ["SAVE 47%", "BEST SELLER"],
    price: 60.00,
    originalPrice: 114.00,
    rating: 4.9,
    reviewsCount: 1143,
    image: "./assets/anua_cleansing_duo.jpg",
    volume: "200ml Oil + 150ml Foam",
    badgeType: "gold",
    featuredHero: false,
    isBestseller: true,
    description: "The gold-standard Korean double cleansing method: Heartleaf Pore Cleansing Oil melts waterproof makeup, sunscreen, and blackheads; followed by Heartleaf Quercetinol Deep Cleansing Foam to purify pores without stripping.",
    ingredients: "Heartleaf Extract, Quercetinol, Jojoba Seed Oil, Macadamia Ternifolia Seed Oil, Salicylic Acid 0.5%.",
    benefits: [
      "Dissolves 99.8% of daily makeup, sunscreen, and sebum",
      "Clinically proven to clear pore congestion in 1 week",
      "Non-comedogenic and hypoallergenic tested",
      "Zero tight or dry feeling after washing"
    ],
    usage: "Pump cleansing oil onto dry palms and massage onto dry face for 60 seconds. Emulsify with warm water and rinse. Follow with a pea-sized amount of foam cleanser."
  },
  {
    id: "anua-viral-pdrn-5step",
    name: "Viral PDRN 5-Step Routine Set",
    category: "VIRAL PDRN",
    tags: ["SAVE 12%", "SPECIAL FREE GIFT"],
    price: 122.00,
    originalPrice: 138.00,
    rating: 4.9,
    reviewsCount: 176,
    image: "./assets/anua_pdrn_glow_set.jpg",
    volume: "5-Step Routine Vault",
    badgeType: "cyan",
    featuredHero: false,
    isBestseller: false,
    description: "The ultimate salon-grade Korean regenerative ritual in a box. Packed with low-molecular salmon PDRN, epidermal growth peptides, and fermented botanicals to firm, rebuild, and re-cushion thinning or stressed skin.",
    ingredients: "Salmon PDRN 2%, Copper Tripeptide-1, Centella Asiatica, Acetyl Hexapeptide-8, Niacinamide.",
    benefits: [
      "Clinical clinic-grade skin elasticity revival",
      "Deep cellular renewal with salmon DNA peptides",
      "Restores supple bounce and natural luminosity",
      "Dermatologically tested for ultra-sensitive skin"
    ],
    usage: "Follow steps 1 through 5: Cleanser -> Toner Mist -> PDRN Serum -> Eye Cream -> Moisture Seal."
  },
  {
    id: "anua-deep-hydration-set",
    name: "Fall into Deep Hydration Set",
    category: "VALUE SETS",
    tags: ["SAVE 27%", "34% OFF WITH CODE", "SPECIAL FREE GIFT"],
    price: 120.00,
    originalPrice: 149.00,
    rating: 4.9,
    reviewsCount: 2091,
    image: "./assets/anua_glass_skin_set.jpg",
    volume: "4-Piece Set + Sheet Masks",
    badgeType: "gold",
    featuredHero: false,
    isBestseller: false,
    description: "Intensive rescue bundle engineered for thirsty, winter-parched skin. Floods the epidermal layers with deep bio-compatible moisture, birch sap, and soothing heartleaf extracts.",
    ingredients: "Japanese White Birch Sap 70%, 10-Layer Hyaluronic Acid, Heartleaf Extract, Ceramide NP.",
    benefits: [
      "Restores 24-hour continuous skin moisture reserve",
      "Eliminates dry flaking and tight makeup patchiness",
      "Cooling, comforting cushion feel on contact",
      "Safe for eczema-prone and reactive skin"
    ],
    usage: "Layer generously day and night to lock in long-lasting moisture barrier health."
  }
];

// Diagnostic Comparison Data
const ANUA_COMPARISON_DATA = [
  {
    attribute: "Target Concern",
    guaSha: "Loss of Firmness & Sculpting",
    eyePatch: "Dark Circles & Under-Eye Bags",
    glassSkin: "Redness, Breakouts & Texture",
    pdrnSet: "Dullness, Thinning & Dehydration",
    cleansingDuo: "Clogged Pores & Blackheads"
  },
  {
    attribute: "Hero Actives",
    guaSha: "Retinol + Marine Collagen",
    eyePatch: "Retinol + Wild Berry + Peptides",
    glassSkin: "Heartleaf 77% + Niacinamide 10%",
    pdrnSet: "Salmon DNA PDRN + 8x Hyaluronic",
    cleansingDuo: "Heartleaf Extract + Jojoba Oil"
  },
  {
    attribute: "Key Benefit",
    guaSha: "Firms, contours jawline & neck",
    eyePatch: "Cools, depuffs & illuminates eyes",
    glassSkin: "Luminous glass skin with clear pores",
    pdrnSet: "Cellular plumping & dewy radiance",
    cleansingDuo: "Melt makeup & dissolve blackheads"
  },
  {
    attribute: "Skin Type",
    guaSha: "All Skin Types, Mature Skin",
    eyePatch: "All Skin Types, Tired Eyes",
    glassSkin: "Sensitive, Acne-prone, Oily/Comb",
    pdrnSet: "Dry, Dehydrated, Aging Skin",
    cleansingDuo: "All Skin Types & Clogged Pores"
  },
  {
    attribute: "Routine Step",
    guaSha: "Night Cream & Massage",
    eyePatch: "Targeted 15-Min Eye Treatment",
    glassSkin: "Complete 4-Step Regimen",
    pdrnSet: "Hydrating & Plumping Ritual",
    cleansingDuo: "Daily AM/PM Cleanse"
  },
  {
    attribute: "Cruelty-Free / Clean",
    guaSha: "✓ 100% Certified Clean",
    eyePatch: "✓ 100% Certified Clean",
    glassSkin: "✓ 100% Certified Clean",
    pdrnSet: "✓ 100% Certified Clean",
    cleansingDuo: "✓ 100% Certified Clean"
  }
];

// Reviews Data
const ANUA_REVIEWS = [
  {
    author: "Elena M.",
    product: "Collagen Retinol Refining Gua Sha Cream",
    rating: 5,
    title: "The built-in Gua Sha head is genius!",
    content: "I was skeptical about a cream with an applicator, but this is a game changer. The cold ceramic head feels incredible along my jawline, and after 2 weeks my skin is visibly firmer and smoother without peeling.",
    verified: true,
    date: "September 2026"
  },
  {
    author: "Sarah K.",
    product: "7 Day Korean Glass Skin Routine Set",
    rating: 5,
    title: "Literally transformed my stubborn acne scars",
    content: "The 77% toner plus dark spot serum gave me the actual Korean glass skin glow I thought was only possible with filters. My redness subsided almost immediately.",
    verified: true,
    date: "August 2026"
  },
  {
    author: "Chloe T.",
    product: "PDRN Plump & Dewy Glow Set",
    rating: 5,
    title: "Plumpest, bounciest skin of my life",
    content: "The salmon PDRN serum is pure magic. It glides on like liquid silk and plumps up my smile lines instantly. My foundation doesn't crease anymore.",
    verified: true,
    date: "September 2026"
  },
  {
    author: "Hannah W.",
    product: "Retinol Berry Revitalizing Eye Patch",
    rating: 5,
    title: "Bye bye morning puffiness",
    content: "I keep these in the fridge and put them on while drinking my morning matcha. Dark circles fade within 15 minutes and the skin feels so firm and refreshed.",
    verified: true,
    date: "September 2026"
  }
];

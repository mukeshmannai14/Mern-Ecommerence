const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();

const products = [
  // ==============================
  // ELECTRONICS
  // ==============================

  {
    name: "Wireless Gaming Mouse",
    description: "High precision wireless gaming mouse with ergonomic design.",
    price: 1499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
    stock: 50,
  },
  {
    name: "Mechanical Gaming Keyboard",
    description: "RGB mechanical keyboard designed for gaming and productivity.",
    price: 2999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    stock: 35,
  },
  {
    name: "Wireless Headphones",
    description: "Comfortable wireless headphones with immersive sound.",
    price: 2499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    stock: 40,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with powerful audio output.",
    price: 1999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    stock: 30,
  },
  {
    name: "Smart LED Monitor",
    description: "Full HD LED monitor suitable for work, gaming and entertainment.",
    price: 8999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    stock: 20,
  },

  // ==============================
  // MOBILES
  // ==============================

  {
    name: "Smartphone Pro X",
    description: "Modern smartphone with powerful performance and premium display.",
    price: 34999,
    category: "Mobiles",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    stock: 25,
  },
  {
    name: "Smartphone Lite",
    description: "Affordable smartphone with a large display and long battery life.",
    price: 14999,
    category: "Mobiles",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    stock: 45,
  },
  {
    name: "Premium Android Phone",
    description: "Premium Android smartphone with advanced camera features.",
    price: 42999,
    category: "Mobiles",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    stock: 18,
  },
  {
    name: "5G Performance Phone",
    description: "Fast 5G smartphone built for performance and entertainment.",
    price: 27999,
    category: "Mobiles",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8",
    stock: 32,
  },
  {
    name: "Compact Smartphone",
    description: "Compact smartphone with stylish design and excellent camera.",
    price: 18999,
    category: "Mobiles",
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
    stock: 28,
  },

  // ==============================
  // LAPTOPS
  // ==============================

  {
    name: "UltraBook 14",
    description: "Slim and lightweight laptop for everyday work and study.",
    price: 54999,
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    stock: 15,
  },
  {
    name: "Business Laptop Pro",
    description: "Reliable professional laptop designed for business users.",
    price: 64999,
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef",
    stock: 12,
  },
  {
    name: "Gaming Laptop RTX",
    description: "High performance gaming laptop with dedicated graphics.",
    price: 89999,
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    stock: 10,
  },
  {
    name: "Student Laptop",
    description: "Affordable laptop ideal for students and everyday tasks.",
    price: 39999,
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    stock: 25,
  },
  {
    name: "Creator Laptop",
    description: "Powerful laptop designed for developers and content creators.",
    price: 74999,
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
    stock: 14,
  },

  // ==============================
  // MEN'S FASHION
  // ==============================

  {
    name: "Classic Cotton Shirt",
    description: "Premium cotton casual shirt with a comfortable fit.",
    price: 1299,
    category: "Men's Fashion",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    stock: 60,
  },
  {
    name: "Slim Fit T-Shirt",
    description: "Comfortable slim fit t-shirt suitable for everyday wear.",
    price: 699,
    category: "Men's Fashion",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    stock: 80,
  },
  {
    name: "Casual Denim Jacket",
    description: "Classic denim jacket with a modern casual style.",
    price: 2499,
    category: "Men's Fashion",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    stock: 35,
  },
  {
    name: "Formal Blazer",
    description: "Elegant formal blazer suitable for office and events.",
    price: 3999,
    category: "Men's Fashion",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    stock: 25,
  },
  {
    name: "Casual Hoodie",
    description: "Soft and warm hoodie for comfortable everyday styling.",
    price: 1599,
    category: "Men's Fashion",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    stock: 50,
  },

  // ==============================
  // WOMEN'S FASHION
  // ==============================

  {
    name: "Floral Summer Dress",
    description: "Lightweight floral dress designed for a stylish summer look.",
    price: 1999,
    category: "Women's Fashion",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    stock: 40,
  },
  {
    name: "Elegant Casual Dress",
    description: "Elegant casual dress suitable for outings and special occasions.",
    price: 2299,
    category: "Women's Fashion",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
    stock: 35,
  },
  {
    name: "Women's Denim Jacket",
    description: "Stylish denim jacket with a versatile modern design.",
    price: 2799,
    category: "Women's Fashion",
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
    stock: 28,
  },
  {
    name: "Classic Women's Top",
    description: "Comfortable and stylish top for everyday wear.",
    price: 999,
    category: "Women's Fashion",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
    stock: 55,
  },
  {
    name: "Premium Handbag",
    description: "Elegant handbag with spacious compartments and premium finish.",
    price: 2999,
    category: "Women's Fashion",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    stock: 30,
  },

  // ==============================
  // FOOTWEAR
  // ==============================

  {
    name: "Running Shoes",
    description: "Lightweight running shoes with comfortable cushioning.",
    price: 2499,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    stock: 45,
  },
  {
    name: "Classic Sneakers",
    description: "Minimal sneakers suitable for casual everyday outfits.",
    price: 1999,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    stock: 50,
  },
  {
    name: "Sports Training Shoes",
    description: "Durable training shoes designed for workouts and sports.",
    price: 2999,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3",
    stock: 35,
  },
  {
    name: "Leather Formal Shoes",
    description: "Premium leather formal shoes for professional occasions.",
    price: 3499,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
    stock: 25,
  },
  {
    name: "Casual Slip-On Shoes",
    description: "Easy-to-wear slip-on shoes designed for everyday comfort.",
    price: 1499,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    stock: 40,
  },

  // ==============================
  // HOME & KITCHEN
  // ==============================

  {
    name: "Modern Coffee Maker",
    description: "Compact coffee maker for preparing fresh coffee at home.",
    price: 3499,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    stock: 20,
  },
  {
    name: "Non Stick Cookware Set",
    description: "Durable non-stick cookware set for everyday cooking.",
    price: 2999,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    stock: 25,
  },
  {
    name: "Modern Table Lamp",
    description: "Minimal table lamp that adds warmth and style to your room.",
    price: 1299,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    stock: 40,
  },
  {
    name: "Ceramic Dinner Set",
    description: "Elegant ceramic dinner set for everyday family meals.",
    price: 2199,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0",
    stock: 30,
  },
  {
    name: "Modern Wall Clock",
    description: "Stylish modern wall clock for home and office spaces.",
    price: 899,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
    stock: 45,
  },

  // ==============================
  // BEAUTY
  // ==============================

  {
    name: "Hydrating Face Cream",
    description: "Moisturizing face cream designed for everyday skincare.",
    price: 799,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    stock: 60,
  },
  {
    name: "Vitamin C Serum",
    description: "Lightweight vitamin C serum for a fresh skincare routine.",
    price: 999,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
    stock: 50,
  },
  {
    name: "Natural Face Wash",
    description: "Gentle face wash suitable for daily cleansing.",
    price: 499,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8",
    stock: 75,
  },
  {
    name: "Body Care Set",
    description: "Complete body care set for a refreshing daily routine.",
    price: 1499,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd",
    stock: 35,
  },
  {
    name: "Perfume Collection",
    description: "Premium fragrance collection with elegant long-lasting scents.",
    price: 2499,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601",
    stock: 30,
  },

  // ==============================
  // SPORTS
  // ==============================

  {
    name: "Professional Football",
    description: "Durable football designed for training and recreational play.",
    price: 899,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    stock: 45,
  },
  {
    name: "Tennis Racket",
    description: "Lightweight tennis racket designed for better control.",
    price: 2499,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8",
    stock: 25,
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat suitable for yoga and home workouts.",
    price: 799,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
    stock: 70,
  },
  {
    name: "Adjustable Dumbbells",
    description: "Adjustable dumbbells for strength training at home.",
    price: 3499,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
    stock: 20,
  },
  {
    name: "Sports Water Bottle",
    description: "Leak-resistant sports bottle designed for workouts and travel.",
    price: 599,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    stock: 80,
  },

  // ==============================
  // ACCESSORIES
  // ==============================

  {
    name: "Smart Watch",
    description: "Feature-rich smartwatch for fitness tracking and notifications.",
    price: 3999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    stock: 35,
  },
  {
    name: "Classic Wrist Watch",
    description: "Elegant wrist watch with a timeless minimalist design.",
    price: 2999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    stock: 25,
  },
  {
    name: "Leather Wallet",
    description: "Compact leather wallet with multiple card compartments.",
    price: 999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93",
    stock: 50,
  },
  {
    name: "Sunglasses",
    description: "Stylish sunglasses with a modern lightweight frame.",
    price: 1299,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    stock: 45,
  },
  {
    name: "Travel Backpack",
    description: "Spacious travel backpack suitable for work and short trips.",
    price: 1999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 40,
  },

  // ==============================
  // BOOKS
  // ==============================

  {
    name: "JavaScript Programming Guide",
    description: "Practical guide for learning modern JavaScript programming.",
    price: 699,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    stock: 30,
  },
  {
    name: "React Development Handbook",
    description: "Learn React concepts and build modern frontend applications.",
    price: 899,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    stock: 25,
  },
  {
    name: "Node.js Backend Development",
    description: "Learn backend development using Node.js and Express.",
    price: 799,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    stock: 30,
  },
  {
    name: "MongoDB Complete Guide",
    description: "Beginner-friendly guide to MongoDB and database development.",
    price: 749,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    stock: 20,
  },
  {
    name: "Full Stack Development",
    description: "Complete introduction to modern full stack web development.",
    price: 999,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    stock: 35,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("====================================");
    console.log("✅ Products seeded successfully!");
    console.log(`📦 Total products: ${products.length}`);
    console.log("====================================");

    process.exit(0);
  } catch (error) {
    console.error("❌ Product seeding failed:");
    console.error(error.message);
    process.exit(1);
  }
};

seedProducts();
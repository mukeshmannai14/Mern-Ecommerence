# ShopHub — MERN Stack E-Commerce Website

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#shophub--mern-stack-e-commerce-website)

A full-stack, responsive e-commerce web application built using the **MERN stack** — MongoDB, Express.js, React, and Node.js.

ShopHub provides a complete shopping workflow including product browsing, search and category filtering, authentication, shopping cart management, checkout, order history, order details, order cancellation, and an admin product-management dashboard.

---

## 📌 Project Overview

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-project-overview)

**ShopHub** is developed as a MERN Stack E-Commerce project for demonstrating practical full-stack web development skills.

The application follows a client-server architecture:

```
React + Vite Frontend
        │
        │ REST API / Axios
        ▼
Express.js + Node.js Backend
        │
        │ Mongoose
        ▼
MongoDB Atlas

```

**svg**

The project is designed to demonstrate:

- Responsive React UI development
- RESTful API development
- MongoDB database integration
- User authentication with JWT
- Role-based admin authorization
- Product CRUD operations
- Shopping cart functionality
- Checkout and order management
- Order history and order details
- Order cancellation and stock restoration
- Frontend/backend deployment
- Environment-variable based configuration

---

## ✨ Features

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-features)

### 🏠 Home Page

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-home-page)

- Modern responsive landing page
- ShopHub branding
- Hero section with call-to-action buttons
- Product statistics
- Category navigation
- Featured products
- Category-wise product sections
- Responsive product grids
- Mobile-friendly horizontal product sections

### 🛍️ Product Browsing

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#%EF%B8%8F-product-browsing)

- View all products
- Product cards with:
  - Product image
  - Product name
  - Price
  - Category
  - Stock information
- Search products
- Filter products by category
- View individual product details
- Add products to cart

### 📦 Product Details

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-product-details)

Each product has a dedicated details page containing:

- Product image
- Product name
- Description
- Price
- Category
- Stock availability
- Quantity selection
- Add-to-cart functionality

### 🛒 Shopping Cart

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-shopping-cart)

- Add products to cart
- Increase quantity
- Decrease quantity
- Remove products
- Display subtotal
- Continue shopping
- Proceed to checkout
- Cart state managed using Redux Toolkit

### 👤 User Authentication

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-user-authentication)

Users can:

- Register an account
- Login
- Logout
- Access protected resources
- Maintain authenticated sessions using JWT

Authentication flow:

```
Register/Login
     ↓
Backend validates credentials
     ↓
JWT token generated
     ↓
Token stored on frontend
     ↓
Token sent with protected API requests
     ↓
Backend verifies JWT

```

**svg**

### 💳 Checkout

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-checkout)

Checkout includes:

- Customer name
- Phone number
- Address
- City
- State
- Pincode
- Payment method selection
- Order summary
- Subtotal
- Shipping amount
- Total amount
- Order placement

Currently supported payment methods include:

- COD
- RAZORPAY

For Razorpay payments, the frontend creates a Razorpay checkout order through the backend, opens Razorpay Checkout, verifies the returned payment signature on the backend, and then creates the application order with the verified Razorpay payment details.

> Note: The project uses Razorpay Test Mode for development/testing. Production payments, webhooks, automated refunds, and other production-grade payment workflows require additional configuration and verification.

### 📋 Orders

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-orders)

Authenticated users can:

- View their previous orders
- Open individual order details
- View purchased products
- View quantities and prices
- View shipping information
- View payment information
- View order status
- Cancel eligible orders

### ❌ Order Cancellation

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-order-cancellation)

Users can cancel orders while they are in eligible early statuses.

Cancellation:

- Checks order ownership
- Prevents cancelling an already cancelled order
- Prevents cancellation after shipping/delivery
- Changes the order status to `Cancelled`
- Restores product stock

Order lifecycle:

```
Processing
    ↓
Confirmed
    ↓
Shipped
    ↓
Delivered

```

**svg**

An order may be cancelled while it is still eligible:

```
Processing / Confirmed
          ↓
       Cancelled

```

**svg**

### 👨‍💼 Admin Dashboard

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#%E2%80%8D-admin-dashboard)

Admin users can manage products through protected API endpoints.

Admin functionality includes:

- Create products
- Read products
- Update products
- Delete products
- Manage product:
  - Name
  - Description
  - Price
  - Category
  - Image
  - Stock

Admin API access is protected using:

```
JWT Authentication
       +
Admin Role Authorization

```

**svg**

---

# 🧰 Technology Stack

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-technology-stack)

## Frontend

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#frontend)

| **TechnologyPurpose** |                       |
| --------------------- | --------------------- |
| React                 | UI development        |
| Vite                  | Frontend build tool   |
| React Router DOM      | Client-side routing   |
| Axios                 | API communication     |
| Redux Toolkit         | State management      |
| React Redux           | Redux integration     |
| Tailwind CSS          | Responsive UI styling |
| JavaScript            | Application logic     |

## Backend

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#backend)

| **TechnologyPurpose** |                         |
| --------------------- | ----------------------- |
| Node.js               | JavaScript runtime      |
| Express.js            | REST API framework      |
| MongoDB               | Database                |
| Mongoose              | MongoDB ODM             |
| JWT                   | Authentication          |
| bcrypt                | Password hashing        |
| CORS                  | Cross-origin API access |
| dotenv                | Environment variables   |

## Deployment

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#deployment)

| **ServiceUsage** |                        |
| ---------------- | ---------------------- |
| Vercel           | Frontend deployment    |
| Render           | Backend/API deployment |
| MongoDB Atlas    | Cloud database         |
| GitHub           | Source-code repository |

---

# 📁 Project Structure

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-project-structure)

```
Mern-Ecommerce/
│
├── client/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── OrderDetails.jsx
│   │   │   └── Admin.jsx
│   │   │
│   │   ├── redux/
│   │   │   ├── cartSlice.js
│   │   │   └── store.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── server/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   ├── seedProducts.js
│   └── package.json
│
├── .gitignore
└── README.md

```

**svg**

---

# 🔐 Environment Variables

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-environment-variables)

Environment variables are required for the backend and frontend.

## Backend `.env`

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#backend-env)

Create:

```
server/.env

```

**svg**

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_secret
```

**svg**

Do **not** commit the real `.env` file to GitHub.

---

## Frontend `.env`

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#frontend-env)

Create:

```
client/.env

```

**svg**

Example:

```
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

**svg**

For production, configure:

```
VITE_API_URL=https://your-render-backend-url
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

**svg**

Never place MongoDB credentials, JWT secrets, or `RAZORPAY_KEY_SECRET` in the Vite frontend environment. Only the Razorpay **Key ID** belongs in the frontend.

---

# 🚀 Installation & Setup

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-installation--setup)

## 1. Clone the Repository

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#1-clone-the-repository)

```
git clone https://github.com/mukeshmannai14/Mern-Ecommerence.git
```

**svg**

Move into the project:

```
cd Mern-Ecommerence
```

**svg**

---

# 🖥️ Frontend Setup

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#%EF%B8%8F-frontend-setup)

Move into the client folder:

```
cd client
```

**svg**

Install dependencies:

```
npm install
```

**svg**

Create:

```
client/.env

```

**svg**

Add:

```
VITE_API_URL=http://localhost:5000
```

**svg**

Razorpay Checkout is loaded in the frontend with:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

Start the frontend:

```
npm run dev
```

**svg**

The Vite development server will provide a local URL, normally similar to:

```
http://localhost:5173

```

**svg**

---

# ⚙️ Backend Setup

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#%EF%B8%8F-backend-setup)

Open another terminal.

Move into the server folder:

```
cd server
```

**svg**

Install dependencies:

```
npm install
```

**svg**

Create:

```
server/.env

```

**svg**

Configure:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_secret
```

**svg**

Start the backend:

```
node server.js
```

**svg**

Expected output:

```
MongoDB Connected
Server running on port 5000

```

**svg**

---

# 🗄️ MongoDB Setup

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#%EF%B8%8F-mongodb-setup)

The backend uses MongoDB with Mongoose.

The main collections are:

```
users
products
orders

```

**svg**

### User

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#user)

Stores:

- Name
- Email
- Hashed password
- Role
- Timestamps

### Product

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#product)

Stores:

- Name
- Description
- Price
- Category
- Image
- Stock
- Timestamps

### Order

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#order)

Stores:

- User
- Order items
- Shipping address
- Payment method
- Payment status
- Order status
- Subtotal
- Shipping price
- Total price
- Timestamps

---

# 🌱 Product Seed Data

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-product-seed-data)

The project includes:

```
server/seedProducts.js

```

**svg**

Run it from the server directory:

```
node seedProducts.js
```

**svg**

This populates the database with sample e-commerce products across multiple categories.

Example categories include:

- Electronics
- Mobiles
- Laptops
- Men's Fashion
- Women's Fashion
- Footwear
- Home & Kitchen
- Beauty
- Sports
- Accessories
- Books

---

# 🔗 API Documentation

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-api-documentation)

Base URL:

```
/api

```

**svg**

---

## 🔑 Authentication API

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-authentication-api)

### Register

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#register)

```
POST /api/auth/register
```

**svg**

Example request:

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**svg**

### Login

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#login)

```
POST /api/auth/login
```

**svg**

Example:

```
{
  "email": "john@example.com",
  "password": "password123"
}
```

**svg**

The backend returns a JWT token after successful authentication.

### Profile

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#profile)

```
GET /api/auth/profile
```

**svg**

Requires:

```
Authorization: Bearer <JWT_TOKEN>
```

**svg**

---

# 📦 Product API

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-product-api)

### Get All Products

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#get-all-products)

```
GET /api/products
```

**svg**

### Get Product by ID

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#get-product-by-id)

```
GET /api/products/:id
```

**svg**

### Create Product

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#create-product)

```
POST /api/products
```

**svg**

Requires:

```
JWT + Admin role

```

**svg**

### Update Product

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#update-product)

```
PUT /api/products/:id
```

**svg**

Requires:

```
JWT + Admin role

```

**svg**

### Delete Product

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#delete-product)

```
DELETE /api/products/:id
```

**svg**

Requires:

```
JWT + Admin role

```

**svg**

---

# 🧾 Order API

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-order-api)

### Create Order

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#create-order)

```
POST /api/orders
```

**svg**

Requires authentication.

### Get My Orders

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#get-my-orders)

```
GET /api/orders/my-orders
```

**svg**

Requires authentication.

### Get Single Order

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#get-single-order)

```
GET /api/orders/:id
```

**svg**

Requires authentication and verifies order ownership.

### Cancel Order

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#cancel-order)

```
PUT /api/orders/:id/cancel
```

**svg**

Requires authentication.

Cancellation validates:

- User ownership
- Current order status
- Cancellation eligibility

---

# 💳 Payment API

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-payment-api)

### Create Razorpay Order

```
POST /api/payment/create-order
```

Creates a Razorpay payment order from the checkout amount.

Example request:

```json
{
  "amount": 999
}
```

The backend converts the INR amount to paise before creating the Razorpay order.

### Verify Razorpay Payment

```
POST /api/payment/verify
```

Verifies the Razorpay payment signature on the backend using the Razorpay secret key.

Example request:

```json
{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_xxxxx"
}
```

The Razorpay secret is never exposed to the frontend.

---

# 🔒 Authentication & Authorization

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-authentication--authorization)

The project implements two levels of API protection.

## Authentication

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#authentication)

JWT middleware checks whether the request contains a valid token:

```
Authorization: Bearer <token>

```

**svg**

The backend verifies the token before allowing protected operations.

## Authorization

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#authorization)

Admin middleware checks:

```
req.user.role === "admin"

```

**svg**

Only users with the admin role can access product-management operations.

This prevents normal users from directly creating, updating, or deleting products through the API.

---

# 🛒 Shopping Flow

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-shopping-flow)

The main customer workflow is:

```
Home
  ↓
Products
  ↓
Product Details
  ↓
Add to Cart
  ↓
Cart
  ↓
Checkout
  ↓
Login/Register if required
  ↓
Shipping Information
  ↓
Payment Method
  ↓
Place Order
  ↓
Order Success
  ↓
My Orders
  ↓
Order Details

```

**svg**

---

# 📊 Order & Stock Management

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-order--stock-management)

When an order is created:

```
Customer places order
        ↓
Backend validates products
        ↓
Backend checks stock
        ↓
Order is created
        ↓
Product stock is reduced

```

**svg**

When an eligible order is cancelled:

```
Customer cancels order
        ↓
Backend validates ownership
        ↓
Cancellation status updated
        ↓
Product stock restored

```

**svg**

This helps keep product inventory synchronized with order activity.

---

# 📱 Responsive Design

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-responsive-design)

The frontend is designed for:

- Mobile phones
- Tablets
- Laptops
- Desktop screens

Responsive UI techniques include:

- Tailwind CSS responsive breakpoints
- Responsive grids
- Mobile navigation menu
- Flexible buttons
- Responsive product cards
- Mobile horizontal product scrolling
- Responsive checkout layout

---

# 🧪 Testing Checklist

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-testing-checklist)

Before deployment, test the following.

## User

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#user-1)

-  Register
-  Login
-  Logout
-  Invalid login handling
-  Protected API access

## Products

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#products)

-  View products
-  Search products
-  Filter products
-  View product details
-  Add product to cart
-  Check stock

## Cart

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#cart)

-  Add item
-  Increase quantity
-  Decrease quantity
-  Remove item
-  Calculate subtotal

## Checkout

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#checkout)

-  Enter shipping information
-  Select payment method
-  Place COD order
-  Open Razorpay Checkout for online payment
-  Verify Razorpay payment
-  Create the application order after successful payment verification
-  Display order success

## Orders

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#orders)

-  View order history
-  View order details
-  Cancel eligible order
-  Verify stock restoration

## Admin

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#admin)

-  Admin login
-  Create product
-  Update product
-  Delete product
-  Verify normal user cannot perform admin operations

---

# ☁️ Deployment

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#%EF%B8%8F-deployment)

## Frontend — Vercel

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#frontend--vercel)

Recommended configuration:

```
Root Directory: client
Framework: Vite
Build Command: npm run build
Output Directory: dist

```

**svg**

Set the Vercel environment variables:

```
VITE_API_URL=https://your-render-backend-url
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

The Razorpay **secret** must remain only on the backend.

**svg**

After changing environment variables, redeploy the project.

---

## Backend — Render

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#backend--render)

Recommended configuration:

```
Root Directory: server
Build Command: npm install
Start Command: node server.js

```

**svg**

Configure environment variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://your-vercel-frontend-url

RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_secret
```

**svg**

Render automatically provides the production `PORT`, so the backend uses:

```
process.env.PORT || 5000
```

**svg**

---

# 🔄 Production Request Flow

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-production-request-flow)

```
User Browser
     │
     ▼
Vercel
React Frontend
     │
     │ HTTPS REST API
     ▼
Render
Node.js + Express API
     │
     │ Mongoose
     ▼
MongoDB Atlas

```

**svg**

---

# 🌐 SPA Routing

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-spa-routing)

Because React Router is used, the Vercel deployment includes a rewrite configuration so direct navigation to routes such as:

```
/products
/cart
/checkout
/orders
/admin

```

**svg**

can be handled by the React application.

Example `client/vercel.json`:

```
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**svg**

---

# 🔐 Security Considerations

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-security-considerations)

The application follows several basic security practices:

- Passwords are hashed using bcrypt
- JWT is used for protected authentication
- Admin operations require authorization
- Environment variables are used for sensitive configuration
- MongoDB credentials are not stored in source code
- `.env` files are excluded from Git
- User order access is restricted to the authenticated owner
- Backend validates product stock before creating orders

### Important

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#important)

Never commit:

```
.env
server/.env
client/.env

```

**svg**

or database passwords, JWT secrets, API keys, or payment secrets.

---

# 🧹 Git & GitHub

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-git--github)

The repository uses a `.gitignore` to prevent unnecessary and sensitive files from being committed.

Important ignored files include:

```
node_modules/
.env
*.env
dist/
build/
.vercel/
*.log

```

**svg**

Typical Git workflow:

```
git add .
git commit -m "Update e-commerce application"
git push
```

**svg**

---

# 🛠️ Common Development Commands

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#%EF%B8%8F-common-development-commands)

## Frontend

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#frontend-1)

```
cd client
npm install
npm run dev
npm run build
```

**svg**

## Backend

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#backend-1)

```
cd server
npm install
node server.js
```

**svg**

## Seed Products

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#seed-products)

```
cd server
node seedProducts.js
```

**svg**

---

# 🐛 Troubleshooting

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-troubleshooting)

## Backend: `Cannot find module 'express'`

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#backend-cannot-find-module-express)

Run:

```
cd server
npm install
node server.js
```

**svg**

---

## Frontend: Failed to Load Products

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#frontend-failed-to-load-products)

Check:

```
VITE_API_URL=https://your-render-backend-url
```

**svg**

Do not use:

```
VITE_API_URL=http://localhost:5000
```

**svg**

for the deployed Vercel application.

After changing the Vercel environment variable, redeploy.

---

## Razorpay: Unable to Start Payment

Check the Render environment variables:

```text
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_secret
```

For Vercel, check:

```text
VITE_API_URL=https://your-render-backend-url
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

Make sure the backend uses `RAZORPAY_KEY_ID`, not `VITE_RAZORPAY_KEY_ID`.

After changing Render environment variables, redeploy the backend. After changing Vercel environment variables, redeploy the frontend.

---

## CORS Error

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#cors-error)

Check the Render environment variable:

```
CLIENT_URL=https://your-vercel-frontend-url
```

**svg**

The value must match the deployed frontend origin.

---

## MongoDB Connection Error

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#mongodb-connection-error)

Verify:

- MongoDB Atlas cluster is running
- Connection string is correct
- Database user credentials are valid
- Network access permits the deployed backend
- `MONGO_URI` is configured on Render

---

# 💳 Razorpay Payment Flow

The Razorpay checkout flow is:

```text
Customer selects Razorpay
        ↓
Frontend requests /api/payment/create-order
        ↓
Backend creates Razorpay order
        ↓
Razorpay Checkout opens
        ↓
Customer completes Test Mode payment
        ↓
Razorpay returns payment details
        ↓
Frontend sends details to /api/payment/verify
        ↓
Backend verifies Razorpay signature
        ↓
Application order is created
        ↓
Cart is cleared
        ↓
Order Success page
```

> Use Razorpay Test Mode credentials while developing and testing. Never commit Razorpay secrets to GitHub.

---

# 🎯 Project Objectives

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-project-objectives)

The main objectives of ShopHub are:

1. Build a complete MERN stack application.
2. Create a responsive e-commerce frontend.
3. Develop RESTful backend APIs.
4. Integrate MongoDB with Mongoose.
5. Implement JWT-based authentication.
6. Implement role-based admin authorization.
7. Create product CRUD functionality.
8. Implement shopping cart functionality.
9. Implement checkout and order management.
10. Implement order history and cancellation.
11. Manage product inventory during orders.
12. Deploy the application using modern cloud platforms.
13. Maintain a clean and maintainable project structure.

---

# 📚 Learning Outcomes

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-learning-outcomes)

This project demonstrates practical experience with:

- React component architecture
- React Router
- React hooks
- Redux Toolkit
- Axios
- Tailwind CSS
- Node.js
- Express.js
- REST API design
- MongoDB
- Mongoose schemas
- JWT authentication
- bcrypt password hashing
- Middleware
- Role-based authorization
- CRUD operations
- Order processing
- Inventory management
- Environment configuration
- Git and GitHub
- Vercel deployment
- Render deployment
- MongoDB Atlas

---

# 🚀 Future Improvements

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-future-improvements)

Potential future enhancements include:

- Razorpay webhook handling
- Automated payment refunds
- User profile management
- Server-side persistent shopping carts
- Product reviews and ratings
- Wishlist functionality
- Product pagination
- Advanced filtering and sorting
- Coupon and discount system
- Admin order-management dashboard
- Order status management
- Email order notifications
- Image upload/storage service
- Product recommendations
- Analytics dashboard
- Automated testing
- CI/CD pipeline

---

# 👨‍💻 Author

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#%E2%80%8D-author)

**Mukesh Kanna**

Full Stack Developer | MERN Stack

### Skills Demonstrated

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#skills-demonstrated)

```
HTML
CSS
JavaScript
React.js
Tailwind CSS
Redux Toolkit
Node.js
Express.js
MongoDB
Mongoose
JWT
REST APIs
Git
GitHub
Vercel
Render

```

**svg**

---

# 📌 Project Status

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-project-status)

```
Frontend       : ✅ Developed
Backend        : ✅ Developed
MongoDB        : ✅ Integrated
Authentication : ✅ Implemented
Admin CRUD     : ✅ Implemented
Cart           : ✅ Implemented
Checkout       : ✅ Implemented
COD Payment    : ✅ Implemented
Razorpay Test  : ✅ Integrated
Payment Verify : ✅ Implemented
Orders         : ✅ Implemented
Cancellation   : ✅ Implemented
Responsive UI  : ✅ Implemented
Deployment     : ✅ Configured

```

**svg**

---

# 📄 Academic Assignment Alignment

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-academic-assignment-alignment)

This project is structured around the MERN e-commerce requirements covering:

- Frontend pages and navigation
- Product listing and details
- Search/filter functionality
- Cart and checkout
- Registration/login
- Order history
- Express REST APIs
- MongoDB/Mongoose
- Product CRUD
- Authentication and protected routes
- Deployment
- GitHub repository
- Responsive design
- Code quality

The assignment specifically identifies frontend requirements such as product listing, search/filtering, product details, cart, checkout, registration/login and order history, and backend requirements such as Express APIs, MongoDB/Mongoose, product CRUD, authentication, cart/order functionality and protected routes. fileciteturn0file0L51-L97

---

# ⭐ ShopHub

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence#-shophub)

A practical MERN Stack project demonstrating the complete journey from:

**Frontend → REST API → Database → Authentication → Orders → Deployment**

Built with modern full-stack development practices.

## Aboutsvg

svg[**mern-ecommerce-murex-pi.vercel.app**](https://mern-ecommerce-murex-pi.vercel.app/)

### Resources

[svgReadme](https://github.com/mukeshmannai14/Mern-Ecommerence#readme-ov-file)

[svgMIT license](https://github.com/mukeshmannai14/Mern-Ecommerence#MIT-1-ov-file)

[svgActivity](https://github.com/mukeshmannai14/Mern-Ecommerence/activity)

### Stars

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence/stargazers)[**0**](https://github.com/mukeshmannai14/Mern-Ecommerence/stargazers)[ stars](https://github.com/mukeshmannai14/Mern-Ecommerence/stargazers)

### Watchers

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence/watchers)[**0**](https://github.com/mukeshmannai14/Mern-Ecommerence/watchers)[ watching](https://github.com/mukeshmannai14/Mern-Ecommerence/watchers)

### Forks

[svg](https://github.com/mukeshmannai14/Mern-Ecommerence/forks)[**0**](https://github.com/mukeshmannai14/Mern-Ecommerence/forks)[ forks](https://github.com/mukeshmannai14/Mern-Ecommerence/forks)

## [Releases](https://github.com/mukeshmannai14/Mern-Ecommerence/releases)

No releases published

[Create a new release](https://github.com/mukeshmannai14/Mern-Ecommerence/releases/new)

## [Deployments](https://github.com/mukeshmannai14/Mern-Ecommerence/deployments)14 (14)

- svg[**Production**](https://github.com/mukeshmannai14/Mern-Ecommerence/deployments/Production)1 hour ago

## [Packages](https://github.com/users/mukeshmannai14/packages?repo_name=Mern-Ecommerence)

No packages published
[Publish your first package](https://github.com/mukeshmannai14/Mern-Ecommerence/packages)

## [Contributors](https://github.com/mukeshmannai14/Mern-Ecommerence/graphs/contributors)1 (1)

- [@mukeshmannai14](https://github.com/mukeshmannai14) ([image](https://avatars.githubusercontent.com/u/131882944?s=64\&v=4))[**mukeshmannai14**](https://github.com/mukeshmannai14)[Mukesh kanna](https://github.com/mukeshmannai14)

## Languages

- [**JavaScript**](https://github.com/mukeshmannai14/Mern-Ecommerence/search?l=javascript)[98.8%](https://github.com/mukeshmannai14/Mern-Ecommerence/search?l=javascript)
- [**Other**](https://github.com/mukeshmannai14/Mern-Ecommerence/search?l=Other)[1.2%](https://github.com/mukeshmannai14/Mern-Ecommerence/search?l=Other)

## Suggested workflows

Based on your tech stack

1. Publish Node.js Package to GitHub Packages logo

   **Publish Node.js Package to GitHub Packages**Publishes a Node.js package to GitHub Packages.By GitHub Actions
2. Datadog Synthetics logo

   **Datadog Synthetics**Run Datadog Synthetic tests within your GitHub Actions workflowBy Datadog
3. SLSA Generic generator logo

   **SLSA Generic generator**Generate SLSA3 provenance for your existing release workflowsBy Open Source Security Foundation (OpenSSF)

[More workflows](https://github.com/mukeshmannai14/Mern-Ecommerence/actions/new)

## Footer

[svg](https://github.com/)© 2026 GitHub, Inc.

### Footer navigation

- [Terms](https://docs.github.com/site-policy/github-terms/github-terms-of-service)
- [Pri](https://docs.github.com/site-policy/privacy-policies/github-privacy-statement)

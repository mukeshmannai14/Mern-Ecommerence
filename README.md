# ShopHub — MERN Stack E-Commerce Website

A full-stack, responsive e-commerce web application built using the **MERN stack** — MongoDB, Express.js, React, and Node.js.

ShopHub provides a complete shopping workflow including product browsing, search and category filtering, authentication, shopping cart management, checkout, order history, order details, order cancellation, and an admin product-management dashboard.

---

## 📌 Project Overview

**ShopHub** is developed as a MERN Stack E-Commerce project for demonstrating practical full-stack web development skills.

The application follows a client-server architecture:

```text
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

### 🏠 Home Page

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

- Add products to cart
- Increase quantity
- Decrease quantity
- Remove products
- Display subtotal
- Continue shopping
- Proceed to checkout
- Cart state managed using Redux Toolkit

### 👤 User Authentication

Users can:

- Register an account
- Login
- Logout
- Access protected resources
- Maintain authenticated sessions using JWT

Authentication flow:

```text
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

### 💳 Checkout

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

Currently supported payment-method values include:

- COD
- RAZORPAY

> Note: The current order implementation records the selected Razorpay payment method, but a complete live Razorpay gateway/refund workflow is not included unless separately integrated.

### 📋 Orders

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

Users can cancel orders while they are in eligible early statuses.

Cancellation:

- Checks order ownership
- Prevents cancelling an already cancelled order
- Prevents cancellation after shipping/delivery
- Changes the order status to `Cancelled`
- Restores product stock

Order lifecycle:

```text
Processing
    ↓
Confirmed
    ↓
Shipped
    ↓
Delivered
```

An order may be cancelled while it is still eligible:

```text
Processing / Confirmed
          ↓
       Cancelled
```

### 👨‍💼 Admin Dashboard

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

```text
JWT Authentication
       +
Admin Role Authorization
```

---

# 🧰 Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | UI development |
| Vite | Frontend build tool |
| React Router DOM | Client-side routing |
| Axios | API communication |
| Redux Toolkit | State management |
| React Redux | Redux integration |
| Tailwind CSS | Responsive UI styling |
| JavaScript | Application logic |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| CORS | Cross-origin API access |
| dotenv | Environment variables |

## Deployment

| Service | Usage |
|---|---|
| Vercel | Frontend deployment |
| Render | Backend/API deployment |
| MongoDB Atlas | Cloud database |
| GitHub | Source-code repository |

---

# 📁 Project Structure

```text
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

---

# 🔐 Environment Variables

Environment variables are required for the backend and frontend.

## Backend `.env`

Create:

```text
server/.env
```

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Do **not** commit the real `.env` file to GitHub.

---

## Frontend `.env`

Create:

```text
client/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000
```

For production, configure:

```env
VITE_API_URL=https://your-render-backend-url
```

Never place MongoDB credentials or JWT secrets in the Vite frontend environment.

---

# 🚀 Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/mukeshmannai14/Mern-Ecommerence.git
```

Move into the project:

```bash
cd Mern-Ecommerence
```

---

# 🖥️ Frontend Setup

Move into the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The Vite development server will provide a local URL, normally similar to:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal.

Move into the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create:

```text
server/.env
```

Configure:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
node server.js
```

Expected output:

```text
MongoDB Connected
Server running on port 5000
```

---

# 🗄️ MongoDB Setup

The backend uses MongoDB with Mongoose.

The main collections are:

```text
users
products
orders
```

### User

Stores:

- Name
- Email
- Hashed password
- Role
- Timestamps

### Product

Stores:

- Name
- Description
- Price
- Category
- Image
- Stock
- Timestamps

### Order

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

The project includes:

```text
server/seedProducts.js
```

Run it from the server directory:

```bash
node seedProducts.js
```

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

Base URL:

```text
/api
```

---

## 🔑 Authentication API

### Register

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
```

Example:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

The backend returns a JWT token after successful authentication.

### Profile

```http
GET /api/auth/profile
```

Requires:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 📦 Product API

### Get All Products

```http
GET /api/products
```

### Get Product by ID

```http
GET /api/products/:id
```

### Create Product

```http
POST /api/products
```

Requires:

```text
JWT + Admin role
```

### Update Product

```http
PUT /api/products/:id
```

Requires:

```text
JWT + Admin role
```

### Delete Product

```http
DELETE /api/products/:id
```

Requires:

```text
JWT + Admin role
```

---

# 🧾 Order API

### Create Order

```http
POST /api/orders
```

Requires authentication.

### Get My Orders

```http
GET /api/orders/my-orders
```

Requires authentication.

### Get Single Order

```http
GET /api/orders/:id
```

Requires authentication and verifies order ownership.

### Cancel Order

```http
PUT /api/orders/:id/cancel
```

Requires authentication.

Cancellation validates:

- User ownership
- Current order status
- Cancellation eligibility

---

# 🔒 Authentication & Authorization

The project implements two levels of API protection.

## Authentication

JWT middleware checks whether the request contains a valid token:

```text
Authorization: Bearer <token>
```

The backend verifies the token before allowing protected operations.

## Authorization

Admin middleware checks:

```text
req.user.role === "admin"
```

Only users with the admin role can access product-management operations.

This prevents normal users from directly creating, updating, or deleting products through the API.

---

# 🛒 Shopping Flow

The main customer workflow is:

```text
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

---

# 📊 Order & Stock Management

When an order is created:

```text
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

When an eligible order is cancelled:

```text
Customer cancels order
        ↓
Backend validates ownership
        ↓
Cancellation status updated
        ↓
Product stock restored
```

This helps keep product inventory synchronized with order activity.

---

# 📱 Responsive Design

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

Before deployment, test the following.

## User

- [ ] Register
- [ ] Login
- [ ] Logout
- [ ] Invalid login handling
- [ ] Protected API access

## Products

- [ ] View products
- [ ] Search products
- [ ] Filter products
- [ ] View product details
- [ ] Add product to cart
- [ ] Check stock

## Cart

- [ ] Add item
- [ ] Increase quantity
- [ ] Decrease quantity
- [ ] Remove item
- [ ] Calculate subtotal

## Checkout

- [ ] Enter shipping information
- [ ] Select payment method
- [ ] Place order
- [ ] Display order success

## Orders

- [ ] View order history
- [ ] View order details
- [ ] Cancel eligible order
- [ ] Verify stock restoration

## Admin

- [ ] Admin login
- [ ] Create product
- [ ] Update product
- [ ] Delete product
- [ ] Verify normal user cannot perform admin operations

---

# ☁️ Deployment

## Frontend — Vercel

Recommended configuration:

```text
Root Directory: client
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Set the Vercel environment variable:

```env
VITE_API_URL=https://your-render-backend-url
```

After changing environment variables, redeploy the project.

---

## Backend — Render

Recommended configuration:

```text
Root Directory: server
Build Command: npm install
Start Command: node server.js
```

Configure environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://your-vercel-frontend-url
```

Render automatically provides the production `PORT`, so the backend uses:

```js
process.env.PORT || 5000
```

---

# 🔄 Production Request Flow

```text
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

---

# 🌐 SPA Routing

Because React Router is used, the Vercel deployment includes a rewrite configuration so direct navigation to routes such as:

```text
/products
/cart
/checkout
/orders
/admin
```

can be handled by the React application.

Example `client/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

# 🔐 Security Considerations

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

Never commit:

```text
.env
server/.env
client/.env
```

or database passwords, JWT secrets, API keys, or payment secrets.

---

# 🧹 Git & GitHub

The repository uses a `.gitignore` to prevent unnecessary and sensitive files from being committed.

Important ignored files include:

```text
node_modules/
.env
*.env
dist/
build/
.vercel/
*.log
```

Typical Git workflow:

```bash
git add .
git commit -m "Update e-commerce application"
git push
```

---

# 🛠️ Common Development Commands

## Frontend

```bash
cd client
npm install
npm run dev
npm run build
```

## Backend

```bash
cd server
npm install
node server.js
```

## Seed Products

```bash
cd server
node seedProducts.js
```

---

# 🐛 Troubleshooting

## Backend: `Cannot find module 'express'`

Run:

```bash
cd server
npm install
node server.js
```

---

## Frontend: Failed to Load Products

Check:

```env
VITE_API_URL=https://your-render-backend-url
```

Do not use:

```env
VITE_API_URL=http://localhost:5000
```

for the deployed Vercel application.

After changing the Vercel environment variable, redeploy.

---

## CORS Error

Check the Render environment variable:

```env
CLIENT_URL=https://your-vercel-frontend-url
```

The value must match the deployed frontend origin.

---

## MongoDB Connection Error

Verify:

- MongoDB Atlas cluster is running
- Connection string is correct
- Database user credentials are valid
- Network access permits the deployed backend
- `MONGO_URI` is configured on Render

---

# 🎯 Project Objectives

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

Potential future enhancements include:

- Real Razorpay payment integration
- Payment verification and webhook handling
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

**Mukesh Kanna**

Full Stack Developer | MERN Stack

### Skills Demonstrated

```text
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

---

# 📌 Project Status

```text
Frontend       : ✅ Developed
Backend        : ✅ Developed
MongoDB        : ✅ Integrated
Authentication : ✅ Implemented
Admin CRUD     : ✅ Implemented
Cart           : ✅ Implemented
Checkout       : ✅ Implemented
Orders         : ✅ Implemented
Cancellation   : ✅ Implemented
Responsive UI  : ✅ Implemented
Deployment     : ✅ Configured
```

---

# 📄 Academic Assignment Alignment

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

A practical MERN Stack project demonstrating the complete journey from:

**Frontend → REST API → Database → Authentication → Orders → Deployment**

Built with modern full-stack development practices.

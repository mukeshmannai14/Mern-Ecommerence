# My Blog Portfolio

A full-stack developer portfolio and blog platform built with **React,
Vite, Tailwind CSS, Firebase Authentication, Firebase Firestore,
Node.js, Express, and MongoDB Atlas**.

## Live Architecture

``` text
Browser
   |
   +--> Vercel Frontend (React + Vite + Tailwind)
   |        |
   |        +--> Firebase Authentication
   |        +--> Firebase Firestore (Contact Messages)
   |
   +--> Render Backend (Node + Express)
            |
            +--> Firebase Admin SDK
            |
            +--> MongoDB Atlas (Blog Data)
```

## Features

### Portfolio

-   Home
-   About
-   Skills
-   Projects
-   Blog
-   Contact
-   Responsive desktop/tablet/mobile UI

### Authentication

-   Firebase Email/Password signup and login
-   Logout
-   Protected portfolio pages
-   Firebase ID-token authentication for backend requests

### Admin System

Only the Firebase user with the custom claim `admin: true` can: - Create
blogs - Edit blogs - Delete blogs - Publish/unpublish blogs - View blog
statistics - View and delete contact messages

Normal users can read published blogs and like/unlike them.

### Blog System

Blog data is stored in MongoDB Atlas.

Each blog can contain: - Title - Excerpt - Content - Image URL -
Author - Published/draft status - Like count - `likedBy` Firebase user
IDs - Created and updated timestamps

### Contact System

Contact messages are stored in Firebase Firestore. Authenticated users
can create messages; only administrators can read, update, or delete
them.

------------------------------------------------------------------------

## Technology Stack

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   React Router
-   Axios
-   Firebase Authentication
-   Firebase Firestore

### Backend

-   Node.js
-   Express.js
-   Mongoose
-   MongoDB Atlas
-   Firebase Admin SDK
-   CORS
-   dotenv

### Deployment

-   Vercel - frontend
-   Render - backend
-   MongoDB Atlas - blog database
-   Firebase - authentication and Firestore

------------------------------------------------------------------------

## Project Structure

``` text
My-blog-portfolio/
|
+-- backend/
|   +-- config/
|   |   +-- db.js
|   |   +-- firebaseAdmin.js
|   +-- controllers/
|   |   +-- blogController.js
|   +-- middleware/
|   |   +-- authenticate.js
|   |   +-- isAdmin.js
|   +-- models/
|   |   +-- Blog.js
|   +-- routes/
|   |   +-- blogRoutes.js
|   +-- scripts/
|   |   +-- setAdmin.js
|   +-- .env
|   +-- .gitignore
|   +-- package.json
|   +-- server.js
|
+-- frontend/
|   +-- src/
|   |   +-- components/
|   |   |   +-- Navbar.jsx
|   |   |   +-- ProtectedRoute.jsx
|   |   +-- context/
|   |   |   +-- authContext.jsx
|   |   +-- firebase/
|   |   |   +-- firebaseConfig.js
|   |   +-- pages/
|   |       +-- Login.jsx
|   |       +-- Signup.jsx
|   |       +-- Home.jsx
|   |       +-- About.jsx
|   |       +-- Skills.jsx
|   |       +-- Projects.jsx
|   |       +-- Blog.jsx
|   |       +-- BlogDetails.jsx
|   |       +-- Contact.jsx
|   |       +-- AdminDashboard.jsx
|   |       +-- AdminMessages.jsx
|   |   +-- App.jsx
|   |   +-- main.jsx
|   |   +-- index.css
|   +-- .env
|   +-- vercel.json
|   +-- package.json
|   +-- vite.config.js
|
+-- README.md
```

------------------------------------------------------------------------

## Application Routes

### Authentication

``` text
/login
/signup
```

### Protected portfolio

``` text
/home
/about
/skills
/projects
/blog
/blog/:id
/contact
```

### Admin

``` text
/admin
/admin/messages
```

The root route redirects to `/login`.

------------------------------------------------------------------------

## Backend API

Production backend:

``` text
https://my-blog-portfolio.onrender.com
```

### Public endpoints

Get published blogs:

``` http
GET /api/blogs
```

Get one published blog:

``` http
GET /api/blogs/:id
```

### Authenticated endpoint

Like/unlike a blog:

``` http
POST /api/blogs/:id/like
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

### Admin endpoints

Get all blogs:

``` http
GET /api/blogs/admin/all
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

Create:

``` http
POST /api/blogs
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

Update:

``` http
PUT /api/blogs/:id
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

Delete:

``` http
DELETE /api/blogs/:id
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

------------------------------------------------------------------------

## Authentication Flow

``` text
User
 |
 v
Firebase Login/Signup
 |
 v
Firebase User
 |
 v
Firebase ID Token
 |
 v
Frontend
 |
 | Authorization: Bearer <token>
 v
Express Backend
 |
 v
Firebase Admin SDK
 |
 v
verifyIdToken()
 |
 v
req.user
```

The backend verifies the token instead of trusting authentication
information sent by the browser.

------------------------------------------------------------------------

## Admin Authorization

The administrator receives this Firebase custom claim:

``` json
{
  "admin": true
}
```

The backend checks:

``` js
req.user.admin === true
```

If the user is not an administrator, protected admin APIs return:

``` http
403 Forbidden
```

### Assign the Admin Claim

The project contains:

``` text
backend/scripts/setAdmin.js
```

Put the administrator's Firebase UID in the script and run:

``` bash
cd backend
node scripts/setAdmin.js
```

After assigning the claim, log out and log in again so the Firebase ID
token is refreshed.

------------------------------------------------------------------------

## Environment Variables

### Frontend

Create:

``` text
frontend/.env
```

Example:

``` env
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

VITE_API_URL=http://localhost:5000
```

For production:

``` env
VITE_API_URL=https://my-blog-portfolio.onrender.com
```

### Backend

Create:

``` text
backend/.env
```

Example:

``` env
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING

FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL=YOUR_FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
```

Never commit real secrets to GitHub.

------------------------------------------------------------------------

## Firebase Firestore Rules

The contact collection is designed so authenticated users can submit
messages while only administrators can manage them.

``` text
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /contacts/{contactId} {
      allow create: if request.auth != null;

      allow read: if request.auth != null
        && request.auth.token.admin == true;

      allow update: if request.auth != null
        && request.auth.token.admin == true;

      allow delete: if request.auth != null
        && request.auth.token.admin == true;
    }
  }
}
```

------------------------------------------------------------------------

## Local Development

### Clone

``` bash
git clone https://github.com/mukeshmannai14/My-blog-portfolio.git
cd My-blog-portfolio
```

### Start backend

``` bash
cd backend
npm install
node server.js
```

Expected output:

``` text
MongoDB connected successfully
Server running on port 5000
```

Backend:

``` text
http://localhost:5000
```

### Start frontend

Open another terminal:

``` bash
cd frontend
npm install
npm run dev
```

Vite normally runs at:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

## Production Deployment

### Frontend - Vercel

Recommended settings:

``` text
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

Add these Vercel environment variables:

``` text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_API_URL
```

Production API URL:

``` text
https://my-blog-portfolio.onrender.com
```

### React Router on Vercel

Because the application is a Vite single-page application,
`frontend/vercel.json` contains:

``` json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This allows direct browser requests to routes such as `/login`, `/blog`,
and `/contact` to reach React Router instead of returning a Vercel 404.

### Backend - Render

Recommended settings:

``` text
Root Directory: backend
Build Command: npm install
Start Command: node server.js
```

Render environment variables:

``` text
MONGO_URI
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

Production backend:

``` text
https://my-blog-portfolio.onrender.com
```

------------------------------------------------------------------------

## CORS

For development, the backend may use:

``` js
app.use(cors());
```

For production, restrict CORS to the actual Vercel domain.

Example:

``` js
const allowedOrigins = [
  "http://localhost:5173",
  "https://YOUR-VERCEL-DOMAIN.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins
  })
);
```

Replace the example production domain with the real Vercel domain.

------------------------------------------------------------------------

## Security

### Never commit secrets

Do not commit:

``` text
.env
serviceAccountKey.json
```

Your `.gitignore` should include:

``` gitignore
node_modules/
.env
serviceAccountKey.json
```

### Firebase service account

The Firebase Admin private key must remain secret. If it is ever exposed
publicly, revoke the exposed key and create a new one.

### Admin authorization

Do not rely on a frontend variable such as:

``` js
isAdmin = true
```

The backend verifies the Firebase ID token and checks the custom claim.

### MongoDB

Use a secure MongoDB database user and appropriate network access rules.
Avoid unrestricted production database access where possible.

------------------------------------------------------------------------

## Database Design

### Blog document

``` js
{
  title: String,
  excerpt: String,
  content: String,
  image: String,
  author: String,
  likes: Number,
  likedBy: [String],
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

`likedBy` contains Firebase user UIDs. This lets the backend determine
whether a particular user has already liked a blog.

### Contact document

``` text
contacts/
  contactId/
    name
    email
    phone
    subject
    message
    userId
    userEmail
    createdAt
```

------------------------------------------------------------------------

## Request Security Model

``` text
Frontend
   |
   | Firebase ID Token
   v
authenticate middleware
   |
   | verifyIdToken()
   v
req.user
   |
   v
isAdmin middleware
   |
   | admin === true
   v
Blog Controller
   |
   v
MongoDB Atlas
```

Only routes that require administrative operations pass through both
authentication and admin authorization.

------------------------------------------------------------------------

## Common Problems

### Vercel 404 on `/login`

Cause: React Router is client-side, while Vercel initially receives the
request.

Solution: ensure `frontend/vercel.json` contains the SPA rewrite and
that Vercel Root Directory is `frontend`.

### Frontend still calls localhost

Check:

``` text
VITE_API_URL
```

and make sure API calls use:

``` js
`${API_URL}/api/blogs`
```

not:

``` text
http://localhost:5000/api/blogs
```

Remember that Vercel has its own environment variables.

### Admin redirects to Home

Check that the Firebase user has:

``` json
{
  "admin": true
}
```

Then log out and log back in.

### API returns 401

The Firebase ID token is missing, invalid, or expired. Check that the
frontend sends:

``` http
Authorization: Bearer <token>
```

### API returns 403

The user is authenticated but does not have the administrator custom
claim.

### Contact form fails

Check: - Firebase Authentication - Firestore database - Firestore
rules - Browser console - `contacts` collection

------------------------------------------------------------------------

## Testing Checklist

### Authentication

-   [ ] Signup
-   [ ] Login
-   [ ] Logout
-   [ ] Protected routes
-   [ ] Admin custom claim

### Portfolio

-   [ ] Home
-   [ ] About
-   [ ] Skills
-   [ ] Projects
-   [ ] Contact

### Blog

-   [ ] Blog list
-   [ ] Blog details
-   [ ] Like
-   [ ] Unlike
-   [ ] Like count
-   [ ] Published/draft

### Admin

-   [ ] Admin dashboard
-   [ ] Create
-   [ ] Edit
-   [ ] Delete
-   [ ] Publish/unpublish
-   [ ] Statistics
-   [ ] Admin messages

### Deployment

-   [ ] Vercel build succeeds
-   [ ] Render service runs
-   [ ] Vercel reaches Render
-   [ ] Firebase authentication works in production
-   [ ] MongoDB works in production
-   [ ] Firestore works in production
-   [ ] Direct React routes work
-   [ ] Mobile layout works

------------------------------------------------------------------------

## Git Workflow

Check changes:

``` bash
git status
```

Stage:

``` bash
git add .
```

Commit:

``` bash
git commit -m "Describe your changes"
```

Push:

``` bash
git push origin main
```

------------------------------------------------------------------------

## Useful Commands

Frontend:

``` bash
cd frontend
npm install
npm run dev
npm run build
```

Backend:

``` bash
cd backend
npm install
node server.js
```

Set admin:

``` bash
cd backend
node scripts/setAdmin.js
```

------------------------------------------------------------------------

## Future Improvements

Possible improvements:

-   Rich text editor
-   Markdown support
-   Image uploads
-   Cloudinary/Firebase Storage
-   Blog categories
-   Tags
-   Search
-   Pagination
-   Comments
-   View counters
-   Admin analytics
-   Read/unread contact messages
-   Email notifications
-   SEO metadata
-   Sitemap
-   Custom domain
-   Rate limiting
-   Helmet security headers
-   Request validation
-   Centralized error handling
-   Automated tests
-   CI/CD

------------------------------------------------------------------------

## Author

**Mukesh Kanna**

Full-Stack Developer

This project demonstrates practical full-stack development with:

``` text
React
Vite
Tailwind CSS
Node.js
Express
MongoDB
Firebase
REST APIs
Authentication
Authorization
Responsive Design
Cloud Deployment
```

## Repository

GitHub repository:

https://github.com/mukeshmannai14/My-blog-portfolio

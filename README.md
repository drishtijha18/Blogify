# 📝 Blogify (QuickBlog)

A modern, high-performance blogging platform built with the **MERN Stack** (MongoDB, Express, React 19, Node.js), powered by **Tailwind CSS v4** and **Vite**. Features a clean glassmorphism UI, interactive rich-text editor, admin moderation suite, and optional AI-assisted writing powered by Google Gemini.

---

## ✨ Features

- **⚡ Blazing Fast Client**: Built with **React 19** and **Vite** with instant HMR and optimized production bundles.
- **🎨 Modern Aesthetic**: Responsive design styled with **Tailwind CSS v4** and fluid micro-interactions with **Framer Motion**.
- **✍️ Rich Text Editing**: Quill editor integration for formatted articles, headings, and code blocks.
- **🔍 Real-Time Filter & Search**: Search blogs by title and filter across categories (Technology, Startup, Lifestyle, Finance).
- **🛡️ Admin Suite**:
  - Secure JWT authentication with protected admin routes.
  - Analytics dashboard tracking total blogs, comments, and drafts.
  - Full CRUD operations with publish/unpublish toggles.
  - Moderation workflow for public comments.
- **🤖 AI Integration**: Integrated with Google Gemini Flash for instant blog drafting from topics and prompts.
- **🖼️ Image Optimization**: Cloud asset handling and automated compression via ImageKit.
- **🌱 Instant Database Seeder**: One-command sample dataset to kickstart local testing.

---

## 🏗️ Project Architecture

```
Blogify/
├── client/                     # Frontend (React 19 + Vite + Tailwind v4)
│   ├── src/
│   │   ├── assets/             # Icons, illustrations, and static media
│   │   ├── components/         # Reusable UI components & admin controls
│   │   ├── context/            # React Context (global state & auth tokens)
│   │   └── pages/              # Route views (Home, Blog view, Admin views)
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API (Node.js + Express + Mongoose)
│   ├── configs/                # DB, Gemini, and ImageKit configurations
│   ├── controllers/            # Admin and Blog business logic
│   ├── middleware/             # JWT auth & Multer file upload
│   ├── models/                 # Mongoose schemas (Blog, Comment)
│   ├── routes/                 # Express API routes
│   ├── scripts/                # Database seed utility
│   ├── package.json
│   └── server.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **npm** (v9+)
- **MongoDB** running locally on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI

### 2. Clone and Install Dependencies

```bash
git clone https://github.com/drishtijha18/Blogify.git
cd Blogify

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Environment Configuration

#### Backend (`server/.env`)
Copy `server/.env.example` to `server/.env`:
```env
PORT=3000
JWT_SECRET=secret@2025
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=greatstack
MONGODB_URI=mongodb://127.0.0.1:27017

# Optional (for ImageKit and AI features):
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint
GEMINI_API_KEY=your_key
```

#### Frontend (`client/.env`)
Copy `client/.env.example` to `client/.env`:
```env
VITE_BASE_URL=http://localhost:3000
```

### 4. Seed Sample Data (Optional)

Populate your local MongoDB database with rich sample blog posts:
```bash
cd server
npm run seed
```

### 5. Run the Application

Start the backend API server:
```bash
cd server
npm start        # runs node server.js on port 3000
# or: npm run server (for nodemon auto-restart)
```

In a separate terminal, start the frontend dev server:
```bash
cd client
npm run dev      # runs Vite on port 5173 / 5174
```

Visit the app at **[http://localhost:5174](http://localhost:5174)** or **[http://localhost:5173](http://localhost:5173)**.

---

## 🔐 Admin Dashboard Access

- **Route:** `/admin`
- **Email:** `admin@example.com`
- **Password:** `greatstack`

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/` | API health check | No |
| `POST` | `/api/admin/login` | Admin authentication & JWT token generation | No |
| `GET` | `/api/admin/blogs` | Get all blogs for dashboard listing | Yes (Admin) |
| `GET` | `/api/admin/dashboard` | Aggregated dashboard metrics | Yes (Admin) |
| `GET` | `/api/admin/comments` | List all user comments for moderation | Yes (Admin) |
| `POST` | `/api/admin/approve-comment` | Approve comment for public display | Yes (Admin) |
| `POST` | `/api/admin/delete-comment` | Delete inappropriate comment | Yes (Admin) |
| `GET` | `/api/blog/all` | Get all published blogs | No |
| `GET` | `/api/blog/:blogId` | Get single blog by ID | No |
| `POST` | `/api/blog/add` | Create new blog post with image | Yes (Admin) |
| `POST` | `/api/blog/delete` | Delete blog post | Yes (Admin) |
| `POST` | `/api/blog/toggle-publish` | Toggle draft / published status | Yes (Admin) |
| `POST` | `/api/blog/add-comment` | Submit comment for review | No |
| `POST` | `/api/blog/comments` | Fetch approved comments for a blog | No |
| `POST` | `/api/blog/generate` | Generate draft content via Gemini AI | Yes (Admin) |

---

## 📄 License
ISC License.

# 🚀 blog-app (QuickBlog FullStack)

A modern, feature-rich blogging platform built with the **MERN Stack** (MongoDB, Express, React, Node.js). This application enables users to create, manage, and publish blogs with a premium UI, dark mode support, and comprehensive dashboard analytics.

## ✨ Features

### 🎨 User Interface & Experience
*   **Premium Design**: Modern, glassmorphism-inspired UI with smooth gradients and transitions.
*   **Dark Mode**: System-wide dark mode with a persistent toggle and beautiful color palettes.
*   **Responsive**: Fully optimized for customized experience on Desktop, Tablet, and Mobile.
*   **Rich Text Editor**: Integrated editor for creating beautiful blog posts.

### 🔐 Authentication & User Profile
*   **Secure Auth**: JWT-based authentication with properly hashed passwords (bcrypt).
*   **Profile Management**: Update name, email, and upload profile photos (integrated with **ImageKit**).
*   **Safety**: Protected routes ensure only authenticated users access admin features.

### 📊 Admin Dashboard
*   **Real-time Stats**: View total published blogs, comments, and drafts at a glance.
*   **Blog Management**: Create, edit, delete, and toggle publish status of blogs.
*   **Comment System**: distinct approval workflow for comments. Approve or delete user comments.
*   **Search & Filter**: dedicated search functionality to find blogs easily.

## 🛠️ Tech Stack

### Frontend
*   **React.js** (Vite)
*   **Tailwind CSS** (Styling & Dark Mode)
*   **Context API** (State Management)
*   **Axios** (API Requests)
*   **React Hot Toast** (Notifications)

### Backend
*   **Node.js & Express.js**
*   **MongoDB & Mongoose** (Database)
*   **JWT & Bcrypt** (Auth security)
*   **Multer** (File handling)
*   **ImageKit** (Image storage & optimization)

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd QuickBlog-FullStack
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
QuickBlog-FullStack/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # App state (Auth, Theme)
│   │   ├── pages/          # Page components (Home, Dashboard, etc.)
│   │   └── assets/         # Images and icons
│   └── ...
├── server/                 # Backend Node.js Application
│   ├── controllers/        # Logic for routes
│   ├── models/             # Mongoose database models
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth & Upload middleware
│   └── ...
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request for any feature improvements or bug fixes.

---
*Built with ❤️ by Drishti Jha*
# Blogify

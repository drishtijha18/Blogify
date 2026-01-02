# QuickBlog Deployment Guide

This guide will help you deploy your QuickBlog application to Vercel (frontend) and Render (backend).

## Prerequisites
- GitHub repository: `drishtijha18/Blogify` ✅
- Vercel account: [vercel.com](https://vercel.com)
- Render account: [render.com](https://render.com)

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Configure Environment Variables
Before deploying, update your client `.env` to point to your production backend URL.

After deploying the backend to Render, you'll update this to:
```
VITE_BASE_URL=https://your-backend-app.onrender.com
```

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"

2. **Import from GitHub**
   - Select your repository: `drishtijha18/Blogify`
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add: `VITE_BASE_URL` = `https://your-backend-app.onrender.com` (update after deploying backend)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (~2-3 minutes)

### Step 3: Update Environment Variable
After your backend is deployed to Render:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `VITE_BASE_URL` with your actual Render backend URL
3. Redeploy the application

---

## ⚙️ Backend Deployment (Render)

### Step 1: Create Web Service

1. **Go to Render Dashboard**
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Select "Build and deploy from a Git repository"
   - Click "Connect" next to `drishtijha18/Blogify`

3. **Configure Build Settings**
   - **Name**: `quickblog-api` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Select Plan**
   - Choose "Free" tier (or paid tier for better performance)

### Step 2: Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add the following:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `secret@2025` (⚠️ Change to a stronger secret!) |
| `MONGODB_URI` | `mongodb+srv://drishtijha5002_db_user:L4de06UGWDVfbcoC@cluster0.padsrtt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` |
| `IMAGEKIT_PUBLIC_KEY` | `public_GMPK3496lA+19iF5MeLpjYUvSj0=` |
| `IMAGEKIT_PRIVATE_KEY` | `private_xEc/yGitj+mvV3pIbZNwlRxmiE0=` |
| `IMAGEKIT_URL_ENDPOINT` | `https://ik.imagekit.io/hqh5ff9rn` |

> ⚠️ **Security Warning**: Your JWT_SECRET is weak. Consider generating a stronger secret using:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### Step 3: Deploy

1. Click "Create Web Service"
2. Wait for the build to complete (~5-10 minutes)
3. Once deployed, copy your service URL (e.g., `https://quickblog-api.onrender.com`)

### Step 4: Update CORS Settings

Your backend needs to allow requests from your Vercel frontend. Update your server code if needed to include your Vercel domain in CORS settings.

---

## 🔗 Final Steps

### 1. Update Frontend Environment Variable
- Go to Vercel → Your Project → Settings → Environment Variables
- Update `VITE_BASE_URL` to your Render backend URL
- Redeploy from Vercel Dashboard

### 2. Test Your Application
- Visit your Vercel URL (e.g., `https://quickblog-xyz.vercel.app`)
- Test login/signup functionality
- Create a test blog post
- Verify image uploads work
- Check comments functionality

### 3. Monitor Deployments
- **Vercel**: Auto-deploys on every push to `main` branch
- **Render**: Auto-deploys on every push to `main` branch

---

## 📝 Important URLs

After deployment, save these URLs:

- **Frontend (Vercel)**: `https://your-app.vercel.app`
- **Backend (Render)**: `https://your-backend-app.onrender.com`
- **MongoDB Atlas**: `https://cloud.mongodb.com`
- **ImageKit**: `https://imagekit.io`

---

## 🐛 Troubleshooting

### Frontend Issues
- **Build fails**: Check if all dependencies are in `package.json`
- **API calls fail**: Verify `VITE_BASE_URL` is correctly set
- **Routing issues**: Ensure `vercel.json` is properly configured

### Backend Issues
- **Build fails**: Check Node version compatibility
- **Database connection fails**: Verify MongoDB URI and IP whitelist
- **Environment variables missing**: Double-check all variables are set in Render
- **Cold starts**: Free tier sleeps after 15min inactivity (first request may be slow)

### CORS Errors
Make sure your backend CORS configuration includes your Vercel domain:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-app.vercel.app'
];
```

---

## 🎉 Success!

Once both deployments are complete and configured:
- ✅ Your frontend is live on Vercel
- ✅ Your backend is running on Render
- ✅ Database is hosted on MongoDB Atlas
- ✅ Images are stored on ImageKit

Your QuickBlog is now accessible worldwide! 🚀

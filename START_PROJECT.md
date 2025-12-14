# How to Start the Instagram Clone Project

## Quick Start Guide

### Prerequisites Check
Before starting, make sure you have:
- ✅ **Node.js** installed (v14 or higher)
- ✅ **MongoDB** running on your system

---

## Step-by-Step Instructions

### Step 1: Start MongoDB

**Windows:**
- MongoDB should be running as a service
- If not, open Services (Win + R → `services.msc`) and start "MongoDB"
- Or run: `mongod` in a terminal

**Check if MongoDB is running:**
- Open a browser and go to: `http://localhost:27017`
- If you see "It looks like you are trying to access MongoDB over HTTP", MongoDB is running ✅

---

### Step 2: Start Backend Server

1. **Open Terminal/PowerShell** (Terminal 1)

2. **Navigate to backend folder:**
```bash
cd C:\Users\nandi\instagram-clone\backend
```

3. **Install dependencies** (if not already installed):
```bash
npm install
```

4. **Check .env file exists:**
   - Make sure `backend/.env` file exists
   - If not, copy from `.env.example`:
   ```bash
   copy .env.example .env
   ```
   - Or create `.env` with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/instagram-clone
   JWT_SECRET=your-secret-key-change-this-in-production
   NODE_ENV=development
   ```

5. **Start the backend server:**
```bash
npm run dev
```

**You should see:**
```
MongoDB connected successfully
Server running on port 5000
```

✅ **Keep this terminal open!**

---

### Step 3: Start Frontend Server

1. **Open a NEW Terminal/PowerShell** (Terminal 2)
   - ⚠️ Keep the backend terminal running!

2. **Navigate to frontend folder:**
```bash
cd C:\Users\nandi\instagram-clone\frontend
```

3. **Install dependencies** (if not already installed):
```bash
npm install
```

4. **Start the frontend server:**
```bash
npm run dev
```

**You should see:**
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
```

✅ **Keep this terminal open too!**

---

### Step 4: Access the Application

1. **Open your web browser** (Chrome, Firefox, Edge, etc.)

2. **Go to:** `http://localhost:3000`

3. **You should see the login page!**

---

## First Time Usage

### Create Your Account

1. Click **"Sign up"** or go to: `http://localhost:3000/auth/signup`

2. Fill in the form:
   - **Username:** (e.g., `johndoe`)
   - **Email:** (e.g., `john@example.com`)
   - **Password:** (min 6 characters)

3. Click **"Sign Up"**

4. You'll be automatically logged in and redirected to the home feed!

### Create Your First Post

1. Click **"Create Post"** in the navigation bar

2. Enter an **Image URL** (try one of these):
   ```
   https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800
   https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800
   https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800
   ```

3. Add a **Caption** (optional)

4. Click **"Create Post"**

5. Your post will appear in your feed! 🎉

---

## Troubleshooting

### Backend won't start?

**Error: "MongoDB connection error"**
- Make sure MongoDB is running
- Check MongoDB service in Windows Services
- Verify `MONGODB_URI` in `.env` file

**Error: "Port 5000 already in use"**
- Another app is using port 5000
- Change `PORT=5001` in `backend/.env`
- Update frontend `.env.local` with new port

**Error: "Cannot find module"**
- Run `npm install` again in the backend folder

### Frontend won't start?

**Error: "Port 3000 already in use"**
- Next.js will automatically use port 3001
- Or stop the other process using port 3000

**Error: "Cannot connect to API"**
- Make sure backend is running on port 5000
- Check browser console (F12) for errors

**Error: "Module not found"**
- Run `npm install` again in the frontend folder

### Can't see posts?

- Make sure you're logged in
- Create a post first
- Follow other users to see their posts in your feed

---

## Stopping the Servers

To stop the servers:
1. Go to each terminal window
2. Press `Ctrl + C`
3. Confirm if prompted

---

## Quick Commands Reference

### Backend (Terminal 1)
```bash
cd backend
npm install          # First time only
npm run dev         # Start development server
npm start           # Production mode
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install          # First time only
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
```

---

## URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **API Health Check:** http://localhost:5000/api/health

---

## Need Help?

1. Check both terminal windows for error messages
2. Check browser console (F12 → Console tab)
3. Verify MongoDB is running
4. Make sure both servers are running
5. Check the main `README.md` for detailed documentation

---

## Success Checklist

- [ ] MongoDB is running
- [ ] Backend server shows "Server running on port 5000"
- [ ] Backend shows "MongoDB connected successfully"
- [ ] Frontend server shows "Local: http://localhost:3000"
- [ ] Browser opens to login page at http://localhost:3000
- [ ] Can create account and login
- [ ] Can create posts
- [ ] Can see posts in feed

🎉 **You're all set! Enjoy your Instagram Clone!**

# Instagram Clone - Full Stack Application

A full-stack Instagram-style social media application built with Node.js/Express backend and Next.js frontend.

## Features

### Backend Features
- ✅ User Authentication (Signup/Login with JWT tokens)
- ✅ Password Hashing (bcrypt)
- ✅ Follow/Unfollow System
- ✅ Post Creation (Image URL + Caption)
- ✅ Like/Unlike Posts
- ✅ Comment on Posts
- ✅ Feed API (Posts from followed users)
- ✅ User Profiles with follower/following counts

### Frontend Features
- ✅ Login & Signup Screens
- ✅ Home Feed (Posts from followed users)
- ✅ Create Post Screen
- ✅ Profile Page (with Follow/Unfollow)
- ✅ Post Detail Page (with Like/Comment UI)
- ✅ Responsive Design
- ✅ Token-based Authentication
- ✅ Dynamic UI Updates

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- **CSS** - Styling

## Project Structure

```
instagram-clone/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── Post.js          # Post model
│   │   └── Follow.js        # Follow relationship model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── users.js         # User profile & follow routes
│   │   ├── posts.js         # Post CRUD & like/comment routes
│   │   └── feed.js          # Feed route
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── server.js            # Express server setup
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── components/
│   │   ├── Layout.js        # Navigation layout
│   │   └── PostCard.js      # Post display component
│   ├── lib/
│   │   ├── api.js           # API client functions
│   │   └── auth.js          # Auth utility functions
│   ├── pages/
│   │   ├── index.js         # Home feed
│   │   ├── auth/
│   │   │   ├── login.js     # Login page
│   │   │   └── signup.js    # Signup page
│   │   ├── create-post.js   # Create post page
│   │   ├── profile/
│   │   │   └── [userId].js  # User profile page
│   │   └── posts/
│   │       └── [postId].js  # Post detail page
│   ├── styles/
│   │   └── globals.css      # Global styles
│   ├── package.json
│   └── next.config.js
└── README.md
```

## Database Schema

### User Model
- `username` (String, unique, required)
- `email` (String, unique, required)
- `password` (String, hashed, required)
- `profilePicture` (String, optional)
- `bio` (String, optional)
- `createdAt`, `updatedAt` (timestamps)

### Post Model
- `user` (ObjectId, ref: User, required)
- `imageUrl` (String, required)
- `caption` (String, optional, max 500 chars)
- `likes` (Array of ObjectIds, ref: User)
- `comments` (Array of objects with user, text, createdAt)
- `createdAt`, `updatedAt` (timestamps)

### Follow Model
- `follower` (ObjectId, ref: User, required)
- `following` (ObjectId, ref: User, required)
- Unique constraint on (follower, following)
- Prevents self-follow

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/:userId` - Get user profile
- `POST /api/users/:userId/follow` - Follow a user
- `DELETE /api/users/:userId/follow` - Unfollow a user
- `GET /api/users/:userId/posts` - Get user's posts

### Posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:postId` - Get a single post
- `POST /api/posts/:postId/like` - Like a post
- `DELETE /api/posts/:postId/like` - Unlike a post
- `POST /api/posts/:postId/comment` - Add a comment
- `DELETE /api/posts/:postId` - Delete a post (owner only)

### Feed
- `GET /api/feed` - Get feed (posts from followed users)

## Quick Start

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Install locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Step 1: Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instagram-clone
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

5. Make sure MongoDB is running on your system.

6. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

**Keep this terminal window open!**

### Step 2: Frontend Setup (New Terminal)

Open a **NEW terminal window** (keep backend running):

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional, defaults to localhost:5000):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Step 3: Access the Application

1. **Open your web browser**
2. **Go to:** `http://localhost:3000`
3. **Create an account** or **login** to get started!

## Usage

1. **Sign Up**: Create a new account at `/auth/signup`
2. **Login**: Login with your credentials at `/auth/login`
3. **Home Feed**: View posts from users you follow at `/`
4. **Create Post**: Add a new post at `/create-post`
5. **Profile**: View user profiles at `/profile/[userId]`
6. **Post Detail**: View full post with comments at `/posts/[postId]`

## Testing with Postman

A Postman collection is available in the `postman` directory. Import it into Postman to test all API endpoints.

### Authentication Flow
1. Sign up a new user
2. Copy the token from the response
3. Use the token in the Authorization header: `Bearer <token>`
4. Test protected endpoints

## API Request Examples

### Signup
```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Post (requires auth token)
```bash
POST http://localhost:5000/api/posts
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "imageUrl": "https://example.com/image.jpg",
  "caption": "My first post!"
}
```

### Follow User (requires auth token)
```bash
POST http://localhost:5000/api/users/<userId>/follow
Authorization: Bearer <your-token>
```

## Development Notes

- All protected routes require a valid JWT token in the Authorization header
- Passwords are hashed using bcrypt before storage
- JWT tokens expire after 7 days
- The feed only shows posts from users you follow
- Users cannot follow themselves

## Future Enhancements

- Image upload functionality (currently uses URLs)
- Real-time notifications
- Direct messaging
- Stories feature
- Search functionality
- Hashtags
- Post editing

## License

This project is for educational purposes.

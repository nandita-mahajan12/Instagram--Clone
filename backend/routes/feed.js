const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const Follow = require('../models/Follow');
const router = express.Router();

// Get feed (posts from users that the current user follows + own posts)
router.get('/', auth, async (req, res) => {
  try {
    // Get list of users that the current user follows
    const following = await Follow.find({ follower: req.user._id });
    const followingIds = following.map(f => f.following);

    // Include current user's own posts in the feed
    const userIdsToShow = [...followingIds, req.user._id];

    // Get posts from followed users and own posts, sorted by creation date (newest first)
    const posts = await Post.find({ user: { $in: userIdsToShow } })
      .populate('user', 'username profilePicture')
      .populate('likes', 'username')
      .populate('comments.user', 'username profilePicture')
      .sort({ createdAt: -1 })
      .limit(50); // Limit to 50 most recent posts

    // Add isLiked property to each post
    const postsWithLiked = posts.map(post => ({
      ...post.toObject(),
      isLiked: post.likes.some(like => like._id.toString() === req.user._id.toString())
    }));

    res.json({
      posts: postsWithLiked,
      count: postsWithLiked.length
    });
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

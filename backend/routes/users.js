const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Follow = require('../models/Follow');
const Post = require('../models/Post');
const router = express.Router();

// Get user profile
router.get('/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get follower and following counts
    const followersCount = await Follow.countDocuments({ following: req.params.userId });
    const followingCount = await Follow.countDocuments({ follower: req.params.userId });

    // Get posts count
    const postsCount = await Post.countDocuments({ user: req.params.userId });

    // Check if current user follows this user
    const isFollowing = await Follow.findOne({
      follower: req.user._id,
      following: req.params.userId
    });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio,
        createdAt: user.createdAt
      },
      followersCount,
      followingCount,
      postsCount,
      isFollowing: !!isFollowing
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Follow a user
router.post('/:userId/follow', auth, async (req, res) => {
  try {
    const targetUserId = req.params.userId;

    if (targetUserId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: req.user._id,
      following: targetUserId
    });

    if (existingFollow) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    // Create follow relationship
    const follow = new Follow({
      follower: req.user._id,
      following: targetUserId
    });

    await follow.save();

    res.json({ message: 'Successfully followed user' });
  } catch (error) {
    console.error('Follow user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Unfollow a user
router.delete('/:userId/follow', auth, async (req, res) => {
  try {
    const targetUserId = req.params.userId;

    const follow = await Follow.findOneAndDelete({
      follower: req.user._id,
      following: targetUserId
    });

    if (!follow) {
      return res.status(404).json({ message: 'Not following this user' });
    }

    res.json({ message: 'Successfully unfollowed user' });
  } catch (error) {
    console.error('Unfollow user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's posts
router.get('/:userId/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate('user', 'username profilePicture')
      .populate('likes', 'username')
      .populate('comments.user', 'username profilePicture')
      .sort({ createdAt: -1 });

    const postsWithLiked = posts.map(post => ({
      ...post.toObject(),
      isLiked: post.likes.some(like => like._id.toString() === req.user._id.toString())
    }));

    res.json(postsWithLiked);
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

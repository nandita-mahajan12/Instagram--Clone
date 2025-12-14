const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const router = express.Router();

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    console.log('POST /api/posts - Request received');
    console.log('User:', req.user._id, req.user.username);
    console.log('Body:', req.body);

    const { imageUrl, caption } = req.body;

    if (!imageUrl) {
      console.log('Validation failed: Image URL is required');
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const post = new Post({
      user: req.user._id,
      imageUrl,
      caption: caption || ''
    });

    console.log('Saving post to database...');
    await post.save();
    await post.populate('user', 'username profilePicture');
    console.log('Post saved successfully:', post._id);

    res.status(201).json({
      message: 'Post created successfully',
      post: {
        ...post.toObject(),
        likes: [],
        comments: []
      }
    });
  } catch (error) {
    console.error('Create post error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a single post
router.get('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('user', 'username profilePicture')
      .populate('likes', 'username')
      .populate('comments.user', 'username profilePicture');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const postObj = post.toObject();
    postObj.isLiked = post.likes.some(like => like._id.toString() === req.user._id.toString());

    res.json(postObj);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like a post
router.post('/:postId/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if already liked
    const alreadyLiked = post.likes.some(
      like => like.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    post.likes.push(req.user._id);
    await post.save();

    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Unlike a post
router.delete('/:postId/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.findIndex(
      like => like.toString() === req.user._id.toString()
    );

    if (likeIndex === -1) {
      return res.status(400).json({ message: 'Post not liked' });
    }

    post.likes.splice(likeIndex, 1);
    await post.save();

    res.json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error('Unlike post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a comment to a post
router.post('/:postId/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      user: req.user._id,
      text: text.trim()
    });

    await post.save();
    await post.populate('comments.user', 'username profilePicture');

    const newComment = post.comments[post.comments.length - 1];

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a post
router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.postId);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

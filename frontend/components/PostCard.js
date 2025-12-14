import { useState } from 'react';
import { useRouter } from 'next/router';
import { HeartIcon, CommentIcon } from './Icons';

export default function PostCard({ post, onLike, showFullPost = false }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(newLikedState ? likesCount + 1 : likesCount - 1);
    if (onLike) {
      onLike(post._id, !newLikedState);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'JUST NOW';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}M AGO`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}H AGO`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}D AGO`;
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <div className="post-card fade-in">
      <div className="post-header">
        <div className="post-header-left" onClick={() => router.push(`/profile/${post.user._id}`)}>
          {post.user.profilePicture ? (
            <img
              src={post.user.profilePicture}
              alt={post.user.username}
              className="post-avatar"
            />
          ) : (
            <div className="post-avatar-placeholder">
              {post.user.username.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="post-username">{post.user.username}</span>
        </div>
      </div>

      <div 
        className="post-image-container"
        onClick={() => !showFullPost && router.push(`/posts/${post._id}`)}
      >
        <img
          src={post.imageUrl}
          alt={post.caption || 'Post'}
          className="post-image"
        />
      </div>

      <div className="post-actions">
        <div className="post-actions-left">
          <button 
            className="post-action-btn" 
            onClick={handleLikeClick}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <HeartIcon filled={isLiked} />
          </button>
          <button 
            className="post-action-btn"
            onClick={() => router.push(`/posts/${post._id}`)}
            aria-label="Comment"
          >
            <CommentIcon />
          </button>
        </div>
      </div>

      {likesCount > 0 && (
        <div className="post-likes">
          {likesCount.toLocaleString()} {likesCount === 1 ? 'like' : 'likes'}
        </div>
      )}

      {post.caption && (
        <div className="post-caption">
          <strong>{post.user.username}</strong>
          {post.caption}
        </div>
      )}

      {showFullPost && post.comments && post.comments.length > 0 && (
        <div className="post-comments">
          {post.comments.map((comment, index) => (
            <div key={index} className="post-comment">
              <strong>{comment.user.username}</strong>
              {comment.text}
            </div>
          ))}
        </div>
      )}

      {!showFullPost && post.comments && post.comments.length > 0 && (
        <div className="post-comments">
          <span
            className="post-comment-link"
            onClick={() => router.push(`/posts/${post._id}`)}
          >
            View all {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
          </span>
        </div>
      )}

      <div className="post-timestamp">{formatTime(post.createdAt)}</div>
    </div>
  );
}

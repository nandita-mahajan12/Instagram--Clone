import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { postsAPI } from '../../lib/api';
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';

export default function PostDetail() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const data = await postsAPI.getPost(postId);
      setPost(data);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId, isLiked) => {
    try {
      if (isLiked) {
        await postsAPI.unlike(postId);
      } else {
        await postsAPI.like(postId);
      }
      fetchPost();
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      await postsAPI.comment(postId, commentText);
      setCommentText('');
      fetchPost();
    } catch (err) {
      console.error('Error adding comment:', err);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div>Loading post...</div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '40px', color: '#ed4956' }}>
          <div>{error || 'Post not found'}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container" style={{ paddingTop: '20px', maxWidth: '614px' }}>
        <PostCard post={post} onLike={handleLike} showFullPost={true} />
        
        <div className="post-card" style={{ marginTop: '24px' }}>
          <form onSubmit={handleComment} style={{ 
            display: 'flex', 
            alignItems: 'center',
            padding: '12px 16px',
            borderTop: '1px solid #efefef'
          }}>
            <input
              type="text"
              className="input"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ 
                flex: 1, 
                border: 'none',
                backgroundColor: 'transparent',
                padding: '0',
                fontSize: '14px'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submittingComment || !commentText.trim()}
              style={{ 
                padding: '0',
                background: 'transparent',
                color: commentText.trim() ? '#0095f6' : '#c0dffd',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: commentText.trim() ? 'pointer' : 'default'
              }}
            >
              {submittingComment ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

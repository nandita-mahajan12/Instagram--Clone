import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { feedAPI, postsAPI } from '../lib/api';
import { isAuthenticated } from '../lib/auth';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    fetchFeed();
  }, [router.pathname]); // Refresh when pathname changes

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const data = await feedAPI.getFeed();
      setPosts(data.posts || []);
      setError('');
    } catch (err) {
      console.error('Error fetching feed:', err);
      setError('Failed to load feed. Please try again.');
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
      // Refresh feed to get updated likes
      fetchFeed();
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div>Loading feed...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '40px', color: '#ed4956' }}>
          <div>{error}</div>
          <button onClick={fetchFeed} className="btn btn-primary" style={{ marginTop: '20px' }}>
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container" style={{ paddingTop: '20px' }}>
        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📸</div>
            <h2 className="empty-state-title">No Posts Yet</h2>
            <p className="empty-state-text">
              Follow some users to see their posts in your feed, or create your own post!
            </p>
            <button
              onClick={() => router.push('/create-post')}
              className="btn btn-primary"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLike={handleLike}
              showFullPost={false}
            />
          ))
        )}
      </div>
    </Layout>
  );
}

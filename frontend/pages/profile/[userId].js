import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usersAPI } from '../../lib/api';
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import { postsAPI } from '../../lib/api';

export default function Profile() {
  const router = useRouter();
  const { userId } = router.query;
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchProfile();
      fetchPosts();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const data = await usersAPI.getProfile(userId);
      setProfile(data);
      setFollowing(data.isFollowing);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const data = await usersAPI.getUserPosts(userId);
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleFollow = async () => {
    try {
      if (following) {
        await usersAPI.unfollow(userId);
        setFollowing(false);
        if (profile) {
          setProfile({ ...profile, followersCount: profile.followersCount - 1 });
        }
      } else {
        await usersAPI.follow(userId);
        setFollowing(true);
        if (profile) {
          setProfile({ ...profile, followersCount: profile.followersCount + 1 });
        }
      }
    } catch (err) {
      console.error('Error toggling follow:', err);
    }
  };

  const handleLike = async (postId, isLiked) => {
    try {
      if (isLiked) {
        await postsAPI.unlike(postId);
      } else {
        await postsAPI.like(postId);
      }
      fetchPosts();
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div>Loading profile...</div>
        </div>
      </Layout>
    );
  }

  if (error || !profile) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '40px', color: '#ed4956' }}>
          <div>{error || 'Profile not found'}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar-container">
            {profile.user.profilePicture ? (
              <img
                src={profile.user.profilePicture}
                alt={profile.user.username}
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                {profile.user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-details">
            <div className="profile-header-top">
              <h1 className="profile-username">{profile.user.username}</h1>
              <button
                onClick={handleFollow}
                className={`btn ${following ? 'btn-secondary' : 'btn-primary'}`}
              >
                {following ? 'Unfollow' : 'Follow'}
              </button>
            </div>
            <div className="profile-stats">
              <div className="profile-stat">
                <strong>{profile.postsCount}</strong> posts
              </div>
              <div className="profile-stat">
                <strong>{profile.followersCount.toLocaleString()}</strong> followers
              </div>
              <div className="profile-stat">
                <strong>{profile.followingCount.toLocaleString()}</strong> following
              </div>
            </div>
            {profile.user.bio && (
              <div className="profile-bio">{profile.user.bio}</div>
            )}
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📷</div>
          <h2 className="empty-state-title">No Posts Yet</h2>
        </div>
      ) : (
        <div className="profile-posts-grid">
          {posts.map((post) => (
            <div
              key={post._id}
              className="profile-post-item"
              onClick={() => router.push(`/posts/${post._id}`)}
            >
              <img src={post.imageUrl} alt={post.caption || 'Post'} />
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

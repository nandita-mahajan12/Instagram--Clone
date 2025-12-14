import { useState } from 'react';
import { useRouter } from 'next/router';
import { postsAPI } from '../lib/api';
import Layout from '../components/Layout';

export default function CreatePost() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Creating post with:', { imageUrl, caption });
      const result = await postsAPI.create(imageUrl, caption);
      console.log('Post created successfully:', result);
      // Redirect to home and the feed will auto-refresh
      router.push('/');
    } catch (err) {
      console.error('Error creating post:', err);
      console.error('Error response:', err.response);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create post. Please try again.';
      setError(errorMessage);
      
      // Check for common issues
      if (err.response?.status === 401) {
        setError('Authentication failed. Please login again.');
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else if (err.response?.status === 0 || err.message?.includes('Network')) {
        setError('Cannot connect to server. Make sure the backend is running on port 5000.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container" style={{ paddingTop: '40px', maxWidth: '614px' }}>
        <div className="card" style={{ padding: '32px' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '24px', textAlign: 'center', fontWeight: 600 }}>
            Create New Post
          </h1>

          {error && (
            <div className="form-error" style={{ marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                className="input"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Caption</label>
              <textarea
                className="input"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                maxLength={500}
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
              />
              <div style={{ fontSize: '12px', color: '#8e8e8e', marginTop: '4px', textAlign: 'right' }}>
                {caption.length}/500
              </div>
            </div>

            {imageUrl && (
              <div style={{ marginBottom: '24px' }}>
                <label className="form-label" style={{ marginBottom: '8px' }}>Preview</label>
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '1',
                  border: '1px solid #dbdbdb',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  backgroundColor: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner" style={{ marginRight: '8px' }}></span>
                  Creating...
                </>
              ) : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

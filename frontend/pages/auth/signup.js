import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '../../lib/api';
import { setToken, isAuthenticated } from '../../lib/auth';

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.signup(username, email, password);
      setToken(data.token);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#fafafa'
    }}>
      <div className="form-container">
        <h1 className="form-title" style={{ fontFamily: 'inherit', fontSize: '51px', fontWeight: 400 }}>
          Instagram
        </h1>
        <p className="form-subtitle">
          Sign up to see photos and videos from your friends.
        </p>
        
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              maxLength={30}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="input"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner" style={{ marginRight: '8px' }}></span>
                Signing up...
              </>
            ) : 'Sign Up'}
          </button>
        </form>

        <div className="form-footer">
          Already have an account?{' '}
          <a href="/auth/login">Log in</a>
        </div>
      </div>
    </div>
  );
}

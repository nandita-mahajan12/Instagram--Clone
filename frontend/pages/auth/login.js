import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '../../lib/api';
import { setToken, isAuthenticated } from '../../lib/auth';

export default function Login() {
  const router = useRouter();
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
      const data = await authAPI.login(email, password);
      setToken(data.token);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
        
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
                Logging in...
              </>
            ) : 'Log In'}
          </button>
        </form>

        <div className="form-footer">
          Don't have an account?{' '}
          <a href="/auth/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}

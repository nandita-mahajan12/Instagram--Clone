import { useRouter } from 'next/router';
import { removeToken, isAuthenticated } from '../lib/auth';
import { InstagramLogo, HomeIcon, CreateIcon } from './Icons';

export default function Layout({ children }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      removeToken();
      router.push('/auth/login');
    }
  };

  if (!isAuthenticated()) {
    return <>{children}</>;
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand" onClick={() => router.push('/')}>
            <InstagramLogo />
          </div>
          <div className="navbar-links">
            <a 
              href="/" 
              className="navbar-link"
              style={{ opacity: currentPath === '/' ? 1 : 0.6 }}
            >
              <HomeIcon filled={currentPath === '/'} />
            </a>
            <a 
              href="/create-post" 
              className="navbar-link"
              style={{ opacity: currentPath === '/create-post' ? 1 : 0.6 }}
            >
              <CreateIcon />
            </a>
            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ padding: '6px 12px', fontSize: '14px', marginLeft: '8px' }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div style={{ minHeight: 'calc(100vh - 60px)', backgroundColor: '#fafafa' }}>
        {children}
      </div>
    </div>
  );
}

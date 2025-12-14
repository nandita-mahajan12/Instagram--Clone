import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../lib/auth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthPage = router.pathname.startsWith('/auth');
      const authenticated = isAuthenticated();
      
      if (!isAuthPage && !authenticated) {
        router.push('/auth/login');
      } else if (isAuthPage && authenticated) {
        router.push('/');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router.pathname]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;

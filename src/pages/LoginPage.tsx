import { useEffect, useState } from 'react';
import LoginSplashView from '../components/login/LoginSplashView';
import LoginMainView from '../components/login/LoginMainView';

const LoginPage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="transition-colors min-h-screen">
      {showSplash ? <LoginSplashView /> : <LoginMainView />}
    </div>
  );
};
export default LoginPage;
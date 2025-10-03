import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';


const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    
      <div className="w-full h-full">
        {showLogin ? (
          <Login onSwitchToSignup={() => setShowLogin(false)} />
        ) : (
          <Signup onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    
  );
};

export default AuthPage;
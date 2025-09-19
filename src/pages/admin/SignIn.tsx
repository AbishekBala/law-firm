import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/services/adminAuth';
import { Button } from '@/components/ui/button';

// Local dev credential
const DEFAULT_ADMIN = { username: 'admin', password: 'admin@123' };

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAdminAuth();

  const from = (location.state as any)?.from?.pathname || '/admin';

  const submit = (e: any) => {
    e.preventDefault();
    setError('');
    // simple username check for local dev
    if (username !== DEFAULT_ADMIN.username) {
      setError('Unknown username');
      return;
    }
    const ok = signIn(password);
    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4zm0 0v6" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-legal-navy">Welcome Back</h2>
          <p className="text-neutral-500 mt-2">Sign in to your admin account to continue</p>
        </div>

  <div className="bg-white rounded-2xl shadow-lg p-8 admin-fade-in">
          <h3 className="text-xl font-semibold mb-2">Sign In</h3>
          <p className="text-sm text-neutral-500 mb-6">Enter your credentials to access your account</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="contact-input" placeholder="Enter your username" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="contact-input" placeholder="Enter your password" />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="mt-4">
              <Button type="submit" className="w-full bg-legal-gold text-white hover:shadow-lg transition-all">Sign In</Button>
            </div>
          </form>

          <div className="mt-6 bg-neutral-50 p-4 rounded-md text-sm text-neutral-600">
            <div className="font-semibold mb-1">Demo Credentials:</div>
            <div>User: user / 1234</div>
            <div>Admin: admin / admin@123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

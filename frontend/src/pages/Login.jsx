import { useState, useContext } from 'react';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaLock, FaUserShield } from 'react-icons/fa';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      //localStorage.setItem('token', res.data.token);
      const profile = await axios.get('/auth/me');
      setUser(profile.data);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-indigo-100 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-300 blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-indigo-200 blur-xl"></div>
        </div>
        
        <div className="text-center relative z-10 w-full">
          <div className="mb-8 flex justify-center">
            <div className="bg-indigo-600 p-4 rounded-full shadow-lg text-white">
              <FaUserShield className="text-3xl" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-indigo-900 mb-6">Secure Access</h2>
          
          <div className="space-y-8 max-w-xs mx-auto">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 p-3 rounded-lg text-white">
                <FaLock className="text-xl" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-indigo-900">End-to-end encryption</h3>
                <p className="text-sm text-indigo-700">All data is securely encrypted</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 p-3 rounded-lg text-white">
                <FaLock className="text-xl" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-indigo-900">Two-factor authentication</h3>
                <p className="text-sm text-indigo-700">Extra layer of security</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 p-3 rounded-lg text-white">
                <FaLock className="text-xl" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-indigo-900">Enterprise-grade security</h3>
                <p className="text-sm text-indigo-700">Compliance with industry standards</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-indigo-700">
            <p>Your data security is our top priority</p>
          </div>
        </div>
      </div>
        
        <div className="md:w-3/5 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-indigo-900">Welcome Back</h1>
              <p className="text-indigo-600 mt-2">Sign in to continue to your dashboard</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-indigo-800 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-indigo-800 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-indigo-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-indigo-800">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="/forgot-password" className="font-medium text-indigo-700 hover:text-indigo-900">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition font-medium shadow-md"
              >
                Sign In
              </button>

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-indigo-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-indigo-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-2.5 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition mt-6"
              >
                <FcGoogle className="text-xl" />
                <span className="text-sm font-medium text-indigo-800">Sign in with Google</span>
              </button>
            </form>
            
            <div className="mt-8 text-center text-sm text-indigo-600">
              <p>
                Don't have an account?{' '}
                <a href="/register" className="font-medium text-indigo-700 hover:text-indigo-900">
                  Register now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
import { useState, useContext } from 'react';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });
      localStorage.setItem('token', res.data.token);
      const profile = await axios.get('/auth/me');
      setUser(profile.data);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

    const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

return (
  <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-indigo-100 flex items-center justify-center p-8">
          <div className="text-center w-full">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6">Why Teams Choose Us</h2>
            
            <div className="space-y-8 max-w-xs mx-auto">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-600 p-3 rounded-lg text-white">
                  <FaUsers className="text-2xl" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-indigo-800">Team Adoption</span>
                    <span className="text-sm font-bold text-indigo-900">92%</span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: '92%' }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-indigo-600 p-3 rounded-lg text-white">
                  <FaChartLine className="text-2xl" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-indigo-800">Productivity Gain</span>
                    <span className="text-sm font-bold text-indigo-900">67%</span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: '67%' }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-indigo-600 p-3 rounded-lg text-white">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-indigo-800">Security Rating</span>
                    <span className="text-sm font-bold text-indigo-900">98%</span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: '98%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-indigo-700">
              <p>Join thousands of teams boosting their productivity</p>
            </div>
          </div>
        </div>
      
      <div className="md:w-1/2 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-indigo-900 mb-2">Create Account</h1>
            <p className="text-indigo-600">Get started with your free account</p>
          </div>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-indigo-800 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-indigo-800 mb-1">Email Address</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-indigo-800 mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-indigo-800 mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition font-medium"
          >
            Register
          </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-indigo-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-indigo-600">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition"
            >
              <FcGoogle className="text-xl" />
              <span className="text-sm font-medium text-indigo-800">Sign up with Google</span>
            </button>

          <p className="text-sm text-center text-indigo-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-700 font-medium hover:text-indigo-950 transition">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
);
}

export default Register;

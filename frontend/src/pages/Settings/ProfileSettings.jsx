import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import axios from '../../services/api';
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaPhone, FaUserTag, FaCamera } from 'react-icons/fa';

const ProfileSettings = () => {
  const { user, setUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    phone: '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        department: user.department || '',
        phone: user.phone || '',
      });
      if (user.profilePic) {
        const picUrl = user.profilePic.startsWith('http') 
          ? user.profilePic 
          : `${axios.defaults.baseURL}${user.profilePic}`;
        setPreview(picUrl);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== '') data.append(key, val);
    });
    if (profilePic) data.append('profilePic', profilePic);

    try {
      const res = await axios.put('/employees/me', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(res.data);
      alert('Profile updated successfully!');
      
      if (profilePic) {
        const picUrl = res.data.profilePic.startsWith('http') 
          ? res.data.profilePic 
          : `${axios.defaults.baseURL}${res.data.profilePic}`;
        setPreview(picUrl);
      }
    } catch (err) {
      alert('Error updating profile');
    } finally {
      setLoading(false);
      setProfilePic(null);
    }
  };

  return (
    <div className={`p-4 md:p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
      <div className="max-w-xl mx-auto">
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
          Profile Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-200 dark:border-gray-600">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '';
                      setPreview(null);
                    }}
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-indigo-100 text-indigo-400'
                  }`}>
                    <FaUser className="text-3xl" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition">
                <FaCamera />
                <input 
                  type="file" 
                  accept="image/jpeg,image/png,image/webp" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
              </label>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-indigo-600'}`}>
              Click the camera icon to change your profile picture
            </p>
          </div>

          <div className={`space-y-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg`}>
            <div className="space-y-1">
              <label className={`flex items-center gap-2 text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-indigo-700'
              }`}>
                <FaUser className="text-indigo-500 dark:text-indigo-400" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border border-indigo-200'
                }`}
                required
              />
            </div>

            <div className="space-y-1">
              <label className={`flex items-center gap-2 text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-indigo-700'
              }`}>
                <FaEnvelope className="text-indigo-500 dark:text-indigo-400" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border border-indigo-200'
                }`}
                required
              />
            </div>

            {/* <div className="space-y-1">
              <label className={`flex items-center gap-2 text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-indigo-700'
              }`}>
                <FaLock className="text-indigo-500 dark:text-indigo-400" />
                New Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Leave blank to keep current password"
                value={form.password}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border border-indigo-200'
                }`}
              />
            </div> */}

            <div className="space-y-1">
              <label className={`flex items-center gap-2 text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-indigo-700'
              }`}>
                <FaBuilding className="text-indigo-500 dark:text-indigo-400" />
                Department
              </label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border border-indigo-200'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`flex items-center gap-2 text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-indigo-700'
              }`}>
                <FaPhone className="text-indigo-500 dark:text-indigo-400" />
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border border-indigo-200'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`flex items-center gap-2 text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-indigo-700'
              }`}>
                <FaUserTag className="text-indigo-500 dark:text-indigo-400" />
                Role
              </label>
              <input
                type="text"
                value={user?.role || ''}
                disabled
                className={`w-full p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-600 text-gray-200' : 'bg-indigo-100 text-indigo-700'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition shadow-md ${
              loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
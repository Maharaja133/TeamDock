import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';
import { FaMoon, FaSun, FaCalendarAlt, FaGlobe, FaLanguage, FaDownload, FaTrash } from 'react-icons/fa';

const SystemSettings = () => {
  const { user, setUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [form, setForm] = useState({
    theme: 'light',
    dateFormat: 'MM/DD/YYYY',
    timeZone: 'UTC',
    language: 'English',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.preferences) {
      setForm(prev => ({ ...prev, ...user.preferences }));
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put('/auth/preferences', form);
      setUser(prev => ({ ...prev, preferences: res.data }));
      document.documentElement.classList.toggle('dark', res.data.theme === 'dark');
      alert('Preferences saved');
    } catch (err) {
      alert('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action is irreversible.')) return;

    try {
      await axios.delete('/auth/delete');
      localStorage.removeItem('token');
      location.href = '/login';
    } catch {
      alert('Failed to delete account');
    }
  };

  const handleExportData = async () => {
    try {
      const res = await axios.get('/auth/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'userdata.json');
      document.body.appendChild(link);
      link.click();
    } catch {
      alert('Failed to export data');
    }
  };

  return (
    <div className={`p-4 md:p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">System Settings</h1>
        
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <FaMoon className="text-indigo-400" />
              ) : (
                <FaSun className="text-indigo-500" />
              )}
              <span className="font-medium text-indigo-900 dark:text-indigo-100">Dark Mode</span>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <div className={`w-10 h-6 rounded-full shadow-inner relative transition-colors ${
                theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-200'
              }`}>
                <div
                  className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform top-1 ${
                    theme === 'dark' ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </div>
            </label>
          </div>
        </div>

        <div className={`p-4 rounded-lg space-y-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
          <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Preferences</h2>
          
          <div>
            <label className="font-medium mb-1 text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
              <FaCalendarAlt className="text-indigo-500 dark:text-indigo-400" />
              Date Format
            </label>
            <select
              value={form.dateFormat}
              onChange={e => setForm({ ...form, dateFormat: e.target.value })}
              className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border border-indigo-200'
              }`}
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            </select>
          </div>

          <div>
            <label className="font-medium mb-1 text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
              <FaGlobe className="text-indigo-500 dark:text-indigo-400" />
              Time Zone
            </label>
            <select
              value={form.timeZone}
              onChange={e => setForm({ ...form, timeZone: e.target.value })}
              className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border border-indigo-200'
              }`}
            >
              <option value="UTC">UTC</option>
              <option value="Asia/Kolkata">Asia/Kolkata</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/London">Europe/London</option>
            </select>
          </div>

          <div>
            <label className="font-medium mb-1 text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
              <FaLanguage className="text-indigo-500 dark:text-indigo-400" />
              Language
            </label>
            <select
              value={form.language}
              onChange={e => setForm({ ...form, language: e.target.value })}
              className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border border-indigo-200'
              }`}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="German">German</option>
              <option value="French">French</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          className={`w-full py-3 rounded-lg font-medium transition shadow-md ${
            saving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white`}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>

        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
          <h2 className="text-lg font-semibold mb-3 text-indigo-900 dark:text-indigo-100">Data Management</h2>
          <div className="space-y-3">
            <button
              onClick={handleExportData}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg transition ${
                theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-indigo-100 hover:bg-indigo-200'
              }`}
            >
              <FaDownload className="text-indigo-500 dark:text-indigo-300" />
              <span className="text-indigo-700 dark:text-indigo-100">Export My Data</span>
            </button>
            <button
              onClick={handleDeleteAccount}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg transition ${
                theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-indigo-100 hover:bg-indigo-200'
              }`}
            >
              <FaTrash className="text-red-500 dark:text-red-400" />
              <span className="text-red-600 dark:text-red-400">Delete My Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
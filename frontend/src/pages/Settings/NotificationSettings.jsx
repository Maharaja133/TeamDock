import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import axios from '../../services/api';
import { FaBell, FaEnvelope, FaTasks, FaChartLine } from 'react-icons/fa';

const NotificationSettings = () => {
  const { user, setUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    taskReminders: true,
    pushNotifications: true,
    weeklyReports: false
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.notificationSettings) {
      setSettings(user.notificationSettings);
    }
  }, [user]);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put('/employees/me/notifications', settings);
      setUser({ ...user, notificationSettings: res.data });
      alert('Notification settings updated');
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const notificationTypes = [
    { key: 'emailNotifications', label: 'Email Notifications', icon: <FaEnvelope /> },
    { key: 'taskReminders', label: 'Task Reminders', icon: <FaTasks /> },
    { key: 'pushNotifications', label: 'Push Notifications', icon: <FaBell /> },
    { key: 'weeklyReports', label: 'Weekly Reports', icon: <FaChartLine /> }
  ];

  return (
    <div className={`p-4 md:p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
      <div className="max-w-xl mx-auto">
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
          Notification Preferences
        </h2>
        
        <div className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
          {notificationTypes.map(({ key, label, icon }) => (
            <div 
              key={key} 
              className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-indigo-100'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-600 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                  {icon}
                </div>
                <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-indigo-800'}`}>
                  {label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  settings[key] ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    settings[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full mt-6 py-3 rounded-lg font-medium transition shadow-md ${
            saving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white`}
        >
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
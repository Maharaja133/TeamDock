import { useState, useContext } from 'react';
import axios from '../../services/api';
import { ThemeContext } from '../../context/ThemeContext';
import { FaShieldAlt, FaSignOutAlt, FaLock, FaCheckCircle } from 'react-icons/fa';

const SecuritySettings = () => {
  const { theme } = useContext(ThemeContext);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [saving2FA, setSaving2FA] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return alert("Passwords don't match");
    }

    try {
      setChangingPassword(true);
      await axios.put('/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setPasswordChanged(true);
      setTimeout(() => setPasswordChanged(false), 3000);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  const toggleTwoFA = async () => {
    setSaving2FA(true);
    try {
      await axios.put('/auth/2fa', { enabled: !twoFAEnabled });
      setTwoFAEnabled(!twoFAEnabled);
    } catch {
      alert("Failed to update 2FA setting");
    } finally {
      setSaving2FA(false);
    }
  };

  const signOutAll = async () => {
    if (!confirm("Are you sure you want to sign out of all devices?")) return;
    
    setSigningOut(true);
    try {
      await axios.post('/auth/signout-all');
      alert("Signed out of all devices");
    } catch {
      alert("Failed to sign out of all devices");
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className={`p-4 md:p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
          Security Settings
        </h1>

        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-indigo-800'
          }`}>
            <FaLock className="text-indigo-500" />
            Change Password
          </h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-indigo-700'
              }`}>
                Current Password
              </label>
              <input
                type="password"
                className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border border-indigo-200'
                }`}
                value={passwordForm.currentPassword}
                onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-indigo-700'
              }`}>
                New Password
              </label>
              <input
                type="password"
                className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border border-indigo-200'
                }`}
                value={passwordForm.newPassword}
                onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-indigo-700'
              }`}>
                Confirm New Password
              </label>
              <input
                type="password"
                className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border border-indigo-200'
                }`}
                value={passwordForm.confirmPassword}
                onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className={`flex-1 py-3 rounded-lg font-medium transition shadow-md ${
                  changingPassword ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white`}
                disabled={changingPassword}
              >
                {changingPassword ? 'Changing...' : 'Change Password'}
              </button>
              {passwordChanged && (
                <div className="flex items-center gap-2 text-green-500">
                  <FaCheckCircle />
                  <span className="text-sm">Changed!</span>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-indigo-500" />
              <div>
                <h2 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-indigo-800'
                }`}>
                  Two-Factor Authentication
                </h2>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-indigo-600'
                }`}>
                  Extra security layer for your account
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleTwoFA}
              disabled={saving2FA}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFAEnabled ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFAEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {twoFAEnabled && (
            <div className={`mt-4 p-3 rounded text-sm ${
              theme === 'dark' ? 'bg-gray-600 text-gray-200' : 'bg-indigo-100 text-indigo-700'
            }`}>
              Two-factor authentication is currently enabled
            </div>
          )}
        </div>

        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaSignOutAlt className="text-indigo-500" />
              <div>
                <h2 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-indigo-800'
                }`}>
                  Active Sessions
                </h2>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-indigo-600'
                }`}>
                  Sign out from all devices
                </p>
              </div>
            </div>
            <button
              onClick={signOutAll}
              disabled={signingOut}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'
              }`}
            >
              {signingOut ? 'Signing out...' : 'Sign out all'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
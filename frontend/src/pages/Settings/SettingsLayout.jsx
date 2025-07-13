import { NavLink, Outlet } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';
import { FaUser, FaBell, FaShieldAlt, FaCog } from 'react-icons/fa';

const SettingsLayout = () => {
  const { theme } = useContext(ThemeContext);

  const tabs = [
    { path: 'profile', label: 'Profile', icon: <FaUser /> },
    { path: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { path: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { path: 'system', label: 'System', icon: <FaCog /> },
  ];

  return (
    <div className={`p-4 md:p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
          Account Settings
        </h2>
        
        <div className={`flex overflow-x-auto mb-8 rounded-lg p-1 no-scrollbar ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-white shadow-sm'
        }`}>
          <div className="flex flex-nowrap gap-1 w-full">
            {tabs.map(tab => (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-w-[70px] ${
                    isActive 
                      ? theme === 'dark' 
                        ? 'bg-gray-600 text-white shadow-md' 
                        : 'bg-indigo-100 text-indigo-700 shadow-md'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-600 hover:text-white'
                        : 'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700'
                  }`
                }
              >
                <span className="text-sm sm:text-base">
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className={`
          rounded-lg 
          ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} 
          p-4 sm:p-6 
          shadow-sm
          transition-all duration-200
        `}>
          <Outlet />
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-indigo-500'}`}>
            Customize your account settings
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-indigo-500'}`}>
            v{new Date().getFullYear()}
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default SettingsLayout;
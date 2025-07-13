import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ isSidebarOpen, setIsSidebarOpen, isMobile }) => {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  const segments = location.pathname.split('/').filter(Boolean);
  const currentTitle = segments.length > 0
    ? segments[segments.length - 1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'Dashboard';

  return (
    <header className="bg-white px-4 md:px-6 py-3 shadow-sm border-b border-indigo-100 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {isMobile && (
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-indigo-700 p-1 rounded-lg hover:bg-indigo-50"
            >
              {isSidebarOpen ? (
                <FaTimes size={20} />
              ) : (
                <FaBars size={20} />
              )}
            </button>
          )}
          <h2 className="text-lg md:text-xl font-bold text-indigo-900 capitalize">
            {currentTitle}
          </h2>
        </div>

        <div className="relative group">
          <button className="flex items-center gap-2 focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
              ) : (
                <FaUserCircle className="text-xl" />
              )}
            </div>
            <span className="text-sm font-medium text-indigo-800 hidden md:inline-block">
              {user?.name}
            </span>
            <FaChevronDown className="text-xs text-indigo-500 hidden md:inline-block" />
          </button>
          
          <div className="
            absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10
            opacity-0 invisible 
            group-hover:opacity-100 group-hover:visible
            transition-all duration-200 ease-out
            origin-top-right transform
            group-hover:scale-100 scale-95
          ">
            <div className="px-4 py-2 text-sm text-indigo-700 border-b border-indigo-100">
              {user?.email}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <FaSignOutAlt className="text-xs" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
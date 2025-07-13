import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaTasks, FaCog } from 'react-icons/fa';

const Sidebar = ({ isOpen, isMobile }) => {
  const navItemStyle = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-indigo-100 text-indigo-700 font-medium' 
        : 'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800'
    }`;

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <aside className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 fixed md:static z-30 w-64 bg-white shadow-lg p-6
        transition-transform duration-300 ease-in-out
      `}>
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
            <span className="text-white font-bold">TD</span>
          </div>
          <h1 className="text-xl font-bold text-indigo-900">TeamDock</h1>
        </div>
        
        <nav className="space-y-2">
          <NavLink to="/dashboard" end className={navItemStyle} onClick={handleNavClick}>
            <FaHome className="mr-3" />
            <span>Home</span>
          </NavLink>
          <NavLink to="/dashboard/employees" className={navItemStyle} onClick={handleNavClick}>
            <FaUsers className="mr-3" />
            <span>Employees</span>
          </NavLink>
          <NavLink to="/dashboard/tasks" className={navItemStyle} onClick={handleNavClick}>
            <FaTasks className="mr-3" />
            <span>Tasks</span>
          </NavLink>
          <NavLink to="/dashboard/settings" className={navItemStyle} onClick={handleNavClick}>
            <FaCog className="mr-3" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </aside>

      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
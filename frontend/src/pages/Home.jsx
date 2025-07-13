import { FaUsers, FaTasks, FaUserGraduate, FaProjectDiagram } from 'react-icons/fa';

const Home = () => {
  const metrics = [
    { title: "Total Employees", value: "42", icon: <FaUsers className="text-2xl" />, trend: "↑ 12%", trendColor: "text-green-500" },
    { title: "Tasks Assigned", value: "128", icon: <FaTasks className="text-2xl" />, trend: "↑ 5%", trendColor: "text-green-500" },
    { title: "Interns", value: "8", icon: <FaUserGraduate className="text-2xl" />, trend: "→", trendColor: "text-gray-500" },
    { title: "Active Projects", value: "6", icon: <FaProjectDiagram className="text-2xl" />, trend: "↓ 2%", trendColor: "text-red-500" }
  ];

  return (
    <div className="bg-indigo-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900">Welcome to TeamDock</h1>
          <p className="text-indigo-700 text-sm sm:text-base">Your team management dashboard</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-indigo-600">{metric.title}</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-900 mt-1 sm:mt-2">{metric.value}</p>
                </div>
                <div className="bg-indigo-100 p-2 sm:p-3 rounded-lg text-indigo-600">
                  {metric.icon}
                </div>
              </div>
              <p className={`text-xs sm:text-sm mt-2 sm:mt-4 ${metric.trendColor}`}>
                <span className="font-medium">{metric.trend}</span> from last month
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-indigo-900">Employee Activities Trend</h2>
              <p className="text-indigo-600 text-sm sm:text-base">Last 30 days performance</p>
            </div>
            <button className="bg-indigo-100 text-indigo-700 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-indigo-200 transition">
              View Report
            </button>
          </div>
          
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Team activity graph placeholder" 
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-indigo-900 text-sm sm:text-base mb-3 sm:mb-4">Recent Tasks</h3>
            <ul className="space-y-2 sm:space-y-3">
              {['Project kickoff', 'Team review', 'Client meeting'].map((task, i) => (
                <li key={i} className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2 sm:mr-3"></div>
                  <span className="text-indigo-800 text-xs sm:text-sm">{task}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-indigo-900 text-sm sm:text-base mb-3 sm:mb-4">Team Activity</h3>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Team activity placeholder" 
              className="w-full h-auto rounded mb-3 sm:mb-4"
            />
            <p className="text-indigo-700 text-xs sm:text-sm">Recent team collaboration metrics</p>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-indigo-900 text-sm sm:text-base mb-3 sm:mb-4">Quick Actions</h3>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full text-left bg-indigo-50 text-indigo-700 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-indigo-100 transition">
                Add New Task
              </button>
              <button className="w-full text-left bg-indigo-50 text-indigo-700 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-indigo-100 transition">
                Schedule Meeting
              </button>
              <button className="w-full text-left bg-indigo-50 text-indigo-700 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-indigo-100 transition">
                Invite Team Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
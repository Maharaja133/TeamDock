import { useEffect, useState } from 'react';
import axios from '../../services/api';
import EmployeeForm from './EmployeeForm';
import { FaUserPlus, FaEdit, FaSearch, FaEnvelope, FaBriefcase, FaUserTag, FaUserShield } from 'react-icons/fa';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployees = async () => {
    const res = await axios.get('/employees');
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setSelected(employee);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setSelected(null);
    setShowForm(false);
    fetchEmployees();
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    return {
      admin: 'bg-red-100 text-red-800', // Changed to red for admin distinction
      manager: 'bg-purple-100 text-purple-800',
      employee: 'bg-green-100 text-green-800'
    }[role] || 'bg-gray-100 text-gray-800';
  };

  const getRoleIcon = (role) => {
    return role === 'admin' ? <FaUserShield className="inline mr-1" /> : <FaUserTag className="inline mr-1" />;
  };

  return (
    <div className="bg-indigo-50 p-4 md:p-6 rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Employee Management</h2>
          <p className="text-indigo-600">View and manage your team members</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-indigo-400" />
            </div>
            <input
              type="text"
              placeholder="Search employees..."
              className="pl-10 pr-4 py-2 w-full border border-indigo-200 bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            <FaUserPlus />
            <span className="hidden sm:inline">Add Employee</span>
          </button>
        </div>
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-indigo-100">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-indigo-100">
              {filteredEmployees.map(emp => (
                <tr key={emp._id} className="hover:bg-indigo-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">
                    {emp.role === 'admin' && <FaUserShield className="inline mr-2 text-red-500" />}
                    {emp.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">{emp.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">{emp.position || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(emp.role)}`}>
                      {getRoleIcon(emp.role)}
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(emp)}
                      className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                    >
                      <FaEdit className="text-sm" />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {filteredEmployees.map(emp => (
          <div key={emp._id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-indigo-900">
                  {emp.role === 'admin' && <FaUserShield className="inline mr-2 text-red-500" />}
                  {emp.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-indigo-600">
                  <FaEnvelope className="text-indigo-400" />
                  <span>{emp.email}</span>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(emp.role)}`}>
                {getRoleIcon(emp.role)}
                {emp.role}
              </span>
            </div>
            
            {emp.position && (
              <div className="flex items-center gap-2 mt-3 text-sm text-indigo-600">
                <FaBriefcase className="text-indigo-400" />
                <span>{emp.position}</span>
              </div>
            )}
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => handleEdit(emp)}
                className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 text-sm"
              >
                <FaEdit className="text-sm" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center mt-4">
          <p className="text-indigo-600">No employees found</p>
          <button 
            onClick={handleAdd}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add New Employee
          </button>
        </div>
      )}

      {showForm && (
        <EmployeeForm onClose={handleClose} existing={selected} />
      )}
    </div>
  );
};

export default EmployeeList;
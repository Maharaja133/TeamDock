import { useEffect, useState } from 'react';
import axios from '../../services/api';
import { FaUser, FaEnvelope, FaLock, FaBriefcase, FaBuilding, FaUserTag } from 'react-icons/fa';

const EmployeeForm = ({ onClose, existing }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    position: '',
    department: '',
    role: 'employee',
  });

  useEffect(() => {
    if (existing) {
      setForm({
        ...existing,
        password: '',
      });
    }
  }, [existing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existing) {
        await axios.put(`/employees/${existing._id}`, form);
      } else {
        await axios.post('/employees', form);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error saving employee');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-indigo-900">
              {existing ? 'Edit Employee' : 'Add New Employee'}
            </h3>
            <button 
              onClick={onClose} 
              className="text-indigo-500 hover:text-indigo-700 transition"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                <FaUser className="text-indigo-600" />
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                <FaEnvelope className="text-indigo-600" />
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {!existing && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                  <FaLock className="text-indigo-600" />
                  Temporary Password
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                <FaBriefcase className="text-indigo-600" />
                Position
              </label>
              <input
                type="text"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                <FaBuilding className="text-indigo-600" />
                Department
              </label>
              <input
                type="text"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                <FaUserTag className="text-indigo-600" />
                Role
              </label>
              <select
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
              >
                {existing ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
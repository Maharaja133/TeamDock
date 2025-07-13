import { useEffect, useState } from 'react';
import axios from '../../services/api';
import { FaTasks, FaUser, FaCalendarAlt, FaAlignLeft, FaListAlt, FaTimes } from 'react-icons/fa';

const TaskForm = ({ onClose, existing }) => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    dueDate: '',
    assignedTo: ''
  });

  useEffect(() => {
    axios.get('/employees').then(res => setEmployees(res.data));
    if (existing) {
      setForm({
        ...existing,
        dueDate: existing.dueDate ? existing.dueDate.slice(0,10) : ''
      });
    }
  }, [existing]);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (existing) {
        await axios.put(`/tasks/${existing._id}`, form);
      } else {
        await axios.post('/tasks', form);
      }
      onClose();
    } catch { alert('Error saving task'); }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
              <FaTasks className="text-indigo-600" />
              {existing ? 'Edit Task' : 'Create New Task'}
            </h3>
            <button 
              onClick={onClose} 
              className="text-indigo-500 hover:text-indigo-700 transition"
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={save} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                <FaListAlt className="text-indigo-600" />
                Task Title
              </label>
              <input
                type="text" 
                placeholder="Enter task title"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                <FaAlignLeft className="text-indigo-600" />
                Description
              </label>
              <textarea
                placeholder="Task description"
                rows={3}
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                <FaUser className="text-indigo-600" />
                Assign To
              </label>
              <select
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={form.assignedTo}
                onChange={e => setForm({ ...form, assignedTo: e.target.value })}
                required
              >
                <option value="">Select an employee</option>
                {employees.map(emp => (
                  <option key={emp._id} value={emp._id}>{emp.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                  <FaListAlt className="text-indigo-600" />
                  Status
                </label>
                <select
                  className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option value="todo">Todo</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                  <FaCalendarAlt className="text-indigo-600" />
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={form.dueDate}
                  onChange={e => setForm({ ...form, dueDate: e.target.value })}
                />
              </div>
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
                {existing ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
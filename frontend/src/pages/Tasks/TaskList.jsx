import { useEffect, useState } from 'react';
import axios from '../../services/api';
import TaskForm from './TaskForm';
import { FaPlus, FaEdit, FaSearch, FaTasks } from 'react-icons/fa';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTasks = async () => {
    const { data } = await axios.get('/tasks');
    setTasks(data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleAdd = () => { setSelected(null); setOpen(true); };
  const handleEdit = (t) => { setSelected(t); setOpen(true); };
  const handleClose = () => { setOpen(false); fetchTasks(); };

  const statusBadge = (s) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    return {
      todo: `${base} bg-indigo-100 text-indigo-800`,
      'in progress': `${base} bg-yellow-100 text-yellow-800`,
      completed: `${base} bg-green-100 text-green-800`
    }[s];
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.assignedTo?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-indigo-50 p-6 rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900 flex items-center gap-2">
            <FaTasks className="text-indigo-600" />
            Task Management
          </h2>
          <p className="text-indigo-600">Track and manage your team's tasks</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-indigo-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 w-full border bg-white border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            <FaPlus />
            <span className="hidden sm:inline">New Task</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-indigo-100">
            <thead className="bg-indigo-50 border-indigo-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-indigo-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-indigo-100">
              {filteredTasks.map(task => (
                <tr key={task._id} className="hover:bg-indigo-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">{task.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                    {task.assignedTo?.name || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={statusBadge(task.status)}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(task)}
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

      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center mt-4">
          <p className="text-indigo-600">No tasks found</p>
          <button 
            onClick={handleAdd}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Create Your First Task
          </button>
        </div>
      )}

      {open && <TaskForm onClose={handleClose} existing={selected} />}
    </div>
  );
};

export default TaskList;
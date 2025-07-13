import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from './Home';
import EmployeeList from './Employees/EmployeeList';
import TaskList from './Tasks/TaskList';
import SettingsLayout from './Settings/SettingsLayout';
import SystemSettings from './Settings/SystemSettings';
import ProfileSettings from './Settings/ProfileSettings';
import NotificationSettings from './Settings/NotificationSettings';
import SecuritySettings from './Settings/SecuritySettings';

const Dashboard = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="system" element={<SystemSettings />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default Dashboard;

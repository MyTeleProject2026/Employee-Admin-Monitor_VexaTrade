import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/components/Layout';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:userId" element={<UserDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;

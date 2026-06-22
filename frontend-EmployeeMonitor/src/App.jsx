import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import UserDetail from './pages/UserDetail';  // ✅ This must be imported
import DepositsList from './pages/DepositsList';
import WithdrawalsList from './pages/WithdrawalsList';
import TradesList from './pages/TradesList';
import FundsList from './pages/FundsList';
import NotificationsList from './pages/NotificationsList';
import UserManagement from './pages/UserManagement';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<UsersList />} />
                <Route path="/users/:userId" element={<UserDetail />} />  {/* ✅ This must exist */}
                <Route path="/deposits" element={<DepositsList />} />
                <Route path="/withdrawals" element={<WithdrawalsList />} />
                <Route path="/trades" element={<TradesList />} />
                <Route path="/funds" element={<FundsList />} />
                <Route path="/notifications" element={<NotificationsList />} />
                <Route path="/user-management" element={<UserManagement />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

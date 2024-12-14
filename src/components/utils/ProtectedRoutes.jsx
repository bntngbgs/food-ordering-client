import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router';

const ProtectedRoutes = () => {
  const { role } = useSelector((state) => state.user);

  return role === 'user' ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

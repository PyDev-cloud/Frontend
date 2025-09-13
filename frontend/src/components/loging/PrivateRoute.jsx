import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const { isAuthenticated, hasRole, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div style={{ padding: 20 }}>লোড হচ্ছে...</div>; // ✅ লোডিং অবস্থায় কিছু দেখান
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0) {
    const allowed = roles.some(role => hasRole(role));
    if (!allowed) {
      return <h2 style={{ padding: '20px', color: 'red' }}>Access Denied</h2>;
    }
  }

  return children;
};

export default PrivateRoute;

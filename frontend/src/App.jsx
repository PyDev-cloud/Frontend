import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/templets/Home';
import Dashboard from './pages/templets/Dashboard';
import Settings from './pages/templets/Settings';
import Layout from './components/templets/Layout';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes = () => {
  const { isAuthenticated } = React.useContext(AuthContext);

  if (!isAuthenticated) {
    // লগইন না করলে সব কিছু থেকে সরাসরি /login এ পাঠাবে
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

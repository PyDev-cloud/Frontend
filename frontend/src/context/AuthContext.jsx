import React, { createContext, useState, useEffect } from 'react';
import * as jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ token, roles: decoded.roles || [], email: decoded.sub });
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const loginUser = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser({ token, roles: decoded.roles || [], email: decoded.sub });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const hasRole = (role) => user?.roles.includes(role);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isAuthenticated, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ 
          token, 
          roles: [(decoded.role || "").toLowerCase()], // ✅ lowercase
          email: decoded.email || decoded.sub 
        });
      } catch (err) {
        console.error("Token decoding failed:", err);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const loginUser = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser({ 
      token, 
      roles: [(decoded.role || "").toLowerCase()],
      email: decoded.email || decoded.sub 
    });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = !!user;

  const hasRole = (role) => user?.roles.some(r => r === role.toLowerCase()); // ✅ role check lowercase

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isAuthenticated, hasRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
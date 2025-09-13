import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ সঠিক ইমপোর্ট

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ লোডিং স্টেট

  useEffect(() => {
    const token = localStorage.getItem('token');
    

    if (token) {
      try {
        const decoded = jwtDecode(token);
        

        // ✅ এখানে decoded.role কে array বানিয়ে roles বানানো হয়েছে
        setUser({ 
          token, 
          roles: [decoded.role] || [], 
          email: decoded.email || decoded.sub 
        });
      } catch (err) {
        console.error("Token decoding failed:", err);
        localStorage.removeItem('token');
      }
    } else {
      console.warn("No token found in localStorage.");
    }

    setIsLoading(false); // ✅ লোডিং শেষ
  }, []);

  const loginUser = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);

    // ✅ login এর সময়ও একই ভাবে handle
    setUser({ 
      token, 
      roles: [decoded.role] || [], 
      email: decoded.email || decoded.sub 
    });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const hasRole = (role) => user?.roles.includes(role);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isAuthenticated, hasRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

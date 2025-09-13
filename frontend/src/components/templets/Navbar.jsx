import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const { isAuthenticated, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav style={{
      height: '60px',
      backgroundColor: '#333',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000
    }}>
      <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px' }}>
        ☰
      </button>
      <h1 style={{ margin: 0, fontSize: '20px' }}>My App</h1>

      {isAuthenticated && (
        <button 
          onClick={handleLogout} 
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #fff',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;

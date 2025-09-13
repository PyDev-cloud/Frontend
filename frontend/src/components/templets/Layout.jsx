import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex' }}>
        <Sidebar collapsed={collapsed} />
        <main style={{
          marginTop: '60px',
          marginLeft: collapsed ? '60px' : '200px',
          padding: '20px',
          transition: 'margin-left 0.3s'
        }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;

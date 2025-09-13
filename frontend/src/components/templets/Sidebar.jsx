import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ collapsed }) => {
  return (
    <aside style={{
      width: collapsed ? '60px' : '200px',
      backgroundColor: '#222',
      color: '#fff',
      height: '100vh',
      paddingTop: '60px',
      position: 'fixed',
      top: 0,
      left: 0,
      transition: 'width 0.3s',
      overflow: 'hidden'
    }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>🏠 {collapsed ? '' : 'Home'}</Link>
        </li>
        <li style={styles.li}>
          <Link to="/dashboard" style={styles.link}>📊 {collapsed ? '' : 'Dashboard'}</Link>
        </li>
        <li style={styles.li}>
          <Link to="/settings" style={styles.link}>⚙️ {collapsed ? '' : 'Settings'}</Link>
        </li>
      </ul>
    </aside>
  );
};

const styles = {
  li: {
    padding: '15px 20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Sidebar;

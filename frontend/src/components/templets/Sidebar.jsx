import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ collapsed }) => {
  const [open, setOpen] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? "60px" : "220px",
        backgroundColor: "#060558ff",
        color: "#fff",
        height: "100vh",
        paddingTop: "60px",
        position: "fixed",
        top: 0,
        left: 0,
        transition: "width 0.3s",
        overflow: "hidden",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0 }}>
        {/* --- User Management Section --- */}
        <li
          style={{ ...styles.li, fontWeight: "bold", marginTop: "20px", cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          {collapsed ? "👥" : `👥 Member Account`}
        </li>

        {open && (
          <ul style={{ listStyle: "none", paddingLeft: collapsed ? 0 : 20 }}>
          <li style={styles.li}>
              <Link to="/users/create" style={styles.link}>
                📝 {collapsed ? "" : "Create Account"}
              </Link>
            </li>
          
            <li style={styles.li}>
              <Link to="/users/list" style={styles.link}>
                👤 {collapsed ? "" : "Members List"}
              </Link>
            </li>
            
            <li style={styles.li}>
              <Link to="/users/general" style={styles.link}>
                🙋 {collapsed ? "" : "Members Left"}
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </aside>
  );
};

const styles = {
  li: {
    padding: "12px 20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    display: "block",
  },
};

export default Sidebar;

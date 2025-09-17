import React, { useState, useContext, useEffect } from 'react';
import { login } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ যদি ইউজার আগেই লগইন করা থাকে, তাহলে সরাসরি ড্যাশবোর্ডে পাঠিয়ে দাও
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(email, password); // API call থেকে token আসবে
      loginUser(data.token); // context-এ লগইন করাও
      navigate('/'); // success হলে ড্যাশবোর্ডে যাও
    } catch (err) {
      setError(err.detail || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;

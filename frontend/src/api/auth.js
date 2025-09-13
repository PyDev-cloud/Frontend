import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // তোমার FastAPI সার্ভারের URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;  // { token: "...", message: "Login successful" }
  } catch (error) {
    throw error.response?.data || { detail: 'Login failed' };
  }
};

export const logout = async (token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/logout`, 
      {}, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Logout failed' };
  }
};

// প্রয়োজনে অন্য API কল এখানে যোগ করো

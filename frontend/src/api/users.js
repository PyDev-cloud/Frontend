import axios from "axios";

const API_URL = "http://localhost:8000/users"; 

// 🔹 Draft User APIs
export const createDraftUser = (data, token) =>
  axios.post(`${API_URL}/draft`, data, { headers: { Authorization: `Bearer ${token}` }});

export const addDraftProfile = (tokenParam, data, token) =>
  axios.post(`${API_URL}/draft/profile?token=${tokenParam}`, data, { headers: { Authorization: `Bearer ${token}` }});

export const addDraftOccupation = (tokenParam, data, token) =>
  axios.post(`${API_URL}/draft/occupation?token=${tokenParam}`, data, { headers: { Authorization: `Bearer ${token}` }});

export const addDraftNominee = (tokenParam, data, token) =>
  axios.post(`${API_URL}/draft/nominee?token=${tokenParam}`, data, { headers: { Authorization: `Bearer ${token}` }});

export const addDraftKid = (tokenParam, data, token) =>
  axios.post(`${API_URL}/draft/kid?token=${tokenParam}`, data, { headers: { Authorization: `Bearer ${token}` }});

export const addDraftDocument = (tokenParam, data, token) =>
  axios.post(`${API_URL}/draft/document?token=${tokenParam}`, data, { headers: { Authorization: `Bearer ${token}` }});

export const finalizeDraftUser = (tokenParam, token) =>
  axios.post(`${API_URL}/draft/finalize?token=${tokenParam}`, {}, { headers: { Authorization: `Bearer ${token}` }});

export const getDraftUser = (id, token) =>
  axios.get(`${API_URL}/users/draft/${id}`, { headers: { Authorization: `Bearer ${token}` }});

export const updateDraftUser = (id, data, token) =>
  axios.put(`${API_URL}/users/draft/${id}`, data, { headers: { Authorization: `Bearer ${token}` }});

// 🔹 Normal User APIs
export const getAllUsers = (token) =>
  axios.get(`${API_URL}/`, { headers: { Authorization: `Bearer ${token}` }});

export const getUsersByRole = (role, token) =>
  axios.get(`${API_URL}/role/${role}`, { headers: { Authorization: `Bearer ${token}` }});

export const getGeneralUsers = (token) =>
  axios.get(`${API_URL}/general`, { headers: { Authorization: `Bearer ${token}` }});

export const deleteUser = (id, token) =>
  axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` }});

export const assignRole = (id, role, token) =>
  axios.put(`${API_URL}/role/${id}?role=${role}`, {}, { headers: { Authorization: `Bearer ${token}` }});

export const activateUser = (id, token) =>
  axios.put(`${API_URL}/activate/${id}`, {}, { headers: { Authorization: `Bearer ${token}` }});

export const deactivateUser = (id, token) =>
  axios.put(`${API_URL}/deactivate/${id}`, {}, { headers: { Authorization: `Bearer ${token}` }});

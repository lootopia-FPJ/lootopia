import axios from 'axios';

const API_URL = 'http://192.168.1.103:3000/api/auth';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const getCurrentUser = async (token: string) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

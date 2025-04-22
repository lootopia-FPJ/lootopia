import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

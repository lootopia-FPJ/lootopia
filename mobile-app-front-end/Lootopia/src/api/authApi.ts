import axiosClient from './axiosClient';

export const loginUser = async (email: string, password: string) => {
  const response = await axiosClient.post('/auth/login', {email, password});
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosClient.get('/auth/me');
  return response.data;
};

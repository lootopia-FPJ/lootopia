import axios from 'axios';

const API_URL = 'http://192.168.1.103:3000/api/caches';

export const createCache = async (data: any) => {
  const response = await axios.post(API_URL, data);
  console.log('Payload sent to backend:', data);
  return response.data;
};

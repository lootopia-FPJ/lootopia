import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000/api/caches';

export const createCache = async (data: any) => {
  const response = await axios.post(API_URL, data);
  console.log('Payload sent to backend:', data);
  return response.data;
};

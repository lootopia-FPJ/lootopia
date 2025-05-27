import axios from 'axios';
import axiosClient from './axiosClient';

const API_URL = 'http://192.168.1.103:3000/api/caches';

export const createCache = async (data: any) => {
  const response = await axios.post(API_URL, data);
  console.log('Payload sent to backend:', data);
  return response.data;
};

export const getCachesByTreasureHunt = async (huntId: number) => {
  const response = await axiosClient.get(`/caches/hunt/${huntId}`);
  return response.data;
};

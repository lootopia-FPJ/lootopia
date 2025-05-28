import axiosClient from './axiosClient';

const BASE_PATH = '/caches';

export const createCache = async (data: any) => {
  const response = await axiosClient.post(BASE_PATH, data);
  console.log('Payload sent to backend:', data);
  return response.data;
};

export const getCachesByTreasureHunt = async (huntId: number) => {
  const response = await axiosClient.get(`${BASE_PATH}/hunt/${huntId}`);
  return response.data;
};

export const updateCache = async (id: number, data: any) => {
  const response = await axiosClient.patch(`${BASE_PATH}/${id}`, data);
  return response.data;
};

import axiosClient from './axiosClient';
import {TreasureHunt} from '../types/treasure-hunt';

const BASE_PATH = '/treasure-hunts';

export const getTreasureHunts = async (page = 1, limit = 10) => {
  const response = await axiosClient.get(
    `${BASE_PATH}?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const getTreasureHuntById = async (id: number) => {
  const response = await axiosClient.get<TreasureHunt>(`${BASE_PATH}/${id}`);
  return response.data;
};

export const getMyTreasureHunts = async (
  userId: number,
  page = 1,
  limit = 10,
) => {
  const response = await axiosClient.get(
    `${BASE_PATH}/user/${userId}?page=${page}&limit=${limit}`,
  );
  return response.data;
};

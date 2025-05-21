import axiosClient from './axiosClient';
import {TreasureHunt} from '../types/treasure-hunt';

export const getTreasureHunts = async (page = 1, limit = 10) => {
  const response = await axiosClient.get(
    `/treasure-hunts?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const getTreasureHuntById = async (id: number) => {
  const response = await axiosClient.get<TreasureHunt>(`/treasure-hunts/${id}`);
  return response.data;
};

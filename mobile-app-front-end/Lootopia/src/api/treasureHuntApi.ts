import axios from 'axios';
import {TreasureHunt} from '../types/treasure-hunt';

const API_URL = 'http://localhost:3000/api/treasure-hunts';

export const getTreasureHunts = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  return response.data;
};

export const getTreasureHuntById = async (id: number) => {
  const response = await axios.get<TreasureHunt>(`${API_URL}/${id}`);
  return response.data;
};

import axios from 'axios';
import {TreasureHunt} from '../types/treasure-hunt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api/treasure-hunts';

export const getTreasureHunts = async (page = 1, limit = 10) => {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getTreasureHuntById = async (id: number) => {
  const token = await AsyncStorage.getItem('token');

  const response = await axios.get<TreasureHunt>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

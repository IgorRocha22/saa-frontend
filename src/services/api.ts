import axios from 'axios';
import { Animal } from '@/types/animal';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

api.interceptors.request.use(config => {
  let token = localStorage.getItem('token');
  if (!token) {
    // Dummy token for development when auth is not implemented yet
    token = 'dummy_token';
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  return response;
}, error => {
  console.error('An error occurred with the API request:', error);
  return Promise.reject(error);
});

export const animalService = {
  getAllAnimals: async (): Promise<Animal[]> => {
    try {
      const response = await api.get('/animals');
      return response.data;
    } catch (error) {
      console.error('Error fetching animals:', error);
      throw error;
    }
  },

  getAnimalById: async (id: string): Promise<Animal> => {
    try {
      const response = await api.get(`/animals/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching animal details:', error);
      throw error;
    }
  },

  createAnimal: async (animal: Omit<Animal, 'id' | 'createdAt'>): Promise<Animal> => {
    try {
      const response = await api.post('/animals', animal);
      return response.data;
    } catch (error) {
      console.error('Error creating animal:', error);
      throw error;
    }
  },

  updateAnimal: async (id: number, animal: Animal): Promise<Animal> => {
    try {
      const response = await api.put(`/animals/${id}`, animal);
      return response.data;
    } catch (error) {
      console.error('Error updating animal:', error);
      throw error;
    }
  },

  deleteAnimal: async (id: number): Promise<void> => {
    try {
      await api.delete(`/animals/${id}`);
    } catch (error) {
      console.error('Error deleting animal:', error);
      throw error;
    }
  }
};

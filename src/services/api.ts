import { Animal } from '@/types/animal';

const API_BASE_URL = 'http://localhost:8080/api';

export const animalService = {
  getAllAnimals: async (): Promise<Animal[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/animals`);
      if (!response.ok) {
        throw new Error('Failed to fetch animals');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching animals:', error);
      throw error;
    }
  },

  getAnimalById: async (id: string): Promise<Animal> => {
    try {
      const response = await fetch(`${API_BASE_URL}/animals/${id}`);
      if (!response.ok) {
        throw new Error('Animal not found');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching animal details:', error);
      throw error;
    }
  }
};
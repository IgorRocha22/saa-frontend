import { Animal } from '@/types/animal';

const API_BASE_URL = 'http://localhost:8080/api';

// Placeholder for authentication token retrieval
const getAuthToken = () => {
  // In a real app, you would get this from localStorage, a cookie, or state management
  return 'dummy-jwt-token';
};

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
  },

  createAnimal: async (animal: Omit<Animal, 'id' | 'createdAt'>): Promise<Animal> => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/animals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(animal),
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar animal');
    }
    return await response.json();
  },

  updateAnimal: async (id: number, animal: Animal): Promise<Animal> => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(animal),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar animal');
    }
    return await response.json();
  },

  deleteAnimal: async (id: number): Promise<void> => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Erro ao excluir animal');
  }
};
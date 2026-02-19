import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Animal } from '../../../types/animal';
import { animalService } from '../../../services/api';

const AnimalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      if (!id) return;
      try {
        const data = await animalService.getAnimalById(id);
        setAnimal(data);
      } catch (err) {
        setError('Failed to fetch animal details');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!animal) return <div className="text-center p-4">Animal not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={animal.imageUrl} alt={animal.name} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">{animal.name}</h1>
          <p className="text-gray-700 mb-1"><strong>Species:</strong> {animal.species}</p>
          <p className="text-gray-700 mb-1"><strong>Breed:</strong> {animal.breed}</p>
          <p className="text-gray-700 mb-1"><strong>Age:</strong> {animal.age} years</p>
          <p className="text-gray-700 mb-1"><strong>Gender:</strong> {animal.gender}</p>
          <p className="text-gray-700 mt-4">{animal.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;

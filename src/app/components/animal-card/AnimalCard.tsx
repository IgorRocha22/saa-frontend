import React from 'react';
import { Link } from 'react-router-dom';
import { Animal } from '../../../types/animal';

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const imageUrl = animal.imageUrl || 'https://via.placeholder.com/150';

  return (
    <Link to={`/animal/${animal.id}`} className="block bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={imageUrl} alt={animal.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{animal.name}</h3>
        <p className="text-sm text-gray-600">{animal.breed}</p>
      </div>
    </Link>
  );
};

export default AnimalCard;

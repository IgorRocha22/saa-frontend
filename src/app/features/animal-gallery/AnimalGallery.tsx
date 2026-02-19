import React, { useEffect, useState } from 'react';
import { Animal } from '../../../types/animal';
import { animalService } from '../../../services/api';
import AnimalCard from '../../../app/components/animal-card/AnimalCard';
import SearchBar from '../../../app/components/search-bar/SearchBar';

const AnimalGallery: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const data = await animalService.getAllAnimals();
        setAnimals(data);
        setFilteredAnimals(data);
      } catch (err) {
        setError('Failed to fetch animals');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = animals.filter(animal =>
      animal.name.toLowerCase().includes(lowercasedSearchTerm) ||
      animal.species.toLowerCase().includes(lowercasedSearchTerm) ||
      animal.breed.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredAnimals(filtered);
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAnimals.map(animal => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
};

export default AnimalGallery;

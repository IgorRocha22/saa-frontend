import { useState, useEffect } from 'react';
import { Search, Dog, Cat, SlidersHorizontal, Loader2 } from 'lucide-react';
import { AnimalCard } from './AnimalCard';
import { Animal, AnimalSpecies, AnimalSize, AnimalAge } from '@/types/animal';
import { animalService } from '@/services/api';

interface HomeProps {
  onAnimalClick: (animal: Animal) => void;
}

export function Home({ onAnimalClick }: HomeProps) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<AnimalSpecies | 'all'>('all');
  const [selectedSize, setSelectedSize] = useState<AnimalSize | 'all'>('all');
  const [selectedAge, setSelectedAge] = useState<AnimalAge | 'all'>('all');

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    try {
      setLoading(true);
      const data = await animalService.getAllAnimals();
      setAnimals(data);
      setError(null);
    } catch (err) {
      setError('Não foi possível carregar os animais. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecies = selectedSpecies === 'all' || animal.species === selectedSpecies;
    const matchesSize = selectedSize === 'all' || animal.size === selectedSize;
    const matchesAge = selectedAge === 'all' || animal.age === selectedAge;
    
    return matchesSearch && matchesSpecies && matchesSize && matchesAge && animal.status !== 'ADOPTED';
  });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F0F7FF]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#4A90E2] mx-auto mb-4" />
          <p className="text-gray-600">Buscando novos amigos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F0F7FF]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={loadAnimals} className="text-[#4A90E2] underline">Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F7FF] to-white">
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#63B3ED] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Encontre seu Novo Melhor Amigo
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            Milhares de animais esperam por um lar cheio de amor. Adote e transforme duas vidas.
          </p>
        </div>
      </div>

      <div className="container mx-auto -mt-8 px-4 pb-12">
        <div className="mb-12 rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Busque por nome ou raça..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none transition-all focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Dog className="h-4 w-4" /> Espécie
              </label>
              <div className="flex gap-2 rounded-lg bg-gray-50 p-1">
                <button
                  onClick={() => setSelectedSpecies('all')}
                  className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                    selectedSpecies === 'all'
                      ? 'bg-[#4A90E2] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setSelectedSpecies(AnimalSpecies.DOG)}
                  className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                    selectedSpecies === 'DOG'
                      ? 'bg-[#4A90E2] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Cães
                </button>
                <button
                  onClick={() => setSelectedSpecies(AnimalSpecies.CAT)}
                  className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                    selectedSpecies === 'CAT'
                      ? 'bg-[#4A90E2] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Gatos
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <SlidersHorizontal className="h-4 w-4" /> Porte
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4A90E2]"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as AnimalSize | 'all')}
              >
                <option value="all">Todos os Portes</option>
                <option value="SMALL">Pequeno</option>
                <option value="MEDIUM">Médio</option>
                <option value="LARGE">Grande</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <SlidersHorizontal className="h-4 w-4" /> Idade
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none focus:border-[#4A90E2]"
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value as AnimalAge | 'all')}
              >
                <option value="all">Todas as Idades</option>
                <option value="PUPPY">Filhote</option>
                <option value="YOUNG">Jovem</option>
                <option value="ADULT">Adulto</option>
                <option value="SENIOR">Sênior</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {filteredAnimals.length} {filteredAnimals.length === 1 ? 'Animal Disponível' : 'Animais Disponíveis'}
          </h2>
        </div>

        {filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {filteredAnimals.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                onClick={() => onAnimalClick(animal)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum animal encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou a busca para encontrar seu novo amigo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

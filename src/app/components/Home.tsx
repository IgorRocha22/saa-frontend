import { useState } from 'react';
import { Search, Dog, Cat, SlidersHorizontal } from 'lucide-react';
import { AnimalCard } from './AnimalCard';
import type { Animal, AnimalSpecies, AnimalSize, AnimalAge } from '@/types/animal';

interface HomeProps {
  animals: Animal[];
  onAnimalClick: (animal: Animal) => void;
}

export function Home({ animals, onAnimalClick }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<AnimalSpecies | 'all'>('all');
  const [selectedSize, setSelectedSize] = useState<AnimalSize | 'all'>('all');
  const [selectedAge, setSelectedAge] = useState<AnimalAge | 'all'>('all');

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = selectedSpecies === 'all' || animal.species === selectedSpecies;
    const matchesSize = selectedSize === 'all' || animal.size === selectedSize;
    const matchesAge = selectedAge === 'all' || animal.age === selectedAge;
    
    return matchesSearch && matchesSpecies && matchesSize && matchesAge && animal.status !== 'adotado';
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F7FF] to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#6CB4EE] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Encontre seu Novo Melhor Amigo
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Milhares de animais esperando por um lar cheio de amor. Adote e transforme duas vidas.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou raça..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 pl-12 pr-4 py-3 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros Rápidos:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Species Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Espécie</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSpecies('all')}
                  className={`flex-1 rounded-lg border px-4 py-2.5 text-sm transition-all ${
                    selectedSpecies === 'all'
                      ? 'border-[#4A90E2] bg-[#4A90E2] text-white shadow-md'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#4A90E2]'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setSelectedSpecies('cao')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-all ${
                    selectedSpecies === 'cao'
                      ? 'border-[#4A90E2] bg-[#4A90E2] text-white shadow-md'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#4A90E2]'
                  }`}
                >
                  <Dog className="h-4 w-4" />
                  Cães
                </button>
                <button
                  onClick={() => setSelectedSpecies('gato')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-all ${
                    selectedSpecies === 'gato'
                      ? 'border-[#4A90E2] bg-[#4A90E2] text-white shadow-md'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#4A90E2]'
                  }`}
                >
                  <Cat className="h-4 w-4" />
                  Gatos
                </button>
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Porte</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as AnimalSize | 'all')}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
              >
                <option value="all">Todos os Portes</option>
                <option value="pequeno">Pequeno</option>
                <option value="medio">Médio</option>
                <option value="grande">Grande</option>
              </select>
            </div>

            {/* Age Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value as AnimalAge | 'all')}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
              >
                <option value="all">Todas as Idades</option>
                <option value="filhote">Filhote</option>
                <option value="jovem">Jovem</option>
                <option value="adulto">Adulto</option>
                <option value="senior">Sênior</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {filteredAnimals.length} {filteredAnimals.length === 1 ? 'Animal Disponível' : 'Animais Disponíveis'}
          </h2>
        </div>

        {/* Animals Grid */}
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

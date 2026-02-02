import { Heart, MapPin } from 'lucide-react';
import type { Animal } from '@/types/animal';

interface AnimalCardProps {
  animal: Animal;
  onClick: () => void;
}

export function AnimalCard({ animal, onClick }: AnimalCardProps) {
  const getAgeLabel = (age: string) => {
    const labels = {
      filhote: 'Filhote',
      jovem: 'Jovem',
      adulto: 'Adulto',
      senior: 'Sênior',
    };
    return labels[age as keyof typeof labels] || age;
  };

  const getSizeLabel = (size: string) => {
    const labels = {
      pequeno: 'Pequeno',
      medio: 'Médio',
      grande: 'Grande',
    };
    return labels[size as keyof typeof labels] || size;
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={animal.image}
          alt={animal.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Adicionar aos favoritos
            }}
          >
            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        {animal.status === 'em-processo' && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-[#FFA940] px-3 py-1 text-xs font-medium text-white shadow-lg">
              Em Processo
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{animal.name}</h3>
            <p className="text-sm text-gray-500">{animal.breed}</p>
          </div>
          <span className="text-sm font-medium text-[#4A90E2]">
            {getAgeLabel(animal.age)}
          </span>
        </div>
        
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{getSizeLabel(animal.size)} • {animal.gender === 'macho' ? 'Macho' : 'Fêmea'}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {animal.personality}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {animal.temperament.slice(0, 3).map((trait, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-[#E8F4FD] px-3 py-1 text-xs font-medium text-[#4A90E2]"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

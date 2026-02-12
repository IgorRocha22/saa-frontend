import { MapPin } from 'lucide-react';
import type { Animal } from '@/types/animal';
import { formatters } from '@/utils/formatters';

interface AnimalCardProps {
  animal: Animal;
  onClick: () => void;
}

export function AnimalCard({ animal, onClick }: AnimalCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={animal.imageUrl}
          alt={animal.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500">
            <span className="sr-only">Favoritar</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div>
        
        {animal.status === 'IN_PROCESS' && (
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
            <p className="text-sm text-gray-500">{formatters.species(animal.species)}</p>
          </div>
          <span className="text-sm font-medium text-[#4A90E2]">
            {formatters.age(animal.age)}
          </span>
        </div>
        
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{formatters.size(animal.size)} • {formatters.gender(animal.gender)}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {animal.personality}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {animal.temperament.slice(0, 3).map((trait, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-[#F0F7FF] px-2.5 py-0.5 text-xs font-medium text-[#4A90E2]"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

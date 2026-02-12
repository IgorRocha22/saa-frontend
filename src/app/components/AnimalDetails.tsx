import { ArrowLeft, Heart, Share2, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { Animal } from '@/types/animal';
import { AdoptionModal } from './AdoptionModal';
import { formatters } from '@/utils/formatters';

interface AnimalDetailsProps {
  animal: Animal;
  onBack: () => void;
}

export function AnimalDetails({ animal, onBack }: AnimalDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para a lista</span>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={animal.imageUrl}
                  alt={animal.name}
                  className="w-full h-[500px] object-cover"
                />
                {animal.status === 'IN_PROCESS' && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-[#FFA940] px-4 py-2 text-sm font-medium text-white shadow-lg">
                      Em Processo de Adoção
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5" />
                  Favoritar
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5" />
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{animal.name}</h1>
                <p className="text-xl text-gray-600">{formatters.species(animal.species)}</p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                  <p className="text-sm text-gray-500 mb-1">Idade</p>
                  <p className="font-semibold text-gray-900">{formatters.age(animal.age)}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                  <p className="text-sm text-gray-500 mb-1">Porte</p>
                  <p className="font-semibold text-gray-900">{formatters.size(animal.size)}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                  <p className="text-sm text-gray-500 mb-1">Sexo</p>
                  <p className="font-semibold text-gray-900">
                    {formatters.gender(animal.gender) === 'macho' ? 'Macho' : 'Fêmea'}
                  </p>
                </div>
              </div>

              {/* Personality */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Personalidade</h2>
                <p className="text-gray-700 leading-relaxed">{animal.personality}</p>
              </div>

              {/* Temperament */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Temperamento</h2>
                <div className="flex flex-wrap gap-2">
                  {animal.temperament.map((trait, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-[#E8F4FD] px-4 py-2 text-sm font-medium text-[#4A90E2]"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Health Status */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-[#52C41A]" />
                  <h2 className="text-lg font-semibold text-gray-900">Saúde</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">{animal.healthStatus}</p>
              </div>

              {/* Important Notice */}
              <div className="bg-[#FFF7E6] rounded-xl p-6 border border-[#FFD591]">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-[#FFA940] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Processo de Adoção</h3>
                    <p className="text-sm text-gray-700">
                      Todas as adoções passam por um processo de avaliação para garantir o bem-estar do animal. 
                      Nossa equipe entrará em contato para entrevista e visita domiciliar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Adoption Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={animal.status === 'IN_PROCESS'}
                className={`w-full rounded-xl px-6 py-4 text-lg font-semibold shadow-lg transition-all ${
                  animal.status === 'IN_PROCESS'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#52C41A] text-white hover:bg-[#42A010] hover:shadow-xl'
                }`}
              >
                {animal.status === 'IN_PROCESS' ? 'Adoção Em Processo' : 'Quero Adotar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AdoptionModal
        animal={animal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

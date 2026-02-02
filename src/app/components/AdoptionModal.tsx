import { X } from 'lucide-react';
import { useState } from 'react';
import type { Animal } from '@/types/animal';

interface AdoptionModalProps {
  animal: Animal;
  isOpen: boolean;
  onClose: () => void;
}

export function AdoptionModal({ animal, isOpen, onClose }: AdoptionModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    homeDescription: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envio
    alert(`Pedido de adoção enviado para ${animal.name}! Entraremos em contato em breve.`);
    setFormData({ name: '', email: '', phone: '', homeDescription: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4 rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Quero Adotar</h2>
            <p className="text-sm text-gray-500">Preencha os dados para adotar {animal.name}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <img
              src={animal.image}
              alt={animal.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{animal.name}</h3>
              <p className="text-sm text-gray-500">{animal.breed}</p>
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div>
            <label htmlFor="homeDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição do Ambiente Doméstico *
            </label>
            <textarea
              id="homeDescription"
              required
              rows={4}
              value={formData.homeDescription}
              onChange={(e) => setFormData({ ...formData, homeDescription: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors resize-none"
              placeholder="Descreva seu lar: tipo de residência, espaço disponível, outros pets, membros da família, etc."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[#52C41A] px-4 py-2.5 text-white hover:bg-[#42A010] transition-colors shadow-md"
            >
              Enviar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

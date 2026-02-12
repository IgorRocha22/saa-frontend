import { useState } from 'react';
import { 
  Home, 
  Package, 
  FileText, 
  PlusCircle, 
  X, 
  Upload,
  Search,
  Edit,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import type { Animal, AnimalStatus } from '@/types/animal';

interface AdminDashboardProps {
  animals: Animal[];
  onBack: () => void;
  onUpdateAnimals: (animals: Animal[]) => void;
}

export function AdminDashboard({ animals, onBack, onUpdateAnimals }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'estoque' | 'pedidos' | 'cadastro'>('estoque');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  const getStatusBadge = (status: AnimalStatus) => {
    const styles = {
      disponivel: 'bg-[#52C41A] text-white',
      'em-processo': 'bg-[#FFA940] text-white',
      adotado: 'bg-gray-400 text-white',
    };
    const labels = {
      disponivel: 'Disponível',
      'em-processo': 'Em Processo',
      adotado: 'Adotado',
    };
    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const handleStatusChange = (animalId: string, newStatus: AnimalStatus) => {
    const updatedAnimals = animals.map((animal) =>
      animal.id === animalId ? { ...animal, status: newStatus } : animal
    );
    onUpdateAnimals(updatedAnimals);
  };

  const handleDeleteAnimal = (animalId: string) => {
    if (confirm('Tem certeza que deseja excluir este animal?')) {
      const updatedAnimals = animals.filter((animal) => animal.id !== animalId);
      onUpdateAnimals(updatedAnimals);
    }
  };

  const filteredAnimals = animals.filter(
    (animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-[#f8f9fa] border-r border-[#e5e7eb] flex flex-col">
        <div className="p-6 border-b border-[#e5e7eb]">
          <h2 className="text-xl font-semibold text-gray-900">Painel Admin</h2>
          <p className="text-sm text-gray-500">Gestão SAA</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('estoque')}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
              activeTab === 'estoque'
                ? 'bg-[#4A90E2] text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Package className="h-5 w-5" />
            Estoque de Animais
          </button>

          <button
            onClick={() => setActiveTab('pedidos')}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
              activeTab === 'pedidos'
                ? 'bg-[#4A90E2] text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FileText className="h-5 w-5" />
            Pedidos de Adoção
          </button>

          <button
            onClick={() => setActiveTab('cadastro')}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
              activeTab === 'cadastro'
                ? 'bg-[#4A90E2] text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <PlusCircle className="h-5 w-5" />
            Novo Cadastro
          </button>
        </nav>

        <div className="p-4 border-t border-[#e5e7eb]">
          <button
            onClick={onBack}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar ao Site
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Estoque Tab */}
          {activeTab === 'estoque' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">Estoque de Animais</h1>
                <p className="text-gray-500">Gerencie todos os animais cadastrados no sistema</p>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar animal..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Animal</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Espécie</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Idade</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAnimals.map((animal) => (
                      <tr key={animal.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={animal.imageUrl}
                              alt={animal.name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{animal.name}</p>
                              <p className="text-sm text-gray-500">{animal.breed}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {animal.species === 'cao' ? 'Cão' : 'Gato'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {animal.age === 'filhote' ? 'Filhote' : animal.age === 'jovem' ? 'Jovem' : animal.age === 'adulto' ? 'Adulto' : 'Sênior'}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={animal.status}
                            onChange={(e) => handleStatusChange(animal.id, e.target.value as AnimalStatus)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20"
                          >
                            <option value="disponivel">Disponível</option>
                            <option value="em-processo">Em Processo</option>
                            <option value="adotado">Adotado</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingAnimal(animal)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAnimal(animal.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pedidos Tab */}
          {activeTab === 'pedidos' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">Pedidos de Adoção</h1>
                <p className="text-gray-500">Gerencie todas as solicitações de adoção</p>
              </div>

              <div className="bg-white rounded-xl shadow p-8 text-center">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum pedido no momento
                </h3>
                <p className="text-gray-500">
                  Os pedidos de adoção aparecerão aqui quando os usuários submeterem o formulário.
                </p>
              </div>
            </div>
          )}

          {/* Cadastro Tab */}
          {activeTab === 'cadastro' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">Novo Cadastro</h1>
                <p className="text-gray-500">Adicione um novo animal ao sistema</p>
              </div>

              <div className="bg-white rounded-xl shadow p-8">
                <form className="space-y-6">
                  {/* Upload de Foto */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foto do Animal *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#4A90E2] transition-colors cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        Clique para fazer upload ou arraste a imagem
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPG até 10MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20"
                        placeholder="Nome do animal"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Raça *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20"
                        placeholder="Raça do animal"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Espécie *
                      </label>
                      <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20">
                        <option value="">Selecione...</option>
                        <option value="cao">Cão</option>
                        <option value="gato">Gato</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idade *
                      </label>
                      <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20">
                        <option value="">Selecione...</option>
                        <option value="filhote">Filhote</option>
                        <option value="jovem">Jovem</option>
                        <option value="adulto">Adulto</option>
                        <option value="senior">Sênior</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Porte *
                      </label>
                      <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20">
                        <option value="">Selecione...</option>
                        <option value="pequeno">Pequeno</option>
                        <option value="medio">Médio</option>
                        <option value="grande">Grande</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sexo *
                      </label>
                      <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20">
                        <option value="">Selecione...</option>
                        <option value="macho">Macho</option>
                        <option value="femea">Fêmea</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Personalidade *
                    </label>
                    <textarea
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 resize-none"
                      placeholder="Descreva a personalidade do animal..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado de Saúde *
                    </label>
                    <textarea
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 resize-none"
                      placeholder="Informações sobre vacinação, castração, etc..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-[#4A90E2] px-6 py-3 text-white hover:bg-[#3A7BC8] transition-colors shadow-md"
                    >
                      Cadastrar Animal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

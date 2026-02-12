import { useState, useEffect } from 'react';
import {
  Plus,
  LayoutDashboard,
  Search,
  Trash2,
  Edit,
  Save,
  X,
  ArrowLeft,
  Heart
} from 'lucide-react';
import {
  Animal,
  AnimalSpecies,
  AnimalSize,
  AnimalAge,
  AnimalGender,
  AnimalStatus
} from '@/types/animal';
import { animalService } from '@/services/api';
import { formatters } from '@/utils/formatters';

const initialFormState: Omit<Animal, 'id' | 'createdAt'> = {
  name: '',
  species: AnimalSpecies.DOG,
  breed: '',
  age: AnimalAge.ADULT,
  size: AnimalSize.MEDIUM,
  gender: AnimalGender.MALE,
  imageUrl: '',
  personality: '',
  healthStatus: '',
  temperament: [],
  status: AnimalStatus.AVAILABLE
};

export function AdminDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'form'>('list');

  const [formData, setFormData] = useState(initialFormState);
  const [temperamentInput, setTemperamentInput] = useState('');

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    try {
      setLoading(true);
      const data = await animalService.getAllAnimals();
      setAnimals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        temperament: temperamentInput.split(',').map(t => t.trim()).filter(t => t !== '')
      };

      await animalService.createAnimal(payload);

      alert('Animal cadastrado com sucesso!');
      setFormData(initialFormState);
      setTemperamentInput('');
      setView('list');
      loadAnimals();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar animal.');
    }
  };

  const handleBackToSite = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-gray-100">
          <div className="bg-[#4A90E2] p-2 rounded-full">
            <Heart className="h-6 w-6 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">SAA</h1>
            <p className="text-xs text-gray-500">Sistema de Apoio à Adoção</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setView('list')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${view === 'list'
                ? 'text-[#4A90E2] bg-[#F0F7FF]'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>

          <button
            onClick={() => setView('form')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${view === 'form'
                ? 'text-[#4A90E2] bg-[#F0F7FF]'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            <Plus className="h-5 w-5" />
            Novo Animal
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleBackToSite}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-[#4A90E2] hover:bg-gray-50 rounded-xl font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar ao Site
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {view === 'form' ? 'Cadastrar Novo Animal' : 'Gerenciar Animais'}
            </h1>
            <p className="text-gray-500">
              {view === 'form' ? 'Preencha os dados abaixo' : 'Visualize e gerencie os animais do sistema'}
            </p>
          </div>

          {view === 'form' && (
            <button
              onClick={() => setView('list')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2"
            >
              <X className="h-5 w-5" /> Cancelar
            </button>
          )}
        </div>

        {view === 'form' ? (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-left-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nome</label>
                <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#4A90E2]/20 outline-none" placeholder="Ex: Rex" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Raça</label>
                <input required name="breed" value={formData.breed} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#4A90E2]/20 outline-none" placeholder="Ex: Vira-lata" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Espécie</label>
                <select name="species" value={formData.species} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-white">
                  <option value={AnimalSpecies.DOG}>Cão</option>
                  <option value={AnimalSpecies.CAT}>Gato</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Gênero</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-white">
                  <option value={AnimalGender.MALE}>Macho</option>
                  <option value={AnimalGender.FEMALE}>Fêmea</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Idade</label>
                <select name="age" value={formData.age} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-white">
                  <option value={AnimalAge.PUPPY}>Filhote</option>
                  <option value={AnimalAge.YOUNG}>Jovem</option>
                  <option value={AnimalAge.ADULT}>Adulto</option>
                  <option value={AnimalAge.SENIOR}>Sênior</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Porte</label>
                <select name="size" value={formData.size} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-white">
                  <option value={AnimalSize.SMALL}>Pequeno</option>
                  <option value={AnimalSize.MEDIUM}>Médio</option>
                  <option value={AnimalSize.LARGE}>Grande</option>
                </select>
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">URL da Foto</label>
                <input required name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full p-2 border rounded-lg" placeholder="https://..." />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">Personalidade</label>
                <textarea required name="personality" value={formData.personality} onChange={handleInputChange} className="w-full p-2 border rounded-lg" rows={2} />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">Temperamento (separar por vírgula)</label>
                <input
                  value={temperamentInput}
                  onChange={(e) => setTemperamentInput(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Dócil, Brincalhão, Calmo"
                />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">Saúde</label>
                <input required name="healthStatus" value={formData.healthStatus} onChange={handleInputChange} className="w-full p-2 border rounded-lg" placeholder="Vacinado, Castrado..." />
              </div>

              <div className="col-span-2 pt-4">
                <button type="submit" className="w-full bg-[#4A90E2] text-white py-3 rounded-xl hover:bg-[#357ABD] font-bold shadow-md transition-all flex items-center justify-center gap-2">
                  <Save className="h-5 w-5" /> Salvar Animal
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar animais..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left text-sm font-medium text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Animal</th>
                    <th className="px-6 py-4">Raça</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Data Cadastro</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan={5} className="text-center py-8 text-gray-500">Carregando dados...</td></tr>
                  ) : animals.map((animal) => (
                    <tr key={animal.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={animal.imageUrl} alt={animal.name} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                        <div>
                          <p className="font-medium text-gray-900">{animal.name}</p>
                          <p className="text-xs text-gray-500">{formatters.species(animal.species)} • {formatters.gender(animal.gender)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{animal.breed}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium 
                          ${animal.status === AnimalStatus.AVAILABLE ? 'bg-green-100 text-green-700' :
                            animal.status === AnimalStatus.ADOPTED ? 'bg-gray-100 text-gray-700' : 'bg-amber-100 text-amber-700'}`}>
                          {formatters.status(animal.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(animal.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-[#4A90E2] mr-3">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

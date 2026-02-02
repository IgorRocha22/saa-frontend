import { useState } from 'react';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { AnimalDetails } from './components/AnimalDetails';
import { AdminDashboard } from './components/AdminDashboard';
import { mockAnimals } from '@/data/mockAnimals';
import type { Animal } from '@/types/animal';

type View = 'home' | 'details' | 'admin';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [animals, setAnimals] = useState<Animal[]>(mockAnimals);

  const handleAnimalClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setCurrentView('details');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedAnimal(null);
  };

  const handleAdminClick = () => {
    setCurrentView('admin');
  };

  const handleBackFromAdmin = () => {
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-white">
      {currentView !== 'admin' && (
        <Header onAdminClick={handleAdminClick} />
      )}
      
      {currentView === 'home' && (
        <Home animals={animals} onAnimalClick={handleAnimalClick} />
      )}
      
      {currentView === 'details' && selectedAnimal && (
        <AnimalDetails animal={selectedAnimal} onBack={handleBackToHome} />
      )}
      
      {currentView === 'admin' && (
        <AdminDashboard
          animals={animals}
          onBack={handleBackFromAdmin}
          onUpdateAnimals={setAnimals}
        />
      )}
    </div>
  );
}

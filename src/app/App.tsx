import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimalGallery from '@/app/features/animal-gallery/AnimalGallery';
import AnimalDetails from '@/app/features/animal-details/AnimalDetails';
import AdminDashboard from '@/app/features/admin-dashboard/AdminDashboard';
import NotFound from '@/app/features/not-found/NotFound';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<AnimalGallery />} />
            <Route path="/animal/:id" element={<AnimalDetails />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

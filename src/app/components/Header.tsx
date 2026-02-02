import { Heart, UserCircle } from 'lucide-react';

interface HeaderProps {
  onAdminClick?: () => void;
}

export function Header({ onAdminClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A90E2]">
              <Heart className="h-6 w-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">SAA</h1>
              <p className="text-xs text-gray-500">Sistema de Apoio à Adoção</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-gray-700 hover:text-[#4A90E2] transition-colors">
              Início
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-[#4A90E2] transition-colors">
              Sobre
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-[#4A90E2] transition-colors">
              Como Adotar
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-[#4A90E2] transition-colors">
              Contato
            </a>
          </nav>

          <button
            onClick={onAdminClick}
            className="flex items-center gap-2 rounded-lg bg-[#4A90E2] px-4 py-2 text-sm text-white hover:bg-[#3A7BC8] transition-colors shadow-md"
          >
            <UserCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Área Administrativa</span>
            <span className="sm:hidden">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}

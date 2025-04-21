import { CalendarDays, Clock, LogOut, UserRound, Home, Settings, HelpCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Marca */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink
              to="/home"
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <CalendarDays className="h-6 w-6" />
              <span className="text-xl font-bold hidden sm:inline">AgendaPlus</span>
            </NavLink>
          </div>

          {/* Navegação Principal */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex items-center gap-2 px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive
                  ? 'border-green-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <Home className="h-5 w-5" />
              Início
            </NavLink>

            <NavLink
              to="/agendamentos"
              className={({ isActive }) =>
                `flex items-center gap-2 px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive
                  ? 'border-green-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <Clock className="h-5 w-5" />
              Agendamentos
            </NavLink>

            <NavLink
              to="/clientes"
              className={({ isActive }) =>
                `flex items-center gap-2 px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive
                  ? 'border-green-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <UserRound className="h-5 w-5" />
              Clientes
            </NavLink>
          </nav>

          {/* Menu do Usuário */}
          <div className="hidden md:ml-4 md:flex md:items-center space-x-4">
            <NavLink
              to="/ajuda"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              title="Ajuda"
            >
              <HelpCircle className="h-5 w-5" />
            </NavLink>

            <NavLink
              to="/configuracoes"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              title="Configurações"
            >
              <Settings className="h-5 w-5" />
            </NavLink>

            <button
              // navigate to/
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>

            {/* Avatar do Usuário */}
            <div className="ml-3 relative">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                US
              </div>
            </div>
          </div>

          {/* Menu Mobile (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile (Expandido) */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <NavLink
            to="/home"
            className="block pl-3 pr-4 py-2 border-l-4 border-green-500 text-base font-medium text-green-700 bg-green-50"
          >
            Início
          </NavLink>
          <NavLink
            to="/agendamentos"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
          >
            Agendamentos
          </NavLink>
          <NavLink
            to="/clientes"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
          >
            Clientes
          </NavLink>
          <NavLink
            to="/configuracoes"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
          >
            Configurações
          </NavLink>
          <button
            onClick={() => console.log('Logout')}
            className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
        <div className="flex justify-center">
          <AlertTriangle className="h-16 w-16 text-yellow-500" strokeWidth={1.5} />
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-gray-800">Página não encontrada</h2>
          <p className="mt-4 text-gray-600">
            Oops! Parece que você seguiu um link inválido ou a página foi removida.
          </p>
        </div>

        <div className="pt-6">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>

        <div className="pt-4 border-t border-gray-200 text-sm">
          <p className="text-gray-500">
            Precisa de ajuda?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Contate o suporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
import React, { useReducer } from 'react';

// Define o estado inicial
const initialState = {
  email: '',
  password: '',
  error: '',
  loading: false,
};

// Define as ações possíveis
type Action =
  | { type: 'INPUT_CHANGE'; name: string; value: string }
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS' }
  | { type: 'LOGIN_FAILURE'; error: string };

// Define o reducer
const loginReducer = (state: typeof initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return { ...state, [action.name]: action.value };
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  console.log('🚀', state); // Para depuração, exibe o estado atual no console

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'LOGIN_REQUEST' });

    // Simulação de uma chamada de API ou lógica de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um tempo de espera

    if (state.email === '123@email.com' && state.password === '123') {
      dispatch({ type: 'LOGIN_SUCCESS' });
      window.location.href = "/view"; // Redireciona para a página de visualização em caso de sucesso
    } else {
      dispatch({ type: 'LOGIN_FAILURE', error: 'Credenciais inválidas' });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'INPUT_CHANGE', name: event.target.name, value: event.target.value });
  };

  const handleRegister = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.href = "/register"; // Redireciona para a página de registro
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Faça seu login</h1>
          <p className="mt-4 text-gray-600">A melhor experiência de login que você já teve na sua vida.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Seu e-mail"
                value={state.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="sua senha"
                value={state.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Esqueci minha senha
                </a>
              </div>
            </div>
          </div>

          {state.error && (
            <div className="text-red-500 text-sm mt-2">{state.error}</div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${state.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              disabled={state.loading}
            >
              {state.loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Não tem conta ainda?{' '}
            <a href="" onClick={handleRegister} className="font-medium text-blue-600 hover:text-blue-500">
              Crie agora
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
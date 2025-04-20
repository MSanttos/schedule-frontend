import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUserAccounts } from '../../store/slices/userAccountSlice';

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: users, loading, error } = useSelector((state: RootState) => state.userAccounts);

  useEffect(() => {
    dispatch(fetchUserAccounts());
  }, [dispatch]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR");
  };

  const getGenderLabel = (gender: number | null) => {
    return gender === 1 ? "Masculino" : gender === 2 ? "Feminino" : "Não informado";
  };

  const getMaritalStatusLabel = (status: number | null) => {
    switch (status) {
      case 1: return "Solteiro(a)";
      case 2: return "Casado(a)";
      default: return "Não informado";
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Erro: {error}</p>;

  return (
    <div className="w-full px-4 py-10 flex justify-center">
      <div className="w-full max-w-7xl overflow-x-auto shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700">
        <table className="w-full min-w-[900px] bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">E-mail</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Telefone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Nascimento</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Cidade/UF</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">CEP</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Gênero</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Estado Civil</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{user.phoneNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{formatDate(user.birthDate)}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{user.city} / {user.state}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{user.postalCode}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{getGenderLabel(user.gender)}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{getMaritalStatusLabel(user.maritalStatus)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

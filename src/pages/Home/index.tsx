import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  deleteUserAccount,
  // deleteUserAccount,
  fetchUserAccounts
} from '../../store/slices/userAccountSlice';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { list: users, loading, error } = useSelector((state: RootState) => state.userAccounts);

  useEffect(() => {
    dispatch(fetchUserAccounts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      dispatch(deleteUserAccount(id));
      alert(`Usuário deletado com sucesso! ${id}`);
      dispatch(fetchUserAccounts()); // Recarrega a lista de usuários após a exclusão
    }
  };

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
      case 3: return "Divorciado(a)";
      default: return "Não informado";
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Erro: {error}</p>;

  return (
    <div className="w-full px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-7xl mb-4 flex justify-end">
        <button
          onClick={() => navigate('/create')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Criar Usuário
        </button>
      </div>
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Ações</th>
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
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 space-x-2">
                  <button
                    onClick={() => navigate(`/view-user/${user.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => navigate(`/edit-user/${user.id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => user.id && handleDelete(user.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

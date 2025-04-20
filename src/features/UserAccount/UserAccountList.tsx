import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAccounts } from '../../store/slices/userAccountSlice';
import { AppDispatch, RootState } from '../../store/store';

const UserAccountList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.userAccounts);

  useEffect(() => {
    dispatch(fetchUserAccounts());
  }, [dispatch]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h2>Usuários</h2>
      <ul>
        {list.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAccountList;

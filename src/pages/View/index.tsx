/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";  // Importa o axios ou use o fetch para fazer requisições

interface UserDetailsProps {
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    nationality: string;
    city: string;
    state: string;
    postalCode: string;
    gender: number;
    maritalStatus: number;
    streetAddress: string;
    country: string;
    cpf: string;
  };
}

const getGenderLabel = (gender: number) => {
  return gender === 1 ? "Masculino" : gender === 2 ? "Feminino" : "Não informado";
};

const getMaritalStatusLabel = (status: number) => {
  switch (status) {
    case 1: return "Solteiro(a)";
    case 2: return "Casado(a)";
    case 3: return "Divorciado(a)";
    case 4: return "Viúvo(a)";
    default: return "Não informado";
  }
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("pt-BR");
};

export const ViewUserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o id da URL
  const [user, setUser] = useState<UserDetailsProps['user'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // <-- inicializa

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:5001/api/user-account/getById/${id}`);

        // Verifica se a resposta é um JSON válido
        if (response.headers['content-type'].includes('application/json')) {
          setUser(response.data);
        } else {
          setError("A resposta não é um JSON válido.");
        }
      } catch (err) {
        setError("Erro ao carregar dados do usuário");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Usuário não encontrado</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/'); // volta para home
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Detalhes do Usuário</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div><strong className="text-gray-700 dark:text-gray-300">Nome:</strong> {user.name}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">E-mail:</strong> {user.email}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">Telefone:</strong> {user.phoneNumber}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">Nascimento:</strong> {formatDate(user.birthDate)}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">Nacionalidade:</strong> {user.nationality}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">Gênero:</strong> {getGenderLabel(user.gender)}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">Estado Civil:</strong> {getMaritalStatusLabel(user.maritalStatus)}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">Endereço:</strong> {user.streetAddress}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">Cidade:</strong> {user.city}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">Estado:</strong> {user.state}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">País:</strong> {user.country}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">CEP:</strong> {user.postalCode}</div>
        <div><strong className="text-gray-700 dark:text-gray-300">CPF:</strong> {user.cpf}</div>
      </div>
      <br />
      <div>
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Voltar
        </button>
      </div>
      <br />
    </div>
  );
};

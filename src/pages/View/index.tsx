import axios from "axios";
import { ArrowLeft, Calendar, CreditCard, Edit, Flag, Heart, Home, Mail, MapPin, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMaskedNavigation } from "../../hooks/useMaskedNavigation";
import { UserDetails } from "../../models/user";

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

export const ViewUserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const navigate = useNavigate();
  const navigate = useMaskedNavigation()
  
  const goToClientes = () => {
    navigate('/clientes');
  }

  const goToEditUser = () => {
    navigate(`/edit-user/${user?.id}`);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7878/api/user-account/getById/${id}`);

        if (response.headers['content-type']?.includes('application/json')) {
          setUser(response.data);
        } else {
          setError("Formato de resposta inválido");
        }
      } catch (err) {
        setError("Erro ao carregar dados do usuário");
        console.error("Erro na requisição:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">Usuário não encontrado</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                Informações do Cliente
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Detalhes completos do cadastro do usuário
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={goToEditUser}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Edit className="-ml-0.5 mr-2 h-4 w-4" />
                Editar
              </button>
              <button
                onClick={goToClientes}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ArrowLeft className="-ml-0.5 mr-2 h-4 w-4" />
                Voltar
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            {/* Seção de Informações Pessoais */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
              <dt className="text-sm font-medium text-gray-500">
                Informações Pessoais
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Nome Completo</p>
                      <p>{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Data de Nascimento</p>
                      <p>{formatDate(user.birthDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Heart className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Gênero</p>
                      <p>{getGenderLabel(user.gender)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">CPF</p>
                      <p>{user.cpf}</p>
                    </div>
                  </div>
                </div>
              </dd>
            </div>

            {/* Seção de Contato */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Contato
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p>{user.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </dd>
            </div>

            {/* Seção de Endereço */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
              <dt className="text-sm font-medium text-gray-500">
                Endereço
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Home className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p>{user.streetAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Cidade/Estado</p>
                      <p>{user.city} / {user.state}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">CEP</p>
                      <p>{user.postalCode}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Flag className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">País</p>
                      <p>{user.country}</p>
                    </div>
                  </div>
                </div>
              </dd>
            </div>

            {/* Seção Adicional */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Informações Adicionais
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Flag className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Nacionalidade</p>
                      <p>{user.nationality}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Heart className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Estado Civil</p>
                      <p>{getMaritalStatusLabel(user.maritalStatus)}</p>
                    </div>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
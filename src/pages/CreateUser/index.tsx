import { User, Mail, Lock, Calendar, Flag, MapPin, Phone, CreditCard, Home, FileUser, MapPinHouse, MapPinCheck, Earth, Building2, MapPinned, MapPlus } from "lucide-react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { createUserAccount } from '../../store/slices/userAccountSlice';
import { useMaskedNavigation } from "../../hooks/useMaskedNavigation";
import { defaultUserForm, IUserForm } from "../../types/user";

export const CreateUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

    const navigate = useMaskedNavigation()
    
    const goToClientes = () => {
      navigate('/clientes');
    }

  const [form, setForm] = useState<IUserForm>(defaultUserForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Limpa erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name) newErrors.name = "Nome é obrigatório";
    if (!form.email) newErrors.email = "Email é obrigatório";
    if (!form.password) newErrors.password = "Senha é obrigatória";
    if (!form.birthDate) newErrors.birthDate = "Data de nascimento é obrigatória";
    if (!form.gender) newErrors.gender = "Gênero é obrigatório";
    if (!form.maritalStatus) newErrors.maritalStatus = "Estado civil é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const parsedForm = {
        ...form,
        gender: form.gender ? Number(form.gender) : undefined,
        maritalStatus: form.maritalStatus ? Number(form.maritalStatus) : undefined,
        country: 'Brasil', // Valor padrão
        streetAddress: form.address, // Mapeando address para streetAddress
        phone: form.phoneNumber, // Adicionando phone
        zipCode: form.postalCode // Adicionando zipCode
      };

      await dispatch(createUserAccount(parsedForm)).unwrap();

      setForm(defaultUserForm);

      navigate('/clientes');
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setErrors({ submit: "Ocorreu um erro ao cadastrar o usuário. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                Cadastro de Usuário
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Preencha os dados para cadastrar um novo usuário
              </p>
            </div>
            <button
              onClick={goToClientes}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancelar
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {/* Seção de Informações Pessoais */}
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-md font-medium text-gray-900 flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                Informações Pessoais
              </h4>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha *
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                      required
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Nascimento *
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="birthDate"
                      id="birthDate"
                      value={form.birthDate}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                      required
                    />
                  </div>
                  {errors.birthDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                    CPF
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="cpf"
                      id="cpf"
                      value={form.cpf}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="rg" className="block text-sm font-medium text-gray-700 mb-1">
                    RG
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="rg"
                      id="rg"
                      value={form.rg}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gênero *
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    required
                  >
                    <option value="">Selecione o gênero</option>
                    <option value={1}>Masculino</option>
                    <option value={2}>Feminino</option>
                    <option value={3}>Não Informado</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-1">
                    Estado Civil *
                  </label>
                  <select
                    name="maritalStatus"
                    id="maritalStatus"
                    value={form.maritalStatus}
                    onChange={handleChange}
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    required
                  >
                    <option value="">Selecione o estado civil</option>
                    <option value={1}>Solteiro(a)</option>
                    <option value={2}>Casado(a)</option>
                    <option value={3}>Divorciado(a)</option>
                    <option value={4}>Outro</option>
                  </select>
                  {errors.maritalStatus && (
                    <p className="mt-1 text-sm text-red-600">{errors.maritalStatus}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Seção de Contato */}
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-md font-medium text-gray-900 flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                Informações de Contato
              </h4>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de Endereço */}
            <div className="pb-6">
              <h4 className="text-md font-medium text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                Endereço
              </h4>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    CEP
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={form.address}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                    Número
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinHouse className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="number"
                      id="number"
                      value={form.number}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">
                    Complemento
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinCheck className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="complement"
                      id="complement"
                      value={form.complement}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                    Bairro
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPlus className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="neighborhood"
                      id="neighborhood"
                      value={form.neighborhood}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={form.city}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    Estado (UF)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinned className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={form.state}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                    Nacionalidade
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Flag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="nationality"
                      id="nationality"
                      value={form.nationality}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="naturalness" className="block text-sm font-medium text-gray-700 mb-1">
                    Naturalidade
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Earth className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="naturalness"
                      id="naturalness"
                      value={form.naturalness}
                      onChange={handleChange}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cadastrando...
                </>
              ) : (
                <>
                  Cadastrar Usuário
                </>
              )}
            </button>
          </div>

          {errors.submit && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errors.submit}</p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
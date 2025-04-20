import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { createUserAccount } from '../../store/slices/userAccountSlice';
import { useNavigate } from 'react-router-dom';

export const CreateUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    birthDate: '',
    nationality: '',
    naturalness: '',
    cpf: '',
    rg: '',
    phone: '',
    cellPhone: '',
    phoneNumber: '',
    zipCode: '',
    postalCode: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    gender: '',
    maritalStatus: '',
    createdBy: 'web_registration',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedForm = {
      ...form,
      gender: form.gender ? Number(form.gender) : undefined,
      maritalStatus: form.maritalStatus ? Number(form.maritalStatus) : undefined,
      country: '', // Add default or dynamic value for country
      streetAddress: '', // Add default or dynamic value for streetAddress
    };

    await dispatch(createUserAccount(parsedForm));
    navigate('/'); // volta para home
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} className="input" required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" required />
        <input name="password" placeholder="Senha" type="password" value={form.password} onChange={handleChange} className="input" required />
        <input name="birthDate" placeholder="Data de Nascimento" type="date" value={form.birthDate} onChange={handleChange} className="input" required />
        <input name="nationality" placeholder="Nacionalidade" value={form.nationality} onChange={handleChange} className="input" />
        <input name="naturalness" placeholder="Naturalidade" value={form.naturalness} onChange={handleChange} className="input" />
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} className="input" />
        <input name="rg" placeholder="RG" value={form.rg} onChange={handleChange} className="input" />
        <input name="phone" placeholder="Telefone" value={form.phone} onChange={handleChange} className="input" />
        <input name="cellPhone" placeholder="Celular" value={form.cellPhone} onChange={handleChange} className="input" />
        <input name="zipCode" placeholder="CEP" value={form.zipCode} onChange={handleChange} className="input" />
        <input name="address" placeholder="Endereço" value={form.address} onChange={handleChange} className="input" />
        <input name="number" placeholder="Número" value={form.number} onChange={handleChange} className="input" />
        <input name="complement" placeholder="Complemento" value={form.complement} onChange={handleChange} className="input" />
        <input name="neighborhood" placeholder="Bairro" value={form.neighborhood} onChange={handleChange} className="input" />
        <input name="city" placeholder="Cidade" value={form.city} onChange={handleChange} className="input" />
        <input name="state" placeholder="UF" value={form.state} onChange={handleChange} className="input" />

        <select name="gender" value={form.gender} onChange={handleChange} className="input" required>
          <option value="">Selecione o gênero</option>
          <option value={1}>Masculino</option>
          <option value={2}>Feminino</option>
          <option value={3}>Não Informado</option>
        </select>

        <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="input" required>
          <option value="">Selecione o estado civil</option>
          <option value={1}>Solteiro(a)</option>
          <option value={2}>Casado(a)</option>
          <option value={3}>Divorciado(a)</option>
          <option value={4}>Outro</option>
        </select>

        <div className="col-span-2 mt-4">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

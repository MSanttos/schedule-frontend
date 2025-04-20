/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { clearSelectedUser, fetchUserAccountById, updateUserAccount } from "../../store/slices/userAccountSlice";

export const EditUserAccount = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { selectedUser } = useSelector((state: RootState) => state.userAccounts);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    birthDate: "",
    nationality: "",
    naturalness: "",
    cpf: "",
    rg: "",
    phoneNumber: "",
    cellPhone: "",
    postalCode: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    gender: 0,
    maritalStatus: 0,
    createdBy: "system",
    country: "",
  });

  useEffect(() => {
    if (id) {
      console.log("Buscando usuário com ID:", id);
      dispatch(fetchUserAccountById(id))
        .unwrap()
        .then((data) => console.log("Dados recebidos:", data))
        .catch((error) => console.error("Erro ao buscar usuário:", error));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log("selectedUser carregado:", selectedUser);
    if (selectedUser) {
      setFormData(prev => ({
        ...prev, // Mantém os valores padrão para campos não presentes na API
        id: selectedUser.id ?? "",
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        birthDate: selectedUser.birthDate?.split("T")[0] || "",
        nationality: selectedUser.nationality || "",
        cpf: selectedUser.cpf || "",
        phoneNumber: selectedUser.phoneNumber || "",
        postalCode: selectedUser.postalCode || "",
        address: selectedUser.streetAddress || "", // Mapeia streetAddress para address
        city: selectedUser.city || "",
        state: selectedUser.state || "",
        gender: selectedUser.gender || 0,
        maritalStatus: selectedUser.maritalStatus || 0,
        country: selectedUser.country || "",
        naturalness: selectedUser.naturalness || "",
      }));
    }
  }, [selectedUser]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const payload: any = {
        ...formData,
        phone: formData.phoneNumber,
        zipCode: formData.postalCode,
      };

      delete payload.phoneNumber;
      delete payload.postalCode;

      // Remove password se estiver vazio
      if (!payload.password) {
        delete payload.password;
      }

      await dispatch(updateUserAccount(payload));
      alert("Usuário atualizado com sucesso!");
      navigate("/");
    }
  };


  const handleSubmitGoBack = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/'); // volta para home
  };

  // No seu componente
  useEffect(() => {
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch]);
  return (
    <div>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Editar Usuário</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome" className="input" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" className="input" />
          <input name="password" value={formData.password} onChange={handleChange} placeholder="Senha" type="password" className="input" />
          <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} className="input" />
          <input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nacionalidade" className="input" />
          <input name="naturalness" value={formData.city} onChange={handleChange} placeholder="Naturalidade" className="input" />
          <input name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" className="input" />
          {/* <input name="rg" value={formData.rg} onChange={handleChange} placeholder="RG" className="input" /> */}
          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Telefone" className="input" />
          {/* <input name="cellPhone" value={formData.cellPhone} onChange={handleChange} placeholder="Celular" className="input" /> */}
          <input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="CEP" className="input" />
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Endereço" className="input" />
          {/* <input name="number" value={formData.number} onChange={handleChange} placeholder="Número" className="input" /> */}
          {/* <input name="complement" value={formData.complement} onChange={handleChange} placeholder="Complemento" className="input" /> */}
          {/* <input name="neighborhood" value={formData.neighborhood} onChange={handleChange} placeholder="Bairro" className="input" /> */}
          <input name="city" value={formData.city} onChange={handleChange} placeholder="Cidade" className="input" />
          <input name="state" value={formData.state} onChange={handleChange} placeholder="Estado" className="input" />
          <select name="gender" value={formData.gender} onChange={handleChange} className="input">
            <option value={0}>Não informado</option>
            <option value={1}>Masculino</option>
            <option value={2}>Feminino</option>
          </select>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="input">
            <option value={0}>Não informado</option>
            <option value={1}>Solteiro(a)</option>
            <option value={2}>Casado(a)</option>
            <option value={3}>Divorciado(a)</option>
          </select>
          <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Salvar Alterações
          </button>
        </form>
        <br />
        <div>
          <button
            onClick={(e) => handleSubmitGoBack(e)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Voltar
          </button>
        </div>
        <br />
      </div>
    </div>
  );
};

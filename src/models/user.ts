export interface IUserForm {
  // Informações pessoais
  name: string;
  email: string;
  password: string;
  birthDate: string;
  nationality: string;
  naturalness: string;
  cpf: string;
  rg: string;
  gender: string;
  maritalStatus: string;

  // Contatos
  phoneNumber: string;
  cellPhone: string;

  // Endereço
  postalCode: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;

  // Metadados
  createdBy: string;
}

export const defaultUserForm: IUserForm = {
  name: '',
  email: '',
  password: '',
  birthDate: '',
  nationality: '',
  naturalness: '',
  cpf: '',
  rg: '',
  phoneNumber: '',
  cellPhone: '',
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
};

export interface UserDetails {
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
}
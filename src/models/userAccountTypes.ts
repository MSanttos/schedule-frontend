export interface UserAccount {
  // Informações pessoais
  name: string;
  email: string;
  passwordHash?: string; // Opcional, caso você não queira manipular a senha diretamente no frontend
  birthDate?: string; // Ou Date, dependendo do formato
  nationality: string;
  naturalness: string;
  cpf: string;
  rg: string;
  gender: number;
  maritalStatus: number;

  // Contatos
  phoneNumber?: string;

  // Endereço
  postalCode: string;
  address?: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  id: string; // ou number, dependendo do tipo de ID usado no seu sistema
  createdAt: string; // Data de criação do usuário
  updatedAt: string; // Data da última atualização do usuário
}

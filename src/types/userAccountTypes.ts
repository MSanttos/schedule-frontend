export interface UserAccount {
  nationality: string;
  rg: string;
  cpf: string;
  postalCode: string;
  streetAddress: string;
  city: string;
  state: string;
  gender: number;
  maritalStatus: number;
  country: string;
  naturalness: string;
  id: string; // ou number, dependendo do tipo de ID usado no seu sistema
  name: string;
  email: string;
  passwordHash?: string; // Opcional, caso você não queira manipular a senha diretamente no frontend
  birthDate?: string; // Ou Date, dependendo do formato
  phoneNumber?: string;
  address?: string;
  createdAt: string; // Data de criação do usuário
  updatedAt: string; // Data da última atualização do usuário
}

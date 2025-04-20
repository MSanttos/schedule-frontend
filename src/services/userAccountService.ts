import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export const getAllUserAccounts = async () => {
  const response = await axios.get(`${API}/api/user-account/getAll`);
  return response.data;
};

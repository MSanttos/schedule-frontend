/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export interface UserAccount {
  id?: string;
  name: string;
  email: string;
  password: string;
  birthDate: string;
  nationality: string;
  naturalness: string;
  cpf: string;
  rg: string;
  phone: string;
  cellPhone: string;
  zipCode: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  gender: any;
  maritalStatus: any;
  createdBy: string;
  phoneNumber: string;
  postalCode: string;
}

interface UserAccountState {
  list: UserAccount[];
  loading: boolean;
  error: string | null;
}

const initialState: UserAccountState = {
  list: [],
  loading: false,
  error: null,
};

//GET
export const fetchUserAccounts = createAsyncThunk(
  'userAccounts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/api/user-account/getAll');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//CREATE
export const createUserAccount = createAsyncThunk(
  'userAccounts/create',
  async (newUser: UserAccount) => {
    const response = await api.post('/api/user-account/create', newUser);
    return response.data;
  }
);

const userAccountSlice = createSlice({
  name: 'userAccounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUserAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Erro ao carregar usuários';
      })
      .addCase(createUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Erro ao criar usuário';
      });
  },
});

export default userAccountSlice.reducer;

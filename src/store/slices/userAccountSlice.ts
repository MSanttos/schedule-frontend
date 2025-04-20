/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export interface UserAccount {
  country: string;
  streetAddress: string;
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
  selectedUser: UserAccount | null;
}

const initialState: UserAccountState = {
  list: [],
  loading: false,
  error: null,
  selectedUser: null,
};

// GET ALL
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

// GET BY ID
export const fetchUserAccountById = createAsyncThunk(
  'userAccounts/fetchById',
  async (userId: string, thunkAPI) => {
    try {
      const response = await api.get(`/api/user-account/getById/${userId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// CREATE
export const createUserAccount = createAsyncThunk(
  'userAccounts/create',
  async (newUser: UserAccount, thunkAPI) => {
    try {
      const response = await api.post('/api/user-account/create', newUser);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// UPDATE
export const updateUserAccount = createAsyncThunk(
  'userAccounts/update',
  async (userData: UserAccount, thunkAPI) => {
    try {
      const response = await api.put(`/api/user-account/update/${userData.id}`, userData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE
export const deleteUserAccount = createAsyncThunk(
  'userAccounts/delete',
  async (userId: string, thunkAPI) => {
    try {
      await api.delete(`/api/user-account/delete/${userId}`);
      return userId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userAccountSlice = createSlice({
  name: 'userAccounts',
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
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
        state.error = action.payload as string || 'Erro ao carregar usuários';
      })

      // Fetch By ID
      .addCase(fetchUserAccountById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAccountById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserAccountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Erro ao carregar usuário';
      })

      // Create
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
        state.error = action.payload as string || 'Erro ao criar usuário';
      })

      // Update
      .addCase(updateUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
      })
      .addCase(updateUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Erro ao atualizar usuário';
      })

      // Delete
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(user => user.id !== action.payload);
        if (state.selectedUser?.id === action.payload) {
          state.selectedUser = null;
        }
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Erro ao deletar usuário';
      });
  },
});

export const { clearSelectedUser } = userAccountSlice.actions;
export default userAccountSlice.reducer;
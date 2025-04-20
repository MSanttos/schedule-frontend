/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  city: string;
  state: string;
  postalCode: string;
  gender: number | null;
  maritalStatus: number | null;
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
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userAccountSlice.reducer;

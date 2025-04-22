import { createSlice } from '@reduxjs/toolkit';
import { fetchUserAccounts, fetchUserAccountById, createUserAccount, updateUserAccount, deleteUserAccount } from '../thunks/AccountThunks';
import { UserAccount } from '../../types/userAccountTypes';

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

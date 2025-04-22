/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAccount } from '../../types/userAccountTypes';

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

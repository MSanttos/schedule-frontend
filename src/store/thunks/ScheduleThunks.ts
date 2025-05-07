import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { Schedule } from "../../models/schedule";

export const fetchSchedules = createAsyncThunk(
  'schedules/fetchSchedules',
  async (date: string) => {
    const response = await api.get(`/api/Schedule/getAllSchedules?date=${date}`);
    return response.data;
  }
);

export const createSchedule = createAsyncThunk('schedules/create', async (data: Omit<Schedule, 'id'>) => {
  const response = await api.post('/api/Schedule/createSchedule', data);
  return response.data;
});

export const fetchSchedulesById = createAsyncThunk('schedules/fetchById', async (id: string) => {
  const response = await api.get(`/api/schedule/getScheduleById/${id}`); // ou o endpoint correto da sua API

  console.log('data: ', response.data)
  return response.data;
  }
);


export const updateSchedule = createAsyncThunk('schedules/update', async (data: Schedule) => {
  const response = await api.put(`/schedules/${data.id}`, data);
  return response.data;
});

export const deleteSchedule = createAsyncThunk('schedules/delete', async (id: string) => {
  await api.delete(`/schedules/${id}`);
  return id;
});
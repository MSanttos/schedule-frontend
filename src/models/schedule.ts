export interface Schedule {
  id: string;
  clientId: string;
  clientName?: string; // Added clientName
  serviceId: string;
  serviceName?: string; // Added serviceName
  date: string;
  time: string;
  duration: string;
  notes: string;
  status: string;
  price: string;
}

interface ScheduleState {
  items: Schedule[];
  loading: boolean;
  error: string | null;
}

export const initialState: ScheduleState = {
  items: [],
  loading: false,
  error: null,
};

export interface ScheduleFormData {
  clientId: string;
  clientName: string; // Novo campo
  serviceId: string;
  serviceName: string; // Novo campo
  date: string;
  time: string;
  duration: string;
  notes: string;
  status: string;
  price?: string;
}
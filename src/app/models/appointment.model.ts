export type AppointmentStatus = 'NEW' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface AppointmentRequest {
  id?: number;
  doctorId: number;
  patientId: number;
  preferredDate: string;
  preferredTime: string;
  symptoms: string;
  status?: 'NEW' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}

export interface AppointmentResponse {
  id: number;
  doctorName: string;
  patientName: string;
  doctorId: number; 
  patientId: number;
  date: string;
  time: string;
  symptoms: string;
  status: AppointmentStatus;
}

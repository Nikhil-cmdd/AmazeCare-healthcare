export interface LoginResponse {
  token: string;
  role: 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'EMPLOYEE';
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'DOCTOR' | 'EMPLOYEE' | 'PATIENT';
}

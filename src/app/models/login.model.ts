export interface LoginRequest {
  username: string; // NOT email
  password: string;
}

export interface LoginResponse {
  token: string;
  role: 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'EMPLOYEE';
}

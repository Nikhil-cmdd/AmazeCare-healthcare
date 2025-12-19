export interface Patient {
  id: number;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  contactNumber: string;
  medicalHistory: string;

  username?: string;
  email?: string;
  password?: string;
}

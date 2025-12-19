export interface Doctor {
  id?: number;
  fullName: string;
  specialty: string;
  experience: number;
  qualification: string;
  designation: string;
  hospital: { id: number };
  user: {
    id: number;
    email: string;
    username: string;
    gender: string;
    contactNumber: string;
  };
}

export interface Consultation {
  id?: number;
  appointmentId: number;
  appointmentDate?: string;
  doctorName?: string;
  patientName?: string;
  symptoms: string;
  physicalExam?: string;
  treatmentPlan?: string;
  recommendedTests?: string;
  prescription?: string;
}

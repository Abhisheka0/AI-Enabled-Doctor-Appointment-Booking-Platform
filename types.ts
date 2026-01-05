
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR'
}

export type Specialty = 'Cardiology' | 'Dermatology' | 'Neurology' | 'Pediatrics' | 'Psychiatry' | 'General Medicine' | 'Orthopedics' | 'Ophthalmology';

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  rating: number;
  reviews: number;
  experience: number;
  fee: number;
  availability: string[];
  imageUrl: string;
  bio: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  specialty: Specialty;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  patientName: string;
}

export interface SymptomCheckResult {
  possibleSpecialties: Specialty[];
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  recommendations: string[];
  disclaimer: string;
}

export type AuthStep = 'LOGIN' | 'SIGNUP' | 'OTP';

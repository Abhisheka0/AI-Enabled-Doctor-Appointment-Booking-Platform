
import { Doctor, Specialty } from './types';

export const SPECIALTIES: Specialty[] = [
  'General Medicine',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Psychiatry',
  'Orthopedics',
  'Ophthalmology'
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiology',
    rating: 4.9,
    reviews: 128,
    experience: 15,
    fee: 150,
    availability: ['09:00', '10:30', '14:00', '16:00'],
    imageUrl: 'https://picsum.photos/seed/doc1/400/400',
    bio: 'Specialist in interventional cardiology with over 15 years of experience treating complex heart conditions.'
  },
  {
    id: 'd2',
    name: 'Dr. James Wilson',
    specialty: 'Dermatology',
    rating: 4.8,
    reviews: 95,
    experience: 10,
    fee: 120,
    availability: ['11:00', '13:00', '15:30'],
    imageUrl: 'https://picsum.photos/seed/doc2/400/400',
    bio: 'Dedicated dermatologist focusing on medical and cosmetic skin health for all ages.'
  },
  {
    id: 'd3',
    name: 'Dr. Elena Rodriguez',
    specialty: 'Neurology',
    rating: 4.7,
    reviews: 76,
    experience: 12,
    fee: 200,
    availability: ['08:30', '12:00', '16:30'],
    imageUrl: 'https://picsum.photos/seed/doc3/400/400',
    bio: 'Board-certified neurologist specializing in sleep disorders and neuro-rehabilitation.'
  },
  {
    id: 'd4',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    rating: 5.0,
    reviews: 210,
    experience: 8,
    fee: 100,
    availability: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    imageUrl: 'https://picsum.photos/seed/doc4/400/400',
    bio: 'Passionate pediatrician committed to the holistic health and development of children.'
  },
  {
    id: 'd5',
    name: 'Dr. Sophia Varma',
    specialty: 'Psychiatry',
    rating: 4.6,
    reviews: 54,
    experience: 20,
    fee: 180,
    availability: ['14:00', '15:30', '17:00'],
    imageUrl: 'https://picsum.photos/seed/doc5/400/400',
    bio: 'Expert in adult psychiatry with a focus on anxiety, depression, and workplace wellness.'
  },
  {
    id: 'd6',
    name: 'Dr. Robert Baker',
    specialty: 'General Medicine',
    rating: 4.9,
    reviews: 320,
    experience: 25,
    fee: 80,
    availability: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00'],
    imageUrl: 'https://picsum.photos/seed/doc6/400/400',
    bio: 'Experienced family physician providing comprehensive primary care and preventive medicine.'
  }
];

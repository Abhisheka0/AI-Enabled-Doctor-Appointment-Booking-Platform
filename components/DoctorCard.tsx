
import React from 'react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook }) => {
  return (
    <div className="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
      <div className="flex gap-4 mb-4">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-inner">
          <img 
            src={doctor.imageUrl} 
            alt={doctor.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
              {doctor.specialty}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
              <i className="fa-solid fa-star"></i>
              <span>{doctor.rating}</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">{doctor.name}</h3>
          <p className="text-xs text-slate-500">{doctor.experience} yrs experience</p>
        </div>
      </div>
      
      <p className="text-sm text-slate-600 line-clamp-2 mb-4 h-10">
        {doctor.bio}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div>
          <span className="text-slate-400 text-xs block">Consultation Fee</span>
          <span className="text-lg font-bold text-slate-900">${doctor.fee}</span>
        </div>
        <button 
          onClick={onBook}
          className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all transform active:scale-95"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;

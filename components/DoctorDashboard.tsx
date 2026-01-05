
import React from 'react';
import { Appointment } from '../types';

interface DoctorDashboardProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: Appointment['status']) => void;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ appointments, onUpdateStatus }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Physician Control Center</h2>
          <p className="text-slate-500">Overview of your upcoming patient consultations</p>
        </div>
        <div className="bg-slate-900 text-white px-6 py-4 rounded-3xl flex items-center gap-6 shadow-xl">
          <div>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Today's Load</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold">{appointments.filter(a => a.status === 'CONFIRMED').length}</span>
              <span className="text-sm text-slate-400 font-medium">Appointments</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
            <i className="fa-solid fa-user-check text-xl"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.filter(a => a.status !== 'CANCELLED').map(app => (
          <div key={app.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold">
                  {app.patientName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{app.patientName}</h3>
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">New Patient</span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-sm font-bold text-slate-900">{app.time}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{app.date}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 mb-6">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Patient Note</span>
              <p className="text-sm text-slate-600 italic">
                "{app.notes || 'No symptoms specified'}"
              </p>
            </div>

            <div className="flex gap-3">
              {app.status === 'CONFIRMED' ? (
                <>
                  <button 
                    onClick={() => onUpdateStatus(app.id, 'COMPLETED')}
                    className="flex-grow bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-check-double"></i>
                    Mark Done
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(app.id, 'CANCELLED')}
                    className="w-14 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-500 text-slate-400 rounded-2xl transition-all flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </>
              ) : (
                <div className="w-full text-center py-3 bg-emerald-50 text-emerald-600 font-bold rounded-2xl flex items-center justify-center gap-2">
                  <i className="fa-solid fa-circle-check"></i>
                  Consultation Completed
                </div>
              )}
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="col-span-full py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <i className="fa-solid fa-calendar-day text-5xl text-slate-200 mb-4"></i>
            <h3 className="text-xl font-bold text-slate-400">No appointments scheduled</h3>
            <p className="text-slate-400 mt-2">Take a break or update your availability.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;

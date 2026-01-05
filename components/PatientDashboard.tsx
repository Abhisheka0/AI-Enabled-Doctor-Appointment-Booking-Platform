
import React from 'react';
import { Appointment } from '../types';

interface PatientDashboardProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ appointments, onCancel }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Health Journey</h2>
          <p className="text-slate-500">Manage your consultations and medical history</p>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-center px-4 border-r border-slate-100">
            <span className="block text-xl font-bold text-slate-900">{appointments.length}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</span>
          </div>
          <div className="text-center px-4 border-r border-slate-100">
            <span className="block text-xl font-bold text-blue-600">{appointments.filter(a => a.status === 'CONFIRMED').length}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Upcoming</span>
          </div>
          <div className="text-center px-4">
            <span className="block text-xl font-bold text-emerald-600">{appointments.filter(a => a.status === 'COMPLETED').length}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Done</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Doctor</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Specialty</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.length > 0 ? appointments.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{app.doctorName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                      {app.specialty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700">{app.date}</div>
                    <div className="text-xs text-slate-400">{app.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      app.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' : 
                      app.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        app.status === 'CONFIRMED' ? 'bg-blue-500' : 
                        app.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-slate-500'
                      }`}></span>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all">
                        <i className="fa-solid fa-calendar-check"></i>
                      </button>
                      <button 
                        onClick={() => onCancel(app.id)}
                        className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-red-500 transition-all"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <i className="fa-regular fa-calendar-xmark text-5xl text-slate-200 mb-4"></i>
                      <p className="text-slate-500 text-lg">You have no upcoming appointments.</p>
                      <button className="mt-4 text-blue-600 font-bold hover:underline">Find a doctor now</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

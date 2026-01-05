
import React, { useState, useEffect, useMemo } from 'react';
import { UserRole, Doctor, Appointment, Specialty } from './types';
import { MOCK_DOCTORS, SPECIALTIES } from './constants';
import Header from './components/Header';
import DoctorCard from './components/DoctorCard';
import SymptomChecker from './components/SymptomChecker';
import BookingModal from './components/BookingModal';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import Footer from './components/Footer';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'symptoms' | 'dashboard'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('All');

  // Simulated initial data load
  useEffect(() => {
    const saved = localStorage.getItem('medlink_appointments');
    const authStatus = localStorage.getItem('medlink_auth');
    const savedRole = localStorage.getItem('medlink_role');

    if (saved) setAppointments(JSON.parse(saved));
    if (authStatus === 'true') setIsLoggedIn(true);
    if (savedRole) setRole(savedRole as UserRole);
  }, []);

  useEffect(() => {
    localStorage.setItem('medlink_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('medlink_auth', isLoggedIn.toString());
    localStorage.setItem('medlink_role', role);
  }, [isLoggedIn, role]);

  const filteredDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty = filterSpecialty === 'All' || doc.specialty === filterSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, filterSpecialty]);

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('medlink_auth');
  };

  const handleBook = (doctorId: string, date: string, time: string, notes: string) => {
    const doctor = MOCK_DOCTORS.find(d => d.id === doctorId);
    if (!doctor) return;

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorId,
      patientId: 'p-default',
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date,
      time,
      status: 'CONFIRMED',
      notes,
      patientName: 'John Doe'
    };

    setAppointments(prev => [...prev, newAppointment]);
    setSelectedDoctor(null);
    setActiveTab('dashboard');
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
  };

  const handleUpdateStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        role={role} 
        setRole={setRole} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <main className="flex-grow pt-24 pb-12">
        {!isLoggedIn ? (
          <Auth onLogin={handleLogin} initialRole={role} />
        ) : role === UserRole.PATIENT ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'home' && (
              <div className="space-y-12">
                <section className="text-center py-12 bg-white rounded-3xl shadow-sm border border-slate-100 px-6">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                    Your Health, <span className="text-blue-600">Simpler.</span>
                  </h1>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                    Book appointments with top-rated specialists, check your symptoms with our advanced AI, and manage your health records in one secure place.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                      onClick={() => setActiveTab('search')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                      Find a Doctor
                    </button>
                    <button 
                      onClick={() => setActiveTab('symptoms')}
                      className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-all"
                    >
                      AI Symptom Checker
                    </button>
                  </div>
                </section>

                <section>
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Recommended Specialists</h2>
                      <p className="text-slate-500">Top rated doctors available for you</p>
                    </div>
                    <button onClick={() => setActiveTab('search')} className="text-blue-600 font-medium hover:underline">View All</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_DOCTORS.slice(0, 3).map(doc => (
                      <DoctorCard key={doc.id} doctor={doc} onBook={() => setSelectedDoctor(doc)} />
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'search' && (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow relative">
                      <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                      <input 
                        type="text" 
                        placeholder="Search by name, specialty or condition..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="w-full md:w-64">
                      <select 
                        value={filterSpecialty}
                        onChange={(e) => setFilterSpecialty(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
                      >
                        <option value="All">All Specialties</option>
                        {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doc => (
                      <DoctorCard key={doc.id} doctor={doc} onBook={() => setSelectedDoctor(doc)} />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <i className="fa-solid fa-user-doctor text-5xl text-slate-200 mb-4"></i>
                      <p className="text-slate-500 text-lg">No doctors found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'symptoms' && (
              <SymptomChecker onSpecialtySelect={(specialty) => {
                setFilterSpecialty(specialty);
                setActiveTab('search');
              }} />
            )}

            {activeTab === 'dashboard' && (
              <PatientDashboard appointments={appointments} onCancel={handleCancelAppointment} />
            )}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DoctorDashboard appointments={appointments} onUpdateStatus={handleUpdateStatus} />
          </div>
        )}
      </main>

      <Footer />

      {selectedDoctor && (
        <BookingModal 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
          onConfirm={handleBook}
        />
      )}
    </div>
  );
};

export default App;

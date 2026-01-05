
import React, { useState } from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ role, setRole, activeTab, setActiveTab, isLoggedIn, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <i className="fa-solid fa-stethoscope text-white text-xl"></i>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">MedLink <span className="text-blue-600">AI</span></span>
            </div>

            {isLoggedIn && role === UserRole.PATIENT && (
              <nav className="hidden md:flex items-center gap-6">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'search', label: 'Find Doctors' },
                  { id: 'symptoms', label: 'Symptom Checker' },
                  { id: 'dashboard', label: 'My Appointments' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`text-sm font-medium transition-colors ${
                      activeTab === tab.id ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <button 
                onClick={() => setActiveTab('home')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95"
              >
                Sign In
              </button>
            ) : (
              <>
                <div className="hidden sm:flex bg-slate-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setRole(UserRole.PATIENT)}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      role === UserRole.PATIENT ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                    }`}
                  >
                    Patient
                  </button>
                  <button 
                    onClick={() => setRole(UserRole.DOCTOR)}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      role === UserRole.DOCTOR ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                    }`}
                  >
                    Doctor
                  </button>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm hover:ring-2 hover:ring-blue-100 transition-all"
                  >
                    <img src="https://picsum.photos/seed/user/100/100" alt="Profile" className="w-full h-full object-cover" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-[60] animate-scale-in">
                      <div className="px-4 py-3 border-b border-slate-50">
                        <p className="text-sm font-bold text-slate-900">John Doe</p>
                        <p className="text-[10px] text-slate-500">john@example.com</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                        <i className="fa-regular fa-user mr-2"></i> Profile
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                        <i className="fa-regular fa-calendar mr-2"></i> History
                      </button>
                      <button 
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

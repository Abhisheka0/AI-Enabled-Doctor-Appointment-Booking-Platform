
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-stethoscope text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">MedLink <span className="text-blue-600">AI</span></span>
          </div>
          <p className="max-w-sm mb-6 text-sm leading-relaxed">
            MedLink AI is revolutionizing healthcare access through intelligent scheduling and AI-driven triage, connecting patients with world-class specialists in seconds.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-blue-500 transition-colors">Find a Doctor</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Symptom Checker</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Virtual Care</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Health Records</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
        <p>&copy; 2024 MedLink AI Healthcare. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

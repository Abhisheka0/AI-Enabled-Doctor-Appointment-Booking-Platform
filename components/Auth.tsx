
import React, { useState, useEffect } from 'react';
import { UserRole, AuthStep } from '../types';

interface AuthProps {
  onLogin: (role: UserRole) => void;
  initialRole: UserRole;
}

const Auth: React.FC<AuthProps> = ({ onLogin, initialRole }) => {
  const [step, setStep] = useState<AuthStep>('LOGIN');
  const [role, setRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer: any;
    if (step === 'OTP' && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('OTP');
    setCountdown(30);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const verifyOtp = () => {
    // Simulated verification
    if (otp.join('').length === 4) {
      onLogin(role);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden transition-all">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mx-auto mb-4">
              <i className="fa-solid fa-stethoscope text-white text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {step === 'LOGIN' && 'Welcome Back'}
              {step === 'SIGNUP' && 'Create Account'}
              {step === 'OTP' && 'Verify Identity'}
            </h2>
            <p className="text-slate-500 mt-2">
              {step === 'OTP' ? `Enter the code sent to ${email || 'your email'}` : 'Quality healthcare at your fingertips'}
            </p>
          </div>

          {step !== 'OTP' ? (
            <form onSubmit={handleNext} className="space-y-5">
              {step === 'SIGNUP' && (
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              )}
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole(UserRole.PATIENT)}
                    className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                      role === UserRole.PATIENT 
                        ? 'bg-blue-50 border-blue-600 text-blue-600' 
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole(UserRole.DOCTOR)}
                    className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                      role === UserRole.DOCTOR 
                        ? 'bg-blue-50 border-blue-600 text-blue-600' 
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    Doctor
                  </button>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                {step === 'LOGIN' ? 'Sign In' : 'Sign Up'}
                <i className="fa-solid fa-arrow-right"></i>
              </button>

              <div className="text-center pt-4">
                <button 
                  type="button"
                  onClick={() => setStep(step === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
                  className="text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors"
                >
                  {step === 'LOGIN' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                  />
                ))}
              </div>

              <button 
                onClick={verifyOtp}
                disabled={otp.some(d => !d)}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-100"
              >
                Verify & Continue
              </button>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-slate-500">Resend code in <span className="font-bold text-slate-900">{countdown}s</span></p>
                ) : (
                  <button 
                    onClick={() => setCountdown(30)}
                    className="text-sm text-blue-600 font-bold hover:underline"
                  >
                    Resend Code
                  </button>
                )}
                <button 
                  onClick={() => setStep('LOGIN')}
                  className="block w-full mt-4 text-xs text-slate-400 hover:text-slate-600"
                >
                  Use a different email address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

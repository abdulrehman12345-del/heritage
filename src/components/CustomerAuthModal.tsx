import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, MapPin, ShieldCheck, KeyRound, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { authApi, setAuthToken } from '../lib/api';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [postalCode, setPostalCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (mode === 'login') {
        const response = await authApi.login({ email, password });
        if (response.success && response.token) {
          setAuthToken(response.token);
          setSuccessMsg('Logged in successfully!');
          setTimeout(() => {
            onAuthSuccess(response.user);
            onClose();
          }, 600);
        }
      } else if (mode === 'register') {
        const response = await authApi.register({
          fullName,
          email,
          password,
          phoneNumber,
          address,
          city,
          country,
          postalCode,
        });
        if (response.success && response.token) {
          setAuthToken(response.token);
          setSuccessMsg('Collector account registered successfully!');
          setTimeout(() => {
            onAuthSuccess(response.user);
            onClose();
          }, 600);
        }
      } else if (mode === 'forgot') {
        const response = await authApi.forgotPassword(email);
        setSuccessMsg(response.message || 'Password reset token generated! Check email.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FFFDF8] border border-[#B68D40]/30 rounded-[28px] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Decorative Gold Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B68D40] via-[#D9C7AE] to-[#A76B3F]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1F2328] text-[#D9C7AE] flex items-center justify-center hover:bg-[#B68D40] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Title */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-full bg-[#1F2328] text-[#B68D40] border border-[#B68D40]/40 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2B2622]">
            {mode === 'login' ? 'Customer Login' : mode === 'register' ? 'Customer Signup' : 'Reset Password'}
          </h2>
          <p className="text-xs text-[#6A6158]">
            Access your customer account, order tracking & private inquiries
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-[#F8F5EF] p-1 rounded-xl border border-[#B68D40]/20 font-serif text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-[#1F2328] text-[#B68D40] shadow-md'
                : 'text-[#6A6158] hover:text-[#2B2622]'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-[#1F2328] text-[#B68D40] shadow-md'
                : 'text-[#6A6158] hover:text-[#2B2622]'
            }`}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => { setMode('forgot'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'forgot'
                ? 'bg-[#1F2328] text-[#B68D40] shadow-md'
                : 'text-[#6A6158] hover:text-[#2B2622]'
            }`}
          >
            Reset
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-3 rounded-xl bg-[#B83A3A]/10 border border-[#B83A3A]/30 text-[#B83A3A] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-[#2E7D32] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B68D40] block">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Lord Edward Harrington"
                  className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B68D40] block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. collector@heritage.co.uk"
                className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
                required
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B68D40] block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
                  required
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <>
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B68D40] block">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+44 20 7946 0912"
                    className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B68D40] block">
                  Vault Shipping Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street Address / Manor Estate"
                    className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3 py-2 text-xs font-mono text-[#2B2622]"
                />
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className="bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3 py-2 text-xs font-mono text-[#2B2622]"
                />
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal Code"
                  className="bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3 py-2 text-xs font-mono text-[#2B2622]"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1F2328] hover:bg-[#B68D40] text-white font-serif text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing Request...
              </span>
            ) : (
              <>
                <span>
                  {mode === 'login' ? 'Authenticate Collector Access' : mode === 'register' ? 'Complete Profile Registration' : 'Send Password Reset Token'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#B68D40]" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-[#B68D40]/15 text-center text-[10px] text-[#6A6158] font-mono">
          Private Escrow Protected • 256-Bit Encrypted Vault Session
        </div>
      </div>
    </div>
  );
};

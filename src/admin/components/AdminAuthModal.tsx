import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, User, KeyRound, X, AlertCircle, Eye, EyeOff, Clock, HelpCircle } from 'lucide-react';
import { authApi, setAuthToken } from '../../lib/api';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData?: any) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  // Lockout countdown timer effect
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          setError('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutSeconds > 0) {
      return;
    }

    setIsAuthenticating(true);
    setError('');

    try {
      // Attempt backend authentication
      const response = await authApi.adminLogin({ username, password });
      if (response.success && response.token) {
        setAuthToken(response.token);
        setFailedAttempts(0);
        setLockoutSeconds(0);
        setUsername('');
        setPassword('');
        setError('');
        setIsAuthenticating(false);
        onSuccess(response.user);
        return;
      }
    } catch (err: any) {
      // Fallback local verification if offline / memory server initial check
      const normalizedUser = username.trim().toLowerCase().replace(/\s+/g, '');
      const isValidUser = normalizedUser === 'abdulrehman' || normalizedUser === 'abdul' || normalizedUser === 'admin';
      const isValidPass = password.trim().toLowerCase() === 'abdul';

      setIsAuthenticating(false);

      if (isValidUser && isValidPass) {
        setFailedAttempts(0);
        setLockoutSeconds(0);
        setUsername('');
        setPassword('');
        setError('');
        onSuccess({
          fullName: 'Abdulrehman',
          email: 'admin@heritageantiques.com',
          profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        });
        return;
      }

      const newFailedCount = failedAttempts + 1;
      setFailedAttempts(newFailedCount);

      let lockTime = 0;
      if (newFailedCount >= 5) {
        lockTime = 180; // 3 minutes lockout for 5+ attempts
      } else if (newFailedCount >= 2) {
        lockTime = 30; // 30 seconds lockout for 2+ attempts
      }

      if (lockTime > 0) {
        setLockoutSeconds(lockTime);
      }

      if (!isValidUser && !isValidPass) {
        setError('Invalid username and password.');
      } else if (!isValidUser) {
        setError('Invalid username.');
      } else {
        setError('Invalid password.');
      }
    }
  };

  const formatLockoutTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FFFDF8] border border-[#B68D40]/30 rounded-[28px] max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
        {/* Decorative Gold Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B68D40] via-[#D9C7AE] to-[#A76B3F]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1F2328] text-[#D9C7AE] flex items-center justify-center hover:bg-[#B68D40] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-full bg-[#1F2328] text-[#B68D40] border border-[#B68D40]/40 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2B2622]">Curator Clearance Required</h2>
          <p className="text-xs text-[#6A6158]">
            Mayfair Gallery Vault Security System • Restricted Access
          </p>
        </div>

        {/* Security Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B68D40] block">
              Curator Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g. Abdulrehman)"
                className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-[#2B2622] focus:outline-none focus:border-[#B68D40] focus:ring-1 focus:ring-[#B68D40] disabled:opacity-50"
                disabled={lockoutSeconds > 0}
                required
                autoFocus
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B68D40] block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl pl-10 pr-10 py-2.5 text-xs font-mono text-[#2B2622] focus:outline-none focus:border-[#B68D40] focus:ring-1 focus:ring-[#B68D40] disabled:opacity-50"
                disabled={lockoutSeconds > 0}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6A6158] hover:text-[#B68D40]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Password Hint (shown after 2 or more failed attempts) */}
          {failedAttempts >= 2 && (
            <div className="p-3 rounded-xl bg-[#B68D40]/10 border border-[#B68D40]/30 text-[#A76B3F] text-xs flex items-center gap-2 animate-fade-in">
              <HelpCircle className="w-4 h-4 shrink-0 text-[#B68D40]" />
              <span>Password Hint: <strong className="font-mono text-[#2B2622] font-bold">rehman</strong></span>
            </div>
          )}

          {/* Error & Lockout Message */}
          {lockoutSeconds > 0 ? (
            <div className="p-3 rounded-xl bg-[#B83A3A]/10 border border-[#B83A3A]/30 text-[#B83A3A] text-xs flex items-center gap-2 animate-fade-in">
              <Clock className="w-4 h-4 shrink-0 animate-spin" />
              <div>
                <p className="font-bold">Security Lockout Active</p>
                <p className="text-[11px]">
                  Too many incorrect attempts. Please wait{' '}
                  <strong className="font-mono text-sm">{formatLockoutTime(lockoutSeconds)}</strong> before trying again.
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="p-3 rounded-xl bg-[#B83A3A]/10 border border-[#B83A3A]/30 text-[#B83A3A] text-xs flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isAuthenticating || lockoutSeconds > 0}
            className="w-full py-3 bg-[#1F2328] hover:bg-[#B68D40] disabled:bg-[#1F2328]/40 disabled:cursor-not-allowed text-white font-serif text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isAuthenticating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying Credentials...
              </span>
            ) : lockoutSeconds > 0 ? (
              <span className="flex items-center gap-2 font-mono">
                <Clock className="w-4 h-4" /> Locked ({formatLockoutTime(lockoutSeconds)})
              </span>
            ) : (
              <>
                <KeyRound className="w-4 h-4 text-[#B68D40]" />
                <span>Unlock Admin Panel</span>
              </>
            )}
          </button>
        </form>

        {/* Credentials Info Footer */}
        <div className="pt-2 border-t border-[#B68D40]/15 text-center text-[10px] text-[#6A6158] font-mono">
          Authorized Master Curator Access • Heritage Vault
        </div>
      </div>
    </div>
  );
};


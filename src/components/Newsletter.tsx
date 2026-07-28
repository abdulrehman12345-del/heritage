import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">
      <div className="bg-[#1F2328] text-white rounded-[32px] p-8 md:p-16 border border-[#B68D40]/40 shadow-2xl relative overflow-hidden text-center">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#B68D40]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#A76B3F]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B68D40]/20 text-[#D9C7AE] text-xs font-mono uppercase tracking-widest mb-4 border border-[#B68D40]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B68D40]" />
            <span>Private Collectors Registry</span>
          </div>

          <h2 className="font-serif-heading text-3xl md:text-4xl font-bold text-[#F8F5EF] mb-4">
            Receive Private Vault Announcements
          </h2>

          <p className="text-sm text-[#D9C7AE]/90 font-light leading-relaxed mb-8">
            Subscribe to receive confidential priority briefings when rare animal bronzes, 
            Ming Dynasty vessels, and classical Greek antiquities enter our vault before public listing.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-[#2A3036] border border-[#B68D40] text-center flex flex-col items-center gap-2"
            >
              <CheckCircle2 className="w-8 h-8 text-[#B68D40]" />
              <h4 className="font-serif-heading text-lg font-bold text-[#F8F5EF]">Registration Confirmed</h4>
              <p className="text-xs text-[#D9C7AE] font-light">Your credentials have been added to our private curator briefing list.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your confidential email"
                className="w-full sm:flex-1 px-6 py-4 rounded-full bg-[#2A3036] text-[#F8F5EF] placeholder:text-[#D9C7AE]/50 border border-[#B68D40]/30 focus:outline-none focus:border-[#B68D40] text-sm font-light"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#A76B3F] hover:bg-[#B68D40] text-white font-serif-heading text-xs font-medium uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Join Registry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[10px] text-[#D9C7AE]/60 font-mono mt-4">
            Strict privacy policy. We never transmit or disclose collector credentials.
          </p>
        </div>

      </div>
    </section>
  );
};

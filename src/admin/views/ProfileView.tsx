import React, { useState } from 'react';
import { User, Save, Key, Shield, CheckCircle2 } from 'lucide-react';
import { AdminUser } from '../types';

interface ProfileViewProps {
  currentUser: AdminUser;
  onUpdateUser: (user: AdminUser) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ currentUser, onUpdateUser }) => {
  const [name, setName] = useState(currentUser?.name || 'Abdul Rehman');
  const [email, setEmail] = useState(currentUser?.email || 'admin@heritageantiques.com');
  const [role, setRole] = useState(currentUser?.role || 'Master Curator');
  const [avatar, setAvatar] = useState(currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdateUser({
      ...currentUser,
      name,
      email,
      role: role as any,
      avatar
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <User className="w-6 h-6 text-[#B68D40]" />
            Master Curator Profile & Vault Clearance
          </h1>
          <p className="text-xs text-[#6A6158]">Manage security credentials and curatorial signatures</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-[#2F855A] text-white text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Profile successfully updated!
        </div>
      )}

      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 space-y-4 text-xs">
        <div className="flex items-center gap-4 pb-4 border-b border-[#B68D40]/15">
          <img src={avatar} alt={name} className="w-20 h-20 rounded-full object-cover border-2 border-[#B68D40]" />
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-[#2B2622]">{name}</h3>
            <span className="px-2.5 py-1 rounded-full bg-[#1F2328] text-[#B68D40] text-[10px] font-mono font-bold">
              {role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold uppercase text-[#2B2622]">Full Name & Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase text-[#2B2622]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase text-[#2B2622]">Avatar Photo URL</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

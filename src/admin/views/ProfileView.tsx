import React, { useState, useRef } from 'react';
import { User, Save, CheckCircle2, Camera, Upload, Shield } from 'lucide-react';
import { AdminUser } from '../types';

interface ProfileViewProps {
  currentUser: AdminUser;
  onUpdateUser: (user: AdminUser) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ currentUser, onUpdateUser }) => {
  const [name, setName] = useState(currentUser?.name || 'Abdul Rehman Faisal');
  const [email, setEmail] = useState(currentUser?.email || 'abdul..rrehman90123@gmail.com');
  const [role, setRole] = useState(currentUser?.role || 'Founder & Owner');
  const [avatar, setAvatar] = useState(() => {
    try {
      const saved = localStorage.getItem('ha_founder_photo');
      return saved || currentUser?.avatar || '/founder.png';
    } catch {
      return currentUser?.avatar || '/founder.png';
    }
  });
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatar(result);
        try {
          localStorage.setItem('ha_founder_photo', result);
        } catch {}
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem('ha_founder_photo', avatar);
      if (avatar.startsWith('data:image/')) {
        fetch('/api/v1/cms/founder-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: avatar }),
        }).catch(() => {});
      }
    } catch {}
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
            Founder & Master Executive Profile
          </h1>
          <p className="text-xs text-[#6A6158]">Manage founder credentials, identity photograph, and official contacts</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-[#2F855A] text-white text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Profile and Founder Photograph successfully updated and synchronized!
        </div>
      )}

      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 space-y-5 text-xs">
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-[#B68D40]/15">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#B68D40] bg-[#1F2328] shadow-md flex items-center justify-center">
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }} />
              ) : (
                <span className="font-serif text-xl font-bold text-[#B68D40]">ARF</span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#B68D40] text-white hover:bg-[#A76B3F] shadow-lg border border-white"
              title="Upload Founder Photograph"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarFile}
              className="hidden"
            />
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-serif font-bold text-lg text-[#2B2622]">{name}</h3>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1F2328] text-[#B68D40] text-[10px] font-mono font-bold">
                Founder of Heritage Antiques
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#B68D40]/15 text-[#A76B3F] text-[10px] font-medium">
                Businessman and Entrepreneur
              </span>
            </div>
            <p className="text-[11px] text-[#6A6158]">
              Founder portrait will appear on the storefront under "Meet the Founder".
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold uppercase text-[#2B2622]">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase text-[#2B2622]">Role / Title</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="font-bold uppercase text-[#2B2622]">Official Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="sm:col-span-2 space-y-2 pt-2">
            <label className="font-bold uppercase text-[#2B2622]">Founder Photograph</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Image URL or data URI"
                value={avatar.length > 80 ? avatar.slice(0, 70) + '...' : avatar}
                readOnly
                className="flex-1 bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622] text-xs font-mono"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#F8F5EF] hover:bg-[#B68D40]/10 border border-[#B68D40]/40 rounded-xl text-xs font-semibold text-[#2B2622] flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5 text-[#B68D40]" />
                <span>Browse File</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

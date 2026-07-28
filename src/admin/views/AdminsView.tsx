import React from 'react';
import { ShieldCheck, Plus, Mail, CheckCircle2 } from 'lucide-react';
import { AdminUser } from '../types';

interface AdminsViewProps {
  admins: AdminUser[];
}

export const AdminsView: React.FC<AdminsViewProps> = ({ admins }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#B68D40]" />
            Curator Access & Governance
          </h1>
          <p className="text-xs text-[#6A6158]">
            Authorized curatorial staff, senior cataloguers, and vault security managers
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
          <Plus className="w-4 h-4" />
          <span>Invite New Curator</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {admins.map((adm) => (
          <div key={adm.id} className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 flex items-center gap-4">
            <img src={adm.avatar} alt={adm.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#B68D40]" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-[#2B2622]">{adm.name}</h3>
              <p className="text-xs text-[#B68D40] font-mono">{adm.role}</p>
              <p className="text-xs text-[#6A6158] flex items-center gap-1"><Mail className="w-3 h-3 text-[#B68D40]" /> {adm.email}</p>
              <span className="text-[10px] text-[#2F855A] font-bold uppercase inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {adm.lastActive}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

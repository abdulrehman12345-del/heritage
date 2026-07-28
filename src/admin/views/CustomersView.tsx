import React, { useState } from 'react';
import { Users, Search, Star, Mail, Phone, MapPin, Award } from 'lucide-react';
import { Customer } from '../types';

interface CustomersViewProps {
  customers: Customer[];
}

export const CustomersView: React.FC<CustomersViewProps> = ({ customers }) => {
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#B68D40]" />
            VIP Collector Registry
          </h1>
          <p className="text-xs text-[#6A6158]">
            Directory of royal patrons, museum trustees, and private antique collectors
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search collector name or email..."
            className="w-full bg-[#F8F5EF] border border-[#B68D40]/20 rounded-full pl-10 pr-4 py-2 text-xs text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cust) => (
          <div
            key={cust.id}
            className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm space-y-4 relative overflow-hidden group hover:border-[#B68D40] transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1F2328] text-[#B68D40] flex items-center justify-center font-serif font-bold text-lg border border-[#B68D40]/30">
                  {cust.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#2B2622]">{cust.name}</h3>
                  <p className="text-[10px] text-[#6A6158] font-mono">Member since {cust.joinedDate}</p>
                </div>
              </div>

              {cust.isVip && (
                <span className="px-2.5 py-1 rounded-full bg-[#B68D40]/15 text-[#B68D40] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#B68D40]" /> VIP Patron
                </span>
              )}
            </div>

            <div className="space-y-1.5 text-xs text-[#6A6158] pt-2 border-t border-[#B68D40]/15">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B68D40]" />
                {cust.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B68D40]" />
                {cust.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B68D40]" />
                {cust.address}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#F8F5EF] flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[9px] text-[#6A6158] uppercase block">Acquisitions</span>
                <span className="font-bold text-[#2B2622]">{cust.totalOrders} Items</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-[#6A6158] uppercase block">Total Spent</span>
                <span className="font-bold text-[#A76B3F]">${cust.totalSpent.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

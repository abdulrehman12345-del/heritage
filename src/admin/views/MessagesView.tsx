import React from 'react';
import { MessageSquare, Mail, Phone, Calendar, Eye, CheckCircle2, User } from 'lucide-react';
import { CustomerInquiryMessage } from '../types';

interface MessagesViewProps {
  inquiries: CustomerInquiryMessage[];
  onMarkAsReplied: (id: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({ inquiries, onMarkAsReplied }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#B68D40]" />
            Private Acquisition Inquiries & Dispatches
          </h1>
          <p className="text-xs text-[#6A6158]">
            Direct confidential inquiries submitted by collectors from the public storefront
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className={`p-6 rounded-[24px] border transition-all ${
              inq.status === 'Unread'
                ? 'bg-[#FFFDF8] border-[#B68D40] shadow-md'
                : 'bg-[#F8F5EF]/80 border-[#B68D40]/20'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#B68D40]/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1F2328] text-[#B68D40] font-bold font-serif flex items-center justify-center">
                  {inq.collectorName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#2B2622]">{inq.collectorName}</h3>
                  <p className="text-xs text-[#B68D40] font-mono font-bold">Inquiring about: {inq.artifactTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#6A6158] font-mono">{inq.date}</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    inq.status === 'Unread'
                      ? 'bg-[#B68D40] text-white'
                      : 'bg-[#2F855A]/15 text-[#2F855A]'
                  }`}
                >
                  {inq.status}
                </span>
              </div>
            </div>

            <div className="py-4 space-y-2 text-xs">
              <div className="flex flex-wrap items-center gap-4 text-[#6A6158] font-mono">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#B68D40]" /> {inq.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#B68D40]" /> {inq.phone}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#B68D40]" /> Prefers: {inq.preferredContact}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F5EF] text-[#2B2622] leading-relaxed font-serif italic text-sm">
                "{inq.message}"
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              {inq.status === 'Unread' && (
                <button
                  onClick={() => onMarkAsReplied(inq.id)}
                  className="px-4 py-2 bg-[#1F2328] hover:bg-[#B68D40] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#B68D40] hover:text-white" /> Mark as Consulted
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

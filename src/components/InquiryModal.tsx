import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artifact } from '../types';
import { X, ShieldCheck, CheckCircle2, Lock, Send, Phone, Mail, Building2 } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  artifact: Artifact | null;
  onClose: () => void;
  onAddInquiry?: (inquiry: any) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  artifact,
  onClose,
  onAddInquiry
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'Private Acquisition & Escrow',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddInquiry) {
      onAddInquiry({
        id: `inq-${Date.now()}`,
        collectorName: formData.name || 'Anonymous Collector',
        email: formData.email,
        phone: formData.phone || '+44 20 7946 0912',
        artifactTitle: artifact ? artifact.title : 'General Collection Inquiry',
        message: formData.message || `Inquiry type: ${formData.inquiryType}`,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'Unread',
        preferredContact: 'Private Viewing'
      });
    }
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1F2328]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#F8F5EF] rounded-[32px] border border-[#B68D40]/40 shadow-2xl overflow-hidden my-8 z-10 p-6 md:p-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#B68D40]/10 text-[#2B2622] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#B68D40]/15 flex items-center justify-center text-[#B68D40] border border-[#B68D40]/40">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-[#A76B3F] font-mono uppercase tracking-widest font-bold">Confidential Consultation</p>
              <h3 className="font-serif-heading text-xl md:text-2xl font-bold text-[#2B2622]">
                Private Acquisition Request
              </h3>
            </div>
          </div>

          {artifact && (
            <div className="p-4 rounded-2xl bg-[#F2ECE3] border border-[#B68D40]/25 mb-6 flex items-center gap-4">
              <img src={artifact.image} alt={artifact.title} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
              <div>
                <span className="text-[10px] text-[#6B6258] font-mono uppercase">Vault Item: {artifact.certificateNumber}</span>
                <p className="font-serif-heading text-sm font-bold text-[#2B2622]">{artifact.title}</p>
                <p className="text-xs text-[#A76B3F] font-bold font-serif-heading">{artifact.priceFormatted}</p>
              </div>
            </div>
          )}

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center flex flex-col items-center gap-3"
            >
              <CheckCircle2 className="w-12 h-12 text-[#B68D40]" />
              <h4 className="font-serif-heading text-2xl font-bold text-[#2B2622]">Inquiry Dispatched</h4>
              <p className="text-sm text-[#6B6258] max-w-md font-light leading-relaxed">
                Thank you. A Senior Partner Curator from our Geneva or London vault will reach out directly within 24 hours to coordinate private viewing and escrow specs.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-3 rounded-full bg-[#B68D40] text-white font-serif-heading text-xs uppercase tracking-widest"
              >
                Close Window
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#2B2622] font-semibold block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lord / Lady / Dr. / Mr. Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#B68D40]/30 text-xs focus:outline-none focus:border-[#B68D40]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#2B2622] font-semibold block mb-1">Confidential Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="patron@estate.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#B68D40]/30 text-xs focus:outline-none focus:border-[#B68D40]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#2B2622] font-semibold block mb-1">Telephone / Private Line</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+41 22 800 9000"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#B68D40]/30 text-xs focus:outline-none focus:border-[#B68D40]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#2B2622] font-semibold block mb-1">Institution / Family Trust</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Private Estate / Museum Trust"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#B68D40]/30 text-xs focus:outline-none focus:border-[#B68D40]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#2B2622] font-semibold block mb-1">Inquiry Purpose</label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#B68D40]/30 text-xs focus:outline-none focus:border-[#B68D40]"
                >
                  <option>Private Acquisition & Escrow</option>
                  <option>Geneva / London Private Viewing Request</option>
                  <option>Estate Appraisal & Valuation Consultation</option>
                  <option>White-Glove International Transport Specs</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#2B2622] font-semibold block mb-1">Specific Curatorial Notes</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention any delivery timelines, framing requests, or private escrow instructions..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#B68D40]/30 text-xs focus:outline-none focus:border-[#B68D40]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#B68D40] hover:bg-[#A76B3F] text-white font-serif-heading text-xs uppercase tracking-widest font-medium transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Confidential Request</span>
                </button>
              </div>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

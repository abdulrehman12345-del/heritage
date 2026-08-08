import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artifact } from '../types';
import { X, ShieldCheck, Calendar, MapPin, Award, CheckCircle2, FileText, Lock, Compass, ArrowRight } from 'lucide-react';

interface ArtifactModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  onInquireClick: (artifact: Artifact) => void;
}

export const ArtifactModal: React.FC<ArtifactModalProps> = ({
  artifact,
  onClose,
  onInquireClick
}) => {
  if (!artifact) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = [artifact.image, ...(artifact.secondaryImages || [])];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1F2328]/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-5xl bg-[#F8F5EF] rounded-[32px] border border-[#B68D40]/40 shadow-2xl overflow-hidden my-8 z-10 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar with Certificate ID & Close Button */}
          <div className="px-6 py-4 bg-[#1F2328] text-white flex items-center justify-between border-b border-[#B68D40]/30 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#B68D40]/20 flex items-center justify-center text-[#B68D40] border border-[#B68D40]/40">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#D9C7AE] font-mono uppercase tracking-widest">Heritage Vault Archive</p>
                <p className="text-xs font-semibold text-[#F8F5EF] font-mono">{artifact.certificateNumber}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Content Body */}
          <div className="p-6 md:p-10 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* Left Column: Image Viewer Gallery (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#1F2328] border border-[#B68D40]/30 shadow-md">
                <img
                  src={images[activeImageIndex] || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=70&w=700'}
                  alt={artifact.title}
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=70&w=700';
                  }}
                  className="w-full h-full object-cover object-center filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D9C7AE] text-[10px] font-mono">
                  High-Res View {activeImageIndex + 1} of {images.length}
                </span>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#B68D40] ring-2 ring-[#B68D40]/30 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}

              {/* Artifact Specifications Box */}
              <div className="p-5 rounded-2xl bg-[#F2ECE3] border border-[#B68D40]/20 flex flex-col gap-2.5 text-xs text-[#2B2622]">
                <h4 className="font-serif-heading font-bold text-sm text-[#B68D40] uppercase tracking-wider mb-1">
                  Physical Specifications
                </h4>
                <div className="flex justify-between border-b border-[#B68D40]/15 pb-1.5">
                  <span className="text-[#6B6258]">Category:</span>
                  <span className="font-semibold">{artifact.category}</span>
                </div>
                <div className="flex justify-between border-b border-[#B68D40]/15 pb-1.5">
                  <span className="text-[#6B6258]">Dimensions:</span>
                  <span className="font-mono">{artifact.dimensions}</span>
                </div>
                <div className="flex justify-between border-b border-[#B68D40]/15 pb-1.5">
                  <span className="text-[#6B6258]">Weight:</span>
                  <span className="font-mono">{artifact.weight}</span>
                </div>
                <div className="flex justify-between border-b border-[#B68D40]/15 pb-1.5">
                  <span className="text-[#6B6258]">Material Alloy:</span>
                  <span className="font-medium text-right max-w-[200px]">{artifact.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6258]">Preservation:</span>
                  <span className="font-medium text-right max-w-[200px] text-[#A76B3F]">{artifact.condition}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Historical Narrative & Provenance (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Meta Header */}
                <div className="flex items-center gap-3 text-xs text-[#6B6258] mb-2 font-mono">
                  <span className="flex items-center gap-1 text-[#B68D40]">
                    <MapPin className="w-3.5 h-3.5" />
                    {artifact.origin}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#A76B3F]">
                    <Calendar className="w-3.5 h-3.5" />
                    {artifact.periodYear}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#2B2622] mb-3 leading-tight">
                  {artifact.title}
                </h2>

                {/* Price Display */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#B68D40]/20">
                  <span className="font-serif-heading text-3xl font-bold text-[#A76B3F]">{artifact.priceFormatted}</span>
                  <span className="px-3 py-1 rounded-full bg-[#B68D40]/10 text-[#B68D40] text-xs font-medium tracking-wide uppercase border border-[#B68D40]/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Museum Certified
                  </span>
                </div>

                {/* Description Narrative */}
                <div className="mb-6">
                  <h4 className="font-serif-heading font-semibold text-sm text-[#2B2622] mb-2">Historical Overview</h4>
                  <p className="text-sm text-[#6B6258] font-light leading-relaxed">
                    {artifact.description}
                  </p>
                </div>

                {/* Curator Notes */}
                <div className="mb-8 p-4 rounded-2xl bg-[#1F2328] text-white border border-[#B68D40]/30 relative">
                  <div className="flex items-center gap-2 text-[#B68D40] text-xs font-serif-heading font-bold uppercase tracking-wider mb-2">
                    <FileText className="w-4 h-4" />
                    <span>Senior Curator Analysis & Metallurgy</span>
                  </div>
                  <p className="text-xs text-[#D9C7AE] font-light leading-relaxed italic">
                    "{artifact.curatorNotes}"
                  </p>
                </div>

                {/* Provenance Step-by-Step Lineage */}
                <div className="mb-8">
                  <h4 className="font-serif-heading font-semibold text-sm text-[#2B2622] mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#B68D40]" />
                    <span>Documented Lineage of Provenance</span>
                  </h4>

                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#B68D40]/30">
                    {artifact.provenance.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[#B68D40] border-2 border-[#F8F5EF]" />
                        <div className="text-xs">
                          <span className="font-mono font-bold text-[#B68D40] mr-2">{step.year}</span>
                          <span className="font-semibold text-[#2B2622]">{step.event}</span>
                          <span className="text-[#6B6258] italic block text-[11px] mt-0.5">{step.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-6 border-t border-[#B68D40]/20 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    onClose();
                    onInquireClick(artifact);
                  }}
                  className="flex-1 py-4 px-6 rounded-full bg-[#B68D40] hover:bg-[#A76B3F] text-[#F8F5EF] font-serif-heading font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#F8F5EF]" />
                  <span>Request Private Viewing & Escrow</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-4 rounded-full border border-[#B68D40]/40 text-[#2B2622] font-serif-heading text-xs uppercase tracking-wider hover:bg-[#B68D40]/10 transition-colors"
                >
                  Return to Vault
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

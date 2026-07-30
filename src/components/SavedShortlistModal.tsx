import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artifact } from '../types';
import { X, Heart, ShieldCheck, Compass, MapPin, Calendar, Trash2 } from 'lucide-react';

interface SavedShortlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArtifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
  onRemoveSaved: (artifactId: string) => void;
  onInquireArtifact: (artifact: Artifact) => void;
}

export const SavedShortlistModal: React.FC<SavedShortlistModalProps> = ({
  isOpen,
  onClose,
  savedArtifacts,
  onSelectArtifact,
  onRemoveSaved,
  onInquireArtifact
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[88vh] bg-[#1F2328] rounded-[28px] border border-[#B68D40]/40 shadow-2xl overflow-hidden flex flex-col text-white"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#B68D40]/25 flex items-center justify-between bg-[#2A3036]/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B68D40]/20 border border-[#B68D40]/40 flex items-center justify-center text-[#B68D40]">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h2 className="font-serif-heading text-xl font-semibold text-[#F8F5EF]">
                  Saved Collector Shortlist
                </h2>
                <p className="text-xs text-[#D9C7AE]/70 font-mono">
                  {savedArtifacts.length} {savedArtifacts.length === 1 ? 'masterpiece' : 'masterpieces'} bookmarked for private review
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#D9C7AE] hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {savedArtifacts.length === 0 ? (
              <div className="py-16 text-center text-[#D9C7AE]">
                <Heart className="w-12 h-12 text-[#B68D40]/40 mx-auto mb-3" />
                <p className="font-serif-heading text-lg font-semibold text-[#F8F5EF]">Your Shortlist is Currently Empty</p>
                <p className="text-xs text-[#D9C7AE]/70 max-w-md mx-auto mt-2">
                  Click the heart icon on any antique piece in the gallery to bookmark it here for quick comparison and private acquisition inquiries.
                </p>
              </div>
            ) : (
              savedArtifacts.map((artifact) => (
                <div
                  key={artifact.id}
                  className="p-4 rounded-2xl bg-[#2A3036] border border-[#B68D40]/25 hover:border-[#B68D40]/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => { onSelectArtifact(artifact); onClose(); }}>
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#15181C] shrink-0 border border-[#B68D40]/30">
                      <img
                        src={artifact.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200'}
                        alt={artifact.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200';
                        }}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#B68D40]">
                        {artifact.category} • {artifact.periodYear}
                      </span>
                      <h3 className="font-serif-heading text-base font-semibold text-[#F8F5EF] hover:text-[#B68D40] transition-colors line-clamp-1">
                        {artifact.title}
                      </h3>
                      <p className="text-xs text-[#D9C7AE]/80 font-mono mt-0.5">
                        Valuation: <strong className="text-[#B68D40]">{artifact.priceFormatted}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => {
                        onInquireArtifact(artifact);
                        onClose();
                      }}
                      className="px-3.5 py-2 rounded-full bg-[#B68D40] hover:bg-[#A76B3F] text-white font-serif-heading text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                    >
                      Inquire Acquisition
                    </button>

                    <button
                      onClick={() => onRemoveSaved(artifact.id)}
                      className="p-2 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all border border-red-500/20"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#B68D40]/25 bg-[#2A3036]/80 flex items-center justify-between text-xs text-[#D9C7AE]/80">
            <div className="flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#B68D40]" />
              <span>Certified Confidential Curator Service</span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-serif-heading text-xs uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

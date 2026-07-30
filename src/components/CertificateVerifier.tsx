import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ARTIFACTS_DATA } from '../data/artifacts';
import { Artifact } from '../types';
import { ShieldCheck, Search, CheckCircle, Award, FileText, Lock, Sparkles } from 'lucide-react';

interface CertificateVerifierProps {
  onSelectArtifact: (artifact: Artifact) => void;
}

export const CertificateVerifier: React.FC<CertificateVerifierProps> = ({
  onSelectArtifact
}) => {
  const [inputCode, setInputCode] = useState('HA-1840-FALCON');
  const [searchedArtifact, setSearchedArtifact] = useState<Artifact | null>(ARTIFACTS_DATA[0]);
  const [errorMsg, setErrorMsg] = useState('');

  const sampleCodes = [
    'HA-1840-FALCON',
    'HA-0220-LION',
    'HA-1620-DRAGON',
    'HA-1150-GANESHA',
    'HA-0520-CORINTH'
  ];

  const handleVerify = (codeToVerify?: string) => {
    const code = (codeToVerify || inputCode).trim().toUpperCase();
    const found = ARTIFACTS_DATA.find(a => a.certificateNumber.toUpperCase() === code);
    
    if (found) {
      setSearchedArtifact(found);
      setErrorMsg('');
    } else {
      setSearchedArtifact(null);
      setErrorMsg(`No archival record found matching serial key "${code}". Please try a sample code below.`);
    }
  };

  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
      <div className="bg-[#F2ECE3] rounded-[32px] p-8 md:p-14 border border-[#B68D40]/30 shadow-xl relative overflow-hidden">
        
        {/* Decorative Gold Seal Background Icon */}
        <div className="absolute top-6 right-6 opacity-5 pointer-events-none text-[#B68D40]">
          <Award className="w-96 h-96" />
        </div>

        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#B68D40] block mb-2 font-medium">
            Archival Provenance Vault
          </span>
          <h2 className="font-serif-heading text-3xl md:text-4xl font-bold text-[#2B2622]">
            Certificate Authenticity Verification
          </h2>
          <p className="text-sm text-[#6B6258] mt-3 font-light leading-relaxed">
            Verify any Heritage Antiques Certificate of Authenticity against our secure archival vault ledger. 
            Access carbon-dating certificates, X-ray fluorescence metallurgical scans, and ownership records.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex items-center gap-2 p-2 rounded-full bg-[#F8F5EF] border border-[#B68D40]/40 shadow-md">
            <div className="pl-4 text-[#B68D40]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter Vault Code (e.g. HA-1840-FALCON)"
              className="flex-1 bg-transparent px-2 py-2 text-sm font-mono text-[#2B2622] placeholder:text-[#6B6258]/50 focus:outline-none uppercase"
            />
            <button
              onClick={() => handleVerify()}
              className="px-6 py-3 rounded-full bg-[#B68D40] hover:bg-[#A76B3F] text-[#F8F5EF] font-serif-heading text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2 shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>Verify</span>
            </button>
          </div>

          {/* Sample Codes */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs text-[#6B6258] font-mono mr-1">Sample Vault Keys:</span>
            {sampleCodes.map((code) => (
              <button
                key={code}
                onClick={() => {
                  setInputCode(code);
                  handleVerify(code);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                  inputCode.toUpperCase() === code
                    ? 'bg-[#B68D40] text-white'
                    : 'bg-[#F8F5EF] text-[#6B6258] hover:text-[#B68D40] border border-[#B68D40]/20'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Results Display */}
        {errorMsg ? (
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-[#1F2328] text-white text-center border border-red-500/30">
            <p className="text-xs text-red-300 font-mono">{errorMsg}</p>
          </div>
        ) : searchedArtifact ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-[#F8F5EF] rounded-2xl p-6 md:p-8 border border-[#B68D40]/40 shadow-xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#B68D40]/20 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B68D40]/15 flex items-center justify-center text-[#B68D40] border border-[#B68D40]/40">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#A76B3F] font-mono uppercase tracking-widest block font-bold">Verification Status</span>
                  <span className="font-serif-heading text-sm font-bold text-[#2B2622]">100% Authentic Archival Entry</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#B68D40]/10 text-[#B68D40] text-xs font-mono font-bold">
                {searchedArtifact.certificateNumber}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div className="h-32 rounded-xl overflow-hidden bg-[#1F2328]">
                <img
                  src={searchedArtifact.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200'}
                  alt={searchedArtifact.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200';
                  }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="sm:col-span-2">
                <span className="text-[10px] text-[#6B6258] uppercase tracking-wider font-mono block">{searchedArtifact.era} • {searchedArtifact.origin}</span>
                <h4 className="font-serif-heading font-bold text-lg text-[#2B2622] mt-0.5">{searchedArtifact.title}</h4>
                <p className="text-xs text-[#6B6258] mt-1 font-light line-clamp-2">{searchedArtifact.description}</p>
                
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => onSelectArtifact(searchedArtifact)}
                    className="px-4 py-2 rounded-full bg-[#B68D40] text-white text-xs font-serif-heading tracking-wider uppercase hover:bg-[#A76B3F] transition-all flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Certificate Details</span>
                  </button>
                  <span className="text-xs text-[#A76B3F] font-mono font-bold">{searchedArtifact.priceFormatted}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

      </div>
    </section>
  );
};

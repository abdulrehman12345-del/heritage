import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ARTIFACTS_DATA } from '../data/artifacts';
import { Artifact } from '../types';
import { Sparkles, ShieldCheck, Volume2, VolumeX, Eye, ArrowRight } from 'lucide-react';

interface MasterpieceSpotlightProps {
  onSelectArtifact: (artifact: Artifact) => void;
}

export const MasterpieceSpotlight: React.FC<MasterpieceSpotlightProps> = ({
  onSelectArtifact
}) => {
  const masterpiece = ARTIFACTS_DATA.find(a => a.id === 'ha-03') || ARTIFACTS_DATA[2];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Subtle ambient museum chime synthesizer using Web Audio API
  const toggleAmbientAudio = () => {
    if (!isPlayingAudio) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        
        // Create soft bell chime sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime); // 432Hz warm tuning
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 3.5);
        
        setIsPlayingAudio(true);
        setTimeout(() => setIsPlayingAudio(false), 3500);
      } catch (e) {
        console.error("Audio not supported", e);
      }
    } else {
      setIsPlayingAudio(false);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-[#1F2328] text-white relative overflow-hidden my-16">
      {/* Background Gold Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B68D40]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#A76B3F]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image Presentation (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-[500px] rounded-[32px] overflow-hidden p-3 bg-[#2A3036] border border-[#B68D40]/40 shadow-2xl group cursor-pointer" onClick={() => onSelectArtifact(masterpiece)}>
              <div className="relative h-[480px] sm:h-[540px] w-full rounded-[24px] overflow-hidden bg-black">
                <img
                  src={masterpiece.image}
                  alt={masterpiece.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2328] via-transparent to-black/20" />

                {/* Audio Ambience Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAmbientAudio();
                  }}
                  className="absolute top-4 right-4 px-4 py-2 rounded-full bg-[#1F2328]/80 backdrop-blur-md border border-[#B68D40]/40 text-[#D9C7AE] text-xs font-serif-heading font-medium tracking-wide flex items-center gap-2 hover:bg-[#B68D40] hover:text-white transition-all shadow-xl"
                >
                  {isPlayingAudio ? <Volume2 className="w-4 h-4 text-[#B68D40] animate-pulse" /> : <VolumeX className="w-4 h-4 text-[#D9C7AE]" />}
                  <span>{isPlayingAudio ? 'Playing Resonances...' : 'Listen to Resonances'}</span>
                </button>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 rounded-full bg-[#B68D40]/20 border border-[#B68D40]/50 text-[#D9C7AE] text-[10px] font-mono uppercase tracking-widest inline-block mb-2">
                    Imperial Archive: {masterpiece.certificateNumber}
                  </span>
                  <h3 className="font-serif-heading text-2xl font-bold text-[#F8F5EF] group-hover:text-[#B68D40] transition-colors">
                    {masterpiece.title}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column Narrative Details (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B68D40]/15 border border-[#B68D40]/40 text-[#D9C7AE] text-xs font-mono tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#B68D40]" />
              <span>Curator’s Spotlight Masterpiece</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F5EF] leading-tight mb-6">
              The Celestial Dragon <br />
              <span className="italic font-normal text-[#B68D40]">Imperial Bronze Vessel</span>
            </h2>

            <p className="text-sm sm:text-base text-[#D9C7AE]/90 font-light leading-relaxed mb-6">
              Commissioned during the Wanli Era (c. 1620 AD) of the Ming Dynasty for the Imperial Ancestral Temple in Beijing. 
              Features five-claw imperial dragon handles chasing the flaming pearl amidst repoussé cloud motifs, cast in rich copper-gold bronze.
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4 w-full mb-8 p-5 rounded-2xl bg-[#2A3036] border border-[#B68D40]/30">
              <div>
                <span className="text-[10px] text-[#D9C7AE]/60 uppercase tracking-widest block font-mono">Era & Reign</span>
                <span className="text-sm font-semibold text-[#F8F5EF]">Ming Dynasty (c. 1620 AD)</span>
              </div>
              <div>
                <span className="text-[10px] text-[#D9C7AE]/60 uppercase tracking-widest block font-mono">Metallurgy</span>
                <span className="text-sm font-semibold text-[#F8F5EF]">Gold-Fired Cast Bronze</span>
              </div>
              <div>
                <span className="text-[10px] text-[#D9C7AE]/60 uppercase tracking-widest block font-mono">Height & Weight</span>
                <span className="text-sm font-semibold text-[#F8F5EF]">58cm • 18.6 kg</span>
              </div>
              <div>
                <span className="text-[10px] text-[#D9C7AE]/60 uppercase tracking-widest block font-mono">Valuation</span>
                <span className="text-sm font-bold text-[#B68D40] font-serif-heading">$92,000</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectArtifact(masterpiece)}
                className="px-8 py-4 rounded-full bg-[#B68D40] text-[#F8F5EF] font-serif-heading font-medium text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:bg-[#A76B3F] transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>Inspect Masterpiece Details</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-[#D9C7AE]/70 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#B68D40]" />
                <span>UNESCO Compliant Heritage</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

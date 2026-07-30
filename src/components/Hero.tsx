import React from 'react';
import { motion } from 'motion/react';
import { Compass, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onDiscoverClick: () => void;
  onSelectFeaturedArtifact: (artifactId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onDiscoverClick,
  onSelectFeaturedArtifact
}) => {
  return (
    <section id="hero" className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden paper-texture">
      {/* Background Subtle Warm Golden Radial Halos */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#B68D40]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#A76B3F]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Museum Heritage Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A87C32]/10 border border-[#A87C32]/25 text-[#966C2A] text-xs font-semibold tracking-wide mb-6"
            >
              <ShieldCheck className="w-4 h-4 text-[#A87C32]" />
              <span>Imperial Antiquities & Provenance Vault</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-serif-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2C2723] leading-[1.12] tracking-normal mb-6"
            >
              Own A Piece <br />
              <span className="italic font-normal text-[#A87C32]">Of History</span>
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-base sm:text-lg text-[#635A50] max-w-xl font-normal leading-relaxed mb-10"
            >
              Discover extraordinary museum-grade antiquities, ancient animal bronzes, 
              historical sculptures, and rare copper vessels. Each artifact is rigorously 
              certified with uninterrupted centuries of provenance.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto"
            >
              {/* Explore Collection Button */}
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreClick}
                className="px-8 py-4 rounded-full bg-[#A87C32] text-[#FAF7F2] font-semibold text-sm tracking-wide shadow-lg hover:bg-[#966C2A] hover:shadow-xl transition-all duration-300 flex items-center gap-3 group"
              >
                <span>Explore Collection</span>
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
              </motion.button>

              {/* Discover Heritage Button */}
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDiscoverClick}
                className="px-8 py-4 rounded-full bg-transparent border border-[#A87C32]/35 text-[#2C2723] font-semibold text-sm tracking-wide hover:bg-[#A87C32]/08 hover:border-[#A87C32] transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Discover Heritage</span>
                <ArrowRight className="w-4 h-4 text-[#A87C32] group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>

            {/* Trust Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-14 pt-8 border-t border-[#B68D40]/20 grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-xl"
            >
              <div>
                <p className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#B68D40]">100%</p>
                <p className="text-xs text-[#6B6258] mt-1 font-light tracking-wide uppercase">Certified Provenance</p>
              </div>
              <div>
                <p className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#2B2622]">1892</p>
                <p className="text-xs text-[#6B6258] mt-1 font-light tracking-wide uppercase">Established Vault</p>
              </div>
              <div>
                <p className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#A76B3F]">2,500+</p>
                <p className="text-xs text-[#6B6258] mt-1 font-light tracking-wide uppercase">Years of Artistry</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Showcase Column (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Warm Lighting Radial Backing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#B68D40]/20 via-[#D9C7AE]/30 to-transparent rounded-full filter blur-2xl transform scale-110" />

            {/* Main Floating Antique Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[480px] rounded-[32px] p-3 bg-[#1F2328] border border-[#B68D40]/40 shadow-2xl group cursor-pointer"
              onClick={() => onSelectFeaturedArtifact('ha-01')}
            >
              {/* Image Frame Container */}
              <div className="relative h-[480px] sm:h-[530px] w-full rounded-[24px] overflow-hidden bg-[#15181C]">
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1200"
                  alt="Edo Period Imperial Bronze Falcon"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gold Lighting Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#15181C] via-[#15181C]/30 to-black/40 opacity-90" />

                {/* Top Badges Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F2328]/85 backdrop-blur-md border border-[#B68D40]/50 text-[#D9C7AE] text-[11px] font-medium tracking-wide shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#B68D40]" />
                    <span>Curator’s Featured Masterpiece</span>
                  </div>

                  <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#1F2328]/85 backdrop-blur-md border border-[#B68D40]/50 text-[#D9C7AE] text-[10px] font-mono tracking-wider shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B68D40]" />
                    <span>HA-1840</span>
                  </div>
                </div>

                {/* Bottom Card Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white bg-[#1F2328]/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#B68D40]/30 shadow-xl">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[#D9C7AE] text-[11px] uppercase tracking-widest font-mono">
                      Edo Period • Japan c. 1840 AD
                    </span>
                    <span className="text-[10px] font-mono text-[#B68D40] uppercase">
                      Vault Verified
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-xl sm:text-2xl font-semibold text-[#F8F5EF] group-hover:text-[#B68D40] transition-colors leading-snug">
                    Imperial Bronze Falcon Statue
                  </h3>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/15">
                    <div className="flex items-center gap-1.5 text-xs text-[#D9C7AE] font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B68D40]" />
                      <span>Certified Authentic</span>
                    </div>
                    <span className="font-serif-heading text-xl font-bold text-[#B68D40]">$34,500</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

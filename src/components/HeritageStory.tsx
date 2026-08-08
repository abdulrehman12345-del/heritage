import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Crown, Compass } from 'lucide-react';

export const HeritageStory: React.FC = () => {
  return (
    <section id="heritage" className="py-24 md:py-36 paper-texture border-t border-[#B68D40]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Editorial Quote */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#B68D40] block mb-3 font-medium">
            The House of Heritage
          </span>
          <h2 className="font-serif-heading text-3xl md:text-5xl lg:text-6xl font-bold text-[#2B2622] leading-tight">
            Preserving Millennia <br />
            <span className="italic font-normal text-[#B68D40]">Of Human Artistry</span>
          </h2>
          <div className="w-20 h-[2px] bg-[#B68D40] mx-auto mt-6 mb-6" />
          <p className="text-base md:text-lg text-[#6B6258] font-light leading-relaxed">
            "We do not merely trade in antiquities; we act as custodians for ancient bronzes, 
            sacred copper vessels, and historical sculptures that have endured empires."
          </p>
        </div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Large Left Image Frame (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-[32px] overflow-hidden border border-[#B68D40]/30 shadow-2xl p-3 bg-[#FDFBF7]">
              <div className="h-[480px] md:h-[560px] w-full rounded-[24px] overflow-hidden bg-[#1F2328]">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=70&w=600&auto=format&fit=crop"
                  alt="Ancient Roman Sculpture in Museum Setting"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2328]/90 via-transparent to-transparent" />
                
                {/* Floating Museum Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#1F2328]/90 backdrop-blur-md border border-[#B68D40]/40 text-white">
                  <p className="font-serif-heading text-lg font-bold text-[#F8F5EF]">The Geneva & London Vaults</p>
                  <p className="text-xs text-[#D9C7AE] font-light mt-1">
                    Houses over 400 certified animal bronzes, historical sculptures, and copper artifacts under strict micro-climate preservation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Narrative Copy (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#A76B3F] mb-3 block">
              Curatorial Philosophy
            </span>
            
            <h3 className="font-serif-heading text-2xl md:text-3xl font-bold text-[#2B2622] mb-6 leading-snug">
              Rigorous Provenance, Uncompromising Ethics, Museum Quality.
            </h3>

            <div className="space-y-6 text-sm text-[#6B6258] font-light leading-relaxed mb-8">
              <p>
                Founded in 1892, Heritage Antiques serves private collectors, royal families, 
                and major international museum curators seeking exceptional, fully authenticated ancient collectibles.
              </p>
              <p>
                Every animal statue, bronze sculpture, copper vessel, and historical artifact in our vault undergoes 
                extensive X-ray fluorescence (XRF) alloy analysis, thermoluminescence testing, and 1970 UNESCO Convention compliance auditing.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-6 border-t border-[#B68D40]/20">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#B68D40]/15 text-[#B68D40] mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-heading font-bold text-sm text-[#2B2622]">100% Provenance Ledger</h4>
                  <p className="text-xs text-[#6B6258] mt-0.5 font-light">Unbroken line of documented ownership across decades.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#A76B3F]/15 text-[#A76B3F] mt-0.5">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-heading font-bold text-sm text-[#2B2622]">Royal & Museum Standard</h4>
                  <p className="text-xs text-[#6B6258] mt-0.5 font-light">Evaluated by former senior curators of classical antiquities.</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

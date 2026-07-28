import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Crown, Globe2, Lock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const promises = [
    {
      icon: ShieldCheck,
      title: 'Authentic Products',
      description: 'Every artifact is verified via metallurgical XRF analysis, C-14 testing, and microscopic patina inspection.'
    },
    {
      icon: Award,
      title: 'Certified Heritage',
      description: 'Accompanied by a sealed Museum Certificate of Provenance with unique archival vault serial registration.'
    },
    {
      icon: Crown,
      title: 'Museum Quality',
      description: 'Selected exclusively by senior antiquarians with decades of curation experience for Sotheby’s & Christie’s.'
    },
    {
      icon: Globe2,
      title: 'Worldwide Shipping',
      description: 'Bespoke wooden crate transport with climate-monitored courier and full door-to-door insurance coverage.'
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description: 'Discreet institutional wire transfer, attorney escrow holding, and encrypted private acquisition channels.'
    }
  ];

  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#B68D40] block mb-2 font-medium">
          The Heritage Guarantee
        </span>
        <h2 className="font-serif-heading text-3xl md:text-4xl font-bold text-[#2B2622]">
          Why Collectors Choose Us
        </h2>
        <div className="w-16 h-[2px] bg-[#B68D40] mx-auto mt-4 mb-4" />
        <p className="text-sm text-[#6B6258] font-light">
          Standards of excellence refined across a century of antiquarian leadership.
        </p>
      </div>

      {/* Grid of 5 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {promises.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-[24px] bg-[#FDFBF7] border border-[#B68D40]/25 shadow-md hover:shadow-xl hover:border-[#B68D40]/60 transition-all flex flex-col items-center text-center justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#B68D40]/15 border border-[#B68D40]/40 flex items-center justify-center text-[#B68D40] mb-5 mx-auto">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif-heading font-bold text-base text-[#2B2622] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B6258] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="w-8 h-[2px] bg-[#B68D40]/30 mt-6 mx-auto" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

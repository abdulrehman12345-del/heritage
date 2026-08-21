import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Crown, Globe2, Lock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const promises = [
    {
      icon: ShieldCheck,
      title: '100% Authentic',
      description: 'Every antique is inspected and tested by experts to ensure it is completely genuine.'
    },
    {
      icon: Award,
      title: 'Official Certificate',
      description: 'Each item comes with an official paper Certificate of Authenticity and serial number.'
    },
    {
      icon: Crown,
      title: 'Top Quality',
      description: 'Selected and curated by experienced antique specialists with decades of experience.'
    },
    {
      icon: Globe2,
      title: 'Safe Worldwide Delivery',
      description: 'Packed safely in custom protective wooden boxes with free insured shipping to your door.'
    },
    {
      icon: Lock,
      title: 'Secure & Easy Payment',
      description: 'Pay safely with Credit Card, Bank Transfer, or Cash on Delivery with full buyer protection.'
    }
  ];

  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#B68D40] block mb-2 font-medium">
          Our Guarantee
        </span>
        <h2 className="font-serif-heading text-3xl md:text-4xl font-bold text-[#2B2622]">
          Why Buy From Us
        </h2>
        <div className="w-16 h-[2px] bg-[#B68D40] mx-auto mt-4 mb-4" />
        <p className="text-sm text-[#6B6258] font-light">
          Trusted by antique lovers and collectors worldwide since 1892.
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

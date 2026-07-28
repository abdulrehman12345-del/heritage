import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data/artifacts';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F2ECE3]/60 border-t border-b border-[#B68D40]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#B68D40] block mb-2 font-medium">
            Collector & Curator Endorsements
          </span>
          <h2 className="font-serif-heading text-3xl md:text-4xl font-bold text-[#2B2622]">
            Words From Our Patrons
          </h2>
          <div className="w-16 h-[2px] bg-[#B68D40] mx-auto mt-4 mb-4" />
        </div>

        {/* Grid of Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative p-8 rounded-[28px] bg-[#FDFBF7] border border-[#B68D40]/25 shadow-lg flex flex-col justify-between hover:shadow-2xl transition-all"
            >
              {/* Large Ornamental Quote Icon */}
              <Quote className="w-10 h-10 text-[#B68D40]/25 absolute top-6 right-6" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#B68D40] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B68D40]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-[#2B2622] font-light leading-relaxed italic mb-8 relative z-10">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#B68D40]/15">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#B68D40]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif-heading font-bold text-sm text-[#2B2622]">{t.author}</h4>
                  <p className="text-[11px] text-[#A76B3F] font-mono">{t.role}</p>
                  <p className="text-[10px] text-[#6B6258]">{t.location}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

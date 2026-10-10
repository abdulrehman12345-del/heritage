import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Compass, 
  Target, 
  Instagram, 
  Mail, 
  Sparkles, 
  HeartHandshake, 
  Award,
  CheckCircle2,
  ExternalLink,
  Lock
} from 'lucide-react';
import founderPhotoAsset from '../assets/images/founder.jpg';

export const HeritageStory: React.FC = () => {

  return (
    <section id="heritage" className="py-20 md:py-32 paper-texture border-t border-[#B68D40]/25 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B68D40]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#A76B3F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B68D40]/10 border border-[#B68D40]/30 text-[#B68D40] text-xs font-mono uppercase tracking-[0.25em] font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Founder & Brand Heritage</span>
          </div>
          <h2 className="font-serif-heading text-3xl md:text-5xl lg:text-6xl font-bold text-[#2B2622] leading-tight">
            The Story Behind <br />
            <span className="italic font-normal text-[#B68D40]">Heritage Antiques</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#B68D40] to-transparent mx-auto mt-6 mb-6" />
          <p className="text-base md:text-lg text-[#6B6258] font-light leading-relaxed">
            A venture founded on genuine passion, entrepreneurial vision, and a steadfast commitment to customer trust and fair value.
          </p>
        </div>

        {/* SECTION 1: Meet the Founder & Brand Story Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-24">
          
          {/* Founder Portrait & Identity Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#FFFDF8] rounded-[28px] border-2 border-[#B68D40]/30 p-6 md:p-8 shadow-xl relative overflow-hidden">
              {/* Gold Filigree corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#B68D40]/50" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#B68D40]/50" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#B68D40]/50" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#B68D40]/50" />

              <div className="text-center mb-6">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B68D40] font-semibold">
                  Meet The Founder
                </span>
              </div>

              {/* Permanent Founder Photograph Frame */}
              <div className="relative mx-auto w-60 h-72 sm:w-64 sm:h-80 rounded-[20px] overflow-hidden border-2 border-[#B68D40]/40 shadow-2xl bg-[#1F2328] group">
                <img
                  src={founderPhotoAsset}
                  alt="Abdul Rehman Faisal — Founder of Heritage Antiques"
                  className="w-full h-full object-cover object-top filter contrast-105"
                  referrerPolicy="no-referrer"
                />

                {/* Permanent Verified Official Founder Seal */}
                <div 
                  title="Official Verified Founder Portrait — Authenticated Heritage Antiques"
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#1F2328]/90 text-[#B68D40] text-[10px] font-mono tracking-wider backdrop-blur-md border border-[#B68D40]/40 flex items-center gap-1.5 shadow-md pointer-events-none select-none"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B68D40]" />
                  <span className="font-medium">Verified</span>
                </div>

                {/* Permanent Verified Badge */}
                <div 
                  title="Official founder portrait permanently integrated into the core assets."
                  className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#1F2328]/80 text-[#D9C7AE] text-[9px] font-mono tracking-wider backdrop-blur-md border border-[#B68D40]/30 flex items-center gap-1 shadow-sm pointer-events-none select-none"
                >
                  <Lock className="w-3 h-3 text-[#B68D40]" />
                  <span>Permanent</span>
                </div>

                {/* Subtle photo overlay label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90 flex flex-col justify-end p-4 pointer-events-none select-none">
                  <div className="text-center">
                    <p className="text-xs font-serif font-bold text-white tracking-wide">Abdul Rehman Faisal</p>
                    <p className="text-[10px] text-[#D9C7AE] font-mono">Founder of Heritage Antiques</p>
                  </div>
                </div>
              </div>

              {/* Founder Title & Background */}
              <div className="mt-6 text-center space-y-2">
                <h3 className="font-serif-heading text-2xl font-bold text-[#2B2622]">
                  Abdul Rehman Faisal
                </h3>
                <div className="inline-block px-3 py-1 rounded-full bg-[#B68D40]/15 text-[#B68D40] text-xs font-mono font-medium tracking-wide">
                  Founder of Heritage Antiques
                </div>
                <p className="text-xs text-[#6B6258] font-medium tracking-wide">
                  Businessman and Entrepreneur
                </p>
              </div>

              {/* Direct Founder Contact Links */}
              <div className="mt-6 pt-5 border-t border-[#B68D40]/20 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://www.instagram.com/h_antiques_store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#F8F5EF] hover:bg-[#B68D40]/10 border border-[#B68D40]/30 text-xs font-medium text-[#2B2622] hover:text-[#B68D40] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#B68D40]" />
                  <span>@h_antiques_store</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="mailto:abdul..rrehman90123@gmail.com?subject=Contact%20Heritage%20Antiques%20Founder"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#F8F5EF] hover:bg-[#B68D40]/10 border border-[#B68D40]/30 text-xs font-medium text-[#2B2622] hover:text-[#B68D40] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#B68D40]" />
                  <span>Email Founder</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Narrative Story & Biography Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* The Story Behind Heritage Antiques */}
            <div className="bg-[#FFFDF8] rounded-[28px] border border-[#B68D40]/25 p-6 md:p-8 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#A76B3F] font-semibold block mb-2">
                My Story — Why I Started Heritage Antiques
              </span>
              <h3 className="font-serif-heading text-2xl md:text-3xl font-bold text-[#2B2622] mb-6">
                A Personal Journey & Entrepreneurial Vision
              </h3>

              <div className="space-y-4 text-sm md:text-[15px] text-[#554D45] font-light leading-relaxed">
                <p>
                  "Heritage Antiques began with a personal interest in antique pieces and a vision to build a business around something meaningful."
                </p>
                <p>
                  "I wanted to create a brand for people who understand that antiques are more than decorative objects. They can carry character, craftsmanship, cultural significance, and a sense of history that makes each piece special."
                </p>
                <p>
                  "My goal was to make these pieces more accessible by offering customers a thoughtful selection at reasonable prices, without losing sight of the quality, value, and experience they deserve."
                </p>
                <p>
                  "With hard work, a willingness to learn, and a long-term entrepreneurial mindset, I started Heritage Antiques to turn that vision into reality."
                </p>
                <p className="font-normal text-[#2B2622] italic">
                  "Every step forward is part of a bigger journey: building a brand that people recognize, trust, and feel confident choosing."
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#B68D40]/20 flex items-center justify-between text-xs text-[#6B6258]">
                <span className="font-serif italic text-base text-[#B68D40]">— Abdul Rehman Faisal</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#A76B3F]">Founder</span>
              </div>
            </div>

            {/* Founder Biography */}
            <div className="bg-[#FFFDF8] rounded-[28px] border border-[#B68D40]/25 p-6 md:p-8 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B68D40] font-semibold block mb-2">
                Founder Biography
              </span>
              <h3 className="font-serif-heading text-xl md:text-2xl font-bold text-[#2B2622] mb-4">
                Dedication, Consistency & Customer Trust
              </h3>

              <div className="space-y-4 text-sm text-[#554D45] font-light leading-relaxed">
                <p>
                  Abdul Rehman Faisal is the founder of Heritage Antiques, a brand built on a personal interest in antiques, entrepreneurial ambition, and a vision to make exceptional pieces accessible to people who truly appreciate their value.
                </p>
                <p>
                  As a hardworking and business-minded entrepreneur, Abdul Rehman believes that building a meaningful brand requires dedication, consistency, customer trust, and a genuine understanding of what customers value.
                </p>
                <p>
                  Driven by his interest in antique pieces and the desire to create something of his own, he established Heritage Antiques with a clear purpose: to connect antique enthusiasts and collectors with carefully selected pieces at reasonable and fair prices.
                </p>
                <p>
                  His approach focuses on building lasting customer relationships, conducting business responsibly, and creating a brand that customers can return to with confidence.
                </p>
                <p>
                  For Abdul Rehman, Heritage Antiques is more than a business. It is an opportunity to turn a personal interest and entrepreneurial vision into a growing brand that serves people who appreciate history, craftsmanship, character, and timeless design.
                </p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* SECTION 2: Our Vision & Our Mission (Side-by-Side Architectural Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-20">
          
          {/* Our Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-[#FFFDF8] to-[#F8F3EA] rounded-[28px] border-2 border-[#B68D40]/30 p-8 md:p-10 shadow-lg relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-[#B68D40]/15 text-[#B68D40] border border-[#B68D40]/30">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B68D40] font-bold">
                  Long-Term Horizon
                </span>
              </div>

              <h3 className="font-serif-heading text-2xl md:text-3xl font-bold text-[#2B2622] mb-4">
                Our Vision
              </h3>

              <div className="space-y-4 text-sm text-[#554D45] font-light leading-relaxed">
                <p>
                  My vision is to grow Heritage Antiques into a recognized, respected, and trusted name in the antique market — a brand that customers associate with quality, fair value, reliability, and a genuine appreciation for timeless pieces.
                </p>
                <p>
                  I aspire to build more than an online store. I want Heritage Antiques to become a destination for antique enthusiasts, collectors, and individuals who value the history, character, and craftsmanship behind the pieces they choose.
                </p>
                <p>
                  Over time, my ambition is to expand our collection, strengthen our digital presence, reach more customers, and establish long-lasting relationships built on trust and satisfaction.
                </p>
                <p>
                  Like every entrepreneur who dreams of building a successful brand, I want Heritage Antiques to grow into a name with its own identity, reputation, and loyal community.
                </p>
                <p className="font-normal text-[#2B2622] italic pt-2 border-t border-[#B68D40]/20">
                  Ultimately, my vision is to build a sustainable brand that customers remember not only for the pieces it offers, but also for the confidence and positive experience they receive when dealing with us.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center gap-2 text-xs text-[#B68D40] font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>A Destination for Antique Lovers & Collectors</span>
            </div>
          </motion.div>

          {/* Our Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-gradient-to-br from-[#FFFDF8] to-[#F8F3EA] rounded-[28px] border-2 border-[#A76B3F]/30 p-8 md:p-10 shadow-lg relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-[#A76B3F]/15 text-[#A76B3F] border border-[#A76B3F]/30">
                  <Target className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A76B3F] font-bold">
                  Guiding Purpose
                </span>
              </div>

              <h3 className="font-serif-heading text-2xl md:text-3xl font-bold text-[#2B2622] mb-4">
                Our Mission
              </h3>

              <div className="space-y-4 text-sm text-[#554D45] font-light leading-relaxed">
                <p>
                  Our mission is to offer customers a trustworthy, transparent, and dependable buying experience by bringing together carefully selected antique pieces and fair, reasonable pricing.
                </p>
                <p>
                  At Heritage Antiques, I want customers to feel confident in their decisions. That means presenting products clearly, communicating honestly, providing accurate information about each item's known characteristics, and treating every customer with respect.
                </p>
                <p>
                  I believe a reliable business relationship begins with clear expectations and continues through responsible service, fair dealing, and consistent communication.
                </p>
                <p>
                  My aim is to help customers discover pieces that match their interests and appreciation for antiques while making the buying process straightforward and comfortable.
                </p>
                <p className="font-normal text-[#2B2622] italic pt-2 border-t border-[#A76B3F]/20">
                  As Heritage Antiques grows, customer trust will remain central to every decision. Our mission is not simply to sell products, but to build relationships that encourage customers to return and recommend our brand with confidence.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center gap-2 text-xs text-[#A76B3F] font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparent, Dependable & Customer-Centric</span>
            </div>
          </motion.div>

        </div>

        {/* SECTION 3: Guiding Entrepreneurial Values */}
        <div className="bg-[#1F2328] rounded-[32px] p-8 md:p-12 text-[#F8F5EF] border border-[#B68D40]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B68D40]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B68D40] block mb-2 font-medium">
              Core Principles
            </span>
            <h3 className="font-serif-heading text-2xl md:text-3xl font-bold text-white">
              The Values That Guide Heritage Antiques
            </h3>
            <p className="text-xs md:text-sm text-[#D9C7AE] font-light mt-2">
              Every decision at Heritage Antiques is founded on these commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-[#B68D40]/20 text-[#B68D40] flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-serif-heading font-bold text-base text-white mb-2">Fair & Reasonable Pricing</h4>
              <p className="text-xs text-[#D9C7AE] font-light leading-relaxed">
                Connecting antique lovers with exceptional pieces at fair value, without artificial inflation.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-[#B68D40]/20 text-[#B68D40] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif-heading font-bold text-base text-white mb-2">Customer Trust First</h4>
              <p className="text-xs text-[#D9C7AE] font-light leading-relaxed">
                Building lasting relationships through honesty, clear information, and respectful service.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-[#B68D40]/20 text-[#B68D40] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif-heading font-bold text-base text-white mb-2">Genuine Appreciation</h4>
              <p className="text-xs text-[#D9C7AE] font-light leading-relaxed">
                A business driven by an authentic personal interest in the craftsmanship and history behind each piece.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-[#B68D40]/20 text-[#B68D40] flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif-heading font-bold text-base text-white mb-2">Transparent Buying</h4>
              <p className="text-xs text-[#D9C7AE] font-light leading-relaxed">
                Honest communication and clear details about every item's known characteristics.
              </p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};

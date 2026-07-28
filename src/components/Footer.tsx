import React from 'react';
import { EmblemLogo } from './EmblemLogo';
import { ShieldCheck, Mail, Phone, MapPin, Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onSelectCategory
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#1F2328] text-white border-t border-[#B68D40]/20 pt-16 md:pt-24 pb-12 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#B68D40]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#B68D40]/15">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <EmblemLogo variant="dark" size="lg" className="mb-6" />
            <p className="text-xs text-[#D9C7AE]/80 font-light leading-relaxed mb-6 max-w-sm">
              International purveyors of authenticated ancient bronzes, imperial animal statues, 
              historical sculptures, and copper masterpieces. Serving private collectors & museums since 1892.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#B68D40]">
              <ShieldCheck className="w-4 h-4 text-[#B68D40]" />
              <span>Geneva • London • Zurich • New York</span>
            </div>
          </div>

          {/* Quick Category Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif-heading font-bold text-sm text-[#F8F5EF] uppercase tracking-wider mb-5">
              Vault Categories
            </h4>
            <ul className="space-y-3 text-xs text-[#D9C7AE]/80 font-light font-serif-heading">
              {['Animal Statues', 'Bronze Statues', 'Metal Sculptures', 'Antique Vases', 'Copper Artifacts', 'Historical Pieces'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigateSection('catalog');
                    }}
                    className="hover:text-[#B68D40] transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif-heading font-bold text-sm text-[#F8F5EF] uppercase tracking-wider mb-5">
              Curatorial
            </h4>
            <ul className="space-y-3 text-xs text-[#D9C7AE]/80 font-light font-serif-heading">
              <li>
                <button onClick={() => onNavigateSection('hero')} className="hover:text-[#B68D40] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('heritage')} className="hover:text-[#B68D40] transition-colors">
                  About Our Vault
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('contact')} className="hover:text-[#B68D40] transition-colors">
                  Private Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Private Vault Address (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif-heading font-bold text-sm text-[#F8F5EF] uppercase tracking-wider mb-5">
              Vault Headquarters
            </h4>
            <div className="space-y-3 text-xs text-[#D9C7AE]/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B68D40] flex-shrink-0 mt-0.5" />
                <span>Rue du Rhône 42, 1204 Geneva, Switzerland</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B68D40] flex-shrink-0" />
                <span className="font-mono">+41 22 819 9000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B68D40] flex-shrink-0" />
                <span className="font-mono">curator@heritage-antiques.ch</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9C7AE]/60 font-mono">
          <p>© {new Date().getFullYear()} HERITAGE ANTIQUES SA. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <span>UNESCO 1970 Compliant</span>
            <span>CITES Registered</span>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#2A3036] hover:bg-[#B68D40] text-white transition-all shadow-md ml-4"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

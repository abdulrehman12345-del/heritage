import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { EmblemLogo } from './EmblemLogo';
import { Menu, X, Compass, ShieldCheck, UserCheck, Heart } from 'lucide-react';

interface NavbarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onExploreClick: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  onOpenCustomerAuth?: () => void;
  customerUser?: any;
  savedCount?: number;
  onOpenSavedModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onExploreClick,
  onNavigateSection,
  onOpenAdmin,
  onOpenCustomerAuth,
  customerUser,
  savedCount = 0,
  onOpenSavedModal
}) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Always show at top of page (within first 30px)
    if (latest <= 30) {
      setHidden(false);
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
      // Hide when scrolling down, show when scrolling up
      if (latest > previous && latest > 100) {
        setHidden(true);
      } else if (latest < previous) {
        setHidden(false);
      }
    }
  });

  const navItems: { label: string; id?: string; category?: string }[] = [
    { label: 'Home', id: 'hero' },
    { label: 'Collection', id: 'catalog' },
    { label: 'About', id: 'heritage' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (item: { label: string; category?: string; id?: string }) => {
    setMobileMenuOpen(false);
    if (item.category) {
      onSelectCategory(item.category);
      onNavigateSection('catalog');
    } else if (item.id) {
      if (item.id === 'hero') {
        onSelectCategory('All');
      }
      onNavigateSection(item.id);
    }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -120, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="fixed top-2 sm:top-4 inset-x-0 z-50 px-2.5 sm:px-6 md:px-8 flex justify-center pointer-events-none"
    >
      <div
        className={`pointer-events-auto w-full max-w-7xl min-h-[60px] sm:min-h-[72px] rounded-full px-3 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 glass-nav ${
          isAtTop
            ? 'shadow-xl border-opacity-50'
            : 'shadow-2xl border-opacity-80 bg-[#121417]/98 backdrop-blur-2xl'
        }`}
      >
        {/* Logo */}
        <div 
          className="cursor-pointer shrink-0 flex items-center" 
          onClick={() => {
            onSelectCategory('All');
            onNavigateSection('hero');
          }}
        >
          <EmblemLogo variant="dark" size="sm" className="sm:hidden" />
          <EmblemLogo variant="dark" size="md" className="hidden sm:flex" />
        </div>

        {/* Desktop Navigation Links (XL screens 1280px+) */}
        <nav className="hidden xl:flex items-center gap-2 2xl:gap-6 shrink-0">
          {navItems.map((item) => {
            const isActive = item.category ? activeCategory === item.category : false;
            return (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`group relative px-3 py-1.5 text-sm 2xl:text-base font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#FFE270] font-bold'
                    : 'text-[#E6DFD5] hover:text-[#FFE270]'
                }`}
              >
                <span>{item.label}</span>

                {/* Dust Neon Golden Glowing Underline on Hover & Active */}
                <span
                  className={`absolute -bottom-1 left-1 right-1 h-[3px] rounded-full bg-gradient-to-r from-[#B8860B] via-[#FFE270] to-[#B8860B] shadow-[0_0_12px_rgba(255,226,112,0.95)] transition-all duration-300 transform origin-left ${
                    isActive
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                />
              </motion.button>
            );
          })}
        </nav>

        {/* Right Actions: Responsive Actions Layout */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {onOpenSavedModal && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSavedModal}
              className="relative p-2 sm:p-2.5 rounded-full bg-[#22272E] hover:bg-[#2C333B] text-[#DECFAF] border border-[#A87C32]/40 transition-all flex items-center justify-center shadow-md cursor-pointer"
              title="View Collector Saved Shortlist"
            >
              <Heart className={`w-4 h-4 ${savedCount > 0 ? 'text-[#FFE270] fill-[#FFE270]' : 'text-[#DECFAF]'}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-[#B8860B] to-[#FFE270] text-[#121417] text-[10px] font-bold font-mono flex items-center justify-center shadow-md">
                  {savedCount}
                </span>
              )}
            </motion.button>
          )}

          {onOpenCustomerAuth && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenCustomerAuth}
              className="hidden sm:flex px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#22272E] hover:bg-[#2C333B] text-[#DECFAF] hover:text-[#FFE270] text-xs font-semibold uppercase tracking-wider border border-[#A87C32]/40 transition-all items-center gap-1.5 sm:gap-2 shadow-md whitespace-nowrap cursor-pointer"
              title="Customer Login & Signup"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#FFE270] shrink-0" />
              <span className="max-w-[100px] md:max-w-[130px] truncate">
                {customerUser ? (customerUser.fullName || 'Customer') : 'Login'}
              </span>
            </motion.button>
          )}

          {onOpenAdmin && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenAdmin}
              className="hidden lg:flex px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#A87C32] hover:bg-[#966C2A] text-white text-xs font-bold uppercase tracking-wider border border-[#FFE270]/30 transition-all items-center gap-1.5 shadow-md whitespace-nowrap cursor-pointer"
              title="Open Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFE270] shrink-0" />
              <span>Admin</span>
            </motion.button>
          )}

          <motion.button
            whileHover={{ y: -1, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onExploreClick}
            className="hidden sm:flex group relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#A87C32] via-[#966C2A] to-[#8C5D26] text-white font-bold text-xs tracking-wider uppercase shadow-lg hover:shadow-[0_0_20px_rgba(168,124,50,0.5)] transition-all duration-300 items-center gap-1.5 whitespace-nowrap cursor-pointer border border-[#FFE270]/30"
          >
            <Compass className="w-3.5 h-3.5 text-[#FFE270] group-hover:rotate-45 transition-transform duration-500 shrink-0" />
            <span>Explore</span>
          </motion.button>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 sm:p-2.5 rounded-full bg-[#22272E] border border-[#A87C32]/40 text-[#FFE270] hover:text-white transition-colors shrink-0 flex items-center justify-center cursor-pointer ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto absolute top-[68px] sm:top-[80px] left-2.5 right-2.5 sm:left-6 sm:right-6 max-w-7xl mx-auto bg-[#16191D]/98 backdrop-blur-2xl rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 border border-[#A87C32]/50 shadow-2xl flex flex-col gap-2.5 xl:hidden text-[#E6DFD5] z-50 max-h-[85vh] overflow-y-auto"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item)}
                whileHover={{ scale: 1.02, x: 6 }}
                whileTap={{ scale: 0.98 }}
                className="group relative text-left px-4 py-3 sm:py-3.5 rounded-xl text-base sm:text-lg font-semibold tracking-wide text-[#E6DFD5] hover:bg-[#A87C32]/20 hover:text-[#FFE270] transition-all flex items-center justify-between cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="text-[#FFE270] text-base group-hover:translate-x-1 transition-transform">→</span>
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-[#B8860B] via-[#FFE270] to-[#B8860B] opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(255,226,112,0.9)] transition-opacity rounded-full" />
              </motion.button>
            ))}

            <div className="pt-3 border-t border-[#A87C32]/30 mt-1 flex flex-col gap-2.5">
              {onOpenSavedModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSavedModal();
                  }}
                  className="w-full py-3 rounded-xl bg-[#22272E] text-[#DECFAF] font-semibold text-xs tracking-wider uppercase border border-[#A87C32]/40 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#2C333B]"
                >
                  <Heart className={`w-4 h-4 ${savedCount > 0 ? 'text-[#FFE270] fill-[#FFE270]' : 'text-[#DECFAF]'}`} />
                  <span>Saved Shortlist ({savedCount})</span>
                </button>
              )}

              {onOpenCustomerAuth && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCustomerAuth();
                  }}
                  className="w-full py-3 rounded-xl bg-[#22272E] text-[#DECFAF] font-semibold text-xs tracking-wider uppercase border border-[#A87C32]/40 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#2C333B]"
                >
                  <UserCheck className="w-4 h-4 text-[#FFE270]" />
                  <span>{customerUser ? (customerUser.fullName || 'Customer Profile') : 'Customer Login / Signup'}</span>
                </button>
              )}

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-3 rounded-xl bg-[#A87C32] text-white font-bold text-xs tracking-wider uppercase border border-[#FFE270]/30 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShieldCheck className="w-4 h-4 text-[#FFE270]" />
                  <span>Admin Panel</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExploreClick();
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFE270] via-[#A87C32] to-[#966C2A] text-[#121417] font-extrabold text-xs tracking-wider uppercase shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#121417]" />
                <span>Explore Collection</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

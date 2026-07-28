import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { EmblemLogo } from './EmblemLogo';
import { Menu, X, Compass, ShieldCheck, UserCheck } from 'lucide-react';

interface NavbarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onExploreClick: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  onOpenCustomerAuth?: () => void;
  customerUser?: any;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onExploreClick,
  onNavigateSection,
  onOpenAdmin,
  onOpenCustomerAuth,
  customerUser,
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

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Animal Statues', category: 'Animal Statues' },
    { label: 'Sculptures', category: 'Sculptures' },
    { label: 'Antique Vases', category: 'Antique Vases' },
    { label: 'Metal Artifacts', category: 'Metal Artifacts' },
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
      className="fixed top-4 inset-x-0 z-50 px-4 md:px-8 flex justify-center pointer-events-none"
    >
      <div
        className={`pointer-events-auto w-full max-w-[1400px] h-[88px] rounded-[26px] px-6 md:px-8 flex items-center justify-between transition-all duration-500 glass-nav ${
          isAtTop
            ? 'shadow-lg border-opacity-30'
            : 'shadow-2xl border-opacity-50 backdrop-blur-xl'
        }`}
      >
        {/* Logo */}
        <div 
          className="cursor-pointer" 
          onClick={() => {
            onSelectCategory('All');
            onNavigateSection('hero');
          }}
        >
          <EmblemLogo size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = item.category ? activeCategory === item.category : false;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`relative px-3 py-2 text-xs xl:text-sm font-medium tracking-wider uppercase transition-colors duration-300 font-serif-heading ${
                  isActive
                    ? 'text-[#B68D40] font-semibold'
                    : 'text-[#2B2622]/80 hover:text-[#B68D40]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#B68D40] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Collector Auth + Curator CMS + Explore Collection */}
        <div className="hidden sm:flex items-center gap-2 md:gap-3">
          {onOpenCustomerAuth && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCustomerAuth}
              className="px-3.5 py-2.5 rounded-full bg-[#F8F5EF] hover:bg-[#B68D40]/10 text-[#2B2622] font-serif-heading text-xs font-semibold uppercase tracking-wider border border-[#B68D40]/40 transition-all flex items-center gap-1.5 shadow-sm"
              title="Customer Login & Signup"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#B68D40]" />
              <span className="truncate max-w-[170px]">
                {customerUser ? customerUser.fullName || 'Customer' : 'Customer Login / Signup'}
              </span>
            </motion.button>
          )}

          {onOpenAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenAdmin}
              className="px-3.5 py-2.5 rounded-full bg-[#1F2328] hover:bg-[#2A3036] text-[#D9C7AE] hover:text-white font-serif-heading text-xs font-semibold uppercase tracking-wider border border-[#B68D40]/30 transition-all flex items-center gap-1.5 shadow-sm"
              title="Open Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B68D40]" />
              <span>Admin Panel</span>
            </motion.button>
          )}

          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExploreClick}
            className="group relative px-6 py-3 rounded-full bg-[#B68D40] text-[#F8F5EF] font-medium text-xs md:text-sm tracking-wider uppercase font-serif-heading shadow-md hover:bg-[#A76B3F] hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#F8F5EF] group-hover:rotate-45 transition-transform duration-500" />
            <span>Explore Collection</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#2B2622] hover:text-[#B68D40] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto absolute top-[102px] left-4 right-4 max-w-[1400px] mx-auto bg-[#F2ECE3]/95 backdrop-blur-2xl rounded-[24px] p-6 border border-[#B68D40]/30 shadow-2xl flex flex-col gap-3 lg:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-left px-4 py-3 rounded-xl text-sm font-medium tracking-wider text-[#2B2622] hover:bg-[#B68D40]/15 hover:text-[#B68D40] transition-all font-serif-heading flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-[#B68D40] text-xs">→</span>
              </button>
            ))}

            <div className="pt-3 border-t border-[#B68D40]/20 mt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExploreClick();
                }}
                className="w-full py-3.5 rounded-full bg-[#B68D40] text-[#F8F5EF] font-medium text-xs tracking-wider uppercase font-serif-heading shadow-md hover:bg-[#A76B3F] transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Collection</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

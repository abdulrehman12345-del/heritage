import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { EmblemLogo } from './EmblemLogo';
import { Menu, X, Compass, ShieldCheck, UserCheck, Heart, ShoppingBag, Sun, Moon } from 'lucide-react';

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
  cartCount?: number;
  onOpenCart?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
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
  onOpenSavedModal,
  cartCount = 0,
  onOpenCart,
  theme = 'light',
  onToggleTheme
}) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest <= 30) {
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
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
      className="fixed top-2 sm:top-3.5 inset-x-2 sm:inset-x-4 md:inset-x-6 z-50 flex items-center justify-center pointer-events-none max-w-full"
    >
      <div
        className={`pointer-events-auto w-full max-w-5xl lg:max-w-6xl min-h-[44px] sm:min-h-[58px] rounded-full px-3 sm:px-5 py-1 sm:py-1.5 flex items-center justify-between gap-2 sm:gap-3 transition-all duration-300 glass-nav overflow-hidden ${
          isAtTop
            ? 'shadow-lg border-opacity-50'
            : 'shadow-xl border-opacity-80 bg-[#121417]/98 backdrop-blur-2xl'
        }`}
      >
        {/* Logo */}
        <div 
          className="cursor-pointer shrink min-w-0 flex items-center shrink-0" 
          onClick={() => {
            onSelectCategory('All');
            onNavigateSection('hero');
          }}
        >
          <EmblemLogo variant="dark" size="sm" className="flex items-center" />
        </div>

        {/* Desktop Navigation Links (LG screens 1024px+) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 shrink-0">
          {navItems.map((item) => {
            const isActive = item.category ? activeCategory === item.category : false;
            return (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`group relative px-2.5 py-1 text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#FFE270] font-bold'
                    : 'text-[#E6DFD5] hover:text-[#FFE270]'
                }`}
              >
                <span>{item.label}</span>

                {/* Dust Neon Golden Glowing Underline on Hover & Active */}
                <span
                  className={`absolute -bottom-0.5 left-1 right-1 h-[2px] rounded-full bg-gradient-to-r from-[#B8860B] via-[#FFE270] to-[#B8860B] shadow-[0_0_8px_rgba(255,226,112,0.9)] transition-all duration-300 transform origin-left ${
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
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Day & Night Theme Toggle (Identical to Dashboard) */}
          {onToggleTheme && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleTheme}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border shadow-sm cursor-pointer shrink-0 ${
                theme === 'dark'
                  ? 'bg-[#2A3036] text-[#FFE270] border-[#B68D40]/50 hover:border-[#FFE270]'
                  : 'bg-[#FFFDF8] text-[#B68D40] border-[#B68D40]/30 hover:border-[#B68D40]'
              }`}
              title={theme === 'dark' ? 'Switch to Day Theme' : 'Switch to Night Theme'}
              aria-label={theme === 'dark' ? 'Switch to Day Theme' : 'Switch to Night Theme'}
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#FFE270]" />
                  <span className="hidden md:inline text-[11px]">Night Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#B68D40]" />
                  <span className="hidden md:inline text-[11px]">Day Mode</span>
                </>
              )}
            </motion.button>
          )}

          {onOpenSavedModal && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSavedModal}
              className="relative p-1.5 sm:p-2 rounded-full bg-[#22272E] hover:bg-[#2C333B] text-[#DECFAF] border border-[#A87C32]/40 transition-all flex items-center justify-center shadow-sm cursor-pointer shrink-0"
              title="View Collector Saved Shortlist"
            >
              <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? 'text-[#FFE270] fill-[#FFE270]' : 'text-[#DECFAF]'}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#FFE270] text-[#121417] text-[9px] font-bold font-mono flex items-center justify-center shadow-md">
                  {savedCount}
                </span>
              )}
            </motion.button>
          )}

          {onOpenCart && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative p-1.5 sm:p-2 rounded-full bg-[#22272E] hover:bg-[#2C333B] text-[#DECFAF] border border-[#A87C32]/40 transition-all flex items-center justify-center shadow-sm cursor-pointer shrink-0"
              title="View Acquisition Cart"
            >
              <ShoppingBag className={`w-3.5 h-3.5 ${cartCount > 0 ? 'text-[#FFE270]' : 'text-[#DECFAF]'}`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#FFE270] text-[#121417] text-[9px] font-bold font-mono flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </motion.button>
          )}

          {onOpenCustomerAuth && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenCustomerAuth}
              className="hidden sm:flex px-2.5 py-1 sm:py-1.5 rounded-full bg-[#22272E] hover:bg-[#2C333B] text-[#DECFAF] hover:text-[#FFE270] text-[11px] font-semibold uppercase tracking-wider border border-[#A87C32]/40 transition-all items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
              title="Customer Login & Signup"
            >
              <UserCheck className="w-3 h-3 text-[#FFE270] shrink-0" />
              <span className="max-w-[90px] md:max-w-[120px] truncate">
                {customerUser ? (customerUser.fullName || 'Customer') : 'Login'}
              </span>
            </motion.button>
          )}

          <motion.button
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onExploreClick}
            className="hidden sm:flex group relative px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#A87C32] via-[#966C2A] to-[#8C5D26] text-white font-bold text-[11px] tracking-wider uppercase shadow-md hover:shadow-[0_0_15px_rgba(168,124,50,0.4)] transition-all duration-300 items-center gap-1.5 whitespace-nowrap cursor-pointer border border-[#FFE270]/30"
          >
            <Compass className="w-3 h-3 text-[#FFE270] group-hover:rotate-45 transition-transform duration-500 shrink-0" />
            <span>Explore</span>
          </motion.button>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-full bg-[#22272E] border border-[#A87C32]/40 text-[#FFE270] hover:text-white transition-colors shrink-0 flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
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
            className="pointer-events-auto absolute top-[58px] sm:top-[80px] left-0 right-0 max-w-7xl mx-auto bg-[#16191D]/98 backdrop-blur-2xl rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 border border-[#A87C32]/50 shadow-2xl flex flex-col gap-2.5 xl:hidden text-[#E6DFD5] z-50 max-h-[85vh] overflow-y-auto"
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
              {/* Day & Night Theme Toggle in Mobile Drawer */}
              {onToggleTheme && (
                <button
                  onClick={() => {
                    onToggleTheme();
                  }}
                  className={`w-full py-3 rounded-xl font-semibold text-xs tracking-wider uppercase border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    theme === 'dark'
                      ? 'bg-[#2A3036] text-[#FFE270] border-[#B68D40]/50 hover:border-[#FFE270]'
                      : 'bg-[#FFFDF8] text-[#B68D40] border-[#B68D40]/30 hover:border-[#B68D40]'
                  }`}
                >
                  {theme === 'dark' ? (
                    <>
                      <Moon className="w-4 h-4 text-[#FFE270]" />
                      <span>Night Mode (Active) — Switch to Day</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 text-[#B68D40]" />
                      <span>Day Mode (Active) — Switch to Night</span>
                    </>
                  )}
                </button>
              )}

              {onOpenCart && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full py-3 rounded-xl bg-[#22272E] text-[#DECFAF] font-semibold text-xs tracking-wider uppercase border border-[#A87C32]/40 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#2C333B]"
                >
                  <ShoppingBag className={`w-4 h-4 ${cartCount > 0 ? 'text-[#FFE270]' : 'text-[#DECFAF]'}`} />
                  <span>Acquisition Cart ({cartCount})</span>
                </button>
              )}

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

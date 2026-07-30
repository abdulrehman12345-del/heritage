import React from 'react';

interface EmblemLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const EmblemLogo: React.FC<EmblemLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light'
}) => {
  const isDark = variant === 'dark';
  
  // Real DOM element dimensions for exact layout control
  const iconDimensions = size === 'sm' ? 'w-8 h-8 sm:w-10 sm:h-10' : size === 'lg' ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-10 h-10 sm:w-12 sm:h-12';
  const textTitleSize = size === 'sm' ? 'text-xs sm:text-sm md:text-base' : size === 'lg' ? 'text-lg md:text-xl' : 'text-base md:text-lg';
  const textSubtitleSize = size === 'sm' ? 'text-[8px] sm:text-[9px]' : size === 'lg' ? 'text-[10px] md:text-[11px]' : 'text-[9px] md:text-[10px]';

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* Handcrafted Emblem SVG */}
      <div className={`relative ${iconDimensions} flex-shrink-0 group cursor-pointer`}>
        {/* Soft Golden Ambient Glow on Hover */}
        <div className="absolute -inset-1 rounded-full bg-[#B68D40]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Ornate Double Border Ring */}
          <circle cx="50" cy="50" r="46" stroke="#B68D40" strokeWidth="1.2" strokeDasharray="1 3" opacity="0.6" />
          <circle cx="50" cy="50" r="43" stroke="#B68D40" strokeWidth="1.8" />
          <circle cx="50" cy="50" r="39" stroke="#B68D40" strokeWidth="0.8" opacity="0.8" />

          {/* Royal Seal / Museum Crest Backing */}
          <circle cx="50" cy="50" r="37" fill={isDark ? '#1F2328' : '#F2ECE3'} />

          {/* Laurel Wreath Left Side */}
          <g stroke="#B68D40" strokeWidth="1.2" fill="none">
            <path d="M 22,50 C 22,32 35,20 50,18" />
            <path d="M 22,50 C 22,68 35,80 50,82" />
            {/* Leaves Left */}
            <path d="M 22,38 C 18,34 22,30 25,33" fill="#B68D40" />
            <path d="M 25,28 C 21,24 26,20 28,24" fill="#B68D40" />
            <path d="M 33,21 C 29,17 34,14 36,18" fill="#B68D40" />
            <path d="M 22,62 C 18,66 22,70 25,67" fill="#B68D40" />
            <path d="M 25,72 C 21,76 26,80 28,76" fill="#B68D40" />
          </g>

          {/* Laurel Wreath Right Side */}
          <g stroke="#B68D40" strokeWidth="1.2" fill="none">
            <path d="M 78,50 C 78,32 65,20 50,18" />
            <path d="M 78,50 C 78,68 65,80 50,82" />
            {/* Leaves Right */}
            <path d="M 78,38 C 82,34 78,30 75,33" fill="#B68D40" />
            <path d="M 75,28 C 79,24 74,20 72,24" fill="#B68D40" />
            <path d="M 67,21 C 71,17 66,14 64,18" fill="#B68D40" />
            <path d="M 78,62 C 82,66 78,70 75,67" fill="#B68D40" />
            <path d="M 75,72 C 79,76 74,80 72,76" fill="#B68D40" />
          </g>

          {/* Diagonal Vintage Key Silhouette in Background of Crest */}
          <g opacity="0.28" stroke="#B68D40" strokeWidth="1.5">
            {/* Key shaft crossing diagonally */}
            <line x1="28" y1="72" x2="72" y2="28" />
            {/* Key Bow / Ring */}
            <circle cx="26" cy="74" r="5" fill="none" strokeWidth="1.5" />
            {/* Key Bits */}
            <path d="M 68,32 L 72,28 L 75,31 L 71,35 M 65,35 L 68,32" strokeWidth="1.5" />
          </g>

          {/* Crown / Top Crest Motif */}
          <path
            d="M 42,22 L 46,26 L 50,21 L 54,26 L 58,22 L 56,29 L 44,29 Z"
            fill="#B68D40"
            stroke="#A76B3F"
            strokeWidth="0.5"
          />

          {/* Decorative Calligraphic Letter 'H' in Gold */}
          <text
            x="50"
            y="61"
            textAnchor="middle"
            fill="#B68D40"
            style={{
              fontFamily: "'Cinzel', 'Playfair Display', serif",
              fontWeight: '800',
              fontSize: '32px',
              letterSpacing: '-1px'
            }}
          >
            H
          </text>

          {/* Bottom Star / Seal Dot */}
          <circle cx="50" cy="76" r="1.8" fill="#B68D40" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col tracking-wider">
        <span
          className={`font-cinzel ${textTitleSize} font-bold tracking-[0.18em] sm:tracking-[0.22em] leading-tight ${
            isDark ? 'text-[#F8F5EF]' : 'text-[#2B2622]'
          }`}
        >
          HERITAGE
        </span>
        <span className={`font-cinzel ${textSubtitleSize} font-medium tracking-[0.25em] sm:tracking-[0.38em] text-[#B68D40] uppercase leading-none mt-0.5 whitespace-nowrap`}>
          ANTIQUES • EST. 1892
        </span>
      </div>
    </div>
  );
};

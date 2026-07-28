import React from 'react';
import { CategoryType } from '../types';
import { Compass, Sparkles, Feather, Flame, Shield, Disc, Crown } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const CATEGORIES_LIST: { name: CategoryType; icon: React.FC<{ className?: string }> }[] = [
  { name: 'All', icon: Compass },
  { name: 'Animal Statues', icon: Feather },
  { name: 'Bronze Statues', icon: Crown },
  { name: 'Metal Sculptures', icon: Sparkles },
  { name: 'Antique Vases', icon: Flame },
  { name: 'Copper Artifacts', icon: Disc },
  { name: 'Decorative Collectibles', icon: Shield },
  { name: 'Historical Pieces', icon: Crown }
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full flex flex-col items-center mb-12">
      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-4 max-w-full px-4 no-scrollbar scroll-smooth">
        {CATEGORIES_LIST.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 font-serif-heading whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'bg-[#B68D40] text-[#F8F5EF] shadow-lg shadow-[#B68D40]/25 scale-105'
                  : 'bg-[#F2ECE3] text-[#2B2622]/80 hover:bg-[#D9C7AE]/40 hover:text-[#B68D40] border border-[#B68D40]/15'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#F8F5EF]' : 'text-[#B68D40]'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

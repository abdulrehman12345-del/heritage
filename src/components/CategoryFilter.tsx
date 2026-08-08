import React from 'react';
import { CategoryType } from '../types';
import { CategoryCMS } from '../admin/types';
import { Compass, Sparkles, Feather, Flame, Shield, Disc, Crown } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  categoriesList?: CategoryCMS[];
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
  onSelectCategory,
  categoriesList = []
}) => {
  // Build merged category array
  const displayCategories = React.useMemo(() => {
    const defaultNames = CATEGORIES_LIST.map(c => c.name as string);
    const dynamicNames = categoriesList.map(c => c.name);
    const combined = Array.from(new Set(['All', ...defaultNames.filter(n => n !== 'All'), ...dynamicNames]));
    
    return combined.map(name => {
      const match = CATEGORIES_LIST.find(c => c.name === name);
      return {
        name,
        icon: match ? match.icon : Crown
      };
    });
  }, [categoriesList]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 my-6 sm:my-10">
      {/* Category Navigation Pills */}
      <div className="relative w-full">
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto py-2.5 px-1 no-scrollbar scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {displayCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name as CategoryType)}
                className={`flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 font-serif-heading whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#B68D40] text-[#F8F5EF] shadow-md shadow-[#B68D40]/30 scale-[1.02] sm:scale-105 font-bold'
                    : 'bg-[#F2ECE3] text-[#2B2622]/80 hover:bg-[#D9C7AE]/40 hover:text-[#B68D40] border border-[#B68D40]/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-[#F8F5EF]' : 'text-[#B68D40]'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

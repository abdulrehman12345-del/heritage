import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artifact, CategoryType } from '../types';
import { ShieldCheck, Eye, Compass, Calendar, MapPin, Search, SlidersHorizontal, Heart, X, Sparkles, Filter } from 'lucide-react';

interface ArtifactGridProps {
  artifacts: Artifact[];
  activeCategory: CategoryType;
  onSelectArtifact: (artifact: Artifact) => void;
  savedIds?: string[];
  onToggleSave?: (artifactId: string) => void;
}

export const ArtifactGrid: React.FC<ArtifactGridProps> = ({
  artifacts,
  activeCategory,
  onSelectArtifact,
  savedIds = [],
  onToggleSave
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc' | 'title'>('featured');

  // Extract unique eras for filter tabs
  const eras = useMemo(() => {
    const set = new Set<string>();
    artifacts.forEach(a => {
      if (a.periodYear) set.add(a.periodYear);
    });
    return ['All', ...Array.from(set)];
  }, [artifacts]);

  // Filter & Sort Logic
  const filteredAndSortedArtifacts = useMemo(() => {
    return artifacts
      .filter(item => {
        // Category Filter
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;

        // Era Filter
        const matchesEra = selectedEra === 'All' || item.periodYear === selectedEra;

        // Search Query
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = !q || 
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.origin && item.origin.toLowerCase().includes(q)) ||
          (item.periodYear && item.periodYear.toLowerCase().includes(q)) ||
          (item.description && item.description.toLowerCase().includes(q));

        return matchesCategory && matchesEra && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        // Default 'featured'
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [artifacts, activeCategory, selectedEra, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] font-mono text-[#B68D40] block mb-2 font-medium">
          The Vault & Gallery Collection
        </span>
        <h2 className="font-serif-heading text-2xl sm:text-4xl md:text-5xl font-bold text-[#2B2622]">
          Curated Antiquities & Artifacts
        </h2>
        <div className="w-16 sm:w-20 h-[2px] bg-[#B68D40] mx-auto mt-3 sm:mt-4 mb-3 sm:mb-4" />
        <p className="text-xs sm:text-sm md:text-base text-[#6B6258] font-light leading-relaxed">
          Search and inspect certified animal statues, ancient bronzes, historical sculptures, and copper masterpieces.
        </p>
      </div>

      {/* Interactive Controls Bar: Search & Sorting */}
      <div className="bg-[#2A3036] rounded-[20px] sm:rounded-[24px] p-3.5 sm:p-6 mb-8 sm:mb-10 border border-[#B68D40]/30 shadow-xl text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Live Search Input */}
          <div className="relative w-full md:w-1/2">
            <Search className="w-4 h-4 text-[#B68D40] absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, origin, era..."
              className="w-full pl-10 sm:pl-11 pr-9 sm:pr-10 py-2.5 sm:py-3 rounded-full bg-[#1F2328] border border-[#B68D40]/30 text-xs sm:text-sm text-[#F8F5EF] placeholder-[#D9C7AE]/50 focus:outline-none focus:border-[#B68D40] focus:ring-1 focus:ring-[#B68D40] transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D9C7AE] hover:text-white p-1 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & Count Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-1.5 text-xs text-[#D9C7AE] font-mono whitespace-nowrap">
              <Filter className="w-3.5 h-3.5 text-[#B68D40]" />
              <span>Sort:</span>
            </div>

            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#1F2328] border border-[#B68D40]/30 text-xs text-[#F8F5EF] font-serif-heading focus:outline-none focus:border-[#B68D40] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-desc">Valuation: High to Low</option>
              <option value="price-asc">Valuation: Low to High</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Historical Era Filter Badges */}
        {eras.length > 2 && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-[#B68D40] shrink-0 mr-1">
              Era:
            </span>
            {eras.map(era => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all shrink-0 cursor-pointer ${
                  selectedEra === era
                    ? 'bg-[#B68D40] text-white font-bold shadow-md'
                    : 'bg-[#1F2328] text-[#D9C7AE]/80 hover:text-white border border-[#B68D40]/20'
                }`}
              >
                {era}
              </button>
            ))}
          </div>
        )}

        {/* Results Counter Bar */}
        <div className="mt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-[#D9C7AE]/70 font-mono">
          <span>Displaying <strong className="text-[#B68D40]">{filteredAndSortedArtifacts.length}</strong> authenticated pieces</span>
          {(searchQuery || selectedEra !== 'All' || activeCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedEra('All');
              }}
              className="text-[#B68D40] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Artifact Cards */}
      {filteredAndSortedArtifacts.length === 0 ? (
        <div className="py-20 text-center bg-[#F2ECE3]/60 rounded-3xl border border-[#B68D40]/30 shadow-inner">
          <Compass className="w-10 h-10 text-[#B68D40] mx-auto mb-3 animate-pulse" />
          <p className="font-serif-heading text-xl text-[#2B2622] font-semibold">No artifacts matched your query.</p>
          <p className="text-xs text-[#6B6258] mt-2 max-w-md mx-auto">
            Try adjusting your search keywords, selecting 'All Eras' or browsing different categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedEra('All');
            }}
            className="mt-5 px-6 py-2.5 rounded-full bg-[#B68D40] text-white font-serif-heading text-xs uppercase tracking-wider font-semibold hover:bg-[#A76B3F] transition-all"
          >
            Show All Artifacts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedArtifacts.map((artifact, idx) => {
              const isSaved = savedIds.includes(artifact.id);

              return (
                <motion.div
                  key={artifact.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-[#1F2328] rounded-[26px] overflow-hidden border border-[#B68D40]/30 shadow-xl hover:shadow-2xl hover:border-[#B68D40]/70 transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Card Top Banner & Image */}
                  <div>
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#15181C] cursor-pointer" onClick={() => onSelectArtifact(artifact)}>
                      <img
                        src={artifact.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200'}
                        alt={artifact.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200';
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1F2328] via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity" />

                      {/* Category Tag */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-[#1F2328]/85 backdrop-blur-md border border-[#B68D40]/40 text-[#D9C7AE] text-[10px] uppercase tracking-widest font-mono shadow-sm">
                          {artifact.category}
                        </span>
                      </div>

                      {/* Bookmark / Heart Button & Certificate Seal */}
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                        {onToggleSave && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleSave(artifact.id);
                            }}
                            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                              isSaved
                                ? 'bg-[#B68D40] text-white border-[#B68D40] shadow-lg scale-110'
                                : 'bg-[#1F2328]/80 text-[#D9C7AE] border-[#B68D40]/40 hover:text-white hover:border-[#B68D40]'
                            }`}
                            title={isSaved ? 'Remove from Saved' : 'Save to Collector Shortlist'}
                          >
                            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                          </button>
                        )}

                        <div className="w-8 h-8 rounded-full bg-[#1F2328]/80 backdrop-blur-md border border-[#B68D40]/40 flex items-center justify-center text-[#B68D40]" title="Certified Vault Item">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Quick Inspect Hover Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                        <span className="px-5 py-2.5 rounded-full bg-[#B68D40] text-white font-serif-heading text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Eye className="w-4 h-4 text-white" />
                          <span>Inspect Masterpiece</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body Information */}
                    <div className="p-6 cursor-pointer" onClick={() => onSelectArtifact(artifact)}>
                      <div className="flex items-center gap-3 text-[11px] text-[#D9C7AE]/80 mb-2 font-light">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#B68D40]" />
                          {artifact.origin}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-[#A76B3F]" />
                          {artifact.periodYear}
                        </span>
                      </div>

                      <h3 className="font-serif-heading text-xl font-semibold text-[#F8F5EF] group-hover:text-[#B68D40] transition-colors leading-snug line-clamp-2 mb-2">
                        {artifact.title}
                      </h3>

                      <p className="text-xs text-[#D9C7AE]/70 line-clamp-2 leading-relaxed mb-4 font-light">
                        {artifact.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Price & Action */}
                  <div className="px-6 pb-6 pt-3 border-t border-[#B68D40]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-[#D9C7AE]/60 uppercase tracking-widest block font-mono">Vault Valuation</span>
                      <span className="text-[#B68D40] text-base sm:text-lg font-bold tracking-wider font-mono">{artifact.priceFormatted}</span>
                    </div>

                    <button
                      onClick={() => onSelectArtifact(artifact)}
                      className="px-4 py-2 rounded-full bg-[#2A3036] hover:bg-[#B68D40] text-[#D9C7AE] hover:text-white font-serif-heading text-xs uppercase tracking-wider font-semibold border border-[#B68D40]/30 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>View Details</span>
                      <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-500" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};


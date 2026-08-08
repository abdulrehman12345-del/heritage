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
    <section id="catalog" className="py-8 sm:py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      {/* Search, Filter & Sort Toolbar */}
      <div className="bg-[#1F2328] rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-8 border border-[#B68D40]/30 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B68D40]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, material, origin, era, or keyword..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#15181C] border border-[#B68D40]/30 text-white placeholder-[#8C8275] text-sm focus:outline-none focus:border-[#FFE270] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8275] hover:text-white p-1 rounded-full cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters & Sort Controls Group */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Era Selector */}
            {eras.length > 1 && (
              <div className="flex items-center gap-2 bg-[#15181C] px-3 py-2 rounded-xl border border-[#B68D40]/30">
                <Filter className="w-3.5 h-3.5 text-[#B68D40] shrink-0" />
                <span className="text-xs text-[#8C8275] hidden sm:inline">Era:</span>
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer pr-1"
                >
                  {eras.map(era => (
                    <option key={era} value={era} className="bg-[#1F2328] text-white">
                      {era === 'All' ? 'All Eras' : era}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-[#15181C] px-3 py-2 rounded-xl border border-[#B68D40]/30">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B68D40] shrink-0" />
              <span className="text-xs text-[#8C8275] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured" className="bg-[#1F2328] text-white">Featured First</option>
                <option value="price-asc" className="bg-[#1F2328] text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-[#1F2328] text-white">Price: High to Low</option>
                <option value="title" className="bg-[#1F2328] text-white">Name: A to Z</option>
              </select>
            </div>

            {/* Clear Filters Button (if active) */}
            {(searchQuery || selectedEra !== 'All' || activeCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedEra('All');
                }}
                className="px-3 py-2 rounded-xl bg-[#A87C32]/20 hover:bg-[#A87C32]/40 text-[#FFE270] border border-[#A87C32]/40 text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Counter and Active Filter Tags */}
        <div className="flex items-center justify-between text-xs text-[#8C8275] pt-2 border-t border-[#B68D40]/15">
          <span>
            Showing <strong className="text-[#FFE270] font-mono">{filteredAndSortedArtifacts.length}</strong> of{' '}
            <strong className="text-white font-mono">{artifacts.length}</strong> artifacts
          </span>
          {activeCategory !== 'All' && (
            <span className="text-[#D9C7AE]">
              Category: <strong className="text-[#FFE270]">{activeCategory}</strong>
            </span>
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
                        src={artifact.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=70&w=600'}
                        alt={artifact.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=70&w=600';
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


import React from 'react';
import { motion } from 'motion/react';
import { Artifact, CategoryType } from '../types';
import { ShieldCheck, Eye, Compass, Calendar, MapPin } from 'lucide-react';

interface ArtifactGridProps {
  artifacts: Artifact[];
  activeCategory: CategoryType;
  onSelectArtifact: (artifact: Artifact) => void;
}

export const ArtifactGrid: React.FC<ArtifactGridProps> = ({
  artifacts,
  activeCategory,
  onSelectArtifact
}) => {
  const filteredArtifacts = activeCategory === 'All'
    ? artifacts
    : artifacts.filter(a => a.category === activeCategory);

  return (
    <section id="catalog" className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#B68D40] block mb-2 font-medium">
          The Vault & Gallery
        </span>
        <h2 className="font-serif-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B2622]">
          Curated Antiquities
        </h2>
        <div className="w-16 h-[2px] bg-[#B68D40] mx-auto mt-4 mb-4" />
        <p className="text-sm md:text-base text-[#6B6258] font-light">
          Explore certified animal statues, ancient bronzes, historical sculptures, and copper masterpieces.
        </p>
      </div>

      {/* Grid of Cards */}
      {filteredArtifacts.length === 0 ? (
        <div className="py-16 text-center bg-[#F2ECE3]/50 rounded-3xl border border-[#B68D40]/20">
          <p className="font-serif-heading text-lg text-[#2B2622]">No artifacts currently available in this specific category.</p>
          <p className="text-xs text-[#6B6258] mt-2">Please select another category or view All Artifacts.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredArtifacts.map((artifact, idx) => (
            <motion.div
              key={artifact.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8 }}
              onClick={() => onSelectArtifact(artifact)}
              className="group relative bg-[#2A3036] rounded-[24px] overflow-hidden border border-[#B68D40]/20 shadow-xl hover:shadow-2xl hover:border-[#B68D40]/60 transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Image Header */}
              <div>
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#1F2328]">
                  <img
                    src={artifact.image}
                    alt={artifact.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A3036] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#1F2328]/80 backdrop-blur-md border border-[#B68D40]/30 text-[#D9C7AE] text-[10px] uppercase tracking-widest font-mono">
                      {artifact.category}
                    </span>
                  </div>

                  {/* Provenance Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-[#B68D40]/20 backdrop-blur-md border border-[#B68D40]/40 flex items-center justify-center text-[#B68D40]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Quick Inspect Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                    <span className="px-5 py-2.5 rounded-full bg-[#B68D40] text-white font-serif-heading text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-4 h-4 text-white" />
                      <span>Inspect Details</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-6">
                  {/* Origin & Era Meta */}
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

                  {/* Title */}
                  <h3 className="font-serif-heading text-xl font-light italic text-white group-hover:text-[#B68D40] transition-colors leading-snug line-clamp-2 mb-2">
                    {artifact.title}
                  </h3>

                  {/* Category & Era line */}
                  <p className="text-[10px] uppercase tracking-widest text-[#D9C7AE] mb-3 font-mono">
                    {artifact.category} • {artifact.periodYear}
                  </p>

                  {/* Short Description */}
                  <p className="text-xs text-[#D9C7AE]/70 line-clamp-2 leading-relaxed mb-4 font-light">
                    {artifact.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Price & Action */}
              <div className="px-6 pb-6 pt-3 border-t border-[#B68D40]/15 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-[#D9C7AE]/60 uppercase tracking-widest block font-mono">Valuation</span>
                  <span className="text-[#A76B3F] text-base font-bold tracking-widest font-mono">{artifact.priceFormatted}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/50 group-hover:text-[#B68D40] uppercase tracking-wider transition-colors">View Details</span>
                  <div className="w-8 h-8 rounded-full bg-[#1F2328] group-hover:bg-[#B68D40] text-[#D9C7AE] group-hover:text-white flex items-center justify-center transition-all duration-300 border border-[#B68D40]/20">
                    <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

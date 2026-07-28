import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Search, Trash2, CheckCircle, Folder, Sparkles, RefreshCw } from 'lucide-react';
import { MediaFile } from '../types';

interface MediaLibraryViewProps {
  mediaFiles: MediaFile[];
  onUploadMedia: (file: MediaFile) => void;
  onDeleteMedia: (id: string) => void;
}

export const MediaLibraryView: React.FC<MediaLibraryViewProps> = ({
  mediaFiles,
  onUploadMedia,
  onDeleteMedia
}) => {
  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [isUploading, setIsUploading] = useState(false);

  const folders = ['All', 'Artifacts', 'Hero', 'Certificates', 'Banners'];

  const filtered = mediaFiles.filter((m) => {
    const matchesFolder = selectedFolder === 'All' || m.folder === selectedFolder;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleSimulatedDrop = () => {
    setIsUploading(true);
    setTimeout(() => {
      const sampleMedia: MediaFile = {
        id: `med-${Date.now()}`,
        name: `artifact_scan_${Math.floor(100 + Math.random() * 900)}.webp`,
        url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
        size: '1.4 MB',
        dimensions: '2800 x 3600',
        folder: 'Artifacts',
        uploadedAt: new Date().toISOString().slice(0, 10),
        optimized: true
      };
      onUploadMedia(sampleMedia);
      setIsUploading(false);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#B68D40]" />
            High-Resolution Media Asset Vault
          </h1>
          <p className="text-xs text-[#6A6158]">
            WebP automated compression, museum macro photography, and certificate scans
          </p>
        </div>

        <button
          onClick={handleSimulatedDrop}
          disabled={isUploading}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md"
        >
          {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <span>{isUploading ? 'Optimizing Asset...' : 'Upload Asset'}</span>
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onClick={handleSimulatedDrop}
        className="p-8 rounded-[24px] border-2 border-dashed border-[#B68D40]/40 bg-[#F8F5EF]/80 hover:bg-[#F8F5EF] text-center cursor-pointer transition-colors group space-y-2"
      >
        <div className="w-12 h-12 rounded-full bg-[#1F2328] text-[#B68D40] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-base font-bold text-[#2B2622]">Drag & Drop High-Res Studio Photos Here</h3>
        <p className="text-xs text-[#6A6158]">Supports RAW, TIFF, PNG, WebP up to 50MB. Auto WebP 95% compression enabled.</p>
      </div>

      {/* Filters */}
      <div className="bg-[#FFFDF8] p-4 rounded-[20px] border border-[#B68D40]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search image filename..."
            className="w-full bg-[#F8F5EF] border border-[#B68D40]/20 rounded-full pl-10 pr-4 py-2 text-xs text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
          />
        </div>

        <div className="flex items-center gap-2">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                selectedFolder === f ? 'bg-[#1F2328] text-white' : 'bg-[#F8F5EF] text-[#6A6158]'
              }`}
            >
              <Folder className="w-3.5 h-3.5 text-[#B68D40]" /> {f}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#FFFDF8] rounded-[20px] border border-[#B68D40]/20 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="relative h-36 w-full bg-[#1F2328]">
              <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              {item.optimized && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#2F855A] text-white text-[9px] font-bold uppercase flex items-center gap-1">
                  <CheckCircle className="w-2.5 h-2.5" /> WebP
                </span>
              )}
            </div>

            <div className="p-3 space-y-1 text-xs">
              <p className="font-mono text-[11px] text-[#2B2622] font-bold truncate">{item.name}</p>
              <div className="flex items-center justify-between text-[10px] text-[#6A6158] font-mono">
                <span>{item.size}</span>
                <span>{item.dimensions}</span>
              </div>
            </div>

            <div className="p-2 border-t border-[#B68D40]/15 flex items-center justify-end">
              <button
                onClick={() => onDeleteMedia(item.id)}
                className="p-1.5 rounded-lg text-[#B83A3A] hover:bg-[#B83A3A] hover:text-white transition-colors"
                title="Delete Media File"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

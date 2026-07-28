import React, { useState } from 'react';
import { Globe, Save, CheckCircle2, Sparkles, Layout, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { HomepageCMSConfig } from '../types';

interface HomepageCMSViewProps {
  config: HomepageCMSConfig;
  onSaveConfig: (updated: HomepageCMSConfig) => void;
}

export const HomepageCMSView: React.FC<HomepageCMSViewProps> = ({ config, onSaveConfig }) => {
  const [form, setForm] = useState<HomepageCMSConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onSaveConfig(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#B68D40]" />
            Homepage Visual Content Management System
          </h1>
          <p className="text-xs text-[#6A6158]">
            Update public storefront hero text, museum heritage story, and private newsletter invitations in real-time
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save & Deploy Live CMS</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-[#2F855A] text-white text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>Homepage CMS configuration successfully deployed to public storefront!</span>
        </div>
      )}

      {/* Hero Section Live Controls */}
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#2B2622] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B68D40]" />
          Hero Banner Section
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Hero Tagline Subheading</label>
            <input
              type="text"
              value={form.heroSubheading}
              onChange={(e) => setForm({ ...form, heroSubheading: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Hero Main Display Heading</label>
            <input
              type="text"
              value={form.heroHeading}
              onChange={(e) => setForm({ ...form, heroHeading: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622] font-serif font-bold text-sm"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Hero Paragraph Editorial Copy</label>
            <textarea
              rows={3}
              value={form.heroDescription}
              onChange={(e) => setForm({ ...form, heroDescription: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl p-3 text-[#2B2622]"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Featured Hero Image Background URL</label>
            <input
              type="text"
              value={form.heroImage}
              onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>
        </div>
      </div>

      {/* About Section CMS */}
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#2B2622] flex items-center gap-2">
          <Layout className="w-4 h-4 text-[#B68D40]" />
          Heritage Museum Narrative Section
        </h2>

        <div className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Section Heading</label>
            <input
              type="text"
              value={form.aboutHeading}
              onChange={(e) => setForm({ ...form, aboutHeading: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Editorial Story Body Text</label>
            <textarea
              rows={4}
              value={form.aboutText}
              onChange={(e) => setForm({ ...form, aboutText: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl p-3 text-[#2B2622]"
            />
          </div>
        </div>
      </div>

      {/* Newsletter Copy */}
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#2B2622] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#B68D40]" />
          Private Curator Dispatch Invitation (Newsletter)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Invitation Title</label>
            <input
              type="text"
              value={form.newsletterTitle}
              onChange={(e) => setForm({ ...form, newsletterTitle: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Subtitle Text</label>
            <input
              type="text"
              value={form.newsletterSubtitle}
              onChange={(e) => setForm({ ...form, newsletterSubtitle: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

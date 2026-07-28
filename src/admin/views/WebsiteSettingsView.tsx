import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Shield, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { WebsiteSettingsConfig } from '../types';

interface WebsiteSettingsViewProps {
  settings: WebsiteSettingsConfig;
  onSaveSettings: (updated: WebsiteSettingsConfig) => void;
}

export const WebsiteSettingsView: React.FC<WebsiteSettingsViewProps> = ({ settings, onSaveSettings }) => {
  const [form, setForm] = useState<WebsiteSettingsConfig>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onSaveSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#B68D40]" />
            Global Website & Storefront Configuration
          </h1>
          <p className="text-xs text-[#6A6158]">
            Configure Mayfair gallery contact info, SEO meta tags, social dispatches, and currency
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-[#2F855A] text-white text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>Website settings successfully updated!</span>
        </div>
      )}

      {/* General Branding */}
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#2B2622]">Brand & Identity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Storefront Name</label>
            <input
              type="text"
              value={form.siteName}
              onChange={(e) => setForm({ ...form, siteName: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Brand Emblem Initial / Logo Text</label>
            <input
              type="text"
              value={form.logoText}
              onChange={(e) => setForm({ ...form, logoText: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622] font-bold text-center"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Global Store Tagline</label>
            <input
              type="text"
              value={form.siteTagline}
              onChange={(e) => setForm({ ...form, siteTagline: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>
        </div>
      </div>

      {/* Gallery Contact */}
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#2B2622]">Gallery Contact & Mayfair Headquarters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Curator Email</label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Private Direct Phone</label>
            <input
              type="text"
              value={form.contactPhone}
              onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Physical Gallery Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#2B2622]">SEO & Search Engine Indexing</h2>
        <div className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Global Meta Title</label>
            <input
              type="text"
              value={form.seoTitle}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-[#2B2622]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#2B2622] uppercase">Global Meta Description</label>
            <textarea
              rows={2}
              value={form.seoDescription}
              onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl p-3 text-[#2B2622]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

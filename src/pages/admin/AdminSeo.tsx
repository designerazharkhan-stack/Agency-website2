import React, { useState, useEffect } from 'react';
import { Save, Check, AlertCircle, Search, Share2, Globe } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { updateSeoSettings } from '../../services/db';
import { SeoSettings } from '../../types';
import { ImageUploader } from '../../components/ImageUploader';

export const AdminSeo: React.FC = () => {
  const { seoSettings, refreshSiteData } = useSite();
  const [formData, setFormData] = useState<SeoSettings>(seoSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(seoSettings);
  }, [seoSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateSeoSettings(formData);
      await refreshSiteData();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error('Error saving SEO settings:', err);
      setError(err?.message || 'Failed to update SEO settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Global SEO & Social Graph Settings</h2>
        <p className="text-xs text-[#8f96a6]">
          Configure search engine metadata, OpenGraph cards for LinkedIn and Twitter, and indexing directives.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Search Engine & OpenGraph metadata updated successfully.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Search Engine Essentials */}
        <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-[#d4af37]">
            <Search className="w-5 h-5" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Search Engine Optimization (Google / Bing)
            </h3>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
              Default Site Title (&lt;title&gt;)
            </label>
            <input
              type="text"
              name="siteTitle"
              value={formData.siteTitle}
              onChange={handleChange}
              required
              className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
            <p className="text-[10px] text-[#6e7687] mt-1">Recommended length: 50–60 characters</p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
              Default Meta Description
            </label>
            <textarea
              name="defaultMetaDescription"
              rows={3}
              value={formData.defaultMetaDescription}
              onChange={handleChange}
              required
              className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
            <p className="text-[10px] text-[#6e7687] mt-1">Recommended length: 150–160 characters</p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
              Global Keywords (Comma separated)
            </label>
            <input
              type="text"
              value={formData.keywords?.join(', ') || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean)
                })
              }
              className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono"
            />
          </div>
        </div>

        {/* Social Graph Sharing (Open Graph & Twitter Cards) */}
        <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-[#d4af37]">
            <Share2 className="w-5 h-5" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Social Media OpenGraph Cards
            </h3>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
              Open Graph Title (og:title)
            </label>
            <input
              type="text"
              name="ogTitle"
              value={formData.ogTitle}
              onChange={handleChange}
              className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
              Open Graph Description (og:description)
            </label>
            <textarea
              rows={3}
              name="ogDescription"
              value={formData.ogDescription}
              onChange={handleChange}
              className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <ImageUploader
            label="Social Share Image (1200x630px recommended)"
            value={formData.ogImage}
            onChange={(url) => setFormData((prev) => ({ ...prev, ogImage: url }))}
            folder="seo"
          />
        </div>

        {/* Google SERP Preview Box */}
        <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#8f96a6]">
            Live Google SERP Card Preview
          </h3>
          <div className="p-4 rounded-xl bg-[#0b0c10] border border-white/5 space-y-1.5 max-w-xl">
            <span className="text-xs text-[#8f96a6] font-mono block">
              https://agencywebsite.com
            </span>
            <div className="text-base text-[#8ab4f8] font-medium hover:underline cursor-pointer">
              {formData.siteTitle}
            </div>
            <p className="text-xs text-[#bdc1c6] leading-relaxed">
              {formData.defaultMetaDescription}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] hover:from-[#f3df9f] text-black font-bold text-xs shadow-lg shadow-[#d4af37]/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Synchronizing...' : 'Save SEO Metadata'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

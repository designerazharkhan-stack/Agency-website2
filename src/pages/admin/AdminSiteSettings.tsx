import React, { useState, useEffect } from 'react';
import { Save, Check, AlertCircle } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { updateSiteSettings } from '../../services/db';
import { SiteSettings } from '../../types';
import { ImageUploader } from '../../components/ImageUploader';

export const AdminSiteSettings: React.FC = () => {
  const { siteSettings, refreshSiteData } = useSite();
  const [formData, setFormData] = useState<SiteSettings>(siteSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(siteSettings);
  }, [siteSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [key]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateSiteSettings(formData);
      await refreshSiteData();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error('Error saving site settings:', err);
      setError(err?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">General Site & Brand Identity</h2>
        <p className="text-xs text-[#8f96a6]">
          Configure agency branding, logos, direct contact details, and social channels.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Brand settings updated and synchronized across all pages.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Brand Information */}
        <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#d4af37]">
            Core Brand Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                Agency Brand Name
              </label>
              <input
                type="text"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                required
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                Founded Year
              </label>
              <input
                type="text"
                name="foundedYear"
                value={formData.foundedYear}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
              Brand Positioning Tagline
            </label>
            <textarea
              name="tagline"
              rows={2}
              value={formData.tagline}
              onChange={handleChange}
              className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Logo Uploader */}
          <ImageUploader
            label="Custom Logo Image (Optional - leaves text monogram if blank)"
            value={formData.logoUrl || ''}
            onChange={(url) => setFormData((prev) => ({ ...prev, logoUrl: url }))}
            folder="logos"
          />
        </div>

        {/* Contact Information */}
        <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#d4af37]">
            Direct Contact & Headquarters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                Public Inquiries Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                Telephone Contact
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                Direct WhatsApp Number
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                Physical Office Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                City, State / Country
              </label>
              <input
                type="text"
                name="cityCountry"
                value={formData.cityCountry}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Social Media Channels */}
        <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#d4af37]">
            Social Media Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8f96a6] font-semibold mb-2">
                Twitter / X Profile URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="https://twitter.com/..."
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8f96a6] font-semibold mb-2">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.linkedin || ''}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/..."
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8f96a6] font-semibold mb-2">
                GitHub Organization URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.github || ''}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8f96a6] font-semibold mb-2">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8f96a6] font-semibold mb-2">
                Dribbble Agency URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.dribbble || ''}
                onChange={(e) => handleSocialChange('dribbble', e.target.value)}
                placeholder="https://dribbble.com/..."
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8f96a6] font-semibold mb-2">
                Behance Portfolio URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.behance || ''}
                onChange={(e) => handleSocialChange('behance', e.target.value)}
                placeholder="https://behance.net/..."
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] hover:from-[#f3df9f] text-black font-bold text-xs shadow-lg shadow-[#d4af37]/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Brand Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

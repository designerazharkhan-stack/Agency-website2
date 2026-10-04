import React, { useState, useEffect } from 'react';
import { Save, Check, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { updateHomepageSettings } from '../../services/db';
import { HomepageSettings } from '../../types';

export const AdminHomepage: React.FC = () => {
  const { homepageSettings, refreshSiteData } = useSite();
  const [formData, setFormData] = useState<HomepageSettings>(homepageSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(homepageSettings);
  }, [homepageSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (index: number, field: string, val: string) => {
    setFormData((prev) => {
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: val };
      return { ...prev, stats };
    });
  };

  const handleWhyUsChange = (index: number, field: string, val: string) => {
    setFormData((prev) => {
      const whyUs = [...prev.whyUs];
      whyUs[index] = { ...whyUs[index], [field]: val };
      return { ...prev, whyUs };
    });
  };

  const handleProcessChange = (index: number, field: string, val: string) => {
    setFormData((prev) => {
      const workProcess = [...prev.workProcess];
      workProcess[index] = { ...workProcess[index], [field]: val };
      return { ...prev, workProcess };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateHomepageSettings(formData);
      await refreshSiteData();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error('Error saving homepage settings:', err);
      setError(err?.message || 'Failed to update homepage');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Homepage Content Architecture</h2>
        <p className="text-xs text-[#8f96a6]">
          Directly control hero messaging, CTAs, statistics, and why-us value pillars.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Homepage content updated successfully.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section Copy */}
        <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#d4af37]">
            Hero Section Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                Eyebrow Badge
              </label>
              <input
                type="text"
                name="heroEyebrow"
                value={formData.heroEyebrow}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                Hero Headline (Part 1)
              </label>
              <input
                type="text"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                Headline Highlight (Gold Gradient)
              </label>
              <input
                type="text"
                name="heroHighlight"
                value={formData.heroHighlight}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
              Hero Supporting Subtitle
            </label>
            <textarea
              name="heroSubtitle"
              rows={3}
              value={formData.heroSubtitle}
              onChange={handleChange}
              className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-white font-semibold block">
                Primary CTA Button
              </span>
              <div>
                <label className="block text-[11px] text-[#8f96a6] mb-1">Button Label</label>
                <input
                  type="text"
                  name="heroCtaText"
                  value={formData.heroCtaText}
                  onChange={handleChange}
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8f96a6] mb-1">Destination URL</label>
                <input
                  type="text"
                  name="heroCtaLink"
                  value={formData.heroCtaLink}
                  onChange={handleChange}
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-white font-semibold block">
                Secondary CTA Button
              </span>
              <div>
                <label className="block text-[11px] text-[#8f96a6] mb-1">Button Label</label>
                <input
                  type="text"
                  name="heroSecondaryCtaText"
                  value={formData.heroSecondaryCtaText}
                  onChange={handleChange}
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8f96a6] mb-1">Destination URL</label>
                <input
                  type="text"
                  name="heroSecondaryCtaLink"
                  value={formData.heroSecondaryCtaLink}
                  onChange={handleChange}
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Ribbon Editor */}
        <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#d4af37]">
            Agency Statistics Matrix (4 Counters)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0b0c10] border border-white/5 space-y-3">
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-[10px] text-[#8f96a6] uppercase mb-1">Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                      className="w-full bg-[#181b26] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-[10px] text-[#8f96a6] uppercase mb-1">Suffix</label>
                    <input
                      type="text"
                      value={stat.suffix}
                      onChange={(e) => handleStatChange(idx, 'suffix', e.target.value)}
                      className="w-full bg-[#181b26] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#8f96a6] uppercase mb-1">Metric Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                    className="w-full bg-[#181b26] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8f96a6] uppercase mb-1">Description Subtext</label>
                  <input
                    type="text"
                    value={stat.description || ''}
                    onChange={(e) => handleStatChange(idx, 'description', e.target.value)}
                    className="w-full bg-[#181b26] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Us Benefits Editor */}
        <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#d4af37]">
            Why Choose Us (4 Value Pillars)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.whyUs.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0b0c10] border border-white/5 space-y-3">
                <div>
                  <label className="block text-[10px] text-[#8f96a6] uppercase mb-1">Pillar Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleWhyUsChange(idx, 'title', e.target.value)}
                    className="w-full bg-[#181b26] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#8f96a6] uppercase mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={item.description}
                    onChange={(e) => handleWhyUsChange(idx, 'description', e.target.value)}
                    className="w-full bg-[#181b26] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6-Step Execution Process Editor */}
        <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#d4af37]">
            Work Process (6 Milestones)
          </h3>

          <div className="space-y-3">
            {formData.workProcess.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0b0c10] border border-white/5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-1 font-mono text-lg font-bold text-[#d4af37]">
                  {step.step}
                </div>
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleProcessChange(idx, 'title', e.target.value)}
                    className="w-full bg-[#181b26] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div className="sm:col-span-7">
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => handleProcessChange(idx, 'description', e.target.value)}
                    className="w-full bg-[#181b26] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] hover:from-[#f3df9f] text-black font-bold text-xs shadow-lg shadow-[#d4af37]/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Updating...' : 'Save Homepage Copy'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

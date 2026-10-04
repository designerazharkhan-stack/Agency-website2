import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { saveContactMessage } from '../services/db';

export const Contact: React.FC = () => {
  const { siteSettings } = useSite();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    budget: '$15,000 - $30,000',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fill from query params (e.g. ?service=ui-ux-design)
  useEffect(() => {
    const srvParam = searchParams.get('service');
    if (srvParam) {
      const cleanSrv = srvParam.replace(/-/g, ' ');
      setFormData((prev) => ({
        ...prev,
        service: cleanSrv.charAt(0).toUpperCase() + cleanSrv.slice(1)
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please provide your name, valid email address, and project summary.');
      return;
    }

    try {
      setSubmitting(true);
      await saveContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        budget: formData.budget,
        message: formData.message.trim()
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setError(err?.message || 'Failed to submit inquiry. Please try again or reach out directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-16 min-h-screen">
      {/* Header */}
      <section className="relative py-16 md:py-20 overflow-hidden border-b border-[#d4af37]/15 bg-[#0e1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#d4af37]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#d4af37]">
              Confidential Discovery
            </span>
            <span className="h-px w-6 bg-[#d4af37]"></span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Initiate Your <span className="text-gold-gradient">Collaboration.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9da5b4] max-w-2xl mx-auto font-light leading-relaxed">
            Tell us about your venture, timeline, and architectural ambitions. We review every brief and return a preliminary scope evaluation within 48 hours.
          </p>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="py-20 bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7 bg-[#12141c] border border-[#d4af37]/25 rounded-2xl p-8 sm:p-10 shadow-2xl relative">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Inquiry Received Securely
                  </h3>
                  <p className="text-sm text-[#9da5b4] font-light max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>. A copy of your submission has been logged into our executive portal. Our technical director will respond within 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: 'Web Development',
                        budget: '$15,000 - $30,000',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 bg-[#d4af37] text-black font-semibold text-xs rounded hover:bg-[#edd382] transition-colors"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Lord Montgomery Vance"
                        className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="vance@holdings.com"
                        className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (800) 555-0199"
                        className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                        Service Practice *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      >
                        <option value="Web Development">Web Development (React / Next.js)</option>
                        <option value="WordPress Development">WordPress Development (Custom / Headless)</option>
                        <option value="UI/UX Design">UI/UX Design & Design Systems</option>
                        <option value="SEO">SEO & Organic Growth</option>
                        <option value="E-commerce">E-Commerce Platforms</option>
                        <option value="Website Maintenance">Website Maintenance & Care Retainer</option>
                        <option value="Complete Digital Transformation">Complete Digital Transformation</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Allocation */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                      Anticipated Investment Budget *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      <option value="$7,500 - $15,000">$7,500 - $15,000 (Standard Flagship)</option>
                      <option value="$15,000 - $30,000">$15,000 - $30,000 (Enterprise Studio)</option>
                      <option value="$30,000 - $60,000">$30,000 - $60,000 (Multi-Platform Ecosystem)</option>
                      <option value="$60,000+">$60,000+ (Full Custom Enterprise Transformation)</option>
                      <option value="Monthly Retainer ($2,850/mo)">Monthly Engineering Retainer ($2,850/mo)</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                      Project Objective & Requirements *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Outline your project scope, core business objectives, desired launch timeline, and any links to existing assets..."
                      className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-4 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors resize-y leading-relaxed"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-950/40 border border-red-500/40 rounded text-xs text-red-300">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] hover:from-[#f3df9f] hover:to-[#be9128] text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/20 transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Transmitting Blueprint...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#6e7687]">
                    <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                    <span>All inquiries protected under strict non-disclosure terms</span>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Direct Info & Location */}
            <div className="lg:col-span-5 space-y-8">
              {/* Direct Details Box */}
              <div className="bg-[#12141c] border border-white/10 rounded-2xl p-8 space-y-6">
                <h3 className="font-display text-xl font-bold text-white">
                  Direct Communications
                </h3>

                <p className="text-xs text-[#8f96a6] leading-relaxed">
                  Prefer direct correspondence or have urgent procurement requirements? Connect directly with our team through the following channels.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6e7687] block">Email Direct</span>
                      <a href={`mailto:${siteSettings.email}`} className="text-sm text-white hover:text-[#d4af37] transition-colors font-medium">
                        {siteSettings.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6e7687] block">Phone Headquarters</span>
                      <a href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}`} className="text-sm text-white hover:text-[#d4af37] transition-colors font-medium">
                        {siteSettings.phone}
                      </a>
                    </div>
                  </div>

                  {siteSettings.whatsapp && (
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#6e7687] block">Direct WhatsApp</span>
                        <a
                          href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#d4af37] hover:underline font-medium inline-flex items-center gap-1"
                        >
                          <span>{siteSettings.whatsapp}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6e7687] block">Studio Location</span>
                      <span className="text-sm text-white font-medium block">
                        {siteSettings.address}
                      </span>
                      <span className="text-xs text-[#8f96a6]">
                        {siteSettings.cityCountry}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Location Showcase Card */}
              <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="h-44 rounded-lg overflow-hidden bg-[#0b0c10] relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
                    alt="Manhattan Office"
                    className="w-full h-full object-cover filter brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 text-xs font-mono text-[#f3e5ab] bg-black/60 px-2.5 py-1 rounded border border-[#d4af37]/30">
                    Lexington Ave · New York
                  </div>
                </div>
                <div className="text-xs text-[#8f96a6] leading-relaxed">
                  In-person discovery meetings in New York, London, and Geneva available by private appointment for qualifying enterprise engagements.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

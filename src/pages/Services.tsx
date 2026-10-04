import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import { LoadingState } from '../components/LoadingState';
import { getServices } from '../services/db';
import { Service } from '../types';
import {
  Code,
  Layers,
  Palette,
  Search,
  ShoppingBag,
  Wrench,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Layers,
  Palette,
  Search,
  ShoppingBag,
  Wrench,
  Sparkles
};

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <LoadingState fullScreen message="Loading service architecture..." />;
  }

  return (
    <div className="pt-28 pb-16 min-h-screen">
      {/* Header */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-[#d4af37]/15 bg-[#0e1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#d4af37]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#d4af37]">
              End-to-End Capabilities
            </span>
            <span className="h-px w-6 bg-[#d4af37]"></span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Comprehensive Digital Engineering &{' '}
            <span className="text-gold-gradient">Brand Craft.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9da5b4] max-w-2xl mx-auto font-light leading-relaxed">
            We operate at the intersection of haute design and rigorous software architecture. Every solution is bespoke, performant, and owned completely by you.
          </p>
        </div>
      </section>

      {/* Detailed Service Sections */}
      <section className="py-20 bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || Code;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.slug}
                className="scroll-mt-32 p-8 md:p-12 rounded-2xl bg-[#12141c] border border-[#d4af37]/20 relative overflow-hidden shadow-2xl"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Left Column: Details */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded bg-[#1c202d] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#d4af37]">
                        Practice 0{service.order}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                      {service.title}
                    </h2>

                    <p className="text-base text-[#c7ccd9] leading-relaxed mb-6 font-light">
                      {service.fullDescription || service.shortDescription}
                    </p>

                    {/* Features list */}
                    <div className="mb-8">
                      <h3 className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-4">
                        Core Technical Features:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#9da5b4]">
                            <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA link */}
                    <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                      <Link
                        to={service.ctaLink || `/contact?service=${service.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] hover:from-[#f3df9f] hover:to-[#be9128] text-black font-semibold text-xs rounded transition-all shadow-md shadow-[#d4af37]/20"
                      >
                        <span>{service.ctaText || 'Inquire About Service'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        to="/pricing"
                        className="text-xs text-[#8f96a6] hover:text-[#d4af37] transition-colors"
                      >
                        View Investment Tiers &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Deliverables Card */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div className="bg-[#0b0c10] border border-[#d4af37]/25 rounded-xl p-6 sm:p-8">
                      <div className="flex items-center gap-2 mb-4 text-[#d4af37]">
                        <ShieldCheck className="w-5 h-5" />
                        <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                          Guaranteed Deliverables
                        </h4>
                      </div>

                      <p className="text-xs text-[#8f96a6] mb-6 leading-relaxed">
                        Every {service.title} engagement includes our white-glove QA handoff and zero-downtime deployment standard.
                      </p>

                      <ul className="space-y-3 text-xs text-[#c7ccd9]">
                        {(service.deliverables || [
                          'Complete Production Source Code & Assets',
                          'Staging Server Review & Stress Testing',
                          'Interactive Technical Documentation',
                          '30 Days Priority Post-Launch Warranty'
                        ]).map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 pb-2.5 border-b border-white/5 last:border-0 last:pb-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#6e7687]">
                        <span>Standard Sprint: 4–6 Weeks</span>
                        <span className="text-[#d4af37]">Fixed-Price SLA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Unsure Which Capability"
        highlight="Matches Your Needs?"
        subtitle="Book a free 30-minute discovery session with our technical director. We will assess your tech stack and recommend the optimal engagement path."
      />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { PricingCard } from '../components/PricingCard';
import { LoadingState } from '../components/LoadingState';
import { CTASection } from '../components/CTASection';
import { getPricingPlans } from '../services/db';
import { PricingPlan } from '../types';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPricingPlans();
        setPlans(data);
      } catch (err) {
        console.error('Error loading pricing:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const faqs = [
    {
      q: "What is included in the fixed-scope Digital Flagship tier?",
      a: "Everything needed to design, engineer, and deploy your platform: custom UI/UX design in Figma, responsive React/TypeScript or custom WordPress engineering, technical SEO, performance tuning, and 30 days of warranty support post-launch."
    },
    {
      q: "How does the Elite Growth Retainer function?",
      a: "The monthly retainer grants you dedicated senior engineering and design capacity (35 hours/mo) for continuous feature development, security patches, conversion rate optimization, and sub-2-hour SLA response. Unused hours roll over for up to 60 days."
    },
    {
      q: "Do you offer milestones or structured payment terms?",
      a: "Yes. For fixed-scope flagships, we typically structure agreements around milestone deliverables: 50% deposit upon kickoff, 25% upon design approval and staging prototype, and 25% upon final production launch."
    },
    {
      q: "Who owns the intellectual property and source code?",
      a: "You retain 100% unconditional ownership of all source code, Figma design files, database architectures, and graphical assets upon completion of payment."
    },
    {
      q: "What if our project scope exceeds the standard packages?",
      a: "We regularly architect custom enterprise engagements for multi-region platforms, complex API/ERP migrations, and dedicated engineering pods. Reach out through our contact form to receive a tailored architectural proposal."
    }
  ];

  if (loading) {
    return <LoadingState fullScreen message="Loading investment models..." />;
  }

  return (
    <div className="pt-28 pb-16 min-h-screen">
      {/* Header */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-[#d4af37]/15 bg-[#0e1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#d4af37]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#d4af37]">
              Transparent Engagement Tiers
            </span>
            <span className="h-px w-6 bg-[#d4af37]"></span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Predictable Investment.{' '}
            <span className="text-gold-gradient">Defensible ROI.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9da5b4] max-w-2xl mx-auto font-light leading-relaxed">
            Choose between fixed-price turnkey flagship deliveries or proactive monthly engineering retainers. No hidden fees, no opaque hourly markups.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-20 bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee & Standard Matrix */}
      <section className="py-16 bg-[#0e1017] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-[#12141c] border border-white/5">
              <CheckCircle2 className="w-6 h-6 text-[#d4af37] mb-3" />
              <h3 className="text-base font-bold text-white mb-2">95+ Lighthouse Score SLA</h3>
              <p className="text-xs text-[#8f96a6] leading-relaxed">
                We guarantee sub-second page performance across all modern mobile and desktop browsers, backed by rigorous profiling.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#12141c] border border-white/5">
              <CheckCircle2 className="w-6 h-6 text-[#d4af37] mb-3" />
              <h3 className="text-base font-bold text-white mb-2">Senior-Only Engineering</h3>
              <p className="text-xs text-[#8f96a6] leading-relaxed">
                Zero junior subcontractors. Your codebase is exclusively written by veterans with at least 8+ years of production experience.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#12141c] border border-white/5">
              <CheckCircle2 className="w-6 h-6 text-[#d4af37] mb-3" />
              <h3 className="text-base font-bold text-white mb-2">100% Asset Ownership</h3>
              <p className="text-xs text-[#8f96a6] leading-relaxed">
                No proprietary vendor lock-in. You own your Git repositories, Figma files, and cloud accounts outright on delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-[#0b0c10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Commercial Clarity"
            title="Frequently Answered"
            highlight="Inquiries"
            subtitle="Everything you need to know about our contracting standards, delivery timelines, and billing mechanics."
          />

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-lg bg-[#12141c] border border-[#d4af37]/15 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm font-semibold text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#d4af37] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#9da5b4] leading-relaxed border-t border-white/5 font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Require a Custom"
        highlight="Enterprise Scope?"
        subtitle="Schedule a consultation with our managing partner. We construct tailored agreements for enterprise migrations and venture portfolios."
        primaryCtaText="Request Custom Proposal"
        primaryCtaLink="/contact?type=custom"
      />
    </div>
  );
};

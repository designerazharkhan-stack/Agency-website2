import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingCardProps {
  plan: PricingPlan;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <div
      className={`relative rounded-xl p-8 transition-all duration-300 flex flex-col justify-between ${
        plan.isPopular
          ? 'bg-[#151824] border-2 border-[#d4af37] shadow-2xl shadow-[#d4af37]/15 lg:-translate-y-2'
          : 'bg-[#12141c] border border-[#d4af37]/20 hover:border-[#d4af37]/50 shadow-lg shadow-black/50'
      }`}
    >
      {/* Featured / Popular badge */}
      {plan.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] text-black font-bold text-[11px] uppercase tracking-widest px-3.5 py-1 rounded shadow-md">
          Most Requested
        </div>
      )}

      <div>
        {/* Tier Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-xs text-[#8f96a6] leading-relaxed">{plan.tagline}</p>
        </div>

        {/* Pricing display */}
        <div className="mb-6 pb-6 border-b border-white/10">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-extrabold text-white font-mono">{plan.price}</span>
            <span className="text-xs text-[#8f96a6] uppercase tracking-wider">
              / {plan.billingPeriod}
            </span>
          </div>
          <p className="text-xs text-[#9da5b4] mt-3 leading-relaxed font-light">
            {plan.description}
          </p>
        </div>

        {/* Features list */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-4">
            Included Deliverables:
          </div>
          <ul className="space-y-3 text-xs text-[#c7ccd9]">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        to={plan.ctaLink || '/contact'}
        className={`w-full py-3.5 px-6 rounded text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] ${
          plan.isPopular
            ? 'bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/25'
            : 'bg-white/5 hover:bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37]/60'
        }`}
      >
        <span>{plan.ctaText || 'Get Started'}</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

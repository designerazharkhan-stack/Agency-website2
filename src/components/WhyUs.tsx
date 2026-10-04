import React from 'react';
import { Sparkles, Zap, ShieldCheck, TrendingUp, Award, CheckCircle, LucideIcon } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { HomepageSettings } from '../types';

interface WhyUsProps {
  whyUs: HomepageSettings['whyUs'];
  stats: HomepageSettings['stats'];
}

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle
};

export const WhyUs: React.FC<WhyUsProps> = ({ whyUs, stats }) => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Agency Distinction"
          title="Why Leading Brands Trust"
          highlight="Our Craft"
          subtitle="We eliminate the friction, delays, and generic mediocrity of traditional digital agencies with senior-led engineering precision."
        />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {whyUs.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={item.id}
                className="bg-[#12141c] border border-[#d4af37]/15 hover:border-[#d4af37]/45 rounded-lg p-7 transition-all duration-300 hover:-translate-y-1 shadow-md shadow-black/40 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-[#1a1e2b] border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37] mb-6 group-hover:bg-[#d4af37] group-hover:text-black transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold-gradient transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#9da5b4] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Statistics Ribbon */}
        <div className="bg-gradient-to-r from-[#12141c] via-[#171a25] to-[#12141c] border border-[#d4af37]/30 rounded-xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <div key={stat.id || idx} className={`pt-4 lg:pt-0 ${idx > 0 ? 'lg:pl-8' : ''}`}>
                <div className="flex items-baseline gap-0.5 mb-2">
                  <span className="text-3xl md:text-5xl font-black text-white font-mono tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-2xl md:text-3xl font-extrabold text-[#d4af37] font-mono">
                    {stat.suffix}
                  </span>
                </div>
                <h4 className="text-xs uppercase tracking-wider text-white font-semibold mb-1">
                  {stat.label}
                </h4>
                {stat.description && (
                  <p className="text-xs text-[#8f96a6] font-light leading-snug">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

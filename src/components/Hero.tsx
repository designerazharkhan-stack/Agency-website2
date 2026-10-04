import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Star, Award, Code, Sparkles, Terminal } from 'lucide-react';
import { HomepageSettings } from '../types';

interface HeroProps {
  settings: HomepageSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background ambient lighting and luxury mesh gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#d4af37]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-[#2a3045]/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171b26] border border-[#d4af37]/30 text-xs text-[#f3e5ab] mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-mono uppercase tracking-wider text-[11px] font-medium">
                {settings.heroEyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              {settings.heroTitle}{' '}
              <span className="text-gold-gradient block mt-1">
                {settings.heroHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#9da5b4] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light mb-8">
              {settings.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Link
                to={settings.heroCtaLink || '/contact'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] hover:from-[#f3df9f] hover:to-[#be9128] rounded shadow-xl shadow-[#d4af37]/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{settings.heroCtaText}</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>

              <Link
                to={settings.heroSecondaryCtaLink || '/portfolio'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#12141c] hover:bg-[#181b24] border border-[#d4af37]/25 hover:border-[#d4af37]/50 rounded transition-all duration-300"
              >
                <span>{settings.heroSecondaryCtaText}</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs text-[#8f96a6]">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>
                <span className="font-semibold text-white">5.0 / 5.0 Rating</span>
              </div>
              <span className="text-[#3b4152] hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#d4af37]" />
                <span>18x Global Design Awards</span>
              </div>
              <span className="text-[#3b4152] hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>SOC2 Type II Compliant Code</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Visual / Graphic Area */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Gold decorative aura ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#d4af37]/30 via-transparent to-[#aa8022]/30 blur-xl opacity-75" />

              {/* Main Visual Terminal / Showcase Window */}
              <div className="relative rounded-xl bg-[#12141c] border border-[#d4af37]/40 shadow-2xl overflow-hidden">
                {/* Window header */}
                <div className="bg-[#181b26] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <div className="font-mono text-[11px] text-[#8f96a6] flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#d4af37]" />
                    <span>flagship-production.ts</span>
                  </div>
                  <div className="text-[10px] uppercase font-mono text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/30">
                    Live
                  </div>
                </div>

                {/* Window body */}
                <div className="p-6">
                  {/* Code snippet display */}
                  <div className="font-mono text-xs space-y-2 mb-6 text-[#9da5b4]">
                    <div className="text-[#646c7d]">// Architecture Specification</div>
                    <div>
                      <span className="text-[#d4af37]">const</span>{' '}
                      <span className="text-white font-semibold">agencyPlatform</span> ={' '}
                      <span className="text-[#edd382]">new DigitalFlagship</span>({'{'}
                    </div>
                    <div className="pl-4">
                      <span className="text-[#8f96a6]">performance:</span>{' '}
                      <span className="text-emerald-400">'Sub-second Core Web Vitals'</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-[#8f96a6]">designSystem:</span>{' '}
                      <span className="text-emerald-400">'Bespoke Kinetic Luxury'</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-[#8f96a6]">stack:</span>{' '}
                      <span className="text-[#d4af37]">['React', 'TypeScript', 'Tailwind', 'Cloud']</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-[#8f96a6]">slaGuaranteed:</span>{' '}
                      <span className="text-cyan-400">99.99</span>
                    </div>
                    <div>{'}'});</div>
                  </div>

                  {/* Interactive Architecture Metric Cards */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                    <div className="p-3 bg-[#181b26] rounded border border-white/5">
                      <span className="text-[10px] text-[#8f96a6] uppercase tracking-wider block mb-1">
                        Page Load Time
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-xl font-bold text-emerald-400">0.24</span>
                        <span className="text-xs text-[#8f96a6]">seconds</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#181b26] rounded border border-white/5">
                      <span className="text-[10px] text-[#8f96a6] uppercase tracking-wider block mb-1">
                        Lighthouse Score
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-xl font-bold text-[#d4af37]">100</span>
                        <span className="text-xs text-[#8f96a6]">/ 100</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Live Badge */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-[#d4af37]/10 to-transparent border border-[#d4af37]/20 rounded flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
                      </span>
                      <span className="text-xs font-medium text-white">Accepting Q4 Client Roster</span>
                    </div>
                    <Link
                      to="/contact"
                      className="text-xs font-semibold text-[#d4af37] hover:underline"
                    >
                      Inquire &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

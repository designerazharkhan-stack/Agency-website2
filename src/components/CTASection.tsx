import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, ShieldCheck } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Ready to Build Something",
  highlight = "Extraordinary?",
  subtitle = "Schedule a confidential discovery consultation with our senior engineering and design directors today. We review your requirements and provide an architectural roadmap in 48 hours.",
  primaryCtaText = "Start Your Project",
  primaryCtaLink = "/contact"
}) => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-b from-[#161a26] to-[#0d0f15] border border-[#d4af37]/40 p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl shadow-black">
          {/* Ambient gold glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-[#d4af37]"></span>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#d4af37]">
                Initiate Collaboration
              </span>
              <span className="h-px w-6 bg-[#d4af37]"></span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              {title} <span className="text-gold-gradient block sm:inline">{highlight}</span>
            </h2>

            <p className="text-base sm:text-lg text-[#a9b2c3] leading-relaxed font-light mb-10 max-w-2xl mx-auto">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={primaryCtaLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] hover:from-[#f3df9f] hover:to-[#be9128] rounded-md shadow-xl shadow-[#d4af37]/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{primaryCtaText}</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>

              <Link
                to="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-[#d4af37]" />
                <span>Explore Client Work</span>
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#8f96a6]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                Strict Non-Disclosure Guarantee
              </span>
              <span className="hidden sm:inline">·</span>
              <span>48-Hour Architectural Response</span>
              <span className="hidden sm:inline">·</span>
              <span>Senior Partner Direct Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

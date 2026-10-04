import React from 'react';
import { SectionHeading } from './SectionHeading';
import { HomepageSettings } from '../types';

interface WorkProcessProps {
  process: HomepageSettings['workProcess'];
}

export const WorkProcess: React.FC<WorkProcessProps> = ({ process }) => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#0e1017]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Precision Engineering Protocol"
          title="Our Proven 6-Step"
          highlight="Execution Process"
          subtitle="How we de-risk digital product development and consistently engineer world-class outcomes on predictable timelines."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {process.map((step, idx) => (
            <div
              key={step.step}
              className="group relative bg-[#12141c] border border-[#d4af37]/15 hover:border-[#d4af37]/50 rounded-lg p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-3xl font-extrabold text-[#d4af37]/40 group-hover:text-[#d4af37] transition-colors">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#1c202d] border border-[#d4af37]/20 flex items-center justify-center text-xs font-mono text-[#8f96a6]">
                    0{idx + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-gradient transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-[#9da5b4] leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                <span className="text-[11px] uppercase tracking-wider text-[#6e7687] font-mono">
                  Milestone Phase
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

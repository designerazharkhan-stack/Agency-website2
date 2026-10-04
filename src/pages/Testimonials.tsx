import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { TestimonialCard } from '../components/TestimonialCard';
import { LoadingState } from '../components/LoadingState';
import { CTASection } from '../components/CTASection';
import { getTestimonials } from '../services/db';
import { Testimonial } from '../types';
import { Award, Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error('Error loading testimonials:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <LoadingState fullScreen message="Loading partner testimonials..." />;
  }

  const spotlight = testimonials[0];

  return (
    <div className="pt-28 pb-16 min-h-screen">
      {/* Header */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-[#d4af37]/15 bg-[#0e1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#d4af37]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#d4af37]">
              Verified Partner Feedback
            </span>
            <span className="h-px w-6 bg-[#d4af37]"></span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Reputation Forged by <span className="text-gold-gradient">Results.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9da5b4] max-w-2xl mx-auto font-light leading-relaxed">
            Read direct commentary from the managing partners, chief technology officers, and founders who trust us to engineer their digital flagships.
          </p>
        </div>
      </section>

      {/* Featured Spotlight Quote */}
      {spotlight && (
        <section className="py-16 bg-[#0b0c10] border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#161a26] to-[#0e1017] border border-[#d4af37]/35 shadow-2xl relative overflow-hidden">
              <Quote className="absolute top-8 right-8 w-24 h-24 text-[#d4af37]/10 pointer-events-none" />

              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>

              <blockquote className="text-xl sm:text-2xl text-white font-light italic leading-relaxed mb-8">
                "{spotlight.testimonial}"
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  src={spotlight.avatar}
                  alt={spotlight.clientName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#d4af37] shadow-md"
                />
                <div>
                  <h4 className="text-base font-bold text-white tracking-wide">
                    {spotlight.clientName}
                  </h4>
                  <p className="text-xs text-[#8f96a6]">
                    {spotlight.position}, <span className="text-[#d4af37] font-semibold">{spotlight.company}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Grid */}
      <section className="py-20 bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="All Client Reviews"
            title="Voices of"
            highlight="Confidence"
            subtitle="Unfiltered reviews from our active roster of global brand partners."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Join Our"
        highlight="Client Success Stories?"
        subtitle="Schedule a consultation with our directors today. Let's discuss how we can engineer similar transformative outcomes for your brand."
      />
    </div>
  );
};

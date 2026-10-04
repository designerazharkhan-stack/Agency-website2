import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="relative bg-[#12141c] border border-[#d4af37]/15 hover:border-[#d4af37]/50 rounded-lg p-7 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg shadow-black/40">
      <div className="absolute top-6 right-6 text-[#d4af37]/20 pointer-events-none">
        <Quote className="w-10 h-10" />
      </div>

      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? 'fill-[#d4af37] text-[#d4af37]'
                  : 'text-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Testimonial Quote */}
        <p className="text-sm md:text-base text-[#c7ccd9] leading-relaxed mb-6 font-light italic">
          "{testimonial.testimonial}"
        </p>
      </div>

      {/* Client Profile */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
        <img
          src={testimonial.avatar}
          alt={testimonial.clientName}
          className="w-11 h-11 rounded-full object-cover border-2 border-[#d4af37]/40 shadow-sm"
        />
        <div>
          <h4 className="text-sm font-bold text-white tracking-wide">
            {testimonial.clientName}
          </h4>
          <p className="text-xs text-[#8f96a6]">
            {testimonial.position}, <span className="text-[#d4af37]">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

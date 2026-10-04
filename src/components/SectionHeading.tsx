import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  centered = true,
  className = ''
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-3.5 ${centered ? 'justify-center' : 'justify-start'}`}>
          <span className="h-px w-6 bg-[#d4af37]"></span>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#d4af37]">
            {eyebrow}
          </span>
          <span className="h-px w-6 bg-[#d4af37]"></span>
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
        {title}{' '}
        {highlight && (
          <span className="text-gold-gradient block sm:inline">{highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-[#9da5b4] leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};

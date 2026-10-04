import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import { Shield, Sparkles, Target, Compass, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const About: React.FC = () => {
  const { siteSettings, homepageSettings } = useSite();

  const values = [
    {
      title: "Unyielding Standard of Craft",
      description: "We treat code, typography, and UX interaction as fine art. We never cut corners or accept mediocrity.",
      icon: Sparkles
    },
    {
      title: "Commercial Alignment",
      description: "Beauty without commercial traction is meaningless. Every design choice is calibrated to increase conversion velocity and customer lifetime value.",
      icon: Target
    },
    {
      title: "Radical Transparency",
      description: "No hidden layers of junior contractors. You communicate directly with the senior engineering and design directors executing your codebase.",
      icon: Compass
    },
    {
      title: "Zero Technical Debt",
      description: "We architect clean, strictly-typed systems designed to withstand multi-year scale without requiring painful rewrites.",
      icon: Shield
    }
  ];

  const disciplines = [
    { name: "Frontend Engineering", spec: "React, Next.js, TypeScript, Vite, Tailwind CSS, WebGL" },
    { name: "Backend & Cloud Architecture", spec: "Node.js, PostgreSQL, Firebase, Cloudflare, Serverless" },
    { name: "UI/UX & Design Systems", spec: "Figma Tokens, Design Architecture, Micro-Interactions" },
    { name: "Organic Search & Technical SEO", spec: "Schema.org, JSON-LD, Core Web Vitals, Crawl Architecture" },
    { name: "E-Commerce Optimization", spec: "Custom Checkout Funnels, Headless Commerce, Stripe" },
    { name: "Enterprise WordPress", spec: "Custom Gutenberg Blocks, ACF Pro, Decoupled JAMstack" }
  ];

  return (
    <div className="pt-28 pb-16 min-h-screen">
      {/* Hero Header */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-[#d4af37]/15 bg-[#0e1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#d4af37]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#d4af37]">
              Our Ethos & Heritage
            </span>
            <span className="h-px w-6 bg-[#d4af37]"></span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            We Build Digital Flagships For Those Who Refuse to{' '}
            <span className="text-gold-gradient">Blend In.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9da5b4] max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Founded in {siteSettings.foundedYear}, {siteSettings.agencyName} was born from a singular conviction: that modern digital products should marry aesthetic grandeur with uncompromising technical velocity.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <div className="bg-[#12141c] border border-[#d4af37]/20 rounded-xl p-8 lg:p-10 relative overflow-hidden">
              <div className="w-10 h-10 rounded bg-[#1c202d] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-6">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-sm text-[#9da5b4] leading-relaxed font-light mb-6">
                To liberate high-growth brands and enterprise pioneers from generic digital templates by delivering bespoke, high-performance web applications that convert attention into enduring enterprise equity.
              </p>
              <ul className="space-y-2.5 text-xs text-[#c7ccd9]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Sub-second page rendering on every global edge network</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Distinguished typography and bespoke art direction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Measurable, conversion-driven architecture</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-[#12141c] border border-[#d4af37]/20 rounded-xl p-8 lg:p-10 relative overflow-hidden">
              <div className="w-10 h-10 rounded bg-[#1c202d] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-6">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-sm text-[#9da5b4] leading-relaxed font-light mb-6">
                A digital landscape where every brand's online presence reflects the true caliber of their physical craft—devoid of algorithmic monotony, bloated dependencies, and fragile architectures.
              </p>
              <ul className="space-y-2.5 text-xs text-[#c7ccd9]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Clean codebases that scale across decades</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Absolute compliance with WCAG AA accessibility standards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Client-first autonomy with painless CMS control</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#0e1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Operating Principles"
            title="The Values That"
            highlight="Guide Our Code"
            subtitle="How we make decisions every single day across client codebases, user experiences, and client communication."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-[#12141c] border border-[#d4af37]/15 hover:border-[#d4af37]/45 rounded-lg p-7 transition-all duration-300 hover:-translate-y-1 shadow-md shadow-black/40"
                >
                  <div className="w-10 h-10 rounded bg-[#1a1e2b] border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{val.title}</h3>
                  <p className="text-xs text-[#8f96a6] leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engineering Disciplines & Skills */}
      <section className="py-20 bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Mastery of Stack"
            title="Technical & Creative"
            highlight="Disciplines"
            subtitle="We do not dabble. Our senior engineers and design leads maintain world-class proficiency across these core modern technologies."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map((item, idx) => (
              <div
                key={item.name}
                className="p-6 rounded-lg bg-[#12141c] border border-white/5 hover:border-[#d4af37]/40 transition-colors"
              >
                <span className="font-mono text-xs text-[#d4af37] block mb-2">0{idx + 1}</span>
                <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                <p className="text-xs text-[#8f96a6] font-mono leading-relaxed">
                  {item.spec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="py-16 bg-[#0e1017] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {homepageSettings.stats.map((stat) => (
              <div key={stat.id}>
                <div className="text-3xl sm:text-5xl font-extrabold text-white font-mono mb-1">
                  {stat.value}
                  <span className="text-[#d4af37]">{stat.suffix}</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-[#8f96a6] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Ready to Partner With"
        highlight="Our Senior Team?"
        subtitle="Let's discuss your timeline, technical architecture, and business objectives. We'll outline your options in our introductory consultation."
      />
    </div>
  );
};

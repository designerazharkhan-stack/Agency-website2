import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Layers,
  Palette,
  Search,
  ShoppingBag,
  Wrench,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, LucideIcon> = {
  Code,
  Layers,
  Palette,
  Search,
  ShoppingBag,
  Wrench,
  Sparkles
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Code;

  return (
    <div className="group relative bg-[#12141c] hover:bg-[#161924] border border-[#d4af37]/15 hover:border-[#d4af37]/50 rounded-lg p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-[#d4af37]/10">
      {/* Subtle gold ambient glow on card hover */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#d4af37]/5 group-hover:bg-[#d4af37]/15 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

      <div>
        {/* Icon & Order */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded bg-[#1c202d] border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-colors duration-300 shadow-md">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="font-mono text-xs text-[#6e7687] group-hover:text-[#d4af37] transition-colors">
            0{service.order}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-gradient transition-colors">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-[#9da5b4] leading-relaxed mb-6 font-light">
          {service.shortDescription}
        </p>

        {/* Features Checklist */}
        <ul className="space-y-2.5 mb-8 text-xs text-[#b8bfce]">
          {service.features.slice(0, 4).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA link */}
      <div className="pt-5 border-t border-white/5 flex items-center justify-between">
        <Link
          to={`/services#${service.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors group/link"
        >
          <span>Explore Capabilities</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

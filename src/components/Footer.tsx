import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Dribbble,
  MessageCircle
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const Footer: React.FC = () => {
  const { siteSettings } = useSite();
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Web Development', path: '/services#web-development' },
    { name: 'WordPress Development', path: '/services#wordpress-development' },
    { name: 'UI/UX Design', path: '/services#ui-ux-design' },
    { name: 'SEO & Growth', path: '/services#seo' },
    { name: 'E-commerce Platforms', path: '/services#ecommerce' },
    { name: 'Website Maintenance', path: '/services#website-maintenance' }
  ];

  const quickLinks = [
    { name: 'About Agency', path: '/about' },
    { name: 'Featured Portfolio', path: '/portfolio' },
    { name: 'Insights & Blog', path: '/blog' },
    { name: 'Investment & Pricing', path: '/pricing' },
    { name: 'Client Testimonials', path: '/testimonials' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <footer className="bg-[#07080b] border-t border-[#d4af37]/15 relative overflow-hidden text-[#9da5b4]">
      {/* Subtle background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#d4af37]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/5">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col justify-between pr-0 lg:pr-6">
            <div>
              <Link to="/" className="inline-flex items-center gap-2.5 mb-5 group">
                <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#d4af37] via-[#aa8022] to-[#60490b] flex items-center justify-center shadow-md shadow-[#d4af37]/20">
                  <span className="font-display font-black text-black text-base">
                    {siteSettings.agencyName.charAt(0) || 'A'}
                  </span>
                </div>
                <span className="font-display text-xl font-bold tracking-wider text-white group-hover:text-gold-gradient transition-colors">
                  {siteSettings.agencyName}
                </span>
              </Link>

              <p className="text-sm leading-relaxed text-[#8f96a6] mb-6 max-w-sm">
                {siteSettings.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                {siteSettings.socialLinks.twitter && (
                  <a
                    href={siteSettings.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#d4af37]/20 text-[#c7ccd9] hover:text-[#d4af37] border border-white/10 hover:border-[#d4af37]/40 flex items-center justify-center transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {siteSettings.socialLinks.linkedin && (
                  <a
                    href={siteSettings.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#d4af37]/20 text-[#c7ccd9] hover:text-[#d4af37] border border-white/10 hover:border-[#d4af37]/40 flex items-center justify-center transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {siteSettings.socialLinks.github && (
                  <a
                    href={siteSettings.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#d4af37]/20 text-[#c7ccd9] hover:text-[#d4af37] border border-white/10 hover:border-[#d4af37]/40 flex items-center justify-center transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {siteSettings.socialLinks.instagram && (
                  <a
                    href={siteSettings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#d4af37]/20 text-[#c7ccd9] hover:text-[#d4af37] border border-white/10 hover:border-[#d4af37]/40 flex items-center justify-center transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {siteSettings.socialLinks.dribbble && (
                  <a
                    href={siteSettings.socialLinks.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#d4af37]/20 text-[#c7ccd9] hover:text-[#d4af37] border border-white/10 hover:border-[#d4af37]/40 flex items-center justify-center transition-all duration-300"
                    aria-label="Dribbble"
                  >
                    <Dribbble className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8 text-xs text-[#5d6475]">
              Established in {siteSettings.foundedYear}. Engineered for excellence.
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-display text-white text-sm font-semibold tracking-wider uppercase mb-5">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#9da5b4] hover:text-[#d4af37] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Directory */}
          <div>
            <h3 className="font-display text-white text-sm font-semibold tracking-wider uppercase mb-5">
              Capabilities
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-[#9da5b4] hover:text-[#d4af37] transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h3 className="font-display text-white text-sm font-semibold tracking-wider uppercase mb-5">
              Headquarters
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-[#9da5b4] text-xs leading-relaxed">
                  {siteSettings.address},<br />{siteSettings.cityCountry}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="text-[#9da5b4] hover:text-[#d4af37] text-xs transition-colors"
                >
                  {siteSettings.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a
                  href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-[#9da5b4] hover:text-[#d4af37] text-xs transition-colors"
                >
                  {siteSettings.phone}
                </a>
              </div>

              {siteSettings.whatsapp && (
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <a
                    href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9da5b4] hover:text-[#d4af37] text-xs transition-colors flex items-center gap-1"
                  >
                    <span>Direct WhatsApp</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e7687]">
          <p>© {currentYear} {siteSettings.agencyName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-[#d4af37] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#d4af37] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/admin" className="hover:text-[#d4af37] transition-colors opacity-70 hover:opacity-100">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

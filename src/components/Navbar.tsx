import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { siteSettings } = useSite();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#d4af37]/15 py-3.5 shadow-2xl shadow-black/50'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]">
              {siteSettings.logoUrl ? (
                <img
                  src={siteSettings.logoUrl}
                  alt={siteSettings.agencyName}
                  className="h-9 w-auto object-contain"
                />
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-[#d4af37] via-[#aa8022] to-[#60490b] flex items-center justify-center shadow-lg shadow-[#d4af37]/20 group-hover:scale-105 transition-transform duration-300">
                    <span className="font-display font-black text-black text-lg tracking-wider">
                      {siteSettings.agencyName.charAt(0) || 'A'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-lg font-bold tracking-wider text-white group-hover:text-gold-gradient transition-colors">
                      {siteSettings.agencyName}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/80 font-medium -mt-1">
                      Digital Studio
                    </span>
                  </div>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] ${
                    isActive(link.path)
                      ? 'text-[#d4af37]'
                      : 'text-[#c7ccd9] hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA & Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {user && (
                <Link
                  to="/admin/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 rounded hover:bg-[#d4af37]/20 transition-colors"
                  title="Admin Dashboard"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </Link>
              )}

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] hover:from-[#f3df9f] hover:to-[#be9128] rounded shadow-lg shadow-[#d4af37]/20 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#c7ccd9] hover:text-white hover:bg-white/5 rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Content */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-[#0f1118] border-l border-[#d4af37]/20 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="font-display font-bold text-lg text-white">
              {siteSettings.agencyName}
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white rounded"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5 mt-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#d4af37]/15 text-[#d4af37] font-semibold border-l-2 border-[#d4af37]'
                    : 'text-[#c7ccd9] hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/admin/dashboard"
                className="px-4 py-3 rounded text-base font-semibold text-[#d4af37] bg-[#d4af37]/10 flex items-center gap-2 mt-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
          <Link
            to="/contact"
            className="w-full text-center py-3 px-4 rounded font-semibold text-black bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] shadow-md shadow-[#d4af37]/20"
          >
            Start Your Project
          </Link>
          <div className="text-center text-xs text-[#7d8597]">
            {siteSettings.email}
          </div>
        </div>
      </aside>
    </>
  );
};

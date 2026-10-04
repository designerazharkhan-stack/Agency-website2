import React from 'react';
import { Menu, Database, Shield, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobile: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  onOpenMobile
}) => {
  const { isFirebase, user } = useAuth();

  return (
    <header className="h-16 bg-[#0e1017] border-b border-[#d4af37]/20 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="p-1.5 text-gray-400 hover:text-white rounded lg:hidden"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base font-bold text-white tracking-wide">{title}</h1>
          {subtitle && (
            <p className="text-[11px] text-[#8f96a6] font-light hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Firebase status pill */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono border ${
            isFirebase
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
              : 'bg-amber-950/40 text-amber-300 border-amber-500/30'
          }`}
          title={
            isFirebase
              ? 'Connected to Firebase Firestore & Authentication'
              : 'Running in Local Storage mode with seed data. Fill .env to connect to Firebase.'
          }
        >
          <Database className="w-3 h-3" />
          <span className="hidden sm:inline">
            {isFirebase ? 'Firebase Synced' : 'Local Storage Mode'}
          </span>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-[#8f96a6] hover:text-[#d4af37] rounded hover:bg-white/5 transition-colors hidden sm:flex items-center gap-1 text-xs"
          title="Open live site"
        >
          <Globe className="w-4 h-4" />
        </a>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-7 h-7 rounded-full bg-[#1e2332] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs text-white font-medium hidden md:inline">
            {user?.displayName || 'Admin'}
          </span>
        </div>
      </div>
    </header>
  );
};

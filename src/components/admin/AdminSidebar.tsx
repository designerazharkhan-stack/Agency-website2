import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Home,
  Briefcase,
  FolderKanban,
  FileText,
  MessageSquareQuote,
  CreditCard,
  Inbox,
  Search,
  ExternalLink,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';

interface AdminSidebarProps {
  unreadCount?: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  unreadCount = 0,
  mobileOpen,
  onCloseMobile
}) => {
  const { logout, user } = useAuth();
  const { siteSettings } = useSite();

  const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Site Settings', path: '/admin/dashboard/site-settings', icon: Settings },
    { label: 'Homepage', path: '/admin/dashboard/homepage', icon: Home },
    { label: 'Services', path: '/admin/dashboard/services', icon: Briefcase },
    { label: 'Portfolio', path: '/admin/dashboard/portfolio', icon: FolderKanban },
    { label: 'Blog Articles', path: '/admin/dashboard/blog', icon: FileText },
    { label: 'Testimonials', path: '/admin/dashboard/testimonials', icon: MessageSquareQuote },
    { label: 'Pricing Plans', path: '/admin/dashboard/pricing', icon: CreditCard },
    {
      label: 'Inbox / Messages',
      path: '/admin/dashboard/messages',
      icon: Inbox,
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    { label: 'SEO Metadata', path: '/admin/dashboard/seo', icon: Search }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0e1017] border-r border-[#d4af37]/20 flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Header */}
          <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-gradient-to-br from-[#d4af37] to-[#806010] flex items-center justify-center font-display font-black text-black text-sm">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold text-white tracking-wider">
                  {siteSettings.agencyName}
                </span>
                <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase">
                  Control Room
                </span>
              </div>
            </div>
            <button
              onClick={onCloseMobile}
              className="p-1 text-gray-400 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#d4af37]/15 text-[#d4af37] font-semibold border-l-2 border-[#d4af37]'
                        : 'text-[#8f96a6] hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#d4af37] text-black font-mono">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-white/10 space-y-1 bg-[#0b0c10]/50">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#8f96a6] hover:text-white rounded hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-[#d4af37]" />
            <span>View Live Website</span>
          </a>

          <div className="px-3 py-2 text-[11px] text-[#6e7687] flex items-center justify-between border-t border-white/5 pt-3">
            <span className="truncate max-w-[140px] text-white font-medium">
              {user?.email}
            </span>
            <button
              onClick={() => logout()}
              className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

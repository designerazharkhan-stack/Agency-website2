import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  FileText,
  Briefcase,
  MessageSquareQuote,
  Inbox,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Database,
  CheckCircle2,
  Clock
} from 'lucide-react';
import {
  getProjects,
  getBlogPosts,
  getServices,
  getTestimonials,
  getContactMessages,
  resetToSeedData
} from '../../services/db';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';
import { LoadingState } from '../../components/LoadingState';

export const AdminDashboardOverview: React.FC = () => {
  const { isFirebase, user } = useAuth();
  const { refreshSiteData } = useSite();
  const [stats, setStats] = useState({
    projects: 0,
    posts: 0,
    services: 0,
    testimonials: 0,
    messages: 0,
    unreadMessages: 0
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  const loadMetrics = async () => {
    try {
      const [prj, blg, srv, tst, msg] = await Promise.all([
        getProjects(true),
        getBlogPosts(true),
        getServices(true),
        getTestimonials(true),
        getContactMessages()
      ]);

      setStats({
        projects: prj.length,
        posts: blg.length,
        services: srv.length,
        testimonials: tst.length,
        messages: msg.length,
        unreadMessages: msg.filter((m) => !m.read).length
      });
      setRecentMessages(msg.slice(0, 3));
    } catch (e) {
      console.error('Error loading dashboard metrics:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  const handleResetData = () => {
    if (window.confirm('Reset all demo data (Services, Projects, Blog, Testimonials, Settings) to initial production presets?')) {
      setResetting(true);
      resetToSeedData();
      refreshSiteData();
      loadMetrics();
      setTimeout(() => setResetting(false), 500);
    }
  };

  if (loading) {
    return <LoadingState message="Loading administrative metrics..." />;
  }

  const cards = [
    { label: 'Active Projects', count: stats.projects, link: '/admin/dashboard/portfolio', icon: FolderKanban },
    { label: 'Published Articles', count: stats.posts, link: '/admin/dashboard/blog', icon: FileText },
    { label: 'Service Practices', count: stats.services, link: '/admin/dashboard/services', icon: Briefcase },
    { label: 'Verified Reviews', count: stats.testimonials, link: '/admin/dashboard/testimonials', icon: MessageSquareQuote },
    {
      label: 'Client Inquiries',
      count: stats.messages,
      subCount: stats.unreadMessages > 0 ? `${stats.unreadMessages} new` : undefined,
      link: '/admin/dashboard/messages',
      icon: Inbox
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#12141c] via-[#171a25] to-[#12141c] border border-[#d4af37]/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
            Administrative Session Active
          </span>
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome back, {user?.displayName || 'Administrator'}
          </h2>
          <p className="text-xs text-[#8f96a6] font-light max-w-xl">
            From this command center, you have full control over the website's content, case studies, journal articles, service offerings, and inbound client briefs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/dashboard/portfolio"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] hover:from-[#f3df9f] text-black text-xs font-bold rounded shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>
          <Link
            to="/admin/dashboard/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#181b26] border border-white/10 hover:border-[#d4af37]/40 text-white text-xs font-medium rounded"
          >
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              to={c.link}
              className="p-5 rounded-xl bg-[#12141c] border border-[#d4af37]/15 hover:border-[#d4af37]/50 transition-all hover:-translate-y-0.5 group shadow-lg"
            >
              <div className="flex items-center justify-between text-[#8f96a6] group-hover:text-[#d4af37] mb-3">
                <Icon className="w-5 h-5" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono mb-1">
                {c.count}
              </div>
              <div className="text-xs text-[#8f96a6] flex items-center justify-between">
                <span>{c.label}</span>
                {c.subCount && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#d4af37] text-black font-bold">
                    {c.subCount}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Inbound Inquiries & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 bg-[#12141c] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <h3 className="font-display text-base font-bold text-white">
              Recent Client Discovery Inquiries
            </h3>
            <Link
              to="/admin/dashboard/messages"
              className="text-xs text-[#d4af37] hover:underline"
            >
              View All ({stats.messages}) &rarr;
            </Link>
          </div>

          {recentMessages.length > 0 ? (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    msg.read
                      ? 'bg-[#0e1017] border-white/5'
                      : 'bg-[#181b26] border-[#d4af37]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{msg.name}</span>
                    <span className="text-[10px] text-[#6e7687] font-mono">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#d4af37] mb-2 font-mono">
                    <span>{msg.service}</span>
                    <span>·</span>
                    <span>{msg.budget}</span>
                  </div>
                  <p className="text-xs text-[#8f96a6] line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-[#6e7687]">
              No contact inquiries submitted yet.
            </div>
          )}
        </div>

        {/* System & Architecture Diagnostics */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6">
            <h3 className="font-display text-base font-bold text-white mb-4">
              Infrastructure Status
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0e1017] border border-white/5">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-[#c7ccd9]">Firestore Database</span>
                </div>
                <span className={`font-mono text-[11px] ${isFirebase ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isFirebase ? 'Online' : 'Local Storage Mode'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0e1017] border border-white/5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-[#c7ccd9]">Admin Authentication</span>
                </div>
                <span className={`font-mono text-[11px] ${isFirebase ? 'text-emerald-400' : 'text-emerald-400'}`}>
                  {isFirebase ? 'Firebase Auth' : 'Active Session'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0e1017] border border-white/5">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-[#c7ccd9]">Asset Storage Engine</span>
                </div>
                <span className={`font-mono text-[11px] ${isFirebase ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isFirebase ? 'Firebase Storage' : 'DataURI / URL'}
                </span>
              </div>
            </div>

            {/* Test Helper: Reset Seed Data */}
            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-white block font-medium">Demo Reset</span>
                <span className="text-[10px] text-[#6e7687]">Re-seed default agency content</span>
              </div>
              <button
                type="button"
                onClick={handleResetData}
                disabled={resetting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[#8f96a6] hover:text-white rounded text-xs transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

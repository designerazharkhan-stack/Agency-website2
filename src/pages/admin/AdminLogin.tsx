import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Database, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';

export const AdminLogin: React.FC = () => {
  const { login, isFirebase } = useAuth();
  const { siteSettings } = useSite();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@agency.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0b0c10] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Brand identity header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#d4af37] via-[#aa8022] to-[#60490b] flex items-center justify-center shadow-lg shadow-[#d4af37]/20">
              <span className="font-display font-black text-black text-xl">
                {siteSettings.agencyName.charAt(0) || 'A'}
              </span>
            </div>
            <span className="font-display text-2xl font-bold tracking-wider text-white">
              {siteSettings.agencyName}
            </span>
          </Link>

          <h2 className="text-xl font-bold text-white tracking-wide">
            Administrative Portal
          </h2>
          <p className="text-xs text-[#8f96a6] mt-1">
            Restricted security console for site directors and editors
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#12141c] border border-[#d4af37]/30 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-3.5 bg-red-950/40 border border-red-500/40 rounded-lg text-xs text-red-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8f96a6]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@agency.com"
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-[#545b6d] focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                  Secure Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8f96a6]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-[#545b6d] focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#edd382] via-[#d4af37] to-[#aa8022] hover:from-[#f3df9f] hover:to-[#be9128] text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 transition-all disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Verifying Authentication...</span>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#181b26] border border-white/5 text-xs">
              <div className="text-left">
                <span className="text-white font-medium block">Evaluation Account</span>
                <span className="text-[#8f96a6] text-[11px]">admin@agency.com / admin123</span>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] rounded text-[11px] font-semibold transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto-Fill</span>
              </button>
            </div>
          </div>
        </div>

        {/* Backend status footnote */}
        <div className="mt-6 text-center text-xs text-[#6e7687] flex items-center justify-center gap-2">
          <Database className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>
            {isFirebase
              ? 'Firebase Authentication Active'
              : 'Development Sandbox Mode (Local Session Support)'}
          </span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-[#0b0c10]">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-[#181b26] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto mb-6">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <span className="font-mono text-5xl font-extrabold text-gold-gradient block mb-2">
          404
        </span>

        <h1 className="text-2xl font-bold text-white mb-3">
          Uncharted Coordinate
        </h1>

        <p className="text-sm text-[#8f96a6] font-light mb-8 leading-relaxed">
          The requested architectural pathway does not exist or has been relocated to another edge sector.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d4af37] text-black font-semibold text-xs rounded hover:bg-[#edd382] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Flagship</span>
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white font-semibold text-xs rounded hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Works</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

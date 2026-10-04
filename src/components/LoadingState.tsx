import React from 'react';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading architectural assets...",
  fullScreen = false
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 ${
        fullScreen ? 'min-h-[70vh]' : 'min-h-[300px]'
      }`}
    >
      <div className="relative w-16 h-16 mb-4">
        {/* Outer spinner */}
        <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/20 border-t-[#d4af37] animate-spin" />
        {/* Inner pulsing jewel */}
        <div className="absolute inset-3 rounded-full bg-[#d4af37]/20 animate-pulse" />
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-[#8f96a6]">{message}</p>
    </div>
  );
};

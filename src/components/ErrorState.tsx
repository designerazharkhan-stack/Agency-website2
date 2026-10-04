import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "System Anomaly Encountered",
  message,
  onRetry
}) => {
  return (
    <div className="text-center py-16 px-6 bg-red-950/20 border border-red-500/30 rounded-xl max-w-lg mx-auto my-8">
      <div className="w-12 h-12 rounded-full bg-red-900/30 border border-red-500/40 flex items-center justify-center text-red-400 mx-auto mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-red-200/80 font-light max-w-sm mx-auto mb-6">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-xs uppercase tracking-wider font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Operation</span>
        </button>
      )}
    </div>
  );
};

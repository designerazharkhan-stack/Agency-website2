import React from 'react';
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <div className="text-center py-16 px-6 bg-[#12141c] border border-dashed border-[#d4af37]/20 rounded-xl max-w-lg mx-auto my-8">
      <div className="w-12 h-12 rounded-full bg-[#1c202d] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto mb-4">
        <FolderOpen className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#8f96a6] font-light max-w-sm mx-auto mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded text-xs uppercase tracking-wider font-semibold bg-[#d4af37] text-black hover:bg-[#edd382] transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

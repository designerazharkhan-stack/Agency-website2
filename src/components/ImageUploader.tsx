import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { uploadImage } from '../services/storage';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  folder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = "Featured Image",
  helperText = "Upload high-res PNG/JPG or provide an image URL",
  folder = "uploads"
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (PNG, JPG, WebP, SVG)');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      const uploadedUrl = await uploadImage(file, folder);
      onChange(uploadedUrl);
      setUrlInput(uploadedUrl);
    } catch (err: any) {
      setError(err?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-[#181b26] p-0.5 rounded text-[11px] border border-white/5">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === 'upload' ? 'bg-[#d4af37] text-black font-semibold' : 'text-[#8f96a6] hover:text-white'
            }`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === 'url' ? 'bg-[#d4af37] text-black font-semibold' : 'text-[#8f96a6] hover:text-white'
            }`}
          >
            URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="relative">
          <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-[#12141c] border-2 border-dashed border-white/10 rounded-lg hover:border-[#d4af37]/50 cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <div className="flex items-center gap-2 text-xs text-[#d4af37]">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing & uploading image...</span>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-[#d4af37] mb-2" />
                  <p className="text-xs text-white">
                    <span className="font-semibold text-[#d4af37]">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-[10px] text-[#6e7687] mt-1">{helperText}</p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              disabled={isUploading}
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : (
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8f96a6]" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#12141c] border border-white/10 rounded px-3 py-2 pl-9 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 bg-[#d4af37] text-black text-xs font-semibold rounded hover:bg-[#edd382]"
          >
            Apply
          </button>
        </form>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      {/* Image Preview */}
      {value && (
        <div className="relative mt-3 inline-block rounded-lg overflow-hidden border border-[#d4af37]/30 bg-[#0b0c10]">
          <img
            src={value}
            alt="Preview"
            className="h-28 w-auto max-w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/12141c/d4af37?text=Image+Load+Error';
            }}
          />
          <button
            type="button"
            onClick={() => {
              onChange('');
              setUrlInput('');
            }}
            className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-red-600 text-white rounded-full transition-colors"
            title="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

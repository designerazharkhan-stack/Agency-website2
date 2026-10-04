import React, { useState } from 'react';
import { Bold, Italic, Heading2, Heading3, List, Quote, Code, Eye, Edit3 } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label = "Article Content",
  placeholder = "Write in Markdown or rich text..."
}) => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const insertFormat = (before: string, after = '') => {
    const textarea = document.getElementById('rich-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const replacement = `${before}${selected || 'text'}${after}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + replacement.length - after.length);
    }, 10);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-[#181b26] p-0.5 rounded text-xs border border-white/5">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              activeTab === 'write' ? 'bg-[#d4af37] text-black font-semibold' : 'text-[#8f96a6] hover:text-white'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              activeTab === 'preview' ? 'bg-[#d4af37] text-black font-semibold' : 'text-[#8f96a6] hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-[#12141c] overflow-hidden focus-within:border-[#d4af37]">
        {/* Formatting Toolbar */}
        {activeTab === 'write' && (
          <div className="flex flex-wrap items-center gap-1 p-2 bg-[#181b26] border-b border-white/5 text-[#8f96a6]">
            <button
              type="button"
              onClick={() => insertFormat('**', '**')}
              className="p-1.5 rounded hover:bg-white/5 hover:text-white"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('*', '*')}
              className="p-1.5 rounded hover:bg-white/5 hover:text-white"
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <span className="w-px h-4 bg-white/10 mx-1" />
            <button
              type="button"
              onClick={() => insertFormat('\n## ', '\n')}
              className="p-1.5 rounded hover:bg-white/5 hover:text-white"
              title="Heading 2"
            >
              <Heading2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('\n### ', '\n')}
              className="p-1.5 rounded hover:bg-white/5 hover:text-white"
              title="Heading 3"
            >
              <Heading3 className="w-3.5 h-3.5" />
            </button>
            <span className="w-px h-4 bg-white/10 mx-1" />
            <button
              type="button"
              onClick={() => insertFormat('\n- ')}
              className="p-1.5 rounded hover:bg-white/5 hover:text-white"
              title="Bullet List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('\n> ')}
              className="p-1.5 rounded hover:bg-white/5 hover:text-white"
              title="Blockquote"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('\n```typescript\n', '\n```\n')}
              className="p-1.5 rounded hover:bg-white/5 hover:text-white"
              title="Code Block"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Editor Body */}
        {activeTab === 'write' ? (
          <textarea
            id="rich-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={12}
            placeholder={placeholder}
            className="w-full bg-transparent p-4 text-xs font-mono text-[#c7ccd9] focus:outline-none resize-y leading-relaxed"
          />
        ) : (
          <div className="p-6 prose prose-invert max-w-none text-xs leading-relaxed text-[#c7ccd9] min-h-[300px] overflow-y-auto whitespace-pre-wrap">
            {value ? (
              value
            ) : (
              <span className="text-[#646c7d] italic">No content to preview yet.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

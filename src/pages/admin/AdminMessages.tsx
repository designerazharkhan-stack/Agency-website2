import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Trash2, CheckCircle, Clock, Eye, X, Reply } from 'lucide-react';
import { AdminTable } from '../../components/admin/AdminTable';
import { LoadingState } from '../../components/LoadingState';
import { getContactMessages, markMessageRead, deleteContactMessage } from '../../services/db';
import { ContactMessage } from '../../types';

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);

  const loadData = async () => {
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (e) {
      console.error('Error fetching messages:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenMessage = async (msg: ContactMessage) => {
    setActiveMessage(msg);
    if (!msg.read) {
      await markMessageRead(msg.id, true);
      loadData();
    }
  };

  const handleToggleRead = async (msg: ContactMessage) => {
    await markMessageRead(msg.id, !msg.read);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this message permanently?')) {
      await deleteContactMessage(id);
      if (activeMessage?.id === id) setActiveMessage(null);
      loadData();
    }
  };

  if (loading) {
    return <LoadingState message="Loading client inbox..." />;
  }

  const columns = [
    {
      header: 'Sender / Company',
      render: (m: ContactMessage) => (
        <div>
          <span className="font-bold text-white block">{m.name}</span>
          <span className="text-[11px] text-[#6e7687]">{m.email}</span>
        </div>
      )
    },
    {
      header: 'Service Practice',
      render: (m: ContactMessage) => (
        <span className="text-xs text-[#c7ccd9] font-mono">{m.service}</span>
      )
    },
    {
      header: 'Budget Range',
      render: (m: ContactMessage) => (
        <span className="text-xs text-[#d4af37] font-mono">{m.budget}</span>
      )
    },
    {
      header: 'Date Logged',
      render: (m: ContactMessage) => (
        <span className="text-[11px] text-[#8f96a6] font-mono">
          {new Date(m.createdAt).toLocaleDateString()}
        </span>
      )
    },
    {
      header: 'Read Status',
      render: (m: ContactMessage) => (
        <button
          onClick={() => handleToggleRead(m)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
            m.read
              ? 'bg-zinc-800/60 text-zinc-400 border border-zinc-700/50'
              : 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 font-bold'
          }`}
        >
          {m.read ? <CheckCircle className="w-3 h-3 text-zinc-400" /> : <Clock className="w-3 h-3 text-[#d4af37]" />}
          <span>{m.read ? 'Reviewed' : 'Unread'}</span>
        </button>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (m: ContactMessage) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleOpenMessage(m)}
            className="p-1.5 rounded hover:bg-white/10 text-[#8f96a6] hover:text-[#d4af37]"
            title="Inspect Inquiry"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(m.id)}
            className="p-1.5 rounded hover:bg-red-500/10 text-[#8f96a6] hover:text-red-400"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Client Discovery Inbound Queue</h2>
        <p className="text-xs text-[#8f96a6]">
          Direct inquiries submitted through the public website's confidential discovery form.
        </p>
      </div>

      <AdminTable
        data={messages}
        columns={columns}
        keyExtractor={(m) => m.id}
        searchPlaceholder="Filter messages by name or email..."
        searchFilter={(m, q) =>
          m.name.toLowerCase().includes(q.toLowerCase()) ||
          m.email.toLowerCase().includes(q.toLowerCase()) ||
          m.service.toLowerCase().includes(q.toLowerCase()) ||
          m.message.toLowerCase().includes(q.toLowerCase())
        }
      />

      {/* Message Inspection Drawer / Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#12141c] border border-[#d4af37]/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] block">
                  Confidential Inquiry
                </span>
                <h3 className="font-display text-lg font-bold text-white">
                  {activeMessage.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveMessage(null)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#0b0c10] border border-white/5 mb-6 text-xs">
              <div>
                <span className="text-[10px] text-[#6e7687] uppercase block mb-0.5">Email</span>
                <a
                  href={`mailto:${activeMessage.email}`}
                  className="text-white hover:text-[#d4af37] font-medium"
                >
                  {activeMessage.email}
                </a>
              </div>
              <div>
                <span className="text-[10px] text-[#6e7687] uppercase block mb-0.5">Phone</span>
                <span className="text-white font-medium">
                  {activeMessage.phone || 'Not provided'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#6e7687] uppercase block mb-0.5">Desired Practice</span>
                <span className="text-[#d4af37] font-semibold">
                  {activeMessage.service}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#6e7687] uppercase block mb-0.5">Budget Allocation</span>
                <span className="text-[#d4af37] font-semibold">
                  {activeMessage.budget}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block mb-2">
                Project Brief & Objective:
              </span>
              <div className="p-4 rounded-xl bg-[#0b0c10] border border-white/5 text-xs text-[#c7ccd9] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto font-light">
                {activeMessage.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-[11px] text-[#6e7687] font-mono">
                Logged: {new Date(activeMessage.createdAt).toLocaleString()}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDelete(activeMessage.id)}
                  className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 rounded text-xs transition-colors"
                >
                  Delete
                </button>
                <a
                  href={`mailto:${activeMessage.email}?subject=${encodeURIComponent(`Re: ${activeMessage.service} Inquiry - Agency Website`)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#d4af37] hover:bg-[#edd382] text-black font-semibold text-xs rounded transition-colors shadow-md"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

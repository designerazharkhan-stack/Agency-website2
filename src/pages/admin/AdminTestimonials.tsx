import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, X, Save, AlertCircle } from 'lucide-react';
import { AdminTable } from '../../components/admin/AdminTable';
import { LoadingState } from '../../components/LoadingState';
import { ImageUploader } from '../../components/ImageUploader';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '../../services/db';
import { Testimonial } from '../../types';

export const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const data = await getTestimonials(true);
      setTestimonials(data);
    } catch (e) {
      console.error('Error fetching testimonials:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddNew = () => {
    setEditingTestimonial({
      id: `test-${Date.now()}`,
      clientName: '',
      position: '',
      company: '',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      testimonial: '',
      rating: 5,
      published: true,
      order: testimonials.length + 1
    });
    setIsModalOpen(true);
    setError(null);
  };

  const handleEdit = (t: Testimonial) => {
    setEditingTestimonial({ ...t });
    setIsModalOpen(true);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this client testimonial?')) {
      try {
        await deleteTestimonial(id);
        await loadData();
      } catch (err: any) {
        alert(err?.message || 'Failed to delete');
      }
    }
  };

  const handleTogglePublish = async (t: Testimonial) => {
    try {
      const updated = { ...t, published: !t.published };
      await saveTestimonial(updated);
      await loadData();
    } catch {
      alert('Failed to update published status');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    if (!editingTestimonial.clientName.trim() || !editingTestimonial.testimonial.trim()) {
      setError('Please provide client name and testimonial text');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await saveTestimonial(editingTestimonial);
      await loadData();
      setIsModalOpen(false);
      setEditingTestimonial(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading testimonials..." />;
  }

  const columns = [
    {
      header: 'Client / Company',
      render: (t: Testimonial) => (
        <div className="flex items-center gap-3">
          <img
            src={t.avatar}
            alt={t.clientName}
            className="w-9 h-9 rounded-full object-cover border border-white/10"
          />
          <div>
            <span className="font-bold text-white block">{t.clientName}</span>
            <span className="text-[11px] text-[#6e7687]">
              {t.position}, <span className="text-[#d4af37]">{t.company}</span>
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Rating',
      render: (t: Testimonial) => (
        <div className="flex items-center gap-1 text-[#d4af37]">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
          ))}
        </div>
      )
    },
    {
      header: 'Order',
      render: (t: Testimonial) => (
        <span className="font-mono text-xs text-[#8f96a6]">0{t.order}</span>
      )
    },
    {
      header: 'Status',
      render: (t: Testimonial) => (
        <button
          onClick={() => handleTogglePublish(t)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
            t.published
              ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
              : 'bg-zinc-800/60 text-zinc-400 border border-zinc-700/50'
          }`}
        >
          {t.published ? <Eye className="w-3 h-3 text-emerald-400" /> : <EyeOff className="w-3 h-3" />}
          <span>{t.published ? 'Live' : 'Draft'}</span>
        </button>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (t: Testimonial) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleEdit(t)}
            className="p-1.5 rounded hover:bg-white/10 text-[#8f96a6] hover:text-[#d4af37]"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(t.id)}
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
        <h2 className="text-xl font-bold text-white">Partner Testimonials & Endorsements</h2>
        <p className="text-xs text-[#8f96a6]">
          Manage verified client quotations, star ratings, avatar photos, and display sequence.
        </p>
      </div>

      <AdminTable
        data={testimonials}
        columns={columns}
        keyExtractor={(t) => t.id}
        searchPlaceholder="Filter testimonials..."
        searchFilter={(t, q) =>
          t.clientName.toLowerCase().includes(q.toLowerCase()) ||
          t.company.toLowerCase().includes(q.toLowerCase()) ||
          t.testimonial.toLowerCase().includes(q.toLowerCase())
        }
        onAddNew={handleAddNew}
        addNewText="Add Testimonial"
      />

      {/* Edit / Create Modal */}
      {isModalOpen && editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#12141c] border border-[#d4af37]/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-display text-lg font-bold text-white">
                {editingTestimonial.clientName ? 'Edit Testimonial' : 'Create Testimonial'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-950/40 border border-red-500/40 rounded text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial.clientName}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })
                    }
                    required
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Position / Role
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial.position}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, position: e.target.value })
                    }
                    placeholder="Chief Technology Officer"
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial.company}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, company: e.target.value })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Star Rating (1-5)
                  </label>
                  <select
                    value={editingTestimonial.rating}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        rating: parseInt(e.target.value, 10)
                      })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="5">5 Stars (Flawless)</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingTestimonial.order}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        order: parseInt(e.target.value, 10) || 1
                      })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Avatar Uploader */}
              <ImageUploader
                label="Client Avatar Photo"
                value={editingTestimonial.avatar}
                onChange={(url) =>
                  setEditingTestimonial({ ...editingTestimonial, avatar: url })
                }
                folder="avatars"
              />

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={4}
                  value={editingTestimonial.testimonial}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, testimonial: e.target.value })
                  }
                  required
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8f96a6] mb-1">
                  Status
                </label>
                <select
                  value={editingTestimonial.published ? 'true' : 'false'}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      published: e.target.value === 'true'
                    })
                  }
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="true">Published (Public)</option>
                  <option value="false">Draft (Internal)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#d4af37] text-black font-bold text-xs rounded hover:bg-[#edd382] transition-colors disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Testimonial'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

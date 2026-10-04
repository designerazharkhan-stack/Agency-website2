import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Eye, EyeOff, X, Save, AlertCircle } from 'lucide-react';
import { AdminTable } from '../../components/admin/AdminTable';
import { LoadingState } from '../../components/LoadingState';
import { getServices, saveService, deleteService } from '../../services/db';
import { Service } from '../../types';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const data = await getServices(true);
      setServices(data);
    } catch (e) {
      console.error('Error fetching services:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddNew = () => {
    setEditingService({
      id: `service-${Date.now()}`,
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      icon: 'Code',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      order: services.length + 1,
      published: true
    });
    setIsModalOpen(true);
    setError(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService({ ...service });
    setIsModalOpen(true);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service practice?')) {
      try {
        await deleteService(id);
        await loadData();
      } catch (err: any) {
        alert(err?.message || 'Failed to delete service');
      }
    }
  };

  const handleTogglePublish = async (service: Service) => {
    try {
      const updated = { ...service, published: !service.published };
      await saveService(updated);
      await loadData();
    } catch (err: any) {
      alert('Failed to update published status');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    if (!editingService.title.trim()) {
      setError('Please provide a title');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const slug = editingService.slug.trim() || editingService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await saveService({ ...editingService, slug });
      await loadData();
      setIsModalOpen(false);
      setEditingService(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading service practices..." />;
  }

  const columns = [
    {
      header: 'Practice Title',
      render: (s: Service) => (
        <div>
          <span className="font-bold text-white block">{s.title}</span>
          <span className="text-[11px] text-[#6e7687] font-mono">/{s.slug}</span>
        </div>
      )
    },
    {
      header: 'Icon / Order',
      render: (s: Service) => (
        <span className="text-xs font-mono text-[#c7ccd9]">
          {s.icon} · Order {s.order}
        </span>
      )
    },
    {
      header: 'Features',
      render: (s: Service) => (
        <span className="text-xs text-[#8f96a6]">{s.features?.length || 0} items</span>
      )
    },
    {
      header: 'Status',
      render: (s: Service) => (
        <button
          onClick={() => handleTogglePublish(s)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
            s.published
              ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
              : 'bg-zinc-800/60 text-zinc-400 border border-zinc-700/50'
          }`}
        >
          {s.published ? <Eye className="w-3 h-3 text-emerald-400" /> : <EyeOff className="w-3 h-3" />}
          <span>{s.published ? 'Live' : 'Draft'}</span>
        </button>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (s: Service) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleEdit(s)}
            className="p-1.5 rounded hover:bg-white/10 text-[#8f96a6] hover:text-[#d4af37]"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(s.id)}
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Agency Capabilities Directory</h2>
          <p className="text-xs text-[#8f96a6]">
            Configure and publish high-level service practices displayed across the agency.
          </p>
        </div>
      </div>

      <AdminTable
        data={services}
        columns={columns}
        keyExtractor={(s) => s.id}
        searchPlaceholder="Filter services..."
        searchFilter={(s, q) =>
          s.title.toLowerCase().includes(q.toLowerCase()) ||
          s.slug.toLowerCase().includes(q.toLowerCase())
        }
        onAddNew={handleAddNew}
        addNewText="Add Service"
      />

      {/* Edit / Create Modal */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#12141c] border border-[#d4af37]/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-display text-lg font-bold text-white">
                {editingService.title ? 'Edit Service Practice' : 'Create New Service Practice'}
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

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        title: e.target.value,
                        slug: editingService.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                      })
                    }
                    required
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingService.slug}
                    onChange={(e) =>
                      setEditingService({ ...editingService, slug: e.target.value })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Icon Identifier
                  </label>
                  <select
                    value={editingService.icon}
                    onChange={(e) =>
                      setEditingService({ ...editingService, icon: e.target.value })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Code">Code (Web Development)</option>
                    <option value="Layers">Layers (WordPress)</option>
                    <option value="Palette">Palette (UI/UX)</option>
                    <option value="Search">Search (SEO)</option>
                    <option value="ShoppingBag">ShoppingBag (E-Commerce)</option>
                    <option value="Wrench">Wrench (Maintenance)</option>
                    <option value="Sparkles">Sparkles (Bespoke)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingService.order}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        order: parseInt(e.target.value, 10) || 1
                      })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Status
                  </label>
                  <select
                    value={editingService.published ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        published: e.target.value === 'true'
                      })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="true">Published (Public)</option>
                    <option value="false">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Short Card Summary
                </label>
                <textarea
                  rows={2}
                  value={editingService.shortDescription}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      shortDescription: e.target.value
                    })
                  }
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Comprehensive Description
                </label>
                <textarea
                  rows={4}
                  value={editingService.fullDescription}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      fullDescription: e.target.value
                    })
                  }
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={editingService.features?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      features: e.target.value.split('\n').filter(Boolean)
                    })
                  }
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono"
                />
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
                  <span>{saving ? 'Saving...' : 'Save Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

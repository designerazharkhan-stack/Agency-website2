import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, X, Save, AlertCircle } from 'lucide-react';
import { AdminTable } from '../../components/admin/AdminTable';
import { LoadingState } from '../../components/LoadingState';
import { getPricingPlans, savePricingPlan, deletePricingPlan } from '../../services/db';
import { PricingPlan } from '../../types';

export const AdminPricing: React.FC = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const data = await getPricingPlans(true);
      setPlans(data);
    } catch (e) {
      console.error('Error fetching pricing plans:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddNew = () => {
    setEditingPlan({
      id: `plan-${Date.now()}`,
      name: '',
      tagline: '',
      price: '$9,500',
      billingPeriod: 'one-time',
      description: '',
      features: ['Full UI/UX Architecture', 'Production React Codebase', 'SEO & Web Vitals Audit'],
      isPopular: false,
      ctaText: 'Select Tier',
      ctaLink: '/contact',
      published: true,
      order: plans.length + 1
    });
    setIsModalOpen(true);
    setError(null);
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan({ ...plan });
    setIsModalOpen(true);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this pricing plan tier?')) {
      try {
        await deletePricingPlan(id);
        await loadData();
      } catch (err: any) {
        alert(err?.message || 'Failed to delete plan');
      }
    }
  };

  const handleTogglePublish = async (plan: PricingPlan) => {
    try {
      const updated = { ...plan, published: !plan.published };
      await savePricingPlan(updated);
      await loadData();
    } catch {
      alert('Failed to update published status');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    if (!editingPlan.name.trim() || !editingPlan.price.trim()) {
      setError('Please provide plan name and price');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await savePricingPlan(editingPlan);
      await loadData();
      setIsModalOpen(false);
      setEditingPlan(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to save pricing plan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading pricing models..." />;
  }

  const columns = [
    {
      header: 'Tier Name',
      render: (p: PricingPlan) => (
        <div>
          <span className="font-bold text-white block">{p.name}</span>
          <span className="text-[11px] text-[#6e7687]">{p.tagline}</span>
        </div>
      )
    },
    {
      header: 'Price / Interval',
      render: (p: PricingPlan) => (
        <span className="font-mono text-xs text-[#d4af37] font-bold">
          {p.price} <span className="text-[#8f96a6] font-normal">/ {p.billingPeriod}</span>
        </span>
      )
    },
    {
      header: 'Popular',
      render: (p: PricingPlan) => (
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-mono ${
            p.isPopular ? 'text-[#d4af37]' : 'text-[#6e7687]'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${p.isPopular ? 'fill-[#d4af37]' : ''}`} />
          <span>{p.isPopular ? 'Highlighted' : 'Standard'}</span>
        </span>
      )
    },
    {
      header: 'Status',
      render: (p: PricingPlan) => (
        <button
          onClick={() => handleTogglePublish(p)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
            p.published
              ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
              : 'bg-zinc-800/60 text-zinc-400 border border-zinc-700/50'
          }`}
        >
          {p.published ? <Eye className="w-3 h-3 text-emerald-400" /> : <EyeOff className="w-3 h-3" />}
          <span>{p.published ? 'Live' : 'Draft'}</span>
        </button>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (p: PricingPlan) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleEdit(p)}
            className="p-1.5 rounded hover:bg-white/10 text-[#8f96a6] hover:text-[#d4af37]"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(p.id)}
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
        <h2 className="text-xl font-bold text-white">Investment & Pricing Architect</h2>
        <p className="text-xs text-[#8f96a6]">
          Configure turnaround packages, monthly retainers, deliverables, and popular badges.
        </p>
      </div>

      <AdminTable
        data={plans}
        columns={columns}
        keyExtractor={(p) => p.id}
        searchPlaceholder="Filter pricing plans..."
        searchFilter={(p, q) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.price.toLowerCase().includes(q.toLowerCase()) ||
          p.description.toLowerCase().includes(q.toLowerCase())
        }
        onAddNew={handleAddNew}
        addNewText="Add Pricing Tier"
      />

      {/* Edit / Create Modal */}
      {isModalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#12141c] border border-[#d4af37]/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-display text-lg font-bold text-white">
                {editingPlan.name ? 'Edit Pricing Plan' : 'Create Pricing Plan'}
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
                    Plan Tier Name *
                  </label>
                  <input
                    type="text"
                    value={editingPlan.name}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, name: e.target.value })
                    }
                    required
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Tagline Subtext
                  </label>
                  <input
                    type="text"
                    value={editingPlan.tagline}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, tagline: e.target.value })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Price (e.g. $14,500) *
                  </label>
                  <input
                    type="text"
                    value={editingPlan.price}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, price: e.target.value })
                    }
                    required
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Billing Period
                  </label>
                  <select
                    value={editingPlan.billingPeriod}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, billingPeriod: e.target.value })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="one-time">one-time</option>
                    <option value="monthly">monthly</option>
                    <option value="quarterly">quarterly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Plan Description
                </label>
                <textarea
                  rows={2}
                  value={editingPlan.description}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, description: e.target.value })
                  }
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Deliverables & Inclusions (One per line)
                </label>
                <textarea
                  rows={5}
                  value={editingPlan.features?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      features: e.target.value.split('\n').filter(Boolean)
                    })
                  }
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8f96a6] mb-1">
                    Featured / Highlighted
                  </label>
                  <select
                    value={editingPlan.isPopular ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, isPopular: e.target.value === 'true' })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="false">Standard Card</option>
                    <option value="true">Featured (Elevated Gold Border)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8f96a6] mb-1">
                    Publication Status
                  </label>
                  <select
                    value={editingPlan.published ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, published: e.target.value === 'true' })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="true">Published (Public)</option>
                    <option value="false">Draft (Internal)</option>
                  </select>
                </div>
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
                  <span>{saving ? 'Saving...' : 'Save Plan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

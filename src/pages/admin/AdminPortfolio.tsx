import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, X, Save, AlertCircle } from 'lucide-react';
import { AdminTable } from '../../components/admin/AdminTable';
import { LoadingState } from '../../components/LoadingState';
import { ImageUploader } from '../../components/ImageUploader';
import { getProjects, saveProject, deleteProject } from '../../services/db';
import { Project } from '../../types';

export const AdminPortfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const data = await getProjects(true);
      setProjects(data);
    } catch (e) {
      console.error('Error fetching projects:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddNew = () => {
    setEditingProject({
      id: `proj-${Date.now()}`,
      title: '',
      slug: '',
      client: '',
      category: 'Web Development',
      featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      gallery: [],
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      shortDescription: '',
      description: '',
      challenge: '',
      solution: '',
      results: ['Sub-second load time', '200% conversion uptick'],
      projectUrl: '',
      completionDate: 'Q4 2026',
      featured: false,
      published: true,
      order: projects.length + 1
    });
    setIsModalOpen(true);
    setError(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject({ ...project });
    setIsModalOpen(true);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this case study from the portfolio?')) {
      try {
        await deleteProject(id);
        await loadData();
      } catch (err: any) {
        alert(err?.message || 'Failed to delete project');
      }
    }
  };

  const handleTogglePublish = async (project: Project) => {
    try {
      const updated = { ...project, published: !project.published };
      await saveProject(updated);
      await loadData();
    } catch {
      alert('Failed to update published state');
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const updated = { ...project, featured: !project.featured };
      await saveProject(updated);
      await loadData();
    } catch {
      alert('Failed to update featured state');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    if (!editingProject.title.trim()) {
      setError('Please provide a project title');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const slug = editingProject.slug.trim() || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await saveProject({ ...editingProject, slug });
      await loadData();
      setIsModalOpen(false);
      setEditingProject(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading case study archive..." />;
  }

  const columns = [
    {
      header: 'Project / Client',
      render: (p: Project) => (
        <div className="flex items-center gap-3">
          <img
            src={p.featuredImage}
            alt={p.title}
            className="w-10 h-10 rounded object-cover border border-white/10"
          />
          <div>
            <span className="font-bold text-white block">{p.title}</span>
            <span className="text-[11px] text-[#6e7687] font-mono">{p.client} · /{p.slug}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      render: (p: Project) => (
        <span className="text-xs text-[#c7ccd9] font-mono">{p.category}</span>
      )
    },
    {
      header: 'Featured',
      render: (p: Project) => (
        <button
          onClick={() => handleToggleFeatured(p)}
          className={`p-1 rounded transition-colors ${
            p.featured ? 'text-[#d4af37]' : 'text-zinc-600 hover:text-zinc-400'
          }`}
          title="Toggle featured showcase"
        >
          <Star className={`w-4 h-4 ${p.featured ? 'fill-[#d4af37]' : ''}`} />
        </button>
      )
    },
    {
      header: 'Status',
      render: (p: Project) => (
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
      render: (p: Project) => (
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
        <h2 className="text-xl font-bold text-white">Portfolio & Case Studies Manager</h2>
        <p className="text-xs text-[#8f96a6]">
          Curate showcase projects, upload screenshots, specify client deliverables, and manage live links.
        </p>
      </div>

      <AdminTable
        data={projects}
        columns={columns}
        keyExtractor={(p) => p.id}
        searchPlaceholder="Filter projects or clients..."
        searchFilter={(p, q) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.client.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase())
        }
        onAddNew={handleAddNew}
        addNewText="Add Project"
      />

      {/* Edit / Create Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#12141c] border border-[#d4af37]/30 rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-display text-lg font-bold text-white">
                {editingProject.title ? 'Edit Case Study' : 'Create Case Study'}
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

            <form onSubmit={handleSave} className="space-y-5 max-h-[75vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                        slug: editingProject.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
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
                    value={editingProject.slug}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editingProject.client}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, client: e.target.value })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Category
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="WordPress Development">WordPress Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="SEO">SEO</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Mobile Engineering">Mobile Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Completion Date
                  </label>
                  <input
                    type="text"
                    value={editingProject.completionDate}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, completionDate: e.target.value })
                    }
                    placeholder="Q4 2026"
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Featured Image Uploader */}
              <ImageUploader
                label="Featured Showcase Image"
                value={editingProject.featuredImage}
                onChange={(url) => setEditingProject({ ...editingProject, featuredImage: url })}
                folder="portfolio"
              />

              {/* Technologies */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Technologies / Stack (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                    })
                  }
                  placeholder="React, TypeScript, Tailwind CSS, Vite"
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono"
                />
              </div>

              {/* Short & Detailed Descriptions */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Short Summary
                </label>
                <textarea
                  rows={2}
                  value={editingProject.shortDescription}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, shortDescription: e.target.value })
                  }
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Full Project Narrative
                </label>
                <textarea
                  rows={4}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Architectural Challenge
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.challenge || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, challenge: e.target.value })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Engineered Solution
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.solution || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, solution: e.target.value })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Results */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Measurable Results (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingProject.results?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      results: e.target.value.split('\n').filter(Boolean)
                    })
                  }
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Live URL & Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8f96a6] mb-1">
                    Live Project URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.projectUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, projectUrl: e.target.value })
                    }
                    placeholder="https://client-site.com"
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8f96a6] mb-1">
                    Featured Status
                  </label>
                  <select
                    value={editingProject.featured ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, featured: e.target.value === 'true' })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="false">Standard Archive</option>
                    <option value="true">Featured on Homepage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8f96a6] mb-1">
                    Publication Status
                  </label>
                  <select
                    value={editingProject.published ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, published: e.target.value === 'true' })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="true">Published (Public)</option>
                    <option value="false">Draft (Internal)</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10 sticky bottom-0 bg-[#12141c]">
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
                  <span>{saving ? 'Saving...' : 'Save Case Study'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

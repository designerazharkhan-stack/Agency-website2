import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, X, Save, AlertCircle, Clock } from 'lucide-react';
import { AdminTable } from '../../components/admin/AdminTable';
import { LoadingState } from '../../components/LoadingState';
import { ImageUploader } from '../../components/ImageUploader';
import { RichTextEditor } from '../../components/RichTextEditor';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '../../services/db';
import { BlogPost } from '../../types';

export const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const data = await getBlogPosts(true);
      setPosts(data);
    } catch (e) {
      console.error('Error fetching blog posts:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddNew = () => {
    setEditingPost({
      id: `post-${Date.now()}`,
      title: '',
      slug: '',
      excerpt: '',
      content: '## Executive Overview\n\nCompose your editorial breakdown here...',
      featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
      author: {
        name: 'Julian Vance',
        role: 'Principal Design Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
      },
      category: 'Engineering',
      tags: ['React', 'Architecture', 'Performance'],
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: true,
      featured: false,
      readTime: '5 min read',
      seoTitle: '',
      seoDescription: ''
    });
    setIsModalOpen(true);
    setError(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsModalOpen(true);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this essay permanently?')) {
      try {
        await deleteBlogPost(id);
        await loadData();
      } catch (err: any) {
        alert(err?.message || 'Failed to delete post');
      }
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const updated = { ...post, published: !post.published };
      await saveBlogPost(updated);
      await loadData();
    } catch {
      alert('Failed to update published state');
    }
  };

  const handleToggleFeatured = async (post: BlogPost) => {
    try {
      const updated = { ...post, featured: !post.featured };
      await saveBlogPost(updated);
      await loadData();
    } catch {
      alert('Failed to update featured state');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    if (!editingPost.title.trim()) {
      setError('Please provide an article title');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const slug = editingPost.slug.trim() || editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const updated: BlogPost = {
        ...editingPost,
        slug,
        updatedAt: new Date().toISOString(),
        seoTitle: editingPost.seoTitle || editingPost.title,
        seoDescription: editingPost.seoDescription || editingPost.excerpt
      };
      await saveBlogPost(updated);
      await loadData();
      setIsModalOpen(false);
      setEditingPost(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading journal publications..." />;
  }

  const columns = [
    {
      header: 'Article Title',
      render: (p: BlogPost) => (
        <div className="flex items-center gap-3">
          <img
            src={p.featuredImage}
            alt={p.title}
            className="w-10 h-10 rounded object-cover border border-white/10"
          />
          <div>
            <span className="font-bold text-white block line-clamp-1">{p.title}</span>
            <span className="text-[11px] text-[#6e7687] font-mono">
              {p.category} · /{p.slug}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Author / Time',
      render: (p: BlogPost) => (
        <div>
          <span className="text-xs text-white block">{p.author.name}</span>
          <span className="text-[10px] text-[#8f96a6]">{p.readTime}</span>
        </div>
      )
    },
    {
      header: 'Featured',
      render: (p: BlogPost) => (
        <button
          onClick={() => handleToggleFeatured(p)}
          className={`p-1 rounded transition-colors ${
            p.featured ? 'text-[#d4af37]' : 'text-zinc-600 hover:text-zinc-400'
          }`}
          title="Toggle featured spotlight"
        >
          <Star className={`w-4 h-4 ${p.featured ? 'fill-[#d4af37]' : ''}`} />
        </button>
      )
    },
    {
      header: 'Status',
      render: (p: BlogPost) => (
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
      render: (p: BlogPost) => (
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
        <h2 className="text-xl font-bold text-white">Publications & Technical Journal</h2>
        <p className="text-xs text-[#8f96a6]">
          Manage thought leadership essays, SEO metadata, reading times, and topic taxonomies.
        </p>
      </div>

      <AdminTable
        data={posts}
        columns={columns}
        keyExtractor={(p) => p.id}
        searchPlaceholder="Filter articles by title or category..."
        searchFilter={(p, q) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))
        }
        onAddNew={handleAddNew}
        addNewText="Write New Article"
      />

      {/* Edit / Create Modal */}
      {isModalOpen && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#12141c] border border-[#d4af37]/30 rounded-2xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-display text-lg font-bold text-white">
                {editingPost.title ? 'Edit Publication' : 'Draft New Article'}
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

            <form onSubmit={handleSave} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        title: e.target.value,
                        slug: editingPost.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
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
                    value={editingPost.slug}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, slug: e.target.value })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, category: e.target.value })
                    }
                    placeholder="Engineering / Design Strategy"
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={editingPost.readTime}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, readTime: e.target.value })
                    }
                    placeholder="5 min read"
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingPost.tags?.join(', ') || ''}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      })
                    }
                    placeholder="React, UI/UX, Performance"
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono"
                  />
                </div>
              </div>

              {/* Featured Image */}
              <ImageUploader
                label="Article Hero Image"
                value={editingPost.featuredImage}
                onChange={(url) => setEditingPost({ ...editingPost, featuredImage: url })}
                folder="blog"
              />

              {/* Excerpt */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Article Abstract / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, excerpt: e.target.value })
                  }
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Rich Text Editor */}
              <RichTextEditor
                label="Article Markdown Content"
                value={editingPost.content}
                onChange={(val) => setEditingPost({ ...editingPost, content: val })}
              />

              {/* Author Info */}
              <div className="p-4 bg-[#0b0c10] rounded-xl border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-[#8f96a6] uppercase mb-1">Author Name</label>
                  <input
                    type="text"
                    value={editingPost.author.name}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        author: { ...editingPost.author, name: e.target.value }
                      })
                    }
                    className="w-full bg-[#181b26] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#8f96a6] uppercase mb-1">Author Role</label>
                  <input
                    type="text"
                    value={editingPost.author.role}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        author: { ...editingPost.author, role: e.target.value }
                      })
                    }
                    className="w-full bg-[#181b26] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#8f96a6] uppercase mb-1">Author Avatar URL</label>
                  <input
                    type="text"
                    value={editingPost.author.avatar}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        author: { ...editingPost.author, avatar: e.target.value }
                      })
                    }
                    className="w-full bg-[#181b26] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* SEO Meta Fields */}
              <div className="p-4 bg-[#0b0c10] rounded-xl border border-white/5 space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block">
                  Search Engine Metadata Overrides
                </span>
                <div>
                  <label className="block text-[10px] text-[#8f96a6] uppercase mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={editingPost.seoTitle || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, seoTitle: e.target.value })
                    }
                    placeholder="Defaults to article title if empty"
                    className="w-full bg-[#181b26] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#8f96a6] uppercase mb-1">SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={editingPost.seoDescription || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, seoDescription: e.target.value })
                    }
                    placeholder="Defaults to abstract if empty"
                    className="w-full bg-[#181b26] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8f96a6] mb-1">
                    Featured Spotlight
                  </label>
                  <select
                    value={editingPost.featured ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, featured: e.target.value === 'true' })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="false">Standard Journal Feed</option>
                    <option value="true">Hero Spotlight Article</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8f96a6] mb-1">
                    Publication Status
                  </label>
                  <select
                    value={editingPost.published ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, published: e.target.value === 'true' })
                    }
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="true">Published (Public)</option>
                    <option value="false">Draft (Internal Only)</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
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
                  <span>{saving ? 'Publishing...' : 'Save & Update Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

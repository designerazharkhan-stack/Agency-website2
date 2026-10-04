import React, { useEffect, useState, useMemo } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { CTASection } from '../components/CTASection';
import { getProjects } from '../services/db';
import { Project } from '../types';
import { Search } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error loading portfolio:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  if (loading) {
    return <LoadingState fullScreen message="Curating project showcase..." />;
  }

  return (
    <div className="pt-28 pb-16 min-h-screen">
      {/* Header */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-[#d4af37]/15 bg-[#0e1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#d4af37]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#d4af37]">
              Case Studies & Flagships
            </span>
            <span className="h-px w-6 bg-[#d4af37]"></span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Proof of Exceptional <span className="text-gold-gradient">Execution.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9da5b4] max-w-2xl mx-auto font-light leading-relaxed">
            Every project represents a tailored engineering sprint engineered to elevate authority, streamline operations, and drive substantial commercial upside.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-[#0b0c10] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                      : 'bg-[#12141c] text-[#9da5b4] hover:text-white border border-white/5 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8f96a6]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or stack..."
                className="w-full bg-[#12141c] border border-white/10 rounded-md px-3 py-2 pl-9 text-xs text-white placeholder-[#646c7d] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Projects Found"
              description={`No projects found matching "${searchQuery || selectedCategory}". Try selecting another category or clearing your search.`}
              actionText="Reset Filters"
              onAction={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            />
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Envisioning Your Next"
        highlight="Digital Milestone?"
        subtitle="Let's build a flagship project tailored to your exact industry requirements and aesthetic aspirations."
      />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ExternalLink, Calendar, User, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { LoadingState } from '../components/LoadingState';
import { CTASection } from '../components/CTASection';
import { getProjectBySlug, getProjects } from '../services/db';
import { Project } from '../types';

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      try {
        const [proj, list] = await Promise.all([
          getProjectBySlug(slug),
          getProjects()
        ]);
        setProject(proj);
        setAllProjects(list);
        if (proj) {
          setSelectedGalleryImg(proj.featuredImage);
        }
      } catch (err) {
        console.error('Error loading project details:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <LoadingState fullScreen message="Loading case study telemetry..." />;
  }

  if (!project) {
    return (
      <div className="pt-36 pb-20 min-h-screen max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Case Study Not Found</h1>
        <p className="text-sm text-[#8f96a6] mb-8">
          The requested case study could not be located in our production archive.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-black font-semibold text-xs rounded hover:bg-[#edd382]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    );
  }

  // Next project navigation helper
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1
    ? allProjects[currentIndex + 1]
    : allProjects[0];

  const fullGallery = [project.featuredImage, ...(project.gallery || [])].filter(Boolean);

  return (
    <div className="pt-28 pb-16 min-h-screen">
      {/* Top Breadcrumb & Return */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Case Studies</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#6e7687]">
            <Link to="/portfolio" className="hover:text-white">Portfolio</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#c7ccd9] truncate max-w-xs">{project.title}</span>
          </div>
        </div>
      </div>

      {/* Case Study Hero */}
      <section className="relative py-12 md:py-16 bg-[#0e1017] border-y border-[#d4af37]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#d4af37]">
                {project.category}
              </span>
              <span className="text-[#555a68]">/</span>
              <span className="text-xs uppercase tracking-wider text-[#8f96a6]">
                {project.client}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-[#9da5b4] font-light leading-relaxed">
              {project.description || project.shortDescription}
            </p>
          </div>

          {/* Project Metadata Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-xl bg-[#12141c] border border-white/5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6e7687] block mb-1">
                Client Partner
              </span>
              <div className="flex items-center gap-1.5 text-xs text-white font-semibold">
                <User className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{project.client}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6e7687] block mb-1">
                Timeline / Delivery
              </span>
              <div className="flex items-center gap-1.5 text-xs text-white font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{project.completionDate}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6e7687] block mb-1">
                Discipline Category
              </span>
              <div className="flex items-center gap-1.5 text-xs text-white font-semibold">
                <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{project.category}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6e7687] block mb-1">
                Live Deployment
              </span>
              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#d4af37] hover:underline font-semibold"
                >
                  <span>Launch External Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-xs text-[#6e7687] italic">Confidential Enterprise</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Image & Interactive Gallery */}
      <section className="py-12 bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Visual Display */}
          <div className="rounded-xl overflow-hidden border border-[#d4af37]/30 bg-[#12141c] mb-6 shadow-2xl">
            <img
              src={selectedGalleryImg || project.featuredImage}
              alt={project.title}
              className="w-full h-auto max-h-[650px] object-cover object-center"
            />
          </div>

          {/* Gallery Thumbnails */}
          {fullGallery.length > 1 && (
            <div className="flex flex-wrap items-center gap-4">
              {fullGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGalleryImg(img)}
                  className={`relative w-24 h-16 sm:w-32 sm:h-20 rounded-md overflow-hidden border-2 transition-all ${
                    selectedGalleryImg === img
                      ? 'border-[#d4af37] scale-105 shadow-md shadow-[#d4af37]/20'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Narrative Breakdown: Challenge, Solution, Measurable Results */}
      <section className="py-16 bg-[#0e1017] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-12">
              {/* Challenge */}
              {project.challenge && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3">
                    The Architectural Challenge
                  </h3>
                  <p className="text-base text-[#c7ccd9] leading-relaxed font-light">
                    {project.challenge}
                  </p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3">
                    The Engineered Solution
                  </h3>
                  <p className="text-base text-[#c7ccd9] leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-4">
                    Quantifiable Impact & Results
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.results.map((res, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-lg bg-[#12141c] border border-white/5 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#c7ccd9] leading-relaxed font-medium">
                          {res}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Tech Stack & Share */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="p-6 rounded-xl bg-[#12141c] border border-[#d4af37]/20">
                  <h4 className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-4">
                    Engineered Stack:
                  </h4>
                  <div className="space-y-2 text-xs font-mono text-[#c7ccd9]">
                    {project.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="py-1.5 px-3 rounded bg-[#181b26] border border-white/5 flex items-center justify-between"
                      >
                        <span>{tech}</span>
                        <span className="text-[#646c7d] text-[10px]">Verified</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <Link
                      to={`/contact?service=${project.category}`}
                      className="w-full py-3 px-4 rounded bg-[#d4af37] text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#edd382] transition-colors"
                    >
                      <span>Inquire for Similar Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Next Project Link Card */}
                {nextProject && nextProject.id !== project.id && (
                  <div className="p-6 rounded-xl bg-[#12141c] border border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-[#6e7687] block mb-1">
                      Up Next
                    </span>
                    <h5 className="text-sm font-bold text-white mb-2 line-clamp-1">
                      {nextProject.title}
                    </h5>
                    <Link
                      to={`/portfolio/${nextProject.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] hover:underline"
                    >
                      <span>Explore Next Case Study</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Build Your"
        highlight="Flagship Digital Asset?"
        subtitle="Schedule a consultation with our leads. We provide an architecture blueprint and scope assessment in 48 hours."
      />
    </div>
  );
};

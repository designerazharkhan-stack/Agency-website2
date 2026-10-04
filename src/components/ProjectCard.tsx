import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  featuredLayout?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featuredLayout = false }) => {
  return (
    <article
      className={`group relative bg-[#12141c] border border-[#d4af37]/15 hover:border-[#d4af37]/50 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between ${
        featuredLayout ? 'lg:grid lg:grid-cols-12 lg:gap-8 items-center p-6 lg:p-8' : 'p-5'
      }`}
    >
      {/* Image container */}
      <div
        className={`relative overflow-hidden rounded bg-[#0b0c10] ${
          featuredLayout ? 'lg:col-span-7 h-72 lg:h-96' : 'h-64 sm:h-72 w-full mb-6'
        }`}
      >
        <img
          src={project.featuredImage}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-60" />

        {/* Category & Client ribbon overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#f3e5ab] font-mono bg-[#0b0c10]/80 backdrop-blur-md px-3 py-1 border border-[#d4af37]/30">
          <span>{project.category}</span>
          <span className="text-[#d4af37]">/</span>
          <span>{project.client}</span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-between ${featuredLayout ? 'lg:col-span-5 py-4' : 'flex-1'}`}>
        <div>
          {/* Metadata: Completion date & Category - Clean unboxed text per Zero-Pill discipline */}
          <div className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2 flex items-center gap-2">
            <span>{project.category}</span>
            <span className="text-[#555a68]">·</span>
            <span className="text-[#8f96a6]">{project.completionDate}</span>
          </div>

          {/* Project Title */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-gradient transition-colors">
            <Link to={`/portfolio/${project.slug}`} className="focus:outline-none">
              {project.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-sm text-[#9da5b4] leading-relaxed mb-6 font-light line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Technologies - Unboxed typographic list */}
          <div className="text-xs text-[#8f96a6] font-mono mb-6 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[#646c7d] uppercase tracking-wider text-[10px]">Stack:</span>
            {project.technologies.map((tech, idx) => (
              <span key={tech} className="inline-flex items-center">
                <span className="text-[#c7ccd9] hover:text-[#d4af37] transition-colors">{tech}</span>
                {idx < project.technologies.length - 1 && (
                  <span className="text-[#4e5464] ml-2">/</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* View Project Action */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <Link
            to={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] group-hover:text-white transition-colors"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

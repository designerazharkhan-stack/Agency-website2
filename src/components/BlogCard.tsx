import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="group bg-[#12141c] border border-[#d4af37]/15 hover:border-[#d4af37]/50 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg shadow-black/40">
      <div>
        {/* Featured Image */}
        <div className="relative h-56 w-full overflow-hidden bg-[#0b0c10]">
          <img
            src={post.featuredImage}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent opacity-70" />

          {/* Category banner */}
          <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#f3e5ab] font-mono bg-[#0b0c10]/85 backdrop-blur-md px-2.5 py-1 border border-[#d4af37]/30">
            {post.category}
          </div>
        </div>

        {/* Content details */}
        <div className="p-6">
          {/* Metadata: Date & Read Time - unboxed */}
          <div className="flex items-center gap-2 text-xs text-[#8f96a6] font-mono mb-3">
            <span>{formattedDate}</span>
            <span className="text-[#4e5464]">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#d4af37]" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-gradient transition-colors line-clamp-2">
            <Link to={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[#9da5b4] leading-relaxed mb-6 font-light line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Author & Read More */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-2.5">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-7 h-7 rounded-full object-cover border border-[#d4af37]/30"
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white">{post.author.name}</span>
            <span className="text-[10px] text-[#6e7687]">{post.author.role}</span>
          </div>
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#d4af37] group-hover:text-[#f3e5ab] transition-colors"
          aria-label={`Read article: ${post.title}`}
        >
          <span>Read</span>
          <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

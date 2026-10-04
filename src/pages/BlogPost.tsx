import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Copy, Check, ChevronRight } from 'lucide-react';
import { LoadingState } from '../components/LoadingState';
import { BlogCard } from '../components/BlogCard';
import { CTASection } from '../components/CTASection';
import { getBlogPostBySlug, getBlogPosts } from '../services/db';
import { BlogPost as IBlogPost } from '../types';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<IBlogPost[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      try {
        const [article, all] = await Promise.all([
          getBlogPostBySlug(slug),
          getBlogPosts()
        ]);
        setPost(article);
        if (article) {
          setRelatedPosts(all.filter((p) => p.id !== article.id).slice(0, 3));
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <LoadingState fullScreen message="Hydrating essay..." />;
  }

  if (!post) {
    return (
      <div className="pt-36 pb-20 min-h-screen max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
        <p className="text-sm text-[#8f96a6] mb-8">
          The requested essay could not be located in our publication library.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-black font-semibold text-xs rounded hover:bg-[#edd382]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Blog</span>
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="pt-28 pb-16 min-h-screen">
      {/* Top Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#6e7687]">
            <Link to="/blog" className="hover:text-white">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#c7ccd9] truncate max-w-xs">{post.category}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-4">
          <span>{post.category}</span>
          <span className="text-[#555a68]">·</span>
          <span className="text-[#8f96a6] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-8">
          {post.title}
        </h1>

        {/* Author & Publication Details */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-white/10">
          <div className="flex items-center gap-3.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#d4af37]/40 shadow-sm"
            />
            <div>
              <h3 className="text-sm font-bold text-white">{post.author.name}</h3>
              <p className="text-xs text-[#8f96a6]">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#8f96a6]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#d4af37]" />
              {formattedDate}
            </span>

            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <button
                onClick={handleCopyLink}
                className="p-2 rounded bg-white/5 hover:bg-[#d4af37]/20 text-[#c7ccd9] hover:text-[#d4af37] transition-colors"
                title="Copy link to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-white/5 hover:bg-[#d4af37]/20 text-[#c7ccd9] hover:text-[#d4af37] transition-colors"
                title="Share on Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-white/5 hover:bg-[#d4af37]/20 text-[#c7ccd9] hover:text-[#d4af37] transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Banner Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="rounded-2xl overflow-hidden border border-[#d4af37]/20 bg-[#12141c] shadow-2xl">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-auto max-h-[550px] object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-invert prose-gold max-w-none text-[#c7ccd9] leading-relaxed text-base space-y-6">
          {post.content.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-white pt-6 pb-2 border-b border-white/10 font-display">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-bold text-[#d4af37] pt-4 font-display">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('> ')) {
              return (
                <blockquote key={idx} className="border-l-2 border-[#d4af37] pl-4 py-2 my-4 italic text-[#e0e2ec] bg-[#12141c]/60 rounded-r">
                  {trimmed.replace('> ', '')}
                </blockquote>
              );
            }
            if (trimmed.startsWith('- ')) {
              return (
                <ul key={idx} className="list-disc list-inside space-y-2 text-sm text-[#9da5b4]">
                  {trimmed.split('\n').map((item, itemIdx) => (
                    <li key={itemIdx}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            if (trimmed.startsWith('```')) {
              return (
                <pre key={idx} className="p-4 bg-[#12141c] border border-white/10 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto my-4">
                  {trimmed.replace(/```[a-z]*/g, '')}
                </pre>
              );
            }
            return (
              <p key={idx} className="text-base text-[#9da5b4] leading-relaxed font-light">
                {trimmed}
              </p>
            );
          })}
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <h4 className="text-xs uppercase tracking-wider text-[#6e7687] font-semibold mb-3">
              Filed Topics
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#12141c] border border-white/10 text-xs text-[#c7ccd9] rounded font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-[#0e1017] border-t border-white/5 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-white font-display">
                Related Technical Dissections
              </h3>
              <Link
                to="/blog"
                className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:underline"
              >
                View Library &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <BlogCard key={related.id} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <CTASection
        title="Ready to Build a High-Performing"
        highlight="Digital Experience?"
        subtitle="Our senior engineers and creative directors are ready to translate these exact principles into your digital asset."
      />
    </div>
  );
};

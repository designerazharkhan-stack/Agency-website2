import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { BlogCard } from '../components/BlogCard';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { CTASection } from '../components/CTASection';
import { getBlogPosts } from '../services/db';
import { BlogPost } from '../types';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error loading blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  if (loading) {
    return <LoadingState fullScreen message="Gathering insights & essays..." />;
  }

  return (
    <div className="pt-28 pb-16 min-h-screen">
      {/* Header */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-[#d4af37]/15 bg-[#0e1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#d4af37]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#d4af37]">
              Intel & Perspectives
            </span>
            <span className="h-px w-6 bg-[#d4af37]"></span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Engineering Insights & <span className="text-gold-gradient">Design Theory.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9da5b4] max-w-2xl mx-auto font-light leading-relaxed">
            In-depth technical breakdowns, conversion architecture frameworks, and digital craftsmanship essays written by our leads.
          </p>
        </div>
      </section>

      {/* Featured Article Spotlight */}
      {featuredPost && !searchQuery && selectedCategory === 'All' && (
        <section className="py-12 bg-[#0b0c10] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 lg:p-12 rounded-2xl bg-[#12141c] border border-[#d4af37]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
              <div className="lg:col-span-7 h-72 lg:h-96 rounded-xl overflow-hidden bg-black">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-3">
                    <span>Spotlight Essay</span>
                    <span className="text-[#555a68]">·</span>
                    <span className="text-[#8f96a6]">{featuredPost.category}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug hover:text-gold-gradient transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-[#9da5b4] leading-relaxed mb-6 font-light">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#d4af37]/30"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        {featuredPost.author.name}
                      </span>
                      <span className="text-[10px] text-[#8f96a6]">
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:text-white transition-colors"
                  >
                    <span>Read Essay</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
                placeholder="Search articles or topics..."
                className="w-full bg-[#12141c] border border-white/10 rounded-md px-3 py-2 pl-9 text-xs text-white placeholder-[#646c7d] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Articles Found"
              description={`No articles found matching "${searchQuery || selectedCategory}". Try searching for another topic or resetting filters.`}
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
        title="Stay Ahead of the"
        highlight="Digital Frontier"
        subtitle="We occasionally share private architectural whitepapers and benchmarks. Speak with our team to join our client advisory network."
      />
    </div>
  );
};

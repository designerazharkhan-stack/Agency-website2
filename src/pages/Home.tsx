import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard } from '../components/ProjectCard';
import { WhyUs } from '../components/WhyUs';
import { WorkProcess } from '../components/WorkProcess';
import { TestimonialCard } from '../components/TestimonialCard';
import { PricingCard } from '../components/PricingCard';
import { BlogCard } from '../components/BlogCard';
import { CTASection } from '../components/CTASection';
import { LoadingState } from '../components/LoadingState';
import { useSite } from '../context/SiteContext';
import {
  getServices,
  getProjects,
  getBlogPosts,
  getTestimonials,
  getPricingPlans
} from '../services/db';
import { Service, Project, BlogPost, Testimonial, PricingPlan } from '../types';

export const Home: React.FC = () => {
  const { homepageSettings } = useSite();
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [srv, prj, blg, tst, prc] = await Promise.all([
          getServices(),
          getProjects(),
          getBlogPosts(),
          getTestimonials(),
          getPricingPlans()
        ]);
        setServices(srv);
        setProjects(prj.filter(p => p.featured || p.order <= 3));
        setBlogPosts(blg.slice(0, 3));
        setTestimonials(tst.slice(0, 4));
        setPricingPlans(prc);
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  if (loading) {
    return <LoadingState fullScreen message="Assembling agency flagship showcase..." />;
  }

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero settings={homepageSettings} />

      {/* 2. Services Preview Section */}
      <section className="py-20 md:py-28 relative bg-[#0e1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="Specialized Capabilities"
              title="Full-Lifecycle Digital"
              highlight="Engineering"
              subtitle="From bespoke web architectures to high-intent conversion design, explore our core agency practices."
              centered={false}
              className="mb-0 max-w-xl"
            />
            <Link
              to="/services"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
            >
              <span>View All 6 Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Portfolio Section */}
      <section className="py-20 md:py-28 relative bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="Selected Works"
              title="Architected For"
              highlight="Global Impact"
              subtitle="Explore recent digital flagships, web applications, and interactive platforms engineered for industry pioneers."
              centered={false}
              className="mb-0 max-w-xl"
            />
            <Link
              to="/portfolio"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
            >
              <span>Explore Complete Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-8">
            {projects.slice(0, 3).map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                featuredLayout={idx === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <WhyUs
        whyUs={homepageSettings.whyUs}
        stats={homepageSettings.stats}
      />

      {/* 5. Work Process Section */}
      <WorkProcess process={homepageSettings.workProcess} />

      {/* 6. Testimonials Section */}
      <section className="py-20 md:py-28 relative bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Client Validation"
            title="Trusted By Founders &"
            highlight="Enterprise Leaders"
            subtitle="Read firsthand experiences from partners who transformed their brand authority and digital performance with our team."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
            >
              <span>Read Full Partner Testimonials & Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Pricing Preview Section */}
      <section className="py-20 md:py-28 relative bg-[#0e1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Transparent Investment"
            title="Predictable Value,"
            highlight="Zero Hidden Surprises"
            subtitle="Choose between bespoke fixed-scope digital flagships or an agile monthly engineering retainer."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-[#8f96a6] mb-3">
              Need custom enterprise requirements, bespoke ERP integrations, or SLA contracts?
            </p>
            <Link
              to="/contact?type=custom-scope"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] hover:underline"
            >
              <span>Request a Custom Enterprise Blueprint</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Blog Preview Section */}
      <section className="py-20 md:py-28 relative bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="Insights & Perspectives"
              title="Thought Leadership &"
              highlight="Engineering Dissections"
              subtitle="Deep dives into digital design philosophy, performance engineering, and conversion architecture."
              centered={false}
              className="mb-0 max-w-xl"
            />
            <Link
              to="/blog"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
            >
              <span>Read All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA Section */}
      <CTASection />
    </div>
  );
};

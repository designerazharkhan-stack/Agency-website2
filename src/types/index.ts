export interface SiteSettings {
  agencyName: string;
  tagline: string;
  logoUrl?: string;
  faviconUrl?: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  cityCountry: string;
  foundedYear: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    dribbble?: string;
    behance?: string;
  };
}

export interface HomepageSettings {
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  stats: Array<{
    id: string;
    value: string;
    suffix: string;
    label: string;
    description?: string;
  }>;
  whyUs: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  workProcess: Array<{
    step: string;
    title: string;
    description: string;
  }>;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  deliverables?: string[];
  ctaText?: string;
  ctaLink?: string;
  order: number;
  published: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  featuredImage: string;
  gallery: string[];
  technologies: string[];
  shortDescription: string;
  description: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  projectUrl?: string;
  completionDate: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  published: boolean;
  featured: boolean;
  readTime: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  position: string;
  company: string;
  avatar: string;
  testimonial: string;
  rating: number;
  published: boolean;
  order: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  isPopular: boolean;
  ctaText: string;
  ctaLink: string;
  published: boolean;
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface SeoSettings {
  siteTitle: string;
  defaultMetaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'superadmin' | 'admin' | 'editor';
}

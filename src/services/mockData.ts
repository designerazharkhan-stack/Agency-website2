import {
  SiteSettings,
  HomepageSettings,
  Service,
  Project,
  BlogPost,
  Testimonial,
  PricingPlan,
  ContactMessage,
  SeoSettings
} from '../types';

export const initialSiteSettings: SiteSettings = {
  agencyName: "Agency Website",
  tagline: "Engineering Extraordinary Digital Flagships & Bespoke Products",
  logoUrl: "",
  faviconUrl: "",
  email: "hello@agencywebsite.com",
  phone: "+1 (800) 452-9840",
  whatsapp: "+1 (800) 452-9840",
  address: "450 Lexington Avenue, Suite 2400",
  cityCountry: "New York, NY 10017, USA",
  foundedYear: "2018",
  socialLinks: {
    twitter: "https://twitter.com/agencywebsite",
    linkedin: "https://linkedin.com/company/agencywebsite",
    github: "https://github.com/agencywebsite",
    instagram: "https://instagram.com/agencywebsite",
    dribbble: "https://dribbble.com/agencywebsite",
    behance: "https://behance.net/agencywebsite"
  }
};

export const initialHomepageSettings: HomepageSettings = {
  heroEyebrow: "Elite Digital Product Studio",
  heroTitle: "We Craft Masterpiece",
  heroHighlight: "Digital Experiences",
  heroSubtitle: "Award-winning full-cycle agency engineering high-converting web applications, custom enterprise platforms, and transformative brand identities for visionaries worldwide.",
  heroCtaText: "Start Your Project",
  heroCtaLink: "/contact",
  heroSecondaryCtaText: "Explore Showcase",
  heroSecondaryCtaLink: "/portfolio",
  stats: [
    { id: "1", value: "140", suffix: "+", label: "Flagship Projects Delivered", description: "Bespoke web applications and enterprise platforms" },
    { id: "2", value: "99.4", suffix: "%", label: "Client Satisfaction Score", description: "Across 24 global venture and enterprise partners" },
    { id: "3", value: "12", suffix: "x", label: "Average Client ROI", description: "Measured across first 12 months post-launch" },
    { id: "4", value: "18", suffix: "+", label: "Design & Tech Accolades", description: "Awwwards, FWA, and Webby recognitions" }
  ],
  whyUs: [
    {
      id: "1",
      title: "Obsessive Precision",
      description: "We don't settle for good enough. Every pixel, micro-interaction, and architectural decision is meticulously refined to project unmatched quality.",
      icon: "Sparkles"
    },
    {
      id: "2",
      title: "Commercial Velocity",
      description: "Our engineered design sprints and battle-tested codebases compress 6-month timelines into hyper-focused, production-grade 6-week sprints.",
      icon: "Zap"
    },
    {
      id: "3",
      title: "Full-Stack Ownership",
      description: "From research and high-fidelity UX prototyping to distributed cloud architecture, our senior-only team owns the complete lifecycle.",
      icon: "ShieldCheck"
    },
    {
      id: "4",
      title: "Measurable Impact",
      description: "Aesthetics backed by conversion engineering. We construct interfaces engineered to elevate authority, generate leads, and maximize revenue.",
      icon: "TrendingUp"
    }
  ],
  workProcess: [
    {
      step: "01",
      title: "Discovery & Blueprinting",
      description: "Deep-dive workshops to uncover your market differentiator, target demographics, technical requirements, and strategic conversion goals."
    },
    {
      step: "02",
      title: "Strategic Architecture",
      description: "Information architecture, conversion funnels, data schemas, and high-level technical blueprints before crafting the visual canvas."
    },
    {
      step: "03",
      title: "Bespoke UI/UX Design",
      description: "Crafting distinct art direction, custom design systems, responsive micro-interactions, and immersive clickable prototypes."
    },
    {
      step: "04",
      title: "Full-Stack Engineering",
      description: "Clean, robust code written in modern TypeScript, React, Tailwind, and scalable cloud backends with zero technical debt."
    },
    {
      step: "05",
      title: "Rigorous QA & Audit",
      description: "Cross-device responsiveness tests, performance optimization, accessibility (a11y) audits, and penetration security sweeps."
    },
    {
      step: "06",
      title: "Launch & Evolution",
      description: "Zero-downtime deployment, continuous telemetry monitoring, conversion analytics setup, and iterative growth sprints."
    }
  ]
};

export const initialServices: Service[] = [
  {
    id: "web-dev",
    title: "Web Development",
    slug: "web-development",
    shortDescription: "Bespoke, high-performance web applications built on modern frameworks with micro-second load speeds and resilient architecture.",
    fullDescription: "We engineer scalable, enterprise-grade web applications that merge striking aesthetic finesse with fault-tolerant cloud backends. Using React, Next.js, TypeScript, and modern APIs, we build lightning-fast platforms tailored precisely to your operational workflow.",
    icon: "Code",
    features: [
      "Custom React & TypeScript Web Applications",
      "Headless CMS Architecture & JAMstack",
      "RESTful & GraphQL API Integrations",
      "Sub-second Core Web Vitals Optimization",
      "PWA (Progressive Web App) Capabilities",
      "Enterprise Cloud Infrastructure Deployment"
    ],
    deliverables: [
      "Production React / Next.js Source Code",
      "Automated CI/CD Pipeline Configuration",
      "Interactive Component Documentation",
      "Full Web Vitals 95+ Audit Report"
    ],
    ctaText: "Engineer Your Platform",
    ctaLink: "/contact?service=web-development",
    order: 1,
    published: true
  },
  {
    id: "wordpress-dev",
    title: "WordPress Development",
    slug: "wordpress-development",
    shortDescription: "Enterprise-tier custom WordPress & WooCommerce builds with bespoke theme engineering and headless decoupled options.",
    fullDescription: "Transcend standard bloated templates. We build bespoke, lightweight WordPress themes and decoupled headless frontends that provide effortless marketing editing while maintaining ironclad security and blazing page load speeds.",
    icon: "Layers",
    features: [
      "100% Custom Block-Based Gutenberg Themes",
      "Decoupled Headless WordPress Deployments",
      "Advanced Custom Fields (ACF) Pro Architecture",
      "High-Security Hardening & WAF Integration",
      "Complex Multi-Currency WooCommerce Systems",
      "Zero-Bloat Speed & Caching Tuning"
    ],
    deliverables: [
      "Bespoke Theme Package (Clean Code)",
      "Editor Training Videos & Manual",
      "Custom Gutenberg Block Library",
      "Automated Daily Backup Safeguards"
    ],
    ctaText: "Build Custom WordPress",
    ctaLink: "/contact?service=wordpress-development",
    order: 2,
    published: true
  },
  {
    id: "uiux-design",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    shortDescription: "Luxury design systems, intuitive user journeys, and cinematic prototypes that transform casual visitors into passionate brand advocates.",
    fullDescription: "Design is not just decoration—it is your most powerful sales engine. Our design philosophy pairs psychological persuasion principles with refined Swiss typographic balance, delivering unforgettable user journeys across every device breakpoint.",
    icon: "Palette",
    features: [
      "Comprehensive User Journey & Funnel Mapping",
      "High-Fidelity Interactive Figma Prototypes",
      "Multi-Brand Living Design Systems & Tokens",
      "Usability Testing & Micro-Interaction Design",
      "Accessibility (WCAG 2.1 AA) Compliance",
      "Mobile-First Responsive Wireframing"
    ],
    deliverables: [
      "Complete Figma Design System File",
      "High-Fidelity Interactive Prototypes",
      "Custom Iconography & Graphic Assets",
      "Developer Handoff Specification Spec"
    ],
    ctaText: "Elevate Your Interface",
    ctaLink: "/contact?service=ui-ux-design",
    order: 3,
    published: true
  },
  {
    id: "seo",
    title: "SEO & Growth",
    slug: "seo",
    shortDescription: "Data-driven organic search dominance through technical optimization, semantic schema architectures, and high-authority content strategies.",
    fullDescription: "Capture high-intent enterprise buyers at the exact moment they search for your solutions. We overhaul your technical foundation, structure deep Schema.org rich results, and build sustainable organic traffic pipelines that outperform paid acquisition.",
    icon: "Search",
    features: [
      "Technical Core Web Vitals & Crawl Budget Audits",
      "Semantic Schema.org & JSON-LD Rich Snippets",
      "Competitive Keyword Dominance Roadmaps",
      "High-Intent Editorial Content Architecture",
      "Local & International SEO Localization",
      "Automated Rank Tracking & ROI Reporting"
    ],
    deliverables: [
      "Comprehensive 50-Point Technical SEO Audit",
      "6-Month Keyword Authority Strategy",
      "Full JSON-LD Structured Data Implementation",
      "Monthly Live Ranking & Traffic Dashboard"
    ],
    ctaText: "Dominate Search Rankings",
    ctaLink: "/contact?service=seo",
    order: 4,
    published: true
  },
  {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    slug: "ecommerce",
    shortDescription: "Bespoke digital storefronts engineered for maximum average order value, friction-free checkout flows, and global scaling.",
    fullDescription: "Turn your product line into a global luxury shopping phenomenon. We construct high-converting e-commerce environments with instant product filters, seamless checkout funnels, inventory ERP synchronizations, and localized payment gateways.",
    icon: "ShoppingBag",
    features: [
      "Bespoke Shopify Plus & Custom React Storefronts",
      "One-Page High-Conversion Checkout Funnels",
      "ERP, CRM & Warehouse Logistics Integration",
      "Dynamic Product Personalization Engines",
      "Global Multi-Currency & Tax Localization",
      "Frictionless Mobile-First Purchase Journeys"
    ],
    deliverables: [
      "Fully Integrated Storefront Platform",
      "Payment Gateway & Tax Automation Setup",
      "Abandoned Cart Recovery Workflows",
      "Inventory Management Synchronization"
    ],
    ctaText: "Launch Your Storefront",
    ctaLink: "/contact?service=ecommerce",
    order: 5,
    published: true
  },
  {
    id: "maintenance",
    title: "Website Maintenance & Care",
    slug: "website-maintenance",
    shortDescription: "White-glove 24/7 proactive security monitoring, guaranteed SLA response times, cloud backups, and continuous iterative enhancements.",
    fullDescription: "Your digital asset demands proactive vigilance. Our dedicated retainer engineers monitor uptime every 60 seconds, apply critical zero-day security patches, run automated weekly backups, and continuously ship performance iterations.",
    icon: "Wrench",
    features: [
      "24/7/365 Real-Time Uptime & Anomaly Monitoring",
      "Guaranteed Rapid-Response SLA (Sub 2-Hours)",
      "Daily Automated Off-Site Encrypted Backups",
      "Proactive Security Scanning & Firewall Hardening",
      "Core, Theme & Plugin Staging-First Updates",
      "Monthly Dedicated Feature Development Hours"
    ],
    deliverables: [
      "Monthly Executive Health & Metric Report",
      "Dedicated Slack Channel With Senior Engineers",
      "Instant Disaster Recovery Guarantee",
      "Staging Environment Sync & Maintenance"
    ],
    ctaText: "Protect Your Digital Asset",
    ctaLink: "/contact?service=website-maintenance",
    order: 6,
    published: true
  }
];

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "Aura Capital Asset Management",
    slug: "aura-capital-asset-management",
    client: "Aura Private Wealth",
    category: "Web Development",
    featuredImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Chart.js", "Cloudflare"],
    shortDescription: "High-security institutional investor portal and portfolio intelligence platform managing over $2.4B in assets under management.",
    description: "Aura Capital required an executive-tier institutional investor platform that married Swiss-grade financial privacy with instantaneous portfolio performance analytics. We engineered a responsive web platform equipped with real-time financial metrics, encrypted document vaults, and biometric session authentications.",
    challenge: "The legacy infrastructure struggled with real-time portfolio rebalancing feeds and failed stringent institutional SOC2 compliance audits.",
    solution: "We re-architected the client portal from the ground up using React and TypeScript, deploying zero-trust API layers and client-side data virtualization.",
    results: [
      "99.99% system availability through market volatility",
      "78% reduction in client inquiry load through self-service portfolio exports",
      "$2.4B in assets monitored with zero security incidents",
      "Average session load time reduced from 4.2s to 320ms"
    ],
    projectUrl: "https://example.com/aura-capital",
    completionDate: "Q3 2025",
    featured: true,
    published: true,
    order: 1
  },
  {
    id: "proj-2",
    title: "Verve Haute Horlogerie",
    slug: "verve-haute-horlogerie",
    client: "Verve Geneve",
    category: "E-commerce",
    featuredImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop"
    ],
    technologies: ["Headless Commerce", "React", "Three.js 3D", "Tailwind CSS", "Stripe Private"],
    shortDescription: "Immersive 3D interactive shopping experience for an ultra-luxury independent Swiss timepiece manufacturer.",
    description: "Verve wanted to replicate the intimate feeling of a Geneva watch boutique in the browser. We built an interactive 3D configurator letting collectors customize dials, straps, and tourbillon finishes in real time before reserving with exclusive private concierge checkouts.",
    challenge: "Achieving 60fps 3D rendering on mobile Safari without draining device batteries or compromising photorealistic metallic reflections.",
    solution: "Custom WebGL shaders, compressed Draco geometry meshes, and responsive progressive textures optimized for luxury touch displays.",
    results: [
      "312% increase in VIP pre-order conversion rates",
      "4.8 minutes average engaged session duration",
      "Featured across Awwwards Site of the Day and FWA of the Day",
      "Full sell-out of limited edition release within 48 hours"
    ],
    projectUrl: "https://example.com/verve",
    completionDate: "Q4 2025",
    featured: true,
    published: true,
    order: 2
  },
  {
    id: "proj-3",
    title: "Kore Autonomous Robotics",
    slug: "kore-autonomous-robotics",
    client: "Kore Dynamics",
    category: "UI/UX Design",
    featuredImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop"
    ],
    technologies: ["Figma Design System", "React", "Tailwind CSS", "Design Tokens", "Telemetry Viz"],
    shortDescription: "Industrial fleet telemetry dashboard and tele-operation interface for autonomous logistics robots.",
    description: "Engineered an ergonomics-first design system for mission control dispatchers commanding fleets of autonomous delivery and warehouse bots. High contrast, accessible under low-light control rooms, and zero lag in emergency alert broadcasts.",
    challenge: "Dispatchers were experiencing cognitive overload when monitoring over 200 concurrent telemetry feeds simultaneously.",
    solution: "Hierarchical spatial grid layouts, contextual notification clustering, and tactile keyboard shortcuts designed for high-stress operational environments.",
    results: [
      "42% faster anomaly reaction times in field tests",
      "Standardized 240+ UI tokens across web and embedded tablet consoles",
      "Zero operator fatigue complaints during 12-hour shifts",
      "Successfully scaled to 1,200 active bots across North American hubs"
    ],
    projectUrl: "https://example.com/kore",
    completionDate: "Q1 2026",
    featured: true,
    published: true,
    order: 3
  },
  {
    id: "proj-4",
    title: "Sovereign Law & Global Advisory",
    slug: "sovereign-law-global-advisory",
    client: "Sovereign Legal LLP",
    category: "WordPress Development",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop"
    ],
    technologies: ["Custom Gutenberg", "ACF Pro", "Alpine.js", "Tailwind CSS", "Algolia Search"],
    shortDescription: "Multilingual digital flagship and case intelligence repository for an international corporate arbitration law firm.",
    description: "Sovereign Legal required a sophisticated digital presence worthy of their $500M+ international dispute practice. We built a bespoke, zero-bloat WordPress platform with instant multilingual search, attorney biographies, and secure client brief downloads.",
    challenge: "Sub-second search across 10,000+ legal briefs and multi-jurisdiction attorney publications in English, French, and Mandarin.",
    solution: "Custom Algolia search indexes hooked to custom post types with instantaneous faceted filtering.",
    results: [
      "100/100 Google Lighthouse Performance Score",
      "240% increase in inbound international corporate inquiries",
      "Multi-region CDN deployment with instantaneous edge caching",
      "Seamless content publishing workflow for 60+ global partners"
    ],
    projectUrl: "https://example.com/sovereign",
    completionDate: "Q2 2025",
    featured: false,
    published: true,
    order: 4
  },
  {
    id: "proj-5",
    title: "Apex Architectural Atelier",
    slug: "apex-architectural-atelier",
    client: "Apex Architects",
    category: "Web Development",
    featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    shortDescription: "Minimalist, editorial portfolio showcasing high-concept residential architecture and biophilic engineering.",
    description: "A showcase of physical space translated into pure digital elegance. Features expansive photographic canvases, smooth inertial scroll transitions, and subtle sound design that honors the serenity of architectural mastery.",
    challenge: "Rendering ultra-high resolution photography without compromising instantaneous navigational pacing.",
    solution: "Smart adaptive image sizing, WebP decoding on worker threads, and progressive blur-up placeholders.",
    results: [
      "Global architectural media spotlight feature",
      "Inbound inquiries booked out through 2027",
      "Average bounce rate reduced from 61% to 18%",
      "Won CSS Design Awards Site of the Month"
    ],
    projectUrl: "https://example.com/apex",
    completionDate: "Q4 2025",
    featured: false,
    published: true,
    order: 5
  },
  {
    id: "proj-6",
    title: "NEXUS Quantum Cryptography",
    slug: "nexus-quantum-cryptography",
    client: "Nexus Systems Inc.",
    category: "SEO",
    featuredImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop"
    ],
    technologies: ["Next.js", "Structured Data", "TypeScript", "Search Console", "Cloudflare Pages"],
    shortDescription: "Organic authority sprint positioning a post-quantum cybersecurity pioneer at the top of national defense procurement search.",
    description: "Positioned a deep-tech cybersecurity firm as the authoritative voice in post-quantum data protection. Implemented semantic knowledge graph tagging, technical code snippet indexing, and whitepaper lead magnet distribution.",
    challenge: "Extremely esoteric terminology with low keyword volume but high million-dollar enterprise contract value.",
    solution: "Laser-focused informational search intent targeting CTOs, CISOs, and federal procurement officers.",
    results: [
      "Ranked #1 for 34 critical enterprise security terms",
      "Generated 14 Fortune 100 enterprise RFPs in 6 months",
      "580% surge in organic C-level traffic",
      "Acquisition proposal initiated by major defense conglomerate"
    ],
    projectUrl: "https://example.com/nexus",
    completionDate: "Q1 2026",
    featured: false,
    published: true,
    order: 6
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Architecture of Distinction: Why Generic Templates Cost Millions in Lost Equity",
    slug: "architecture-of-distinction-why-templates-fail",
    excerpt: "In a commoditized digital landscape, distinct art direction and bespoke performance engineering are the most defensible moats an enterprise can possess.",
    content: `
## The Illusion of Efficiency in Off-the-Shelf Themes

Every year, enterprises waste hundreds of thousands of dollars attempting to force their unique value proposition into rigid, pre-packaged digital templates. On surface inspection, starting with an off-the-shelf theme promises accelerated go-to-market. In reality, it acts as an invisible tax on your brand equity.

When your brand looks identical to thousands of other ventures utilizing the same Bootstrap or WordPress marketplace scaffolding, prospective enterprise buyers subconsciously evaluate your product at commodity pricing.

> "A bespoke digital interface is not an expense—it is the physical showroom of your software and service capabilities."

### 1. The Hidden Cost of Code Bloat

Commercial templates are engineered to serve everyone, which means they are optimized for no one. They bundle dozens of unused scripts, unoptimized CSS frameworks, and obsolete polyfills. 

The consequences are direct:
- **Catastrophic Core Web Vitals:** Mobile users abandon pages taking longer than 2.5 seconds to render interactive content.
- **Organic Ranking Penalties:** Google prioritizes responsive, low-latency DOMs. Bloated templates suffer systematic ranking decay.
- **Security Vulnerabilities:** Generic plugins and abandoned theme updates account for over 85% of commercial website breaches.

### 2. Crafting Bespoke Digital Systems

At Agency Website, we build bespoke digital flagships engineered from clean architecture. By handcrafting design systems tailored strictly to your user journeys, we eliminate 90% of superfluous code.

The result is instantaneous navigation, ironclad stability, and an aura of authority that justifies premium pricing.

### 3. The 3 Pillars of High-Conversion Digital Flagships

1. **Typographic Authority:** Investing in purposeful typographic hierarchy that commands attention without screaming.
2. **Intentional Kinetic Feedback:** Micro-interactions that acknowledge user gestures with tactile fluidity.
3. **Resilient Cloud Architectures:** Leveraging serverless edge deployments that laugh off sudden traffic surges.
    `,
    featuredImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Julian Vance",
      role: "Principal Design Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    category: "Design Strategy",
    tags: ["UI/UX", "Brand Equity", "Performance", "Web Architecture"],
    publishedAt: "2026-09-18T10:00:00.000Z",
    updatedAt: "2026-09-20T14:30:00.000Z",
    published: true,
    featured: true,
    readTime: "5 min read",
    seoTitle: "The Architecture of Distinction: Why Templates Fail | Agency Website",
    seoDescription: "Discover why generic website templates hurt enterprise conversion rates and how bespoke digital architecture builds enduring brand authority."
  },
  {
    id: "post-2",
    title: "Sub-Second Web Vitals: Engineering High-Performance Single Page Applications",
    slug: "sub-second-web-vitals-engineering-high-performance-spa",
    excerpt: "A technical dissection of our zero-compromise frontend stack: code splitting, route prefetching, asset prioritization, and edge rendering.",
    content: `
## Latency Is the Mind-Killer

In modern digital products, every 100 milliseconds of latency degrades user engagement and transactional conversion rates by up to 7%. The modern web is plagued by heavy JavaScript bundles that choke low-power mobile CPU cores.

Here is the exact playbook we employ at Agency Website to guarantee 98+ Lighthouse scores across complex commercial applications.

### Selective Code Splitting & Dynamic Imports

Never send code to the client that is not required for the immediate viewport. Using Vite and modern bundler splits, we isolate heavy modal forms, interactive charts, and administrative tooling into lazy chunks.

\`\`\`typescript
// Lazy load route chunks cleanly
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
\`\`\`

### Asset Prioritization & Font Loading Discipline

Fonts are frequently the single greatest offender in Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP). By preconnecting to trusted font CDNs and enforcing \`font-display: swap\`, text remains legible immediately while styling hydrates seamlessly.

### Edge Caching and Smart Invalidation

Static assets should live at the closest network edge to your user. Combining Cloudflare cache rules with immutable content hashes guarantees instant repeat visits without cold starts.
    `,
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Marcus Sterling",
      role: "Chief Technology Officer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    category: "Engineering",
    tags: ["React", "Performance", "Vite", "Core Web Vitals"],
    publishedAt: "2026-08-25T09:00:00.000Z",
    updatedAt: "2026-08-25T09:00:00.000Z",
    published: true,
    featured: false,
    readTime: "7 min read",
    seoTitle: "Sub-Second Web Vitals Engineering Playbook | Agency Website",
    seoDescription: "How we engineer lightning-fast React applications with sub-second page loads and zero layout shift."
  },
  {
    id: "post-3",
    title: "The Death of Skeuomorphism and Flat Design: Entering the Era of Kinetic Luxury",
    slug: "death-of-flat-design-entering-kinetic-luxury",
    excerpt: "Explore how subtle lighting, rich dark palettes, and tactile micro-physics are defining the next wave of high-end digital design.",
    content: `
## Beyond the Mundane Gray Box

For a decade, corporate web design has been trapped in a monotonous cycle of sterile white backgrounds, flat colorful cards, and oversized rounded pill buttons. While functional, it stripped software of character, luxury, and tactile joy.

A new paradigm has emerged: **Kinetic Luxury**.

### The Anatomy of Kinetic Luxury

1. **Deep, Multi-layered Obsidian Palettes:** Rather than harsh #000000 black, luxury digital environments utilize layered charcoal, midnight navy, and warm graphite tones that provide cinematic depth.
2. **Metallic Accent Lighting:** Subtle gold, champagne, and platinum highlights that catch the eye selectively to direct conversion momentum.
3. **Restrained Typography:** Pairing timeless classical serif display titles with razor-sharp geometric sans-serif body copy for effortless legibility.
4. **Physical Micro-Interactions:** Buttons that compress subtly on click; hover effects that reveal radiant borders; cards that respect spatial hierarchy.

The brands that adopt this aesthetic today are establishing themselves as the iconic institutions of tomorrow.
    `,
    featuredImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Elena Rostova",
      role: "Head of Creative Direction",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    },
    category: "Design Trends",
    tags: ["UI/UX", "Kinetic Design", "Luxury Aesthetics", "Typography"],
    publishedAt: "2026-07-14T11:00:00.000Z",
    updatedAt: "2026-07-15T08:00:00.000Z",
    published: true,
    featured: false,
    readTime: "4 min read",
    seoTitle: "Entering the Era of Kinetic Luxury in Digital Design | Agency Website",
    seoDescription: "An exploration into deep palettes, metallic accents, and tactile micro-physics in premium web interfaces."
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    clientName: "David Harrison",
    position: "Managing Partner",
    company: "Aura Private Wealth",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    testimonial: "Agency Website didn't just build us a portal—they elevated our entire firm's standing in the international wealth management community. Our institutional clients routinely compliment the seamless performance and security.",
    rating: 5,
    published: true,
    order: 1
  },
  {
    id: "test-2",
    clientName: "Genevieve Moreau",
    position: "Chief Commercial Officer",
    company: "Verve Haute Horlogerie",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    testimonial: "The 3D interactive timepiece showcase exceeded our highest expectations. Our limited edition release completely sold out in less than 48 hours. Working with their team felt like collaborating with Michelin-star artisans.",
    rating: 5,
    published: true,
    order: 2
  },
  {
    id: "test-3",
    clientName: "Vikram Mehta",
    position: "VP of Engineering",
    company: "Kore Dynamics",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    testimonial: "Their senior engineers cut right through technical fluff. They delivered an autonomous telemetry dashboard that reduced operator fatigue by 40% and withstood our multi-datacenter stress tests on day one.",
    rating: 5,
    published: true,
    order: 3
  },
  {
    id: "test-4",
    clientName: "Claire Beauchamp",
    position: "Senior Partner",
    company: "Sovereign Legal LLP",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
    testimonial: "Sublime elegance combined with lightning-quick document search. We have experienced a 240% increase in qualified inbound inquiries from multinational corporations looking for cross-border dispute counsel.",
    rating: 5,
    published: true,
    order: 4
  }
];

export const initialPricingPlans: PricingPlan[] = [
  {
    id: "plan-essential",
    name: "Digital Flagship",
    tagline: "For high-growth ventures demanding market authority",
    price: "$7,500",
    billingPeriod: "one-time",
    description: "Complete bespoke responsive web application or custom WordPress flagship with bespoke art direction, sub-second performance, and conversion tuning.",
    features: [
      "Bespoke Responsive UI/UX Design System",
      "Up to 8 Custom Engineered Pages / Sections",
      "Modern React / TypeScript or Custom WordPress",
      "Core Web Vitals 95+ Performance Guarantee",
      "Comprehensive Technical SEO & Schema.org Setup",
      "Interactive Contact & Lead Generation Funnels",
      "Full CMS Integration for Effortless Editing",
      "30 Days of Dedicated Post-Launch Support"
    ],
    notIncluded: [
      "Dedicated Full-Stack Retainer Hours",
      "Custom 3D WebGL Configurator"
    ],
    isPopular: false,
    ctaText: "Select Flagship",
    ctaLink: "/contact?plan=digital-flagship",
    published: true,
    order: 1
  },
  {
    id: "plan-enterprise",
    name: "Enterprise Studio",
    tagline: "Our most requested comprehensive full-cycle engagement",
    price: "$14,500",
    billingPeriod: "one-time",
    description: "End-to-end digital transformation including custom web application architecture, deep user research, interactive prototypes, and API integrations.",
    features: [
      "Everything in Digital Flagship tier",
      "Up to 18 Custom Engineered Page Templates",
      "Complex Database Architecture & Auth Layers",
      "Third-Party API & ERP Integration Sprints",
      "Micro-Interactions & Kinetic Motion Design",
      "Rigorous Multi-Browser & Security Audits",
      "Comprehensive Team Training & Video Documentation",
      "90 Days of Dedicated Priority Engineering Support",
      "Direct Private Slack Channel With Senior Leads"
    ],
    notIncluded: [],
    isPopular: true,
    ctaText: "Initiate Enterprise Studio",
    ctaLink: "/contact?plan=enterprise-studio",
    published: true,
    order: 2
  },
  {
    id: "plan-retainer",
    name: "Elite Growth Retainer",
    tagline: "Continuous engineering, maintenance & optimization",
    price: "$2,850",
    billingPeriod: "monthly",
    description: "Your dedicated senior engineering, design, and SEO team on demand. Continuous feature development, 24/7 uptime monitoring, and proactive tuning.",
    features: [
      "35 Dedicated Senior Engineering & Design Hours/mo",
      "24/7/365 Proactive Uptime & Security Monitoring",
      "Sub-2-Hour Critical Response Time SLA",
      "Bi-Weekly Conversion Rate Optimization Sprints",
      "Ongoing Technical SEO & Content Optimization",
      "Weekly Encrypted Cloud Backups & Staging Tests",
      "Unused Hours Roll Over for Up to 60 Days",
      "Cancel or Pause Anytime with 14-Day Notice"
    ],
    notIncluded: [],
    isPopular: false,
    ctaText: "Partner on Retainer",
    ctaLink: "/contact?plan=elite-growth-retainer",
    published: true,
    order: 3
  }
];

export const initialContactMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Lord Montgomery Vance",
    email: "m.vance@vanceholdings.co.uk",
    phone: "+44 20 7946 0912",
    service: "Web Development",
    budget: "$25,000 - $50,000",
    message: "We are seeking a high-caliber digital agency to reconstruct our family office asset portal. Security, privacy, and understated luxury are paramount.",
    createdAt: "2026-10-02T16:20:00.000Z",
    read: false
  },
  {
    id: "msg-2",
    name: "Sarah Chen-Lin",
    email: "schen@luminaai.tech",
    phone: "+1 (415) 890-4421",
    service: "UI/UX Design",
    budget: "$15,000 - $25,000",
    message: "We just closed our Series A and need a complete redesign of our enterprise SaaS dashboard before our global launch in November.",
    createdAt: "2026-10-01T11:45:00.000Z",
    read: true
  }
];

export const initialSeoSettings: SeoSettings = {
  siteTitle: "Agency Website | Bespoke Digital Agency & Engineering",
  defaultMetaDescription: "Premium digital agency crafting bespoke digital experiences, high-performance web development, UI/UX design, and scalable brand platforms.",
  keywords: [
    "digital agency",
    "web development",
    "UI/UX design",
    "custom wordpress",
    "enterprise web applications",
    "luxury digital design",
    "high performance frontend"
  ],
  ogTitle: "Agency Website | Bespoke Digital Agency & Engineering",
  ogDescription: "Award-winning full-cycle agency engineering high-converting web applications, custom enterprise platforms, and transformative brand identities.",
  ogImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
};

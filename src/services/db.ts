import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
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
import {
  initialSiteSettings,
  initialHomepageSettings,
  initialServices,
  initialProjects,
  initialBlogPosts,
  initialTestimonials,
  initialPricingPlans,
  initialContactMessages,
  initialSeoSettings
} from './mockData';

// Local storage keys
const STORAGE_KEYS = {
  SITE_SETTINGS: 'agency_site_settings',
  HOMEPAGE_SETTINGS: 'agency_homepage_settings',
  SEO_SETTINGS: 'agency_seo_settings',
  SERVICES: 'agency_services',
  PROJECTS: 'agency_projects',
  BLOG_POSTS: 'agency_blog_posts',
  TESTIMONIALS: 'agency_testimonials',
  PRICING_PLANS: 'agency_pricing_plans',
  MESSAGES: 'agency_contact_messages'
};

function getLocalData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch {
    return defaultValue;
  }
}

function setLocalData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to set localStorage', e);
  }
}

// ================= SITE SETTINGS =================
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'settings', 'site'));
      if (snap.exists()) {
        return snap.data() as SiteSettings;
      }
    } catch (e) {
      console.warn('Firestore fetch failed for site settings, fallback to local', e);
    }
  }
  return getLocalData<SiteSettings>(STORAGE_KEYS.SITE_SETTINGS, initialSiteSettings);
}

export async function updateSiteSettings(settings: SiteSettings): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'settings', 'site'), settings);
    } catch (e) {
      console.warn('Firestore write failed for site settings, saving locally', e);
    }
  }
  setLocalData(STORAGE_KEYS.SITE_SETTINGS, settings);
}

// ================= HOMEPAGE SETTINGS =================
export async function getHomepageSettings(): Promise<HomepageSettings> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'settings', 'homepage'));
      if (snap.exists()) {
        return snap.data() as HomepageSettings;
      }
    } catch (e) {
      console.warn('Firestore fetch failed for homepage settings, fallback to local', e);
    }
  }
  return getLocalData<HomepageSettings>(STORAGE_KEYS.HOMEPAGE_SETTINGS, initialHomepageSettings);
}

export async function updateHomepageSettings(settings: HomepageSettings): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'settings', 'homepage'), settings);
    } catch (e) {
      console.warn('Firestore write failed for homepage settings, saving locally', e);
    }
  }
  setLocalData(STORAGE_KEYS.HOMEPAGE_SETTINGS, settings);
}

// ================= SEO SETTINGS =================
export async function getSeoSettings(): Promise<SeoSettings> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'settings', 'seo'));
      if (snap.exists()) {
        return snap.data() as SeoSettings;
      }
    } catch (e) {
      console.warn('Firestore fetch failed for seo settings, fallback to local', e);
    }
  }
  return getLocalData<SeoSettings>(STORAGE_KEYS.SEO_SETTINGS, initialSeoSettings);
}

export async function updateSeoSettings(settings: SeoSettings): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'settings', 'seo'), settings);
    } catch (e) {
      console.warn('Firestore write failed for seo settings, saving locally', e);
    }
  }
  setLocalData(STORAGE_KEYS.SEO_SETTINGS, settings);
}

// ================= SERVICES =================
export async function getServices(includeUnpublished = false): Promise<Service[]> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = collection(db, 'services');
      const q = includeUnpublished
        ? query(ref, orderBy('order', 'asc'))
        : query(ref, where('published', '==', true), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Service));
      }
    } catch (e) {
      console.warn('Firestore fetch failed for services, fallback to local', e);
    }
  }
  const all = getLocalData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
  return includeUnpublished ? all : all.filter(s => s.published);
}

export async function saveService(service: Service): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'services', service.id), service);
    } catch (e) {
      console.warn('Firestore write failed for service, saving locally', e);
    }
  }
  const all = getLocalData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
  const index = all.findIndex(s => s.id === service.id);
  if (index >= 0) {
    all[index] = service;
  } else {
    all.push(service);
  }
  setLocalData(STORAGE_KEYS.SERVICES, all);
}

export async function deleteService(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (e) {
      console.warn('Firestore delete failed for service, deleting locally', e);
    }
  }
  const all = getLocalData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
  setLocalData(STORAGE_KEYS.SERVICES, all.filter(s => s.id !== id));
}

// ================= PROJECTS =================
export async function getProjects(includeUnpublished = false): Promise<Project[]> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = collection(db, 'projects');
      const q = includeUnpublished
        ? query(ref, orderBy('order', 'asc'))
        : query(ref, where('published', '==', true), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Project));
      }
    } catch (e) {
      console.warn('Firestore fetch failed for projects, fallback to local', e);
    }
  }
  const all = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  return includeUnpublished ? all : all.filter(p => p.published);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects(true);
  return all.find(p => p.slug === slug) || null;
}

export async function saveProject(project: Project): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'projects', project.id), project);
    } catch (e) {
      console.warn('Firestore write failed for project, saving locally', e);
    }
  }
  const all = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  const index = all.findIndex(p => p.id === project.id);
  if (index >= 0) {
    all[index] = project;
  } else {
    all.push(project);
  }
  setLocalData(STORAGE_KEYS.PROJECTS, all);
}

export async function deleteProject(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (e) {
      console.warn('Firestore delete failed for project, deleting locally', e);
    }
  }
  const all = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  setLocalData(STORAGE_KEYS.PROJECTS, all.filter(p => p.id !== id));
}

// ================= BLOG POSTS =================
export async function getBlogPosts(includeUnpublished = false): Promise<BlogPost[]> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = collection(db, 'blog_posts');
      const q = includeUnpublished
        ? query(ref, orderBy('publishedAt', 'desc'))
        : query(ref, where('published', '==', true), orderBy('publishedAt', 'desc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost));
      }
    } catch (e) {
      console.warn('Firestore fetch failed for blog posts, fallback to local', e);
    }
  }
  const all = getLocalData<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, initialBlogPosts);
  return includeUnpublished ? all : all.filter(p => p.published);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const all = await getBlogPosts(true);
  return all.find(p => p.slug === slug) || null;
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'blog_posts', post.id), post);
    } catch (e) {
      console.warn('Firestore write failed for blog post, saving locally', e);
    }
  }
  const all = getLocalData<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, initialBlogPosts);
  const index = all.findIndex(p => p.id === post.id);
  if (index >= 0) {
    all[index] = post;
  } else {
    all.push(post);
  }
  setLocalData(STORAGE_KEYS.BLOG_POSTS, all);
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'blog_posts', id));
    } catch (e) {
      console.warn('Firestore delete failed for blog post, deleting locally', e);
    }
  }
  const all = getLocalData<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, initialBlogPosts);
  setLocalData(STORAGE_KEYS.BLOG_POSTS, all.filter(p => p.id !== id));
}

// ================= TESTIMONIALS =================
export async function getTestimonials(includeUnpublished = false): Promise<Testimonial[]> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = collection(db, 'testimonials');
      const q = includeUnpublished
        ? query(ref, orderBy('order', 'asc'))
        : query(ref, where('published', '==', true), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial));
      }
    } catch (e) {
      console.warn('Firestore fetch failed for testimonials, fallback to local', e);
    }
  }
  const all = getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  return includeUnpublished ? all : all.filter(t => t.published);
}

export async function saveTestimonial(testimonial: Testimonial): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'testimonials', testimonial.id), testimonial);
    } catch (e) {
      console.warn('Firestore write failed for testimonial, saving locally', e);
    }
  }
  const all = getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  const index = all.findIndex(t => t.id === testimonial.id);
  if (index >= 0) {
    all[index] = testimonial;
  } else {
    all.push(testimonial);
  }
  setLocalData(STORAGE_KEYS.TESTIMONIALS, all);
}

export async function deleteTestimonial(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (e) {
      console.warn('Firestore delete failed for testimonial, deleting locally', e);
    }
  }
  const all = getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  setLocalData(STORAGE_KEYS.TESTIMONIALS, all.filter(t => t.id !== id));
}

// ================= PRICING PLANS =================
export async function getPricingPlans(includeUnpublished = false): Promise<PricingPlan[]> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = collection(db, 'pricing_plans');
      const q = includeUnpublished
        ? query(ref, orderBy('order', 'asc'))
        : query(ref, where('published', '==', true), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as PricingPlan));
      }
    } catch (e) {
      console.warn('Firestore fetch failed for pricing plans, fallback to local', e);
    }
  }
  const all = getLocalData<PricingPlan[]>(STORAGE_KEYS.PRICING_PLANS, initialPricingPlans);
  return includeUnpublished ? all : all.filter(p => p.published);
}

export async function savePricingPlan(plan: PricingPlan): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'pricing_plans', plan.id), plan);
    } catch (e) {
      console.warn('Firestore write failed for pricing plan, saving locally', e);
    }
  }
  const all = getLocalData<PricingPlan[]>(STORAGE_KEYS.PRICING_PLANS, initialPricingPlans);
  const index = all.findIndex(p => p.id === plan.id);
  if (index >= 0) {
    all[index] = plan;
  } else {
    all.push(plan);
  }
  setLocalData(STORAGE_KEYS.PRICING_PLANS, all);
}

export async function deletePricingPlan(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'pricing_plans', id));
    } catch (e) {
      console.warn('Firestore delete failed for pricing plan, deleting locally', e);
    }
  }
  const all = getLocalData<PricingPlan[]>(STORAGE_KEYS.PRICING_PLANS, initialPricingPlans);
  setLocalData(STORAGE_KEYS.PRICING_PLANS, all.filter(p => p.id !== id));
}

// ================= CONTACT MESSAGES =================
export async function getContactMessages(): Promise<ContactMessage[]> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = collection(db, 'contact_messages');
      const q = query(ref, orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage));
      }
    } catch (e) {
      console.warn('Firestore fetch failed for messages, fallback to local', e);
    }
  }
  return getLocalData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialContactMessages);
}

export async function saveContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): Promise<ContactMessage> {
  const newMsg: ContactMessage = {
    ...message,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'contact_messages', newMsg.id), newMsg);
    } catch (e) {
      console.warn('Firestore write failed for contact message, saving locally', e);
    }
  }
  const all = getLocalData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialContactMessages);
  all.unshift(newMsg);
  setLocalData(STORAGE_KEYS.MESSAGES, all);
  return newMsg;
}

export async function markMessageRead(id: string, read = true): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'contact_messages', id), { read }, { merge: true });
    } catch (e) {
      console.warn('Firestore update failed for message, updating locally', e);
    }
  }
  const all = getLocalData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialContactMessages);
  const found = all.find(m => m.id === id);
  if (found) {
    found.read = read;
    setLocalData(STORAGE_KEYS.MESSAGES, all);
  }
}

export async function deleteContactMessage(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'contact_messages', id));
    } catch (e) {
      console.warn('Firestore delete failed for message, deleting locally', e);
    }
  }
  const all = getLocalData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialContactMessages);
  setLocalData(STORAGE_KEYS.MESSAGES, all.filter(m => m.id !== id));
}

// Reset data helper for admin testing
export function resetToSeedData(): void {
  localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(initialSiteSettings));
  localStorage.setItem(STORAGE_KEYS.HOMEPAGE_SETTINGS, JSON.stringify(initialHomepageSettings));
  localStorage.setItem(STORAGE_KEYS.SEO_SETTINGS, JSON.stringify(initialSeoSettings));
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(initialServices));
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
  localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(initialBlogPosts));
  localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(initialTestimonials));
  localStorage.setItem(STORAGE_KEYS.PRICING_PLANS, JSON.stringify(initialPricingPlans));
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(initialContactMessages));
}

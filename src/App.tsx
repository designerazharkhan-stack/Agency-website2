import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { ProjectDetails } from './pages/ProjectDetails';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Pricing } from './pages/Pricing';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview';
import { AdminSiteSettings } from './pages/admin/AdminSiteSettings';
import { AdminHomepage } from './pages/admin/AdminHomepage';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminPortfolio } from './pages/admin/AdminPortfolio';
import { AdminBlog } from './pages/admin/AdminBlog';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminPricing } from './pages/admin/AdminPricing';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSeo } from './pages/admin/AdminSeo';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public Layout with Luxury Navbar & Footer
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0c10] text-[#e0e2ec]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SiteProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes with Navbar and Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<ProjectDetails />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboardOverview />} />
              <Route path="site-settings" element={<AdminSiteSettings />} />
              <Route path="homepage" element={<AdminHomepage />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="portfolio" element={<AdminPortfolio />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="pricing" element={<AdminPricing />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="seo" element={<AdminSeo />} />
            </Route>

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SiteProvider>
    </AuthProvider>
  );
}

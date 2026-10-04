import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { getContactMessages } from '../../services/db';

export const AdminLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    async function checkUnread() {
      try {
        const msgs = await getContactMessages();
        const unread = msgs.filter((m) => !m.read).length;
        setUnreadCount(unread);
      } catch (e) {
        console.warn('Error fetching unread messages:', e);
      }
    }
    checkUnread();
  }, [location.pathname]);

  const getHeaderInfo = () => {
    const path = location.pathname;
    if (path.includes('/site-settings')) return { title: 'Site Brand Settings', subtitle: 'Manage identity, contacts, and social media channels' };
    if (path.includes('/homepage')) return { title: 'Homepage Content Studio', subtitle: 'Edit hero copy, statistics, core reasons, and process' };
    if (path.includes('/services')) return { title: 'Service Practices', subtitle: 'Create, update, and publish agency capabilities' };
    if (path.includes('/portfolio')) return { title: 'Portfolio & Case Studies', subtitle: 'Curate client projects, technical stacks, and galleries' };
    if (path.includes('/blog')) return { title: 'Publication Library', subtitle: 'Compose and publish essays, insights, and SEO metadata' };
    if (path.includes('/testimonials')) return { title: 'Partner Testimonials', subtitle: 'Manage verified client endorsements and ratings' };
    if (path.includes('/pricing')) return { title: 'Pricing & Investment Plans', subtitle: 'Configure turnkey tiers and monthly retainers' };
    if (path.includes('/messages')) return { title: 'Inbound Inquiries', subtitle: 'Review and respond to client project discovery briefs' };
    if (path.includes('/seo')) return { title: 'Global SEO Configuration', subtitle: 'Search engine titles, meta descriptions, and OpenGraph tags' };
    return { title: 'Agency Overview', subtitle: 'High-level telemetry, counts, and quick administrative actions' };
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec]">
      {/* Sidebar */}
      <AdminSidebar
        unreadCount={unreadCount}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
          onOpenMobile={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ refreshUnread: () => {} }} />
        </main>
      </div>
    </div>
  );
};

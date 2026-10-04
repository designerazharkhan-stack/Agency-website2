import React from 'react';
import { useSite } from '../context/SiteContext';

export const PrivacyPolicy: React.FC = () => {
  const { siteSettings } = useSite();

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-[#d4af37]/20 pb-8 mb-12">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-2">
            Legal & Data Protection
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#8f96a6]">
            Effective Date: October 2026 · Compliant with GDPR, CCPA, and Global Privacy Regulations
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-[#9da5b4] text-sm leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">1. Information We Collect</h2>
            <p>
              {siteSettings.agencyName} ("Agency", "we", "us", or "our") collects information that you provide directly to us when requesting an architectural consultation, submitting project briefs, subscribing to research digests, or communicating with our team.
            </p>
            <p className="mt-2">
              This includes: name, corporate email address, telephone contact, company affiliation, project technical requirements, and estimated budget ranges.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">2. How We Utilize Your Data</h2>
            <p>
              All submitted data is utilized strictly for the evaluation of potential commercial partnerships, architectural assessment, drafting non-disclosure agreements, and responding to project inquiries. We never sell, rent, monetize, or lease your private information or project briefs to third-party brokers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">3. Security & Encryption Standards</h2>
            <p>
              We implement industry-standard encryption protocols (TLS 1.3 in transit and AES-256 at rest) across all infrastructure layers. Access to client inquiries and project data is restricted strictly to authorized senior leads and partners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">4. Cookies & Telemetry</h2>
            <p>
              Our website uses essential session cookies required for security and routing. We do not employ intrusive cross-site tracking pixels or third-party behavioral advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">5. Data Subject Rights & Contact</h2>
            <p>
              You maintain the absolute right to request access to, rectification of, or permanent deletion of any personal data stored in our systems. Direct all privacy inquiries to:
            </p>
            <div className="p-4 bg-[#12141c] border border-white/5 rounded-lg mt-3 font-mono text-xs text-[#c7ccd9]">
              {siteSettings.agencyName} Privacy Office<br />
              Email: {siteSettings.email}<br />
              Address: {siteSettings.address}, {siteSettings.cityCountry}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

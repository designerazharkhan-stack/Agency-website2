import React from 'react';
import { useSite } from '../context/SiteContext';

export const Terms: React.FC = () => {
  const { siteSettings } = useSite();

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-[#d4af37]/20 pb-8 mb-12">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-2">
            Commercial Agreement
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#8f96a6]">
            Effective Date: October 2026 · Commercial Engagement Standards
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-[#9da5b4] text-sm leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">1. Engagement Framework</h2>
            <p>
              By accessing the website of {siteSettings.agencyName} or executing an Agency Master Services Agreement (MSA) or Statement of Work (SOW), you agree to comply with these commercial terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise agreed in a customized Master Services Agreement, upon final payment of all contracted milestone fees, the Client acquires full, unconditional intellectual property ownership of custom software code, bespoke graphic designs, and digital assets engineered specifically for the Client's engagement.
            </p>
            <p className="mt-2">
              The Agency retains ownership of pre-existing internal frameworks, open-source libraries, utility packages, and proprietary architectural methodologies utilized across projects.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">3. Project Milestones & Approvals</h2>
            <p>
              Agreed timelines are contingent upon mutual responsiveness. Client feedback or deliverables approval is expected within three (3) business days of milestone submissions to ensure continuous sprint velocity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">4. Warranty & Post-Launch Care</h2>
            <p>
              All production deliverables carry our standard thirty (30) day critical bug warranty post-deployment. Bugs or regressions identified during this period resulting from our authored code are rectified at zero additional charge.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-display">5. Jurisdiction & Arbitration</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

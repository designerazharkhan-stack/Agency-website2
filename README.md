# Agency Website — Premium Digital Agency Platform

A bespoke, production-ready digital agency web platform engineered for high performance, luxury typography, dark aesthetics with gold accents, and autonomous content administration through a protected admin dashboard.

---

## 1. Project Overview

**Agency Website** is a full-featured digital flagship engineered for modern creative studios, software consultancies, and digital agencies. It features an ultra-luxury editorial design with deep obsidian surfaces, refined gold micro-lighting, and strict adherence to zero-pill metadata discipline.

The application allows agency owners to manage the entire website—homepage copy, services, portfolio case studies, thought leadership blog essays, client testimonials, investment pricing tiers, and contact inquiries—directly from an interactive control room without touching source code.

---

## 2. Tech Stack

- **Framework**: React 19 + TypeScript (Strict typing)
- **Tooling**: Vite 8 (Ultra-fast build and dev server)
- **Styling**: Tailwind CSS v4 (Custom luxury obsidian and gold color system)
- **Routing**: React Router 7 (`react-router-dom`)
- **Backend & Cloud**:
  - Firebase Authentication (Admin authentication)
  - Firebase Cloud Firestore (Content & database)
  - Firebase Cloud Storage (High-resolution media & asset delivery)
  - Firebase Hosting (Global edge CDN deployment)
- **Icons**: Lucide React
- **Animations & Effects**: Motion & CSS kinetic transitions

---

## 3. Folder Structure

```
├── public/
│   ├── robots.txt              # Search engine crawler instructions
│   └── sitemap.xml             # XML sitemap for SEO discovery
├── src/
│   ├── components/             # Reusable UI & architectural components
│   │   ├── admin/              # Admin dashboard layout, tables, navigation
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── AdminTable.tsx
│   │   ├── BlogCard.tsx        # Editorial article preview card
│   │   ├── CTASection.tsx      # High-conversion closing banner
│   │   ├── EmptyState.tsx      # Reusable empty state view
│   │   ├── ErrorState.tsx      # Error handling view
│   │   ├── Footer.tsx          # Multi-column luxury agency footer
│   │   ├── Hero.tsx            # High-impact agency hero with showcase terminal
│   │   ├── ImageUploader.tsx   # File upload & direct URL input component
│   │   ├── LoadingState.tsx    # Branded gold spinner loader
│   │   ├── Navbar.tsx          # Sticky responsive navbar with mobile drawer
│   │   ├── PricingCard.tsx     # Deliverables pricing tier card
│   │   ├── ProjectCard.tsx     # Case study preview card (Zero-pill layout)
│   │   ├── ProtectedRoute.tsx  # Admin route security guard
│   │   ├── RichTextEditor.tsx  # Markdown editor with live preview
│   │   ├── SectionHeading.tsx  # Standardized gold-accented section headers
│   │   ├── ServiceCard.tsx     # Practice capability card with icon & checklist
│   │   ├── TestimonialCard.tsx # Star rating client review card
│   │   ├── WhyUs.tsx           # Agency differentiators & live statistics
│   │   └── WorkProcess.tsx     # 6-step precision execution process
│   ├── context/
│   │   ├── AuthContext.tsx     # Firebase Auth & local admin session management
│   │   └── SiteContext.tsx     # Reactive site settings & brand state provider
│   ├── pages/
│   │   ├── admin/              # Complete 10-section admin console
│   │   │   ├── AdminBlog.tsx
│   │   │   ├── AdminDashboardOverview.tsx
│   │   │   ├── AdminHomepage.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── AdminMessages.tsx
│   │   │   ├── AdminPortfolio.tsx
│   │   │   ├── AdminPricing.tsx
│   │   │   ├── AdminSeo.tsx
│   │   │   ├── AdminServices.tsx
│   │   │   ├── AdminSiteSettings.tsx
│   │   │   └── AdminTestimonials.tsx
│   │   ├── About.tsx           # Mission, Vision, Values & Disciplines
│   │   ├── Blog.tsx            # Journal listing with search & filters
│   │   ├── BlogPost.tsx        # Case article with rich text & share tools
│   │   ├── Contact.tsx         # Discovery brief inquiry form & direct channels
│   │   ├── Home.tsx            # Full 10-section agency flagship homepage
│   │   ├── NotFound.tsx        # Luxury 404 error page
│   │   ├── Portfolio.tsx       # Case study directory with category filters
│   │   ├── Pricing.tsx         # Pricing plans with FAQ accordion
│   │   ├── PrivacyPolicy.tsx   # GDPR & CCPA compliant privacy document
│   │   ├── ProjectDetails.tsx  # In-depth case study & interactive gallery
│   │   ├── Services.tsx        # Detailed 6-practice capability breakdown
│   │   ├── Terms.tsx           # Commercial terms of service
│   │   └── Testimonials.tsx    # Client endorsements and ratings
│   ├── services/
│   │   ├── auth.ts             # Auth service with Firebase & local mode
│   │   ├── db.ts               # Firestore CRUD layer + persistent local storage
│   │   ├── firebase.ts         # Firebase App initialization & SDK exports
│   │   ├── mockData.ts         # Seed data presets (zero dummy placeholders)
│   │   └── storage.ts          # Storage service for images
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces & domain models
│   ├── App.tsx                 # Router & provider declarations
│   ├── index.css               # Tailwind CSS rules & luxury gold variables
│   └── main.tsx                # Entry point
├── .env.example                # Safe environment variable template
├── firebase.json               # Firebase Hosting and Firestore configuration
├── firestore.rules             # Production security rules
├── index.html                  # HTML entry point with luxury typography & meta
├── metadata.json               # AI Studio application metadata
├── package.json
└── tsconfig.json
```

---

## 4. Local Development

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd agency-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

*Note: The platform is engineered to run seamlessly immediately upon startup. When Firebase credentials are not yet supplied, it automatically utilizes the built-in local persistent layer with rich seed data, allowing you to preview, test, and edit every screen immediately.*

---

## 5. Environment Variables

Copy `.env.example` to `.env` in the project root:

```bash
cp .env.example .env
```

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSyD...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Authentication Domain | `agency-prod.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project Identifier | `agency-prod` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Cloud Storage Bucket Domain | `agency-prod.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Cloud Messaging Sender ID | `123456789012` |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | `1:123456789012:web:abcdef` |

---

## 6. Firebase Project Setup

1. Navigate to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and give it a name (e.g., `agency-website-prod`).
3. Follow the prompts to create the project (Google Analytics is optional).
4. In your project dashboard, click the **Web (`</>`)** icon to register a web application.
5. Copy the configuration credentials into your `.env` file.

---

## 7. Firebase Authentication Setup

1. In the Firebase Console sidebar, select **Build > Authentication**.
2. Click **Get Started**.
3. Under the **Sign-in method** tab, enable **Email/Password**.
4. Disable "Email link (passwordless sign-in)" unless specifically required.
5. Save the configuration.

---

## 8. Firestore Database Setup

1. In the Firebase Console sidebar, select **Build > Firestore Database**.
2. Click **Create Database**.
3. Select a cloud region nearest to your target client demographic (e.g., `us-east1` or `eur3`).
4. Select **Start in production mode**.
5. Once provisioned, the application will automatically read and write to the following collections:
   - `services`
   - `projects`
   - `blog_posts`
   - `testimonials`
   - `pricing_plans`
   - `contact_messages`
   - `settings` (documents: `site`, `homepage`, `seo`)

---

## 9. Firebase Cloud Storage Setup

1. In the Firebase Console sidebar, select **Build > Storage**.
2. Click **Get Started** and select the same region as Firestore.
3. Configure Storage rules to allow public read access for uploaded assets, and write access restricted to authenticated administrators.

---

## 10. Security Rules

The application includes production-tested `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isPublished() {
      return resource.data.published == true;
    }

    match /settings/{settingDoc} {
      allow read: if true;
      allow write: if isAuthenticated();
    }

    match /services/{serviceId} {
      allow read: if isPublished() || isAuthenticated();
      allow write: if isAuthenticated();
    }

    match /projects/{projectId} {
      allow read: if isPublished() || isAuthenticated();
      allow write: if isAuthenticated();
    }

    match /blog_posts/{postId} {
      allow read: if isPublished() || isAuthenticated();
      allow write: if isAuthenticated();
    }

    match /testimonials/{testimonialId} {
      allow read: if isPublished() || isAuthenticated();
      allow write: if isAuthenticated();
    }

    match /pricing_plans/{planId} {
      allow read: if isPublished() || isAuthenticated();
      allow write: if isAuthenticated();
    }

    match /contact_messages/{messageId} {
      allow create: if request.resource.data.name is string &&
                       request.resource.data.name.size() > 0 &&
                       request.resource.data.email is string &&
                       request.resource.data.email.size() > 0 &&
                       request.resource.data.message is string &&
                       request.resource.data.message.size() > 0;
      allow read, update, delete: if isAuthenticated();
    }

    match /admins/{adminId} {
      allow read, write: if isAuthenticated() && request.auth.uid == adminId;
    }
  }
}
```

Deploy rules using the Firebase CLI:
```bash
firebase deploy --only firestore:rules
```

---

## 11. Creating the First Admin Account

To safely create the primary administrator user in Firebase Authentication:

1. Open **Firebase Console > Authentication > Users**.
2. Click **Add User**.
3. Enter your administrative email (e.g., `admin@youragency.com`) and a secure password.
4. Click **Add User**.
5. You can now log into `/admin/login` using these credentials.

*Local Development Mode*:
If testing locally without Firebase credentials, the built-in authentication accepts `admin@agency.com` / `admin123` or any standard email format, with an instant "Auto-Fill" button available on the login screen.

---

## 12. Development Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite development server on port 3000 |
| `npm run build` | Compiles production assets into `dist/` |
| `npm run lint` | Runs TypeScript compiler checks without emitting files |
| `npm run preview` | Locally serves the compiled production build |
| `npm run clean` | Cleans build artifacts |

---

## 13. Production Build

To test and compile the production bundle:

```bash
npm run build
```

This compiles optimized, code-split JavaScript and CSS into the `dist/` folder with asset hashes for long-term browser edge caching.

---

## 14. Firebase Hosting Deployment

1. Install the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Log into Firebase:
   ```bash
   firebase login
   ```

3. Initialize your Firebase project link (if not linked):
   ```bash
   firebase use --add
   ```

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

---

## 15. GitHub Workflow & Continuous Integration

You can automate deployments using GitHub Actions. Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Production Assets
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
        run: npm run build

      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: '${{ secrets.VITE_FIREBASE_PROJECT_ID }}'
```

---

*Designed and engineered with pride by Agency Website.*

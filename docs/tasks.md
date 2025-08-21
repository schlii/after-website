# Band Website Development Tasks

## Module 1: Project Foundation
### Task 1.1: Next.js Setup
- [x] Create new Next.js project with TypeScript: `npx create-next-app@latest band-website --typescript --tailwind --eslint --app`
- [x] Set up folder structure: `/app`, `/components`, `/lib`, `/types`, `/styles`
- [x] Configure environment variables file (.env.local)
- [x] Set up package.json with all required dependencies (included in create-next-app)
- [x] Initialize Git repository and create initial commit
- [x] Test development server runs successfully

### Task 1.2: Sanity Integration
- [x] Create new Sanity project: `npm create sanity@latest`
- [x] Configure Sanity Studio with band branding
- [x] Install Sanity client in Next.js: `npm install @sanity/client @sanity/image-url`
- [x] Create lib/sanity.js client configuration
- [x] Set up SANITY_PROJECT_ID and SANITY_DATASET environment variables
- [x] Test connection between Next.js and Sanity
- [x] Deploy Sanity Studio

### Task 1.3: Basic Routing
- [x] Create app/layout.tsx with basic HTML structure
- [x] Create page.tsx for homepage
- [x] Create app/music/page.tsx
- [x] Create app/tour/page.tsx  
- [x] Create app/merch/page.tsx
- [x] Create app/about/page.tsx
- [x] Create app/contact/page.tsx
- [x] Test all routes load correctly


## Module 2: Content Management System
### Task 2.1: Sanity Schemas
- [x] Create schemas/tour-date.js (venue, date, city, ticket_link, status)
- [x] Create schemas/news-post.js (title, content, date, featured_image, slug)
- [x] Create schemas/song.js (title, artist, duration, itunes_preview_url, spotify_url, album_art)
- [x] Create schemas/band-member.js (name, role, bio, image)
- [x] Create schemas/contact-submission.js (name, email, message, date, status)
- [x] Create schemas/site-settings.js (hero_image, about_text, social_links)
- [x] Deploy schema changes to Sanity Studio

### Task 2.2: Data Fetching Setup
- [x] Create lib/sanity-queries.js with all GROQ queries
- [x] Create types/sanity.ts with TypeScript interfaces
- [x] Test queries in Sanity Vision tool
- [x] Create reusable data fetching functions
- [x] Implement error handling for failed requests
- [x] Add loading states for all data fetching

### Task 2.3: Data Integration and Testing
- [x] Test all GROQ queries with real Sanity data
- [x] Validate data fetching functions work correctly
- [x] Verify TypeScript interfaces match actual data structure
- [x] Test error handling with invalid queries
- [x] Confirm data caching and performance
- [x] Document data fetching patterns and usage examples

## Module 3: E-commerce Integration
### Task 3.1: Shopify Setup
- [x] Create Shopify store account
- [x] Enable Storefront API access
- [x] Generate Storefront access token
- [x] Install Shopify SDK: `npm install shopify-buy`
- [x] Configure Shopify client in lib/shopify.ts
- [x] Create test products in Shopify admin
- [x] Test API connection and product fetching

### Task 3.2: Product Display & Product Detail
- [x] Create components/ProductCard.tsx
- [x] Create components/ProductGrid.tsx
- [x] Build app/merch/page.tsx with product listing
- [x] Add lib/serialiseShopify.ts for plain product DTOs
- [x] Create app/merch/[handle]/page.tsx for individual products
- [x] Implement product image galleries
- [x] Add product variant selection (size, color, etc.)

### Task 3.3: Shopping Cart
- [x] Create shopping cart context/state management
- [x] Build components/Cart.tsx sidebar
- [x] Add "Add to Cart" functionality
- [x] Implement cart item quantity updates
- [x] Create cart persistence (localStorage)
- [x] Build checkout redirect to Shopify

## Module 4: Music & Media
### Task 4.1: iTunes Integration Setup (automatic playlist by Artist ID)
- [x] Add site settings fields: `appleArtistId` (number) and `appleStorefront` (default `US`)
- [x] Create API route `/api/itunes/artist-tracks` that fetches Lookup `entity=song&limit=200`, normalizes, filters `previewUrl`, and caches results
- [x] Document iTunes usage and remove dependency on Spotify `preview_url`

### Task 4.2: Music Player
- [x] Create components/MusicPlayer.tsx (single player with playlist from `/api/itunes/artist-tracks`)
- [x] Implement play/pause/skip controls
- [x] Add progress bar and time display
- [x] Create playlist functionality
- [x] Add volume controls
- [x] Implement keyboard shortcuts
- [x] Test across all browsers
- [x] Create GlobalAudioPlayerContext for persistent playback
- [x] Refactor AppleMusicPlayer to consume global context
- [x] Enable auto-play on track change
- [x] Add optional playlist panel inside player
- [ ] Conduct accessibility & keyboard-shortcut audit

### Task 4.3: Music Page
- [x] Build app/music/page.tsx layout
- [x] Integrate music player with iTunes API data
- [x] Add album artwork display
- [x] Create track listing component
- [x] Implement shuffle mode

## Module 5A: Global Layout & Navigation (completed)

### Task 5A.1: Grid & Panel System
- [x] Implement 12 × 36 CSS grid (`SiteGridLayout`) applied site-wide
- [x] Establish panel chrome (outer border, inner stroke, glow) with modifier classes

### Task 5A.2: Navigation & Fonts
- [x] Add bottom navigation bar (Home, Tour, Merch, Music, Contact, About)
- [x] Integrate Aeonik Pro / Aeonik Mono fonts via `next/font/local` and map to CSS variables

### Task 5A.3: Page Migration
- [x] Migrate Home, Music, Tour, Merch, About, Contact pages to grid layout
- [x] Remove legacy fixed header and adjust content padding

## Module 5B: Design & Aesthetics
### Task 5.1: Layout & Content Integration (desktop)
- [x] Grid panel spacing and desktop-responsive behavior finalised
- [x] Implement panel layouts for merch, contact, and about
- [ ] Integrate real Sanity content into Tour, Merch, About, and Contact panels
- [ ] Perform cross-resolution layout testing (desktop)

### Task 5.2: Music Player Interface
- [ ] Design Winamp-inspired skin mock-up (Figma/SVG reference)
- [ ] Export scalable vector assets (buttons, sliders, frame) 
- [ ] Implement new skin in `AppleMusicPlayer.tsx` without altering logic
- [ ] Ensure layout scales between 1024 px and 1440 px widths
- [ ] Add keyboard-focus styles matching skin
- [ ] Verify contrast and readability against WCAG AA

### Task 5.3: Desktop filter effects
- [ ] Implement CSS/canvas dithering overlay applied after all desktop content
- [ ] Provide global toggle (dev only) to disable filter for debugging
- [ ] Measure FPS and memory impact in Chrome DevTools
- [ ] Test overlay on WebKit and Firefox to confirm consistency
- [ ] Document technique and cleanup hooks

### Task 5.4: Mobile Site (separate build, pending)
- [ ] Create dedicated mobile layout and navigation
- [ ] Implement mobile-specific interactions and touch targets
- [ ] Test on real devices and browser dev tools

## Module 6: Testing & Optimization
### Task 6.1: Performance
- [ ] Implement Next.js Image optimization
- [ ] Add lazy loading for images and components
- [ ] Optimize bundle size with webpack-bundle-analyzer
- [ ] Implement caching strategies
- [ ] Test Core Web Vitals scores
- [ ] Optimize for mobile performance

### Task 6.2: Cross-browser Testing
- [ ] Test in Chrome, Firefox, Safari, Edge
- [ ] Verify mobile browser compatibility
- [ ] Test music player across browsers
- [ ] Verify e-commerce flow works everywhere
- [ ] Fix any browser-specific issues
- [ ] Test with JavaScript disabled (graceful degradation)

### Task 6.3: Deployment Setup
- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set up automatic deployments on push to main
- [ ] Test initial deployment
- [ ] Verify all environment variables work in production

### Task 6.4: Final Launch
- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Set up analytics (Google Analytics/Plausible)
- [ ] Create XML sitemap
- [ ] Implement basic SEO meta tags
- [ ] Train band members on Sanity admin
- [ ] Create documentation for content updates
- [ ] Go live and monitor for issues

### Task 6.5: GUI Quality Assurance
- [ ] Conduct full accessibility audit (ARIA roles, contrast, focus order)
- [ ] Profile grid resizing performance and bundle size
- [ ] Implement visual regression tests for grid and panel chrome

## Module 7: Contact & Newsletter
### Task 7.1: Contact Form
- [ ] Create components/ContactForm.tsx
- [ ] Implement form validation
- [ ] Create API route app/api/contact/route.ts
- [ ] Set up email service integration (Nodemailer/Resend)
- [ ] Send contact form submissions directly via email
- [ ] Add success/error messaging
- [ ] Test form submission end-to-end

### Task 7.2: Newsletter Integration
- [ ] Choose newsletter service (Mailchimp/ConvertKit)
- [ ] Create API account and get credentials
- [ ] Build newsletter signup component
- [ ] Create API route for newsletter subscription
- [ ] Implement double opt-in flow
- [ ] Add newsletter signup to multiple pages
- [ ] Test subscription process

Each task should be completed in order within each module, and modules should be completed sequentially for best results. 
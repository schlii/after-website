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
- [x] Create schemas/song.js (title, artist, duration, audio_url, album_art)
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
- [ ] Test all GROQ queries with real Sanity data
- [ ] Validate data fetching functions work correctly
- [ ] Verify TypeScript interfaces match actual data structure
- [ ] Test error handling with invalid queries
- [ ] Confirm data caching and performance
- [ ] Document data fetching patterns and usage examples

## Module 3: E-commerce Integration
### Task 3.1: Shopify Setup
- [ ] Create Shopify store account
- [ ] Enable Storefront API access
- [ ] Generate Storefront access token
- [ ] Install Shopify SDK: `npm install shopify-buy`
- [ ] Configure Shopify client in lib/shopify.js
- [ ] Create test products in Shopify admin
- [ ] Test API connection and product fetching

### Task 3.2: Product Display
- [ ] Create components/ProductCard.tsx
- [ ] Create components/ProductGrid.tsx
- [ ] Build app/merch/page.tsx with product listing
- [ ] Create app/merch/[handle]/page.tsx for individual products
- [ ] Implement product image galleries
- [ ] Add product variant selection (size, color, etc.)

### Task 3.3: Shopping Cart
- [ ] Create shopping cart context/state management
- [ ] Build components/Cart.tsx sidebar
- [ ] Add "Add to Cart" functionality
- [ ] Implement cart item quantity updates
- [ ] Create cart persistence (localStorage)
- [ ] Build checkout redirect to Shopify

## Module 4: Music & Media
### Task 4.1: BunnyCDN Setup
- [ ] Create BunnyCDN account and storage zone
- [ ] Configure CORS settings for audio streaming
- [ ] Upload test audio files
- [ ] Test direct file access and streaming
- [ ] Create audio URL generation utility
- [ ] Implement basic security/hotlink protection

### Task 4.2: Music Player
- [ ] Create components/MusicPlayer.tsx
- [ ] Implement play/pause/skip controls
- [ ] Add progress bar and time display
- [ ] Create playlist functionality
- [ ] Add volume controls
- [ ] Implement keyboard shortcuts
- [ ] Test across all browsers

### Task 4.3: Music Page
- [ ] Build app/music/page.tsx layout
- [ ] Integrate music player with Sanity song data
- [ ] Add album artwork display
- [ ] Create track listing component
- [ ] Implement shuffle and repeat modes
- [ ] Add social sharing for tracks

## Module 5: Contact & Newsletter
### Task 5.1: Contact Form
- [ ] Create components/ContactForm.tsx
- [ ] Implement form validation
- [ ] Create API route app/api/contact/route.ts
- [ ] Connect form submission to Sanity
- [ ] Set up email notifications to band
- [ ] Add success/error messaging
- [ ] Test form submission end-to-end

### Task 5.2: Newsletter Integration
- [ ] Choose newsletter service (Mailchimp/ConvertKit)
- [ ] Create API account and get credentials
- [ ] Build newsletter signup component
- [ ] Create API route for newsletter subscription
- [ ] Implement double opt-in flow
- [ ] Add newsletter signup to multiple pages
- [ ] Test subscription process

## Module 6: Design & Aesthetics
### Task 6.1: 2000s Design System
- [ ] Create CSS custom properties for color scheme
- [ ] Implement retro typography (fonts, sizes, effects)
- [ ] Build reusable button components with 2000s styling
- [ ] Create background patterns and textures
- [ ] Add CSS animations for hover effects
- [ ] Implement loading animations

### Task 6.2: Layout Implementation
- [ ] Create desktop layouts with absolute positioning
- [ ] Build modular homepage components
- [ ] Implement overlapping elements and z-index management
- [ ] Add decorative elements and borders
- [ ] Create animated transitions between pages
- [ ] Test layout across different screen resolutions

### Task 6.3: Responsive Design
- [ ] Define breakpoints for mobile/tablet/desktop
- [ ] Create mobile-first CSS approach
- [ ] Implement mobile navigation menu
- [ ] Adapt complex layouts for smaller screens
- [ ] Test on real devices and browser dev tools
- [ ] Optimize touch interactions for mobile

## Module 7: Testing & Optimization
### Task 7.1: Performance
- [ ] Implement Next.js Image optimization
- [ ] Add lazy loading for images and components
- [ ] Optimize bundle size with webpack-bundle-analyzer
- [ ] Implement caching strategies
- [ ] Test Core Web Vitals scores
- [ ] Optimize for mobile performance

### Task 7.2: Cross-browser Testing
- [ ] Test in Chrome, Firefox, Safari, Edge
- [ ] Verify mobile browser compatibility
- [ ] Test music player across browsers
- [ ] Verify e-commerce flow works everywhere
- [ ] Fix any browser-specific issues
- [ ] Test with JavaScript disabled (graceful degradation)

### Task 7.3: Deployment Setup
- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set up automatic deployments on push to main
- [ ] Test initial deployment
- [ ] Verify all environment variables work in production

### Task 7.4: Final Launch
- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Set up analytics (Google Analytics/Plausible)
- [ ] Create XML sitemap
- [ ] Implement basic SEO meta tags
- [ ] Train band members on Sanity admin
- [ ] Create documentation for content updates
- [ ] Go live and monitor for issues

Each task should be completed in order within each module, and modules should be completed sequentially for best results. 
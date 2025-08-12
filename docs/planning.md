# Band Website Project Planning Document

## Project Overview
This project is a comprehensive band website with modern responsive design capabilities. The site includes content management, e-commerce functionality, music streaming, and an admin console for the band to manage all content independently.

### Core Requirements
- Full content management system for band to update independently
- E-commerce functionality for merchandise sales
- Music streaming capabilities with custom player
- Contact form and newsletter integration
- Mobile-responsive design
- Admin console for all content updates

### Target Audience
- Band fans and music enthusiasts
- Potential merchandise customers
- Concert attendees and tour followers
- Music industry contacts and press

## Tech Stack Details

### Frontend Framework
- Next.js 14+ with App Router
- React 18+ with TypeScript
- CSS Modules for styling

### Content Management
- Sanity.io (Free tier: 3 users, 10GB bandwidth, 100K API requests/month)
- Visual studio for band content management
- Real-time content updates
- Image optimization and handling

### E-commerce Solution
- Shopify Storefront API integration
- Guest checkout functionality (accounts to be added later)
- Product catalog with custom styling
- Shopping cart with localStorage persistence

### Music Streaming
- iTunes Lookup API integration for 30-second preview clips streamed from Apple CDN
- Custom HTML5 audio player implementation
- Progressive loading and caching
- Cross-browser compatibility

### Additional Services
- Mailchimp or ConvertKit for newsletter management
- Vercel for hosting and deployment (free tier)
- Git version control with automated deployments

### Development Tools
- TypeScript for type safety
- ESLint and Prettier for code quality
- Jest and React Testing Library for testing

## Site Architecture

### Page Structure and Functionality

#### Homepage (/)
**Purpose**: Central hub showcasing all band activities and content

**Components**:
- Hero section with band branding and featured content
- News feed module displaying latest band updates
- Featured merchandise carousel
- Music player widget with latest releases
- Upcoming tour dates preview
- Newsletter signup form
- Social media links integration

**Content Management**:
- Hero image and text managed through Sanity
- News posts fetched from Sanity with pagination
- Featured products pulled from Shopify API
- Tour dates from Sanity with status filtering

**Responsive Behavior**:
- Desktop: Chaotic module-based layout with overlapping elements
- Mobile: Vertical stack maintaining visual energy
- Interactive animations and hover effects

#### Music Page (/music)
**Purpose**: Complete music catalog and streaming experience

**Components**:
- Full-featured music player with playlist support
- Album/track listings with metadata
- Artist information and credits
- Lyrics display (when available)
- Social sharing functionality
- Download/purchase links

**Technical Implementation**:
- Use iTunes Lookup API with Artist ID to retrieve track metadata and `previewUrl` for 30-second clips
- Add server endpoint `/api/itunes/artist-tracks` to normalize, filter, and cache tracks for playlist use
- State management for player controls and single-page playlist
- Keyboard shortcuts and accessibility features
- Progressive loading for large audio files
- Format fallbacks for browser compatibility

**Content Management**:
- Store site-level Apple Music artist ID and storefront in Settings
- Optional per-song fields remain for overrides (`itunesPreviewUrl`, `spotifyUrl`)
- Album artwork and descriptions
- Release dates and categorization

#### Tour Dates Page (/tour)
**Purpose**: Comprehensive tour information and ticket access

**Components**:
- Chronological listing of all tour dates
- Venue information and location details
- Ticket purchase links and availability status
- Past shows archive
- Location-based filtering

**Content Management**:
- Tour data managed through Sanity
- Timezone handling for international shows
- Venue details and capacity information
- Ticket link integration
- Status tracking (upcoming/sold out/cancelled)

**Features**:
- Calendar view option
- Geographic filtering
- Notification signup for local shows
- Integration with mapping services

#### Merchandise Page (/merch)
**Purpose**: E-commerce functionality for band merchandise

**Components**:
- Product catalog with filtering and search
- Individual product pages with detailed views
- Shopping cart functionality
- Guest checkout process
- Product image galleries with zoom

**E-commerce Integration**:
- Shopify Storefront API for product data
- Real-time inventory tracking
- Variant selection (size, color, style)
- Price display with currency formatting
- Shipping calculation integration

**Content Management**:
- Product information managed in Shopify admin
- Custom styling and layout control
- Featured product highlighting
- Category organization and filtering

#### About Page (/about)
**Purpose**: Band biography and member information

**Components**:
- Band history and formation story
- Individual member profiles with photos
- Discography and achievements
- Press kit downloads
- Contact information for industry professionals

**Content Management**:
- Band biography managed through Sanity
- Member profiles with individual pages
- Press photos and media assets
- Achievement timeline
- Downloadable press materials

#### Contact Page (/contact)
**Purpose**: Communication hub for fans and industry contacts

**Components**:
- Contact form with categorized inquiries
- Business contact information
- Social media links
- Booking inquiry form
- Press contact details

**Technical Implementation**:
- Form validation with Zod schema
- Submission storage in Sanity
- Email notifications to band
- Auto-response confirmation
- Spam protection measures

## Content Management Strategy

### Sanity Schema Architecture

#### Tour Dates Schema
```typescript
{
  title: string
  venue: string
  city: string
  country: string
  date: datetime
  timezone: string
  ticketUrl?: string
  status: 'upcoming' | 'sold-out' | 'cancelled' | 'completed'
  coordinates?: geopoint
  venue_capacity?: number
  special_notes?: string
}
```

#### News Posts Schema
```typescript
{
  title: string
  slug: slug
  content: array (portable text)
  featured_image: image (required, min 1200x630px)
  excerpt: text (max 160 characters)
  category: string (from predefined list)
  published_date: datetime
  featured: boolean
  tags: array of strings
}
```

#### Songs Schema
```typescript
{
  title: string
  artist: string
  album?: string
  duration: number (seconds)
  itunes_preview_url: string // iTunes 30s preview clip
  spotify_url?: string // Optional: link target for "Listen on Spotify"
  album_art: image
  release_date: date
  genre: string
  bpm?: number
  key?: string
  lyrics?: text
  credits: array of strings
}
```

#### Band Members Schema
```typescript
{
  name: string
  role: string
  bio: text
  profile_image: image
  instruments: array of strings
  join_date: date
  social_links: object
  featured: boolean
}
```

#### Contact Submissions Schema
```typescript
{
  name: string
  email: string
  subject: string
  message: text
  inquiry_type: 'general' | 'booking' | 'press' | 'technical'
  status: 'new' | 'in-progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  internal_notes: text
  response_sent: boolean
  created_at: datetime
}
```

#### Site Settings Schema
```typescript
{
  site_title: string
  tagline: string
  hero_image: image
  about_text: text
  social_links: object
  contact_email: string
  press_email: string
  booking_email: string
  newsletter_description: text
  seo_description: text
  og_image: image
  apple_artist_id: number // Apple Music Artist ID used for playlist auto-loading
  apple_storefront: string // e.g., 'US'
}
```

### Asset Management Strategy
- Images: Sanity DAM with automatic optimization
- Audio: Streamed from iTunes preview URLs (no self-hosting required)
- Documents: Sanity for press kits and downloadable content
- Video: Embed codes stored in Sanity, hosted externally

### Content Workflow
- Band members access Sanity Studio
- Content creation with built-in validation
- Preview functionality before publishing
- Automatic deployment triggers on publish
- Real-time updates across all site instances

## Responsive Design Strategy

### Breakpoint Architecture
```css
/* Mobile First Approach */
--mobile: 320px;
--mobile-large: 480px;
--tablet: 768px;
--desktop: 1024px;
--desktop-large: 1440px;
--ultra-wide: 1920px;
```

### Design Philosophy: "Consistent Experience Across Devices"

#### Desktop Experience (1024px+)
**Technical Implementation**:
- CSS Grid for overall structure
- Responsive layouts with proper spacing
- Transform properties for animations
- Custom UI elements where needed
- Proper z-index management

**Layout Examples**:
- Homepage: Organized grid layout
- Music page: Sidebar player with track listing
- Tour page: Calendar with venue details

#### Tablet Experience (768px - 1023px)
**Technical Implementation**:
- Hybrid Grid/Flexbox approach
- Touch-friendly interface (minimum 44px targets)
- Simplified hover states for touch
- Optimized loading for varied connections

#### Mobile Experience (320px - 767px)
**Technical Implementation**:
- Flexbox-based vertical layouts
- Mobile-first responsive images
- Touch gesture support
- Optimized performance
- Progressive enhancement

#### Cross-Device Consistency Elements
- Typography: Consistent font families
- Brand Elements: Consistent logos and iconography
- Content Hierarchy: Maintained information architecture
- User Experience: Adapted but equivalent functionality

## Development Phases & Detailed Workflow

### Phase 1: Foundation Setup (Week 1)
**Objective**: Establish core development environment and basic connectivity

#### Project Initialization
**Tasks**:
- Create Next.js project with TypeScript configuration
- Set up folder structure according to architectural standards
- Configure ESLint, Prettier, and development tools
- Initialize Git repository with proper .gitignore
- Create initial README with setup instructions

**Deliverables**:
- Functional development environment
- Basic project structure
- Development workflow documentation

#### Sanity Integration
**Tasks**:
- Create Sanity project and configure studio
- Install and configure Sanity client in Next.js
- Set up environment variables for API connectivity
- Test basic data fetching and connection
- Deploy Sanity Studio for band access

**Deliverables**:
- Functional CMS connection
- Basic schema structure
- Admin access for band members

#### Routing Setup
**Tasks**:
- Implement Next.js App Router structure
- Create placeholder pages for all sections
- Test routing functionality
- Verify page structure

**Deliverables**:
- Complete routing structure
- Verified page navigation
- Basic site structure

### Phase 2: Core Content Management (Week 2)
**Objective**: Complete CMS data layer implementation and validation

#### Schema Development
**Tasks**:
- Create comprehensive Sanity schemas for all content types
- Implement validation rules and field requirements
- Set up relationships between content types
- Create custom input components where needed
- Test schema functionality with sample data

**Deliverables**:
- Complete schema architecture
- Validated content models
- Sample content for testing

#### Data Layer Implementation
**Tasks**:
- Create GROQ queries for all content types
- Implement TypeScript interfaces for data structures
- Set up error handling for API requests
- Create reusable data fetching utilities
- Implement caching strategies

**Deliverables**:
- Robust data fetching layer
- Type-safe data handling
- Error handling mechanisms

#### Data Integration and Testing
**Tasks**:
- Test all GROQ queries with real Sanity data
- Validate data fetching functions work correctly
- Verify TypeScript interfaces match actual data structure
- Test error handling with invalid queries
- Confirm data caching and performance
- Document data fetching patterns and usage examples

**Deliverables**:
- Validated data integration layer
- Confirmed data fetching reliability
- Performance benchmarks and documentation

### Phase 3: E-commerce Integration (Week 3)
**Objective**: Complete Shopify integration and shopping functionality

#### Shopify Setup and Integration
**Tasks**:
- Configure Shopify store and Storefront API
- Create test products and collections
- Implement Shopify client in Next.js application
- Build product fetching and display functionality
- Implement plain product DTO serialiser (lib/serialiseShopify.ts)
- Test API connectivity and data flow

**Deliverables**:
- Functional Shopify integration
- Product display capabilities
- Test product catalog

#### Shopping Cart Implementation
**Tasks**:
- Create shopping cart state management
- Implement add/remove/update functionality
- Build cart UI components and interactions
- Add product variant selection UI
- Set up local storage persistence
- Handle cart state across page navigation

**Deliverables**:
- Complete shopping cart functionality
- Persistent cart state
- Cart management interface

#### Checkout Integration
**Tasks**:
- Implement Shopify checkout redirect
- Set up guest checkout workflow
- Handle checkout success/failure states
- Test complete purchase flow
- Implement order confirmation system

**Deliverables**:
- Complete e-commerce workflow
- Tested purchase process
- Order management system

### Phase 4: Music & Interactive Features (Week 4)
**Objective**: Implement music streaming and communication features

#### iTunes Integration and Music Player
**Tasks**:
- Use iTunes Lookup API with Artist ID to retrieve track metadata and `previewUrl`
- Build custom HTML5 audio player component
- Implement playlist functionality and controls
- Add keyboard shortcuts and accessibility features

**Deliverables**:
- Functional music streaming
- Custom audio player
- Playlist management

#### Music Page Development
**Tasks**:
- Create comprehensive music page layout
- Integrate player with Sanity music data
- Implement track organization and filtering
- Add social sharing functionality
- Test audio performance across browsers

**Deliverables**:
- Complete music streaming experience
- Social integration
- Cross-browser compatibility

#### Contact and Newsletter Integration
**Tasks**:
- Build contact form with validation
- Implement form submission to Sanity
- Set up email notification system
- Integrate newsletter service (Mailchimp/ConvertKit)
- Test communication workflows

**Deliverables**:
- Functional contact system
- Newsletter integration
- Email notification system

### Phase 5: Design Implementation (Week 5)
**Objective**: Complete responsive design implementation

#### Design System
**Tasks**:
- Implement CSS custom properties for color schemes
- Set up typography system
- Build reusable component library
- Add necessary animations and hover effects
- Implement UI patterns and elements

**Deliverables**:
- Complete design system
- Component library
- Animation framework

#### Desktop Layout Implementation
**Tasks**:
- Create responsive desktop layouts
- Implement proper spacing and alignment
- Add necessary animations and transitions
- Test layouts across different screen resolutions
- Optimize performance

**Deliverables**:
- Desktop layouts for all pages
- Animation system
- Performance optimization

#### Responsive Implementation
**Tasks**:
- Implement mobile-first responsive breakpoints
- Create mobile navigation and interaction patterns
- Adapt complex layouts for smaller screens
- Test on real devices and various browsers
- Optimize touch interactions and accessibility

**Deliverables**:
- Complete responsive design
- Mobile optimization
- Cross-device testing completion

### Phase 6: Testing & Launch (Week 6)
**Objective**: Comprehensive testing, optimization, and production launch

#### Performance Optimization
**Tasks**:
- Implement Next.js Image optimization
- Add lazy loading for images and components
- Optimize bundle size and code splitting
- Implement caching strategies
- Test and optimize Core Web Vitals scores

**Deliverables**:
- Performance optimization
- Bundle size optimization
- Core Web Vitals compliance

#### Cross-browser and Device Testing
**Tasks**:
- Test functionality across all major browsers
- Verify mobile browser compatibility
- Test music player across different devices
- Validate e-commerce flow on various platforms
- Fix any compatibility issues

**Deliverables**:
- Cross-browser compatibility
- Mobile device optimization
- Issue resolution

#### Deployment Setup
**Tasks**:
- Set up GitHub repository and connect to Vercel
- Configure Vercel deployment pipeline
- Set up environment variables in production
- Configure automatic deployments
- Test deployment and verify functionality

**Deliverables**:
- Production environment setup
- Automated deployment pipeline
- Verified environment configuration

#### Final Launch Preparation
**Tasks**:
- Set up custom domain and SSL configuration
- Implement analytics and monitoring
- Create XML sitemap and SEO optimization
- Final band member training on all systems
- Create comprehensive documentation

**Deliverables**:
- Production-ready website
- Analytics implementation
- Complete documentation

## Security Implementation

### Data Protection
- Environment variable security for all API keys
- HTTPS enforcement across all connections
- Secure cookie configuration for user sessions
- Input sanitization for all user-generated content

### Audio Streaming Security
- Referrer validation for audio file access
- Rate limiting to prevent abuse
- Bandwidth monitoring and alerting
- Bot detection and blocking mechanisms

### E-commerce Security
- PCI compliance through Shopify integration
- Secure checkout process with SSL encryption
- Customer data protection protocols
- Transaction monitoring and fraud detection

## Performance Requirements

### Loading Performance
- Initial page load under 3 seconds
- Lighthouse performance score above 90
- Core Web Vitals passing all metrics
- Progressive loading for large assets

### Audio Streaming Performance
- Audio file loading under 2 seconds
- Smooth playback without buffering interruptions
- Memory management for playlist functionality
- Bandwidth optimization for mobile users

### E-commerce Performance
- Product catalog loading under 1 second
- Cart operations instantaneous response
- Checkout process completion under 30 seconds
- Real-time inventory updates

## SEO and Analytics Strategy

### Search Engine Optimization
- Dynamic meta tags for all content pages
- OpenGraph and Twitter Card implementation
- JSON-LD structured data for events and music
- XML sitemap generation and submission

### Analytics Implementation
- Google Analytics 4 for comprehensive tracking
- E-commerce tracking for merchandise sales
- Custom events for music streaming behavior
- Performance monitoring and alerting

### Content Strategy
- SEO-optimized content creation guidelines
- Regular content updates and freshness signals
- Internal linking strategy for improved crawling
- Image optimization with proper alt text

## Maintenance and Updates

### Content Management
- Band member training for ongoing content updates
- Content approval workflow for critical updates
- Backup and version control for all content
- Regular content audits and optimization

### Technical Maintenance
- Monthly dependency updates and security patches
- Performance monitoring and optimization
- Backup procedures for code and content
- Error monitoring and resolution protocols

### Feature Enhancement
- User feedback collection and analysis
- A/B testing framework for improvements
- Feature request tracking and prioritization
- Regular user experience audits

This comprehensive planning document serves as the foundation for all development decisions and provides clear guidance for implementing the band website project according to specifications and requirements.
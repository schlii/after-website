# TODO (Temporary Working List)

## Context

### Current Status Overview
| Area | Status | Notes |
|------|--------|-------|
| Deployment | ✅ Working | Vercel auto-deploys from GitHub |
| Music Player | ✅ Complete | Meets current requirements |
| Shopify Integration | ⚠️ Review | Add-to-cart failed for client; investigate sold-out variants |
| Sanity CMS | ⚠️ Partial | Schemas filled, Studio not deployed |
| Responsive Design | ⚠️ Issue | Mobile redirect unreliable on Vercel; tablets need mobile layout |
| Performance Metrics | ❌ Missing | No Lighthouse / bundle size measurements yet |
| Testing Coverage | ❌ None | No unit or integration tests |

### Notes & Answers
- Deployment runs on Vercel; CI/CD via GitHub pushes.
- Music player is stable and feature-complete.
- Shopify issue possibly related to sold-out variants.
- Mobile layout renders at `/mobile` but redirect middleware misbehaves on Vercel.
- Performance and testing have not been addressed yet.
- Sanity Studio to be deployed on `/studio` subdomain with auth.

---

## TODO
A concise, actionable checklist. Update items as they are completed.

- [ ] Ensure mobile/tablet devices are redirected to `/mobile` reliably on Vercel; add canonical tag on /mobile pages.
- [ ] Investigate Shopify add-to-cart failure for sold-out variants; disable button or display error when inventory ≤ 0.
- [ ] Establish performance baseline (Lighthouse on key pages, bundle size via `next build --profile`).
- [ ] Set up Jest + React Testing Library and add first test for mobile redirect middleware.
- [ ] Deploy Sanity Studio to `/studio` subdomain with basic authentication.
- [ ] Choose and integrate edge-compatible rate-limiting library; add basic CSP headers in `next.config.ts`.
- [ ] Fix gradient/blur mask rendering behind heading/nav buttons (desktop & mobile).
- [ ] Conduct code audit:
  - Review TypeScript strictness and remove any `any` types.
  - Run ESLint/Prettier across codebase and fix outstanding issues.
  - Identify and remove unused components, hooks, and styles.
  - Verify import order and absolute path usage matches project standards.
  - Check for missing ARIA labels and accessibility concerns.

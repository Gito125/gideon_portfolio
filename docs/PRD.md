# PRD — Ogwang Gift Gideon Portfolio
**Document Type:** Product Requirements Document  
**Version:** 1.0  
**Status:** Approved — Ready for Development  
**Last Updated:** 2026  

---

## 1. Product Vision

A personal portfolio website that functions as a **live brand statement** — not a static CV. When a visitor lands on this site, they should feel the presence of a serious, creative, technically competent developer before reading a single word. By the time they leave, they should either want to contact Gideon, hire him, or recommend him to someone who will.

> **One-sentence vision:** A portfolio that makes the visitor feel Gideon before they know Gideon.

---

## 2. Product Goals

| Goal | Description | Measurable Outcome |
|------|-------------|-------------------|
| Establish credibility | Communicate technical competence immediately | Visitor spends 60s+ on site |
| Drive contact | Encourage visitors to reach out directly | Contact form submissions |
| Showcase real work | Acadex and other builds as proof, not decoration | Project section click-throughs |
| Enable CV access | Make it frictionless to download resume | CV downloads tracked |
| Be memorable | Site experience stays with the visitor | Return visits / shares |

---

## 3. Target Users

### 3.1 Collaborators
Developers, designers, or builders who may want to work with Gideon or invite him onto a project.

- **Need:** Quickly assess technical level and personality fit
- **Key action:** Contact form or social links
- **What convinces them:** Quality of projects, stack shown, how the site itself is built

### 3.2 Potential Employers
Tech companies, startups, or remote teams evaluating Gideon for a role.

- **Need:** Verify skills, see real work, download CV
- **Key action:** CV download + LinkedIn
- **What convinces them:** Acadex as a live product, clean technical presentation

### 3.3 Clients
Businesses or individuals (including Ugandan schools and organisations) who need software built.

- **Need:** Trust that Gideon can deliver
- **Key action:** Contact form
- **What convinces them:** Professionalism of site, Acadex as proof of delivery

---

## 4. Identity Positioning

| Attribute | Value |
|-----------|-------|
| **Role presented** | Full-Stack Developer & Product Builder |
| **NOT presented as** | Teacher (excluded entirely) |
| **Flagship product** | Acadex — school management application |
| **Tone** | Sharp, confident, creative, human |
| **Origin** | Uganda — not hidden, not over-emphasised |
| **Ambition** | Global reach, locally grounded |

---

## 5. Pages & Features

### 5.1 Pages (In Scope)

| Page | Purpose | Primary CTA |
|------|---------|-------------|
| `/` — Home | Hero + featured projects + intro | See My Work / Let's Talk |
| `/projects` | Full project showcase, Acadex leads | View Project |
| `/about` | Who Gideon is, stack, brief story | Download CV |
| `/contact` | Contact form + social links | Send Message |

### 5.2 Global Features

- **Custom animated cursor** — amber dot with ghost ring, context-aware states
- **Preloader** — cinematic black screen with scrambling counter, name reveal, diagonal crack
- **Smooth scroll** — Lenis base layer across all pages
- **Page transitions** — Framer Motion AnimatePresence on all route changes
- **CV download** — accessible from nav on every page
- **Responsive design** — mobile, tablet, desktop

### 5.3 Out of Scope (This Version)

- Blog or articles
- Dark mode toggle
- Testimonials section
- CMS integration
- Analytics dashboard (Vercel Analytics is sufficient)
- Multi-language support

---

## 6. User Journey

```
Visits site
    ↓
Preloader (1.8s) — first impression, tone is set
    ↓
Hero scroll sequence — mesmerised, curious, convinced
    ↓
Projects — proof of real work, Acadex front and centre
    ↓
About — who is this person, can I trust them
    ↓
Contact / CV — commit to action
```

---

## 7. Success Metrics

| Metric | Target |
|--------|--------|
| Avg. time on site | > 60 seconds |
| Bounce rate | < 50% |
| Contact form submissions | Tracked (no specific target — new site) |
| CV downloads | Tracked |
| Mobile usability score | > 90 (Lighthouse) |
| Performance score | > 85 (Lighthouse) |

---

## 8. Constraints & Assumptions

- **Solo developer** — Gideon builds this alone with GitHub Copilot assistance
- **No budget** for paid animation libraries beyond GSAP Club (use free tier or self-host)
- **Domain** — not yet purchased; placeholder used during development
- **Photos** — Gideon has personal photos available for the hero and about sections
- **Acadex** — screenshots and mockups available for project showcase
- **Timeline** — no hard deadline; quality over speed

---

## 9. Document References

| Document | Purpose |
|----------|---------|
| `SRS.md` | Technical requirements, component specs, functional requirements |
| `DESIGN.md` | Visual design system, colours, typography, animation tokens |

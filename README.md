# NextGen Robotics Website

NextGen Robotics is a 501(c)(3) nonprofit in West Windsor Township, NJ,
sponsored by NextGen Church. Gear Up (FLL Challenge 608) has been building
robots since 2014; in 2025 that grew into the NextGen Robotics nonprofit,
which now also runs Great Gears (FLL Explore 33994).

Theme: black/blue, matching the NextGen Robotics gear logo. Multi-page site
(each section is its own page/"tab") with a scroll-reveal animation on cards,
and click-to-zoom on photos.

## Pages

```
index.html      — Home (hero w/ robot photo, sponsor teaser)
about.html       — Who We Are (mission, vision, history, programs)
teams.html       — FLL Challenge (Gear Up) & FLL Explore (Great Gears) sections
awards.html      — Awards & accomplishments, grouped by year
resources.html   — Coding / robot-design / FLL program links
contact.html     — Location & email (no backend yet, see below)

style.css        — all styles
app.js           — nav highlighting, mobile menu toggle, scroll-reveal, click-to-zoom (no external requests)
firebase.json    — security headers for Firebase Hosting
images/          — logo + photos (see below)
```

There is no backend, database, or third-party API call anywhere on the
site — this keeps the attack surface minimal (nothing to inject into, no
tokens or keys to leak). Projects and Gallery pages were removed per request;
their content (robot photos, project write-ups) now lives in the Teams page's
two program sections instead.

## Image files

All in place under `images/`:

| File | Used for |
|---|---|
| `images/logo-horizontal.png` | Header logo (all pages), transparent background |
| `images/logo.png` | Favicon (stacked/vertical logo lockup) |
| `images/robot-challenge.png` | Gear Up's FLL Challenge robot — homepage hero + Teams page |
| `images/team-challenge.png` | Gear Up (608) team photo — Teams page |
| `images/team-explore.jpg` | Great Gears (33994) team photo with their Team Poster Award — Teams page |
| `images/model-explore.jpg` | Great Gears' FLL Explore LEGO team model/table — Teams page |
| `images/sponsor-nextgen-church.png` | NextGen Church logo — homepage sponsor section |

`team-challenge.png` and `model-explore.jpg` are each 1.1–1.6MB (full-res
screenshots/photos) — worth compressing before this goes live, since they're
the largest assets on the site by far.

Every content photo (not the header logo) has a `.zoomable` class — clicking
it toggles a slight zoom-in via CSS `transform: scale()`, handled in `app.js`.
The Teams page photos use hover-to-zoom instead (pure CSS, no click needed) —
see `.program-photo:hover img` in `style.css`.

## Adding a new team

The org is expected to grow beyond two teams, so `teams.html` is built to be
copy-pasted rather than redesigned each time. To add a team:

1. In `teams.html`, copy one whole `<section class="section ..." id="...">`
   block (see the HTML comment above the first team section for the full
   checklist) — update the id, badge, name, age, both photos, description,
   and contact info. Alternate `section` / `section section-alt` so the
   background stripe keeps alternating.
2. Add a matching pill to `.team-jumpnav` at the top of the same page.
3. On `index.html`, bump the number in `.team-count-num` and copy one
   `.team-count-item` block (there's an HTML comment there too).
4. Optionally update the footer's team list (`FLL Challenge 608 Gear Up &
   FLL Explore 33994 Great Gears`) across all pages, and the "2 FLL Teams"
   references in `about.html`'s program grid.

No CSS or JS changes are needed — `.program-photo`, `.contact-card`, and the
hover-zoom are all reusable classes, not per-team styles.

## Content sourced from the old site

Nav structure and robot/team descriptions were pulled from the previous site
(`nextgenroboticsnj1.web.app`)'s public JS bundle — its Firestore backend
correctly refused unauthenticated reads, which is good security on its part,
so none of that was bypassed. Mission/vision and program details came from
`NextGen Robotics Business Plan V1 2025.pdf`. The full award history
(2014–2026) and all resource links (`resources.html`) came directly from you.
The contact email is `nextgenroboticsnj@gmail.com` (footer on every page, plus
`contact.html`).

**Known gaps to fill in before publishing:**
- The 2018 "Judges' Award" entry in `awards.html` (Boro Blast / Hillsborough
  Qualifier) came from a copy-pasted table where the award name and event
  columns weren't clearly separated — double check that one reads correctly.

## Contact form

The old site had a working contact form that wrote to Firestore behind
reCAPTCHA. That needs a Firebase project, security rules, and a reCAPTCHA
site key to do safely, so for now Contact just shows a static address and a
`mailto:` link. Once you're ready to wire up a real form, it should validate
input server-side (e.g. a Cloud Function) — never trust client-side
validation alone.

## Security notes

- A strict `Content-Security-Policy` (in every page's `<head>` and in
  `firebase.json`) only allows scripts/styles/images from the site itself,
  blocks framing (`frame-ancestors 'none'`), and disallows plugins
  (`object-src 'none'`).
- No inline `<script>` or `onclick`/`onerror` attributes anywhere, so the
  CSP's `script-src 'self'` can't be bypassed by injected markup.
- `app.js` makes no network requests and collects no data — it only toggles
  CSS classes (nav highlight, mobile menu, scroll reveal).
- `firebase.json` sets `X-Frame-Options`, `Strict-Transport-Security`, and
  `Referrer-Policy` headers for when this is deployed to Firebase Hosting.

## Deploying

This repo is set up for Firebase Hosting (matching the current
`nextgenroboticsnj1.web.app` site). To point the custom domain
`nextgen-robotics.net` (registered at GoDaddy) at this site, add the domain
under Firebase Hosting → Custom domains, then create the CNAME/A records
Firebase gives you in GoDaddy's DNS settings.

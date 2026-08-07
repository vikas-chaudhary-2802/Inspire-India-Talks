# About Page — Full Design Spec (Inspire India Talks)

A complete reference for the `/about` page so it can be rebuilt or reviewed in Emergent. Stack: **React + TypeScript + Tailwind CSS + framer-motion + lucide-react**, with shadcn-style HSL CSS variables, `@/*` path alias, and image assets in `public/images/`.

Route: `/about` → `<About />` (in `src/pages/About.tsx`).

---

## 1. Fonts

Loaded via Google Fonts (already imported in `src/index.css`):

- **Serif (headings, display, quotes):** `Fraunces`, fallback `Playfair Display`, `serif`. Tailwind class: `font-serif`. Weights used: 400, 500, 600, 700 (plus italics).
- **Sans (body, UI, labels):** `Inter`, fallback `sans-serif`. This is the default `body` font. Weights: 400, 500, 600, 700.
- **Mono (not used on About, available):** `JetBrains Mono`.

Rule in CSS: all `h1–h6` automatically use the serif family.

---

## 2. Color palette (HSL design tokens)

All colors are defined as HSL triples in `:root` and consumed via Tailwind tokens like `bg-background`, `text-primary`, etc. Hex values are approximate equivalents.

| Token | HSL | Approx Hex | Usage |
|-------|-----|-----------|-------|
| `--background` | `220 20% 4%` | `#080A0D` | Page background (near-black navy) |
| `--foreground` | `40 20% 95%` | `#F5F2EC` | Primary text (warm off-white) |
| `--primary` | `24 95% 53%` | `#F97316` | Brand orange — accents, CTAs, highlights |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | Text on orange buttons |
| `--card` | `220 18% 8%` | `#10141A` | Card surface base |
| `--muted` | `220 12% 14%` | `#1F232B` | Muted surfaces |
| `--muted-foreground` | `220 10% 55%` | `#7E8694` | Secondary/label text |
| `--secondary` | `220 15% 12%` | `#191D24` | Secondary surfaces |
| `--accent` | `24 60% 12%` | `#311C0D` | Warm accent surface |
| `--accent-foreground` | `24 95% 70%` | `#FBA56B` | Light orange text |
| `--border` | `220 12% 16%` | `#242832` | Borders / dividers |
| `--ring` | `24 95% 53%` | `#F97316` | Focus ring (orange) |
| `--radius` | `0.75rem` | — | Base corner radius |

Text opacity variants used throughout (Tailwind alpha): `text-foreground/90`, `/80`, `/75`, `/70`, `/65`, `/60`, `/55`, `/45`, `/40`, `/35`. Borders mostly `border-white/10` and `border-white/5`. Orange used at varying alpha: `bg-primary/5`, `/10`, `/15`, `border-primary/30`, `/40`, `/60`, `text-primary/70`, `/80`.

---

## 3. Custom utility classes (defined in `src/index.css`)

```css
.glass-card {
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  background: linear-gradient(145deg, rgba(17,24,39,0.95), rgba(30,41,59,0.85));
  border: 1px solid hsl(var(--border) / 0.5);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
}

.gradient-mesh {
  background:
    radial-gradient(ellipse at 20% 50%, hsl(24 95% 53% / 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsl(24 60% 40% / 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 80%, hsl(220 50% 20% / 0.1) 0%, transparent 50%);
}
```

### Hero warm glow (inline, About-only)
A warm amber wash layered on top of `gradient-mesh`, only in the hero section:

```css
background: radial-gradient(120% 95% at 22% 0%,
  hsl(28 70% 24% / 0.4) 0%,
  hsl(24 60% 16% / 0.18) 35%,
  transparent 60%);
```

### Faint grid overlay (hero)
```css
background-image:
  linear-gradient(to right, currentColor 1px, transparent 1px),
  linear-gradient(to bottom, currentColor 1px, transparent 1px);
background-size: 64px 64px;
opacity: 0.06;
```

---

## 4. Reusable component: `SectionLabel`

File: `src/components/SectionLabel.tsx`. An editorial kicker shown above each section heading. Renders as: `——  01  /  Section Name`.

Props: `children` (label text), `index?` (number → zero-padded like `01`), `align?` (`"left" | "center"`), `className?`.

Styling: `inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary`, with a `h-px w-10 bg-primary/60` rule, the padded serif number in `text-foreground/40`, and a `/` separator in `text-foreground/30`.

---

## 5. Page structure (top → bottom)

The page is wrapped in `<Layout>` (shared Navbar with logo `public/logo.png` + Footer).

### a) Hero (`#top`)
- Background: `gradient-mesh` + warm glow + faint grid overlay.
- Top editorial bar: left "Inspire India Talks — The About Edition" with a rule; right (md+) serif italic "Vol. 01 · Bharat Stories".
- 12-col grid (`lg:grid-cols-12 lg:gap-8 lg:items-stretch`): text = `lg:col-span-7`, image = `lg:col-span-5`.
- Pill badge: `Sparkles` icon + "India's storytelling platform" (uppercase, tracking-[0.3em]).
- H1 (serif, `text-5xl` → `md:text-[5.5rem]`, leading-[0.95]): "Inspiring minds." / "Shaping India's" (orange) / "future." (italic, light).
- Lead paragraph with a left orange rule, includes emphasized "from wherever they begin".
- Two CTAs: "Explore Stories" (solid orange, `ArrowRight`) → `/inspiring-voices`; "Partner With Us" (outline, `ArrowUpRight`) → `/contact`.
- Stats row (3 cols, orange left-border): **50+ Voices Documented · 12+ States Covered · 40+ Sectors Explored**.
- Hero image: `public/images/conference-stage.png`, full-height `min-h-[600px]`, `rounded-[28px]`, dark bottom gradient, SVG noise overlay, "Est. on stage" chip, bottom caption "Stories · Ideas · Impact" + "A stage for the India that is building quietly."
- Marquee ticker (CSS `@keyframes ticker`, 40s loop): Bihar, Jharkhand, Odisha, Uttar Pradesh, Madhya Pradesh, Maharashtra, Karnataka, Tamil Nadu, Assam, Rajasthan, Punjab, Kerala.

### b) Meet The Founder (`#founder`, SectionLabel 01)
- Two columns. Left: founder photo `public/images/founder-photo.png` (`aspect-[4/5]`) inside a frame with an offset orange border (`-bottom-4 -right-4 border-primary/40`), "Founder · 2024" chip, name overlay "Shamshad Alam".
- Right: H2 "The story behind our story." + tag pills (Storyteller, Youth Builder, Bharat First, Platform Creator) + two body paragraphs + a pull-quote.
- Pull-quote (`figure.glass-card`, `border-l-2 border-primary`): large `Quote` icon, italic serif text "The problem was never lack of potential. The problem was lack of access.", caption "Shamshad Alam, Founder".

### c) Our Mission (`#mission`, SectionLabel 02)
- Header stacked left (`max-w-3xl`): H2 "Four pillars driving everything we publish." + paragraph below it.
- 4 image-backed cards (`min-h-[340px]`, grid 1→2→4): background photo at `opacity-35` (hover 55%, scale), dark bottom gradient, orange corner ticks (top-left/right), icon tile, zero-padded number, title, text.

| # | Title | Icon | Image |
|---|-------|------|-------|
| 01 | Inspire | `Sparkles` | `/images/founder-stories/srikanth-bolla.webp` |
| 02 | Educate | `BookOpen` | `/images/founder-stories/anand-kumar.jpeg` |
| 03 | Empower | `Rocket` | `/images/events/Khushi-grewal.jpg` |
| 04 | Connect | `Users` | `/images/conference-crowd.png` |

### d) Our Journey (`#journey`, SectionLabel 03)
- H2 "Milestones that shaped the road ahead."
- 4-col timeline with a horizontal connector line (md+) and glowing orange node dots.
- Items: **Origin** — A Small-Town Conviction; **Stage** — Voices From Bharat; **Community** — Youth Conversations; **Now** — A Growing Movement.

### e) What We Cover (`#cover`, SectionLabel 04)
- Header (`max-w-3xl`) + "View all coverage ↗" link → `/inspiring-voices`.
- 6 cards (`aspect-[4/5]`, grid 1→2→3): full-bleed image, category pill (top-left), number (top-right), title (hover → orange), note, "Read latest" with a growing rule.

| # | Title | Category | Note | Image |
|---|-------|----------|------|-------|
| 01 | Inspiring Voices | Stories | Founders, officers, educators, artists. | `/images/founder-stories/srikanth-bolla.webp` |
| 02 | Business Insights | Ideas | Startups built outside the metros. | `/images/business-insights/non-metro-startup-story.png` |
| 03 | Youth Leadership | Impact | Young Indians driving real change. | `/images/events/Khushi-grewal.jpg` |
| 04 | Innovation | Future | DeepTech, climate, and frontier ideas. | `/images/business-insights/deeptech.png` |
| 05 | Education | Learning | Teachers and institutions worth knowing. | `/images/founder-stories/anand-kumar.jpeg` |
| 06 | Social Change | Bharat | Grassroots leaders rewriting their regions. | `/images/founder-stories/Chami-Murmu.jpg` |

### f) Why Inspire India Talks? (`#why`, SectionLabel 05)
- Two columns. Left: two stacked images with chips — `public/images/conference-crowd.png` ("The Audience") and `public/images/business-insights/startup-funding-2026.jpg` ("The Ideas"), plus caption "— Built with the people we report on."
- Right: H2 "We bridge inspiration with action." + paragraph + numbered list (orange circle numbers + `CheckCircle2`):
  1. Real Indian journeys, not borrowed motivation.
  2. Voices from towns, districts, campuses, and grassroots communities.
  3. Stories curated for young builders, students, educators, and leaders.
  4. A platform where visibility becomes belief — and belief becomes action.

### g) Our Vision (`#vision`)
- Centered. `gradient-mesh` + radial orange glow overlay. Pill ("Our Vision", `Target`), divider "2026 & BEYOND", big H2 (`md:text-7xl`): "To become India's most trusted platform for inspiration, knowledge, and transformative storytelling." + paragraph + dot-separated row: Stories • Ideas • Communities • Impact.

### h) Join The Movement (`#join`, SectionLabel 06)
- Inside a large `glass-card`. Left: H2 "Be part of a community shaping India's future." + paragraph + two CTAs ("Explore Stories" → `/inspiring-voices`, "Upcoming Events" → `/events`).
- Right: 3 link cards (icon tile + number + title + text + `ArrowUpRight`):
  1. Nominate a Story → `/contact` (`Megaphone`)
  2. Partner With Us → `/contact` (`Handshake`)
  3. Host A Conversation → `/events` (`Compass`)
- Footer rule: "End of Edition".

---

## 6. Icons (lucide-react)

`ArrowRight`, `ArrowUpRight`, `BookOpen`, `CheckCircle2`, `Compass`, `Handshake`, `Megaphone`, `Quote`, `Rocket`, `Sparkles`, `Target`, `Users`.

---

## 7. Animations (framer-motion)

- Hero blocks: fade + slide/scale on mount (`initial`/`animate`).
- All scroll sections: `whileInView` with `viewport={{ once: true, amount: 0.2–0.35 }}`, durations 0.5–0.9s, small per-item stagger via `delay: index * 0.05–0.08`.
- Shared `fadeUp` variant uses `ease: "easeOut"`.
- Card images: CSS `transition duration-700` scale/opacity on hover.

---

## 8. Files involved

- `src/pages/About.tsx` — the page.
- `src/components/SectionLabel.tsx` — kicker component.
- `src/index.css` — theme tokens, fonts, `.glass-card`, `.gradient-mesh`.
- `tailwind.config.*` — `font-serif` / `font-sans` mappings.
- `public/images/...` — all assets referenced above (note folder is `business-insights`, corrected spelling).
- `public/logo.png` — brand logo in the navbar.

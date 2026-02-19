# How to Add a New Personality — Inspire India Talks

## Steps (No coding experience needed!)

### 1. Add the Photo
- Save the photo in: `public/images/personalities/`
- Name it with the person's slug (e.g., `apj-abdul-kalam.jpg`)
- Any format works: `.jpg`, `.png`, `.webp`

### 2. Open the Category Data File
- Go to: `src/data/personalities.ts`
- Find the section for the correct category (search for `===== ENTREPRENEURS =====`, `===== IAS OFFICERS =====`, etc.)

### 3. Add a New Object
Copy this template and fill in the details:

```typescript
{
  id: "first-last",                    // URL slug (lowercase, hyphens)
  name: "Full Name",
  title: "Title / Designation",
  category: "Category Name",          // Must match exactly
  categorySlug: "category-slug",      // Must match exactly
  image: "/images/personalities/first-last.jpg",
  born: "Date, Place",
  profession: "Profession",
  knownFor: "One line about what they're known for",
  quote: "Their famous quote",
  story: "Full biography/story paragraph...",
  achievements: [
    "Achievement 1",
    "Achievement 2",
    "Achievement 3"
  ],
},
```

### 4. Save the File
The personality will automatically appear on the website!

## Category Slugs Reference
| Category | Slug |
|----------|------|
| Entrepreneurs & Billionaires | `entrepreneurs` |
| Civil Servants | `ias-officers` |
| Startup Founders | `startup-founders` |
| Women Leaders | `women-leaders` |
| Inspiring Students | `students` |

## Image Tips
- Use high-quality portrait photos
- Any size works — the website auto-crops and adjusts
- Prefer `.webp` or `.jpg` for smaller file sizes

---

## Youth Spotlight uploads

If you’re adding **approved Youth Spotlight** videos/articles, follow:

- `docs/youth-spotlight-content.md`

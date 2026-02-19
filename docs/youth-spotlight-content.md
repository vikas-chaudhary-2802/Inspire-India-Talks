# Youth Spotlight — Content & Upload Workflow

This website is **frontend-only** (no database/admin panel). That means:

- **Submissions** are collected via **Web3Forms** (sent to your email inbox tied to the access key).
- **Videos** are stored on **Google Drive** (you upload/manage them there).
- **Approved stories shown on the website** are published by editing a local data file:
  - `src/data/youthSpotlightStories.ts`

---

## 1) Where do student submissions go?

When a student submits the form on `/youth-spotlight`, the data is POSTed to:

- `https://api.web3forms.com/submit`

You will receive the submission in the **email inbox configured in Web3Forms** for the access key used in:

- `src/pages/YouthSpotlight.tsx` → `WEB3FORMS_KEY`

### Fields received in Web3Forms

- `name`
- `college`
- `city`
- `category`
- `videoLink` (optional)
- `article` (optional)
- `consent` (accepted)

---

## 2) Where should videos be uploaded?

### Recommended: one dedicated Google Drive folder

Create a Drive folder such as:

- `Inspire India Talks / Youth Spotlight / Videos`

Upload the approved video files there.

### Sharing permissions (important)

To allow the website to embed the video:

- Open the file in Google Drive
- Click **Share**
- Set **General access** to **Anyone with the link**
- Set permission to **Viewer**

### Which link format to use

Use a **Google Drive file link** like:

- `https://drive.google.com/file/d/<FILE_ID>/view`

The website automatically converts it to an embeddable preview:

- `https://drive.google.com/file/d/<FILE_ID>/preview`

Tip: The easiest way is to copy the “Share link” from Drive, then ensure it contains `/file/d/...`.

---

## 3) How to publish approved stories on the website

Approved stories are rendered from:

- `src/data/youthSpotlightStories.ts` → `approvedYouthStories`

Each approved story is an object like:

```ts
{
  id: "youth-4",
  name: "Student Name",
  college: "College/School Name",
  city: "City",
  category: "Leadership",
  videoLink: "https://drive.google.com/file/d/<FILE_ID>/view", // optional
  article: "300-word article...", // optional
  submittedDate: "2026-02-19",
  approvedDate: "2026-02-20",
}
```

### Rules

- **At least one of `videoLink` OR `article`** must exist.
- If you include `videoLink`, it must be a valid `drive.google.com` link.
- Keep `article` at **≤ 300 words** (the UI enforces this on submission; still follow it when publishing).
- `id` must be unique (use `youth-<number>`).

### Steps

1. Pick an approved submission from your Web3Forms inbox.
2. If it’s a **video**:
   - Upload it to the Drive folder
   - Set sharing to **Anyone with the link (Viewer)**
   - Copy the file link and put it into `videoLink`
3. If it’s an **article**:
   - Copy the article text into `article`
   - Lightly edit for spelling/formatting (don’t change meaning)
4. Add a new object inside `approvedYouthStories`.
5. Run locally:

```bash
npm run dev
```

6. Open:
   - `http://localhost:8080/youth-spotlight`
7. Confirm:
   - The card renders
   - Video embeds (if present)
   - Article preview looks correct
8. Commit and deploy as you normally do.

---

## 4) Manual approval checklist (suggested)

- Confirm the student consented.
- Verify originality (no plagiarism).
- For video: confirm the Drive link plays in an incognito window.
- Remove personal data you don’t want public (phone/email) — we don’t publish those fields.


# alielgin.dev site brief

Working brief for the site. Drop it in the repo root as `BRIEF.md` so Claude Code (or future you) builds against it.

## 1. Purpose

One job: convince a DevRel / DX hiring manager, in under a minute, that Ali Elgin can teach developers well.

Everything on the site either serves that job or gets cut.

**The 60-second test.** A hiring manager clicks the link on the CV. Within a minute they should know:

1. Who this is and what he does.
2. That there are finished teaching pieces, each with a video, a written version, and working code.
3. How to contact him.

**Secondary audience:** developers arriving from YouTube, Reddit, or the Storybook Discord who want the written version or the repo. They land on a tutorial page, not the homepage, so every tutorial page must stand alone.

## 2. Non-goals

- No services, pricing, or "hire me for projects" call to action. That is what mishigo.co and lapsana.com are for.
- No chronological blog as the front door. The homepage is curated.
- No newsletter, comments, analytics dashboards, or CMS. Markdown in the repo.
- No product or project showcase. The site is strictly tutorials and guides.
- No claiming the title "Developer Relations" until it is a job held. Describe the work instead.
- No design polish beyond this brief until three pieces are live.

## 3. Sitemap

```
/                          Home: who, featured tutorials, contact
/tutorials/                All pieces, newest first
/tutorials/<slug>/         One piece: video, written tutorial, repo
/about/                    Bio, talks, contact
/rss.xml                   Feed of tutorials
```

Rename the current `/articles/` to `/tutorials/` now, before any URL is shared.

## 4. Page content

### Home

```
+--------------------------------------------------------------+
| Ali Elgin                         Tutorials  About  GitHub   |
+--------------------------------------------------------------+
|                                                              |
|  Ali Elgin                                        [ photo ]  |
|  Senior engineer. I build developer tools and               |
|  products, and teach what I learn shipping them.             |
|                                                              |
|  GitHub   LinkedIn   YouTube   ali@alielgin.dev              |
|                                                              |
+--------------------------------------------------------------+
|  Tutorials                                                   |
|                                                              |
|  [ thumbnail ]  Catch the UI bugs your AI assistant          |
|                 introduces                                   |
|                 One line on what it shows.                   |
|                 Watch (8 min)   Read   Code                  |
|                                                              |
|  (next piece, same shape)                                    |
+--------------------------------------------------------------+
|  footer: email, RSS, source on GitHub                        |
+--------------------------------------------------------------+
```

Notes:

- Left aligned throughout. Single column, max width about 68 characters for text, thumbnails may run wider.
- With one tutorial live, show one. Do not pad with "coming soon" cards. An honest single strong piece reads better than placeholders.
- The Watch / Read / Code row is the recurring structural device of the site. It appears on every card and at the top of every tutorial page. It tells the reader each piece is complete in three forms, which is the actual DevRel skill on display.

### Tutorial page

Order, top to bottom:

1. Title (the pain, in the reader's words).
2. One-sentence summary.
3. Watch / Read / Code row, plus published date and reading time.
4. Video embed (lite embed, loads the player on click).
5. Written tutorial, following the same seven sections as the video: hook, what you'll build, the problem, the build steps, the payoff, gotchas, wrap-up.
6. "What this shows" box at the end, written for the hiring reader: two or three plain sentences. Example: "Explains visual regression testing through a real failure instead of a feature tour. Working repo with CI. Written, recorded, and edited solo."
7. Next tutorial link, and the repo link again.

### About

- Photo, three short paragraphs: what you do now, what you've built over 21 years, what you're looking for.
- Talks and community work (fill in from real events, with links or slides where they exist).
- Contact: email, GitHub, LinkedIn.
- Optional line: "Based in Cyprus, working remotely, open to relocation."

## 5. Copy drafts

**Page title:** `Ali Elgin: engineer and developer educator`

**Meta description:** `Tutorials, videos, and working code from a senior engineer with 21 years of shipping software. Storybook, visual testing, Cloudflare, Apple Watch, and more.`

**Homepage intro (pick one):**

- "Senior engineer. I build developer tools and products, and teach what I learn shipping them."
- "I've shipped software for 21 years. Here I show how the tricky parts actually work, with video, a written guide, and code you can run."

**First tutorial, title options:**

- "Catch the UI bugs your AI assistant introduces"
- "One changed digit, one broken mascot: visual testing for AI-edited code"
- "Code review missed it. Chromatic didn't."

**Link labels:** "Watch", "Read", "Code". Sentence case, no arrows, no icons required.

## 6. Content model

`src/content.config.ts`, one collection:

```ts
const tutorials = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tutorials" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(160),
      published: z.date(),
      updated: z.date().optional(),
      videoId: z.string().optional(),        // YouTube ID
      videoMinutes: z.number().optional(),
      repo: z.string().url(),
      liveDemo: z.string().url().optional(), // e.g. published Storybook
      thumbnail: image(),
      shows: z.string(),                     // the "What this shows" text
      tools: z.array(z.string()),            // ["Storybook", "Chromatic", "React"]
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});
```

Homepage lists `featured` pieces, max five. `/tutorials/` lists everything not `draft`.

## 7. Design direction

### Idea

The site is a teaching surface, so it should read like good documentation written by one person: calm, legible, quick. Personality comes from one source only, which is aviation. The palette borrows from aeronautical charts (cool paper, deep navy ink, the magenta used for airspace boundaries). It is personal, it is not the usual developer-portfolio look, without any plane icons or gimmicks.

Boldness is spent in one place: large, confident type for the name and tutorial titles. Everything else stays quiet.

### Color tokens

```css
:root {
  --paper:   #F5F8FA;  /* cool chart white, page background */
  --ink:     #0B2A4A;  /* deep navy, body text and headings (matches Mishigo) */
  --muted:   #5A6B7D;  /* secondary text, dates, captions */
  --rule:    #D5DEE6;  /* hairlines, code block borders */
  --magenta: #A8286A;  /* links and focus ring, the only accent */
  --wash:    #E8EFF5;  /* code blocks, "What this shows" box */
}

@media (prefers-color-scheme: dark) {
  :root {
    --paper:   #0A1B2E;
    --ink:     #E6EDF3;
    --muted:   #93A4B5;
    --rule:    #1F3349;
    --magenta: #F07CB4;
    --wash:    #11263C;
  }
}
```

Check contrast: ink on paper and magenta on paper both need to pass WCAG AA for body text. Adjust magenta slightly darker if a checker says otherwise.

### Type

- **Headings:** Bricolage Grotesque, weights 600 and 700. Characterful at large sizes, which is where the personality lives.
- **Body:** Atkinson Hyperlegible Next, 400 and 700. Built for legibility, a good fit for teaching content and for readers whose first language is not English.
- **Code:** JetBrains Mono, used for code only, never for labels or dates.

Self-host all three through Fontsource. No Google Fonts request at runtime.

Scale (1.25 ratio, 18px base):

```
name / h1      clamp(2.4rem, 6vw, 3.8rem)   700   tight leading (1.05)
h2             1.75rem                       600
h3             1.4rem                        600
body           1.125rem                      400   line-height 1.65
small / meta   0.9rem                        400   color: var(--muted)
code           0.95em
```

Text column max-width: 68ch. Code blocks and video may extend to about 80ch.

### Layout rules

- One column, left aligned, generous top margin. No sidebar, no card grid.
- Tutorials on the homepage are rows, not cards: thumbnail left, text right, stacked on mobile. No shadows, no rounded boxes around each one. Separate rows with whitespace, plus a hairline only if needed.
- Thumbnails get a 1px `--rule` border and a small radius (4px). Nothing else is rounded.
- Links: magenta, underlined, underline offset 3px. Hover thickens the underline. No color-only link cues.
- Focus ring: 2px magenta outline with 2px offset, visible on every interactive element.
- Motion: none on load. Respect `prefers-reduced-motion`. The only movement is the video player loading on click.
- Sentence case everywhere. No all-caps labels, no eyebrow text above headings, no numbered section markers.

### Code blocks

Most visitors are developers reading code, so this matters more than the hero.

- Shiki with a light and dark theme pair that matches the tokens.
- File name shown as a plain caption above the block when relevant.
- Copy button, keyboard reachable.
- Horizontal scroll inside the block, never on the page.
- Line highlighting for the "this digit changed" moments.

### One optional flourish (after video one ships)

On the Chromatic tutorial page only: a before/after slider over the two gorilla renders, so readers can find the changed pixel themselves before the article reveals it. It is the written equivalent of the video hook. Build it as a small island, keyboard operable, and skip it entirely if it delays publishing.

## 8. Technical checklist

- [ ] Remove the starter counter component.
- [ ] Rename `/articles/` to `/tutorials/`.
- [ ] Title, meta description, canonical URL on every page.
- [ ] `@astrojs/sitemap` and `@astrojs/rss`.
- [ ] Per-page Open Graph image: tutorial title in Bricolage Grotesque on `--paper`, name bottom left. Generate at build time (satori or astro-og-canvas).
- [ ] `Person` JSON-LD on home and about; `TechArticle` plus `VideoObject` on tutorial pages.
- [ ] Lite YouTube embed, no third-party requests until click.
- [ ] Self-hosted fonts with `font-display: swap` and preloaded heading weight.
- [ ] `rel="me"` on GitHub and LinkedIn links.
- [ ] Favicon: initials "AE" in ink on paper, SVG.
- [ ] No cookies, no tracking. If numbers are wanted later, Cloudflare Web Analytics.
- [ ] Lighthouse 95+ on performance and accessibility, checked on mobile.

## 9. Build order

**Now (30 minutes, then stop):**

1. Remove the counter.
2. New tagline, title, and meta description from section 5.
3. GitHub, LinkedIn, and email links.
4. Rename `/articles/` to `/tutorials/`.

**After the Chromatic video is recorded and edited:**

5. Content collection and the tutorial page template.
6. Write the first tutorial from the video's seven sections.
7. Color and type tokens, homepage layout.
8. RSS, sitemap, OG images, JSON-LD.

**After three pieces are live:**

9. About page in full, talks section.
10. Before/after slider, dark mode polish, anything else.

The site is never the bottleneck. If a choice in this brief would delay a video, skip it.

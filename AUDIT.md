# AUDIT — KRL Media Connect

Phase 0. Read-only. No code changed.
Audited 14 September 2026 against the working tree at repo root.

---

## 1. Correction to the brief: this is not a Next.js site

The brief describes "Next.js/static site deployed to Vercel." There is no Next.js
here, and no build step of any kind.

```
index.html      18,928 B    one page, hand-written
styles.css      12,281 B    one stylesheet, hand-written, no preprocessor
app.js          26,245 B    one script, no modules, no bundler
vercel.json        155 B    a single Cache-Control header rule
```

No `package.json`, no `node_modules`, no framework, no router, no dependency of
any kind. Vercel is serving the directory verbatim as static files.

This matters for every later phase:

- **There is nothing to "server-render" yet.** Phase 2 asks for route-based i18n
  with both locales server-rendered. That requires introducing a build step —
  either a real framework (Next.js/Astro) or a small static generator that
  renders `index.html` and `bn/index.html` from the data files. That is a
  decision I need from you before Phase 2, and it shapes Phase 1's data format.
- **It also means the current setup is fast to fix.** No framework migration is
  required to land Phases 1, 3, 4, 5 and 6. The 7.9 MB payload and the empty
  text layer can both be fixed inside the existing three files.

`.gitignore` and `.vercelignore` reference `_stage_and_drive.py`,
`_upload_drive.py`, `_upload_partha.py`, `_sheet.py`, `_drive_state.json` —
staging scripts that are not in this tree. Worth knowing they exist somewhere,
because whatever generated these assets probably still lives there.

**Routing.** None. One document. Navigation is same-page fragment links:
`#top`, `#day`, `#stage`, `#film`, `#press`, `#media`, `#gallery`. All seven
must keep working (constraint: "keep every existing URL and anchor working").
Note `#stage` and `#film` are not linked from the nav but are live anchors and
may be in circulation.

**Styling.** Vanilla CSS, 584 lines, custom properties for an eight-token
palette, CSS Grid throughout, one breakpoint at 900px. No framework, no utility
classes, no dark/light switching (it is dark-only by design). The CSS is
disciplined and legible — this is not the problem area.

**Build config.** `vercel.json` sets `Cache-Control: public, max-age=3600` on
`/(.*)` — every file, including 8.9 MB of images, 50 MB of video and 199 KB of
fonts, and including the HTML. One hour, no `immutable`, no filename hashing.
A returning journalist re-downloads the entire site every hour.

---

## 2. How content is stored

**Split across two files, in two incompatible ways, and the split is the root
cause of three of the four specific bugs you asked about.**

Every translatable string lives in `app.js` in a single 240-line object literal
`T = { en: {...}, bn: {...} }` — 129 keys per language, 258 strings total. The
HTML carries 129 elements marked `data-i18n="key"`. At load, `apply(lang)`
walks them and sets `textContent`.

The keys are flat and positional. The programme is `p1`…`p11` paired with
`p1t`…`p11t`. The quotes are `v1n`/`v1r`/`v1` through `v4n`/`v4r`/`v4`. The
gallery is `g1`…`g7` and `gv1`…`gv7`. There is no array, no object per item, no
schema. Adding a twelfth programme row means: add `<time data-i18n="p12t">` and
`<p data-i18n="p12">` to `index.html` at the right grid position, then add `p12t`
and `p12` to **both** dictionaries in `app.js`, in two places 120 lines apart.
Adding the next press clipping means hand-writing a `<figure class="clip">` and
an `<aside class="card">` into `index.html` plus six new keys in each language.

Nothing is typed. Nothing validates that `en` and `bn` have the same keys. (They
currently do — I checked: 129/129, no orphans, no gaps. That is luck and care,
not a guarantee.)

### The critical finding: 83 of 129 fields are empty in the served HTML

This is the single most consequential fact in the audit and it explains both
mysteries you flagged.

The HTML ships **partial** fallback text. Section headings, the nav, the hero,
the four fact cells and the eleven `<time>` stamps have real text between their
tags. Everything else is an empty element:

```html
<p class="lede" data-i18n="pressLede"></p>
<figcaption data-i18n="capStage"></figcaption>
<h3 data-i18n="v1n"></h3>
<a class="dl" href="press/...pdf" download data-i18n="releaseDl"></a>
```

| | count |
|---|---|
| `data-i18n` elements in HTML | 129 |
| carry fallback text in the HTML | 46 |
| **ship empty, content exists only in `app.js`** | **83** |

What is in those 83: all eleven programme descriptions, all twelve fields of the
four stage quotes, every single figcaption on the page, the entire "In the media"
section body, **both PDF download button labels**, and the whole footer —
including the two press phone numbers.

Consequence, for your priority-one audience specifically: any view that does not
execute `app.js` sees a page of headings with nothing under them. That includes
view-source, reader mode, a crawler that does not run JS, a corporate proxy that
strips scripts, a script that 404s or is still in flight, and — significantly —
**link-preview bots**. Nine headings ship empty (`<h3></h3>`, `<h4></h4>`).

---

## 3. The printed programme — why only timestamps appear

**Answer: the labels are neither missing, nor image-only, nor CSS-hidden. They
are empty elements in the HTML source, populated by JavaScript at runtime.**

`index.html` lines 106–118:

```html
<div class="programme">
  <time data-i18n="p1t">09:30</time><p data-i18n="p1"></p>
  <time data-i18n="p2t">09:35</time><p data-i18n="p2"></p>
  ...
```

The times are hardcoded between the tags. The descriptions are not. `app.js`
holds all eleven in both languages (they are complete and correct — `p1`
through `p11`, `09:30` sacred opening through `11:10` vote of thanks and
National Anthem).

I confirmed there is no CSS rule hiding `.programme p` — it is styled visible
(`padding: 12px 0; border-top: 1px solid; font-size: 16px`). And I confirmed
both dictionaries have all 22 keys. The content is right; the delivery is wrong.

So with JS running, the programme renders correctly. Without it, you get a
column of eleven gold timestamps against a column of eleven empty bordered rows
— which is exactly the "only timestamps in the text layer" symptom.

**Fix (Phase 1):** every row becomes a data record `{ time, label_en, label_bn }`
rendered into the HTML at build time. Labels then exist in the document, not
just in a script.

---

## 4. "What the stage carried" — why it appears empty

**Same root cause, worse blast radius — and there is a second, editorial problem
underneath it.**

The `<h2>` has fallback text ("What the stage carried"), so the heading renders.
Its twelve children do not:

```html
<article>
  <h3 data-i18n="v1n"></h3>
  <span class="role" data-i18n="v1r"></span>
  <p data-i18n="v1"></p>
</article>
```

Four articles × three empty fields. With JS off you get a heading, a gold rule,
and four empty bordered boxes — visually "an empty section."

**The second problem is more serious than the first.** The content that JS fills
in is flagged, in the site's own copy, as not real:

> `voicesNote`: "The argument of the morning, in each voice. **Exact words from
> the recordings will replace these lines.**"

The four passages attributed to the Minister of Agriculture, the Adhyaksha of
the Mahila Wing, an MLA and the State President are **paraphrases written as
placeholders**, formatted on screen as attributed statements with name and
designation. The disclaimer sits in 13px muted grey above them.

A journalist reading this page to find a quotable line from Shri Dudh Kumar
Mondal will find one that he did not say. That is a live misattribution risk,
not a code defect.

**Recommendation:** do not merely "write the section or delete the heading."
Either replace all four with verified transcript quotations from the recording,
or remove the four articles entirely and keep the heading over a short
third-person summary of what was argued. I will not invent quotes. See §12,
TODO-1 — I need either the recording/transcript or your instruction to cut.

---

## 5. The EN / বাং toggle

**Implementation.** `app.js` lines 244–264. Two `<button data-lang>` in the nav.
`apply(lang)` sets `document.documentElement.lang`, rewrites `textContent` on
all 129 marked elements, flips `aria-pressed`, and writes `localStorage`
`krl-lang`. On load it reads that key, defaulting to `en`.

**Is Bangla server-rendered? No. Not in any sense.**

- `<html lang="en">` is hardcoded in the document.
- There is no `/bn` URL. No route, no file, no redirect.
- All 258 Bangla characters exist only as JS string literals.
- Language is remembered in `localStorage`, which is per-device and invisible
  to everyone else.

Consequences, in order of how much they hurt:

1. **A Bengali journalist cannot be sent to the Bangla version.** There is no
   link that opens it. You can only tell them to click a button. The brief's
   priority-one audience is "Bengali *and* English journalists"; half of them
   have no shareable URL.
2. **Google has indexed zero Bangla text from this site.** No `/bn` document
   exists to index. For audience #3 searching in Bengali, this site does not
   exist.
3. **Every WhatsApp / Facebook / X preview is English**, always, regardless of
   which language the sharer was reading. Audience #2 is "stakeholders sharing
   the link on WhatsApp."
4. No `hreflang`, no per-locale canonical, no per-locale OG.
5. Toggling does not change the URL, so the choice cannot be bookmarked, cannot
   be sent, and is lost on a different device.
6. Because `apply()` rewrites `textContent` rather than swapping a rendered
   tree, the toggle cannot preserve anything beyond scroll (which it happens to
   preserve today only because nothing reflows enough to move it — Bengali is a
   taller script and headings do shift).

**Bengali typography.** This part is better than expected. Noto Sans Bengali is
already self-hosted (`fonts/noto-sans-bengali-{400,600,700}.woff2`) and applied
via `html[lang="bn"] body`. There are real Bengali-specific CSS adjustments —
`letter-spacing: 0`, looser `line-height`, `padding-bottom` on headings to stop
descender clipping, reduced tracking on uppercase labels. Someone who reads
Bengali worked on this.

Problems that remain:

- **Not subset.** 45–51 KB per weight, full Bengali coverage. Subsetting to the
  glyphs actually used should cut this by roughly two thirds.
- **`noto-sans-bengali-700.woff2` (46,896 B) is never used.** No CSS rule
  requests weight 700. Neither is `outfit-700.woff2` (14,064 B). 61 KB of dead
  font.
- **There is no Bengali 500 face**, but `font-weight: 500` is used for `h1`,
  `h2` and `.footer strong`. Bengali headings therefore render at a synthesised
  or rounded weight — the one visible typographic flaw in the Bangla view.
- No `<link rel="preload">` on any font.

---

## 6. Media inventory

### 6.1 Images — 42 files, 8.66 MB, all JPEG or PNG

No AVIF. No WebP. No `srcset`. No `sizes`. No `<picture>`. No blur
placeholders. One image out of 34 `<img>` tags has `width`/`height`.

| | |
|---|---|
| `<img>` tags on the page | 34 |
| `loading="lazy"` | **4** |
| loaded eagerly | **30** |
| with explicit `width`/`height` | **1** (`banner.jpg`) |
| `<video poster="">` loaded eagerly (posters never lazy-load) | 8 |

**Eager image bytes: 6,359,724 B.** Plus three images used *only* as video
posters and therefore not in that count — `g-audience.jpg` (268,881),
`g-dhar-received.jpg` (198,026), `g-opening.jpg` (117,019) — a further 583,926 B.

The four lazy ones are `felicitation`, `rinku-podium`,
`press-clip-hello-kolkata`, `press-release-cover`. Note that two of those four
are the press clipping and the press release cover — the two images a journalist
most wants — while the fourteen gallery images below them load eagerly.

Largest offenders, all eager, all full-size:

| file | bytes | pixels | rendered at |
|---|---|---|---|
| `partha-poster.jpg` | 405,186 | 1600×900 | video poster + a ~200px thumbnail |
| `invite-en.jpg` | 394,188 | 2560×930 | half a grid column |
| `press-clip-hello-kolkata.jpg` | 392,505 | 1498×1232 | lazy, at least |
| `invite-bn.jpg` | 388,798 | 2560×930 | half a grid column |
| `masthead.png` | 353,091 | 1280×427 | **52px tall** |
| `krl-logo.png` | 351,024 | 836×524 | **64px tall** |

`masthead.png` and `krl-logo.png` are 704 KB of PNG to draw two logos at 52 and
64 pixels high. These are the clearest SVG candidates on the site and the
brief's Phase 4 already asks for an SVG logo pack.

`partha-poster.jpg` is fetched twice over — once as the `<video poster>` and
once as a decorative `<img>` in `.film-meta` — at 1600×900 both times.

**Duplicate files, byte-identical (verified by MD5):**

```
g-tea.jpg          ==  hospitality.jpg      216,919 B
g-reena.jpg        ==  reena.jpg            140,735 B
minister-rinku.jpg ==  rinku.jpg            181,841 B
```

`minister-rinku.jpg` and `rinku.jpg` are the same file shipped under two names
with **two different alt texts and two different captions** — "Rinku Majumder
Ghosh and Minister Mondal" in one place, "Smt. Rinku Majumder Ghosh" in another.
At least one of those captions is wrong. Flagged as TODO-2.

**Orphans (in repo, referenced nowhere):** `images/agenda.jpg` (232,819),
`images/hero.jpg` (262,173), `images/hospitality.jpg` (216,919).

### 6.2 Video — 9 files, 50.4 MB

| file | bytes | resolution | duration | bitrate | faststart |
|---|---|---|---|---|---|
| `partha-testimonial.mp4` | 24,981,175 | 1280×720 | 4:46.6 | 697 kb/s | yes |
| `clip-6.mp4` | 8,997,043 | 1280×720 | 53.9 s | 1336 kb/s | yes |
| `clip-7.mp4` | 7,048,621 | 1280×720 | 43.6 s | 1292 kb/s | yes |
| `clip-5.mp4` | 3,975,960 | 720×1280 | 40.3 s | 789 kb/s | yes |
| `clip-4.mp4` | 2,754,648 | 720×1280 | 18.0 s | 1221 kb/s | yes |
| `clip-2.mp4` | 1,805,397 | 720×1280 | 12.1 s | 1196 kb/s | yes |
| `clip-1.mp4` | 1,731,033 | 1280×720 | 16.2 s | 856 kb/s | yes |
| `krl-intro-bg.mp4` | 1,261,099 | 1280×720 | 10.0 s | 1009 kb/s | yes |
| `clip-3.mp4` | 342,500 | 720×1280 | 3.1 s | 874 kb/s | yes |

All H.264/AAC, all 60 fps for the clips (30 for the testimonial, 24 for the
hero loop), all correctly faststart — the `moov` atom is at byte 36 in every
file, so `preload="metadata"` is comparatively cheap. That is the one thing done
right here.

Everything else is not:

- **`krl-intro-bg.mp4` autoplays on every visit, on every device, at 1.26 MB.**
  It is `aria-hidden="true"` — purely decorative. Lighthouse identifies it as
  the **Largest Contentful Paint element**. See §9.
- **Eight `<video>` elements plus one YouTube iframe on a single page.** Each
  `preload="metadata"` opens a connection and pulls a range. Nine media
  contexts competing with 30 images on one mobile connection.
- **The testimonial is 25 MB.** At 697 kb/s for 4:47 it is not badly encoded,
  it is simply long-form video self-hosted on Vercel with no adaptive bitrate.
  A journalist on 4G who taps it downloads 25 MB.
- No captions, no subtitle track, no transcript on the testimonial or the
  YouTube embed.
- `prefers-reduced-motion` *is* handled for the hero (`app.js` pauses it,
  CSS hides it) — credit where due — but nothing handles slow connections
  (`navigator.connection.saveData` / `effectiveType`) or small viewports.

### 6.3 Fonts — 7 files, 199 KB

Self-hosted, `font-display: swap`, no preload. `outfit-700` and
`noto-sans-bengali-700` are dead (61 KB). Bengali faces are unsubset.

### 6.4 PDFs — 2 files, 2.44 MB

`BKS-KY21C-Press-Release-14-Sep-2026.pdf` (1.29 MB) and
`Hello-Evening-Kolkata-14-Sep-2026-page-7.pdf` (1.15 MB). Both linked. Both
carry `download`. Fine — except both link labels are among the 83 empty
elements, so with JS off the press release cannot be downloaded.

---

## 7. Accessibility

### 7.1 Heading hierarchy — no jumps, but nine empty headings

The brief anticipated an h2→h4 jump. There isn't one. The order is clean:

```
h1  Protyabartan
h2  The invitation, as printed        h2  Adhyaksha
h2  The printed programme             h2  Guest of Honour
h2  The room                          h2  What the stage carried
h2  The greeting                        h3 ×4  (all empty)
h2  The video testimonial             h2  The hall
  h3  (empty)                         h2  The press huddle
h2  The Minister                      h2  In the media
                                        h3 (empty)  h3 (empty)  h4 (text)
                                        h3 (empty)  h4 (empty)
                                      h2  From the hall
```

One `h1`. No skipped levels. The defect is that **nine of the twenty-four
headings ship with no text content** — five `h3` in the voices and film blocks,
three `h3.sub`, one `h4`. An empty heading is a WCAG 2.4.6 failure and it breaks
screen-reader heading navigation, which is exactly how a blind journalist would
skim this page.

### 7.2 Landmarks — mostly absent

- No `<main>` element at all. There is no way to skip to content.
- No skip link.
- `<header class="nav">` gives an implicit `banner`; `<footer class="footer">`
  gives `contentinfo`; `<nav class="nav-links">` gives `navigation` — all three
  by accident of element choice rather than intent, but they work.
- Twelve `<section>` elements, **none with an accessible name**. A `<section>`
  without `aria-labelledby` is not exposed as a region, so the twelve sections
  are invisible to landmark navigation. Each already has a heading to point at.
- The language switcher has `role="group"` and `aria-label="Language"` — good —
  but `aria-pressed` on two mutually exclusive buttons models a pair of toggles
  rather than a choice. `role="radiogroup"` + `aria-checked`, or a pair of
  links to `/` and `/bn`, is the correct shape (and Phase 2 makes them links
  anyway).

### 7.3 Focus — undesigned but not destroyed

No `:focus`, `:focus-visible` or `outline: none` anywhere in `styles.css`. The
three `outline` declarations are decorative borders on images. So the browser's
default focus ring survives — which is better than the common failure — but on
this navy background the default ring is low-contrast and there is no designed
indicator. WCAG 2.4.11 (focus appearance) is at risk; 2.4.7 technically passes.

Focus order follows DOM order and is sensible. The one real trap: the nav is
`position: sticky; height: 64px` and `html { scroll-behavior: smooth }`, but
sections have **no `scroll-margin-top`**. Every in-page anchor lands with the
target heading hidden behind the nav bar. Keyboard and screen-reader users who
follow `#press` land 64px past the heading.

### 7.4 Gallery — no lightbox exists

The brief asks to make the lightbox keyboard-operable. There is no lightbox.
Gallery images are plain `<img>` inside `<figure>` with no link, no button, no
click handler. They cannot be enlarged by anyone, by any input method. The
gallery renders 4:3 `object-fit: cover` crops of 960×1280 portrait originals,
so several are cropped through the subject's face with no way to see the full
frame.

This is a Phase 6 build, not a Phase 6 fix.

### 7.5 Alt text and captions

Alt text is present on all 34 images and is genuinely good — descriptive, named,
specific ("Shri Dudh Kumar Mondal, Hon'ble Minister of Agriculture, with
flowers, Smt. Rinku Majumder Ghosh and Smt. Reena J. Sarkar").

Three problems:

- **Decorative marks get descriptive alt.** `images/bks-seal.jpg` in the nav
  (alt "Bharatiya Krishak Samaj", adjacent to a text link saying the same),
  `krl-logo.png` and `masthead.png` in `.marks`. These should be `alt=""`.
- **The detail is in the alt, not on screen.** Exactly as the brief says. The
  `<figcaption>` for `close-flowers.jpg` reads "Shri Dudh Kumar Mondal, Hon'ble
  Minister of Agriculture, with Smt. Rinku Majumder Ghosh and Smt. Reena J.
  Sarkar" — so that one is fine — but `g-minister.jpg` has alt "Minister Mondal
  seated" and visible caption "The Minister of Agriculture." A sighted
  journalist reading the gallery gets no full names and no designations.
  Fourteen gallery items have captions averaging four words.
- The seven gallery clips all share the identical caption **"Clip from the
  hall."** in both languages. Seven times. That is not a caption, it is a
  placeholder. TODO-3.

### 7.6 Contrast — passes AA on the static palette

I computed every foreground/background pair in the stylesheet:

| ratio | pair | verdict |
|---|---|---|
| 15.74:1 | `#eef1f6` body text on `#0a1730` | AAA |
| 9.70:1 | `#efb63c` gold headings/links on `#0a1730` | AAA |
| 9.70:1 | `#0a1730` on gold (active language button) | AAA |
| 7.78:1 | `#9aa6bf` gallery caption 12px on `#07101f` | AAA |
| 7.28:1 | `#9aa6bf` lede + captions 13px on `#0a1730` | AAA |
| 6.34:1 | `#c8901f` gold-dim 11–12px labels on `#0a1730` | AA, and AAA too |

Nothing fails. This is a well-chosen palette and I am not going to change it.

**The one real contrast risk is text over the hero video.** The scrim is a
horizontal gradient from `rgba(10,23,48,.82)` at 0% to `.42` at 42%. The hero
copy column runs to about 28% of the viewport, where the scrim is roughly `.55`.
Against a blown-out white video frame that yields:

| position | paper on scrim+video | gold on scrim+video |
|---|---|---|
| hero left edge (α .82) | 9.09:1 | 5.60:1 |
| hero ~28% (α ≈ .55) | 3.54:1 | 2.18:1 |
| hero 42% (α .42) | 2.39:1 | 1.47:1 |

So on bright frames the right-hand end of the subtitle and the gold kicker fall
below AA — **frame-dependent, which is worse than a consistent failure** because
it cannot be caught by a static check. The vertical gradient overlay mitigates
this partially (raising the 42% case to 3.93:1) but not enough for the 12px gold
kicker. Replacing the autoplaying video with a poster (Phase 3) removes this
problem as a side effect.

Nav bar at α .88 is safe (11.21:1 worst case).

### 7.7 Other

- `html { scroll-behavior: smooth }` is unconditional — not wrapped in
  `@media (prefers-reduced-motion: no-preference)`.
- No favicon. Confirmed 404 in the Lighthouse trace. Affects the browser tab
  and some link previews.
- `lang` is `en` for the whole document while `Protyabartan`, `Adhyaksha`,
  `MahAcharya`, `Krishi Ratna League` are transliterated Bengali in Latin
  script, unmarked. A screen reader pronounces them as English.

---

## 8. SEO and metadata

**Present and decent:** title, description, canonical, full Open Graph set with
`og:image` dimensions and `og:image:alt`, Twitter summary_large_image, a real
1200×630 `og.jpg`.

**Absent entirely:**

- No `sitemap.xml`
- No `robots.txt`
- No JSON-LD of any kind — no `Event`, no `Organization`, no `ImageObject`,
  no `NewsArticle`
- No `hreflang` (there is no alternate to point at)
- No per-locale anything
- Canonical is `https://krl-media-connect.vercel.app/` — a vercel.app subdomain
  as the canonical identity of a press asset for a national farmers' body. The
  brief already flags moving to a custom domain; the canonical and OG URLs are
  hardcoded in six places and will all need to change together.

The `Event` JSON-LD is the highest-value single addition here: date, venue with
address, organizer, and the named launch would make the event eligible for rich
results against exactly the query in audience #3.

---

## 9. Measured baseline

Lighthouse 13.4.1, headless Chrome, served locally over HTTP/1.1 to remove
network variance. **Mobile is the default preset: emulated Moto G Power,
simulated slow 4G, 4× CPU throttle** — which is the brief's stated test
condition.

### Mobile

| | |
|---|---|
| **Performance** | **75** |
| Accessibility | 100 |
| Best Practices | 96 |
| SEO | 100 |
| First Contentful Paint | 0.9 s |
| **Largest Contentful Paint** | **11.2 s** |
| Speed Index | 1.0 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0.014 |
| Time to Interactive | 11.5 s |
| **Total transfer** | **8,125 KiB** |

### Desktop

| | |
|---|---|
| Performance | 92 |
| FCP 0.3 s · LCP 1.9 s · SI 0.4 s · TBT 0 ms · CLS 0 | |
| Total transfer | 8,125 KiB |

### Reading these numbers

**Against the brief's budget: LCP 11.2 s vs target < 2.5 s. Transfer 8,125 KiB
vs target < 1,500 KiB. Overshooting by 4.5× and 5.4× respectively.**

My independent byte count agrees: 57 KB shell + 41 KB Outfit + 6,360 KB eager
images + 584 KB eager video posters + 1,261 KB autoplaying hero video =
**8,303 KB**, or 7.92 MB. Bangla adds 143 KB of font on top.

**The LCP element is `body > section#top > video.hero-video`** — the decorative,
`aria-hidden="true"`, autoplaying background loop. Its breakdown:

```
time to first byte           3 ms
resource load delay          6 ms
resource load duration  10,455 ms   <- 1.26 MB of video on simulated 4G
element render delay       157 ms
```

Ten and a half seconds of the eleven-second LCP is one decorative video file
that carries no information. Meanwhile `fetchpriority="high"` is set on
`banner.jpg` — the wrong element; Lighthouse's LCP-discovery check fails on
`priorityHinted: false`. The single highest-leverage change on this site is
deleting that `autoplay`.

TBT 0 ms and CLS 0.014 are genuinely good and I intend to keep them.

**Two failing audits are artefacts of my local test rig, not the real site, and
I am discounting both:** `errors-in-console` is a `/favicon.ico` 404 (real, but
trivial), and the two `bf-cache` failures are caused by my test server's
`Cache-Control: no-store`. Production sends `max-age=3600`.

**Accessibility 100 is not a clean bill of health.** Lighthouse's automated
checks cover perhaps a third of WCAG. It cannot see the missing `<main>`, the
unnamed sections, the nine empty headings, the absent lightbox, the missing
video captions, or the frame-dependent hero contrast. Section 7 is the real
accessibility picture.

---

## 10. Dead weight and duplication

| item | bytes | note |
|---|---|---|
| `images/hero.jpg` | 262,173 | orphan, unreferenced |
| `images/agenda.jpg` | 232,819 | orphan, unreferenced |
| `images/hospitality.jpg` | 216,919 | orphan **and** byte-identical to `g-tea.jpg` |
| `images/reena.jpg` | 140,735 | byte-identical to `g-reena.jpg` |
| `images/minister-rinku.jpg` | 181,841 | byte-identical to `rinku.jpg`, two conflicting captions |
| `fonts/noto-sans-bengali-700.woff2` | 46,896 | no CSS rule requests weight 700 |
| `fonts/outfit-700.woff2` | 14,064 | no CSS rule requests weight 700 |
| `.reveal` + `@keyframes up` | — | scroll-reveal animation defined in CSS, **applied to nothing** |
| `.hero-fallback` | — | dead selector |
| `.bn-ready` | — | dead selector |

That `.reveal` class is worth pointing out: someone already intended
scroll-triggered entrance animation, wrote the CSS, and never wired it up.
Relevant to your redesign brief (§13).

---

## 11. Top 10 problems, ranked by impact ÷ effort

Impact is scored for the brief's stated lens: *a journalist opening this on a
phone, on a Kolkata mobile connection, on deadline.* Effort is engineering days.

| # | Problem | Impact | Effort | Ratio |
|---|---|---|---|---|
| 1 | **Decorative hero video is the LCP element; 30 eager full-size images.** LCP 11.2 s, 8.1 MB. A journalist on 4G stares at a scrim for eleven seconds. Fix: drop `autoplay` for a poster, add `loading="lazy"` below the fold, move `fetchpriority` to the real LCP image. Before any format conversion, before any tooling. | 10 | 0.5 | **20** |
| 2 | **83 of 129 content fields are empty in the HTML.** Programme labels, all four stage quotes, every caption, both PDF download labels and the two press phone numbers exist only inside `app.js`. No JS → no facts. No crawler → no index. This is the single root cause of the programme bug *and* the empty-section bug. | 10 | 1 | **10** |
| 3 | **Press essentials are missing or unreachable.** No press-contact block (the two numbers are buried in a JS-only footer), no media kit, no photo credit line beyond "Photographs: Bumba and Shubhashis," no reproduction-permission statement, no fact sheet, no name-and-spelling list. This is the page's actual job for audience #1 and it is not being done. Mostly content, not code. | 9 | 1 | **9** |
| 4 | **Four placeholder paraphrases are presented as attributed quotations** from a sitting Minister, an MLA and two office-bearers. The disclaimer is 13px grey. Misattribution risk, not a bug. Fix is to source or cut — trivially cheap once you decide. | 9 | 1 | **9** |
| 5 | **No `/bn` URL.** Bangla is unshareable, unbookmarkable, uncrawlable, and never appears in a WhatsApp preview. Half the priority-one audience has no link to send. Needs a build step, hence the effort. | 9 | 2 | **4.5** |
| 6 | **Eight self-hosted `<video>` on one page, 50 MB in repo, 25 MB testimonial.** Nine media contexts contend on one mobile connection. Fix: click-to-play posters for all seven clips; consider moving the testimonial off Vercel. | 8 | 1 | **8** |
| 7 | **No `sitemap.xml`, `robots.txt`, JSON-LD, or `hreflang`; canonical is a vercel.app subdomain.** Audience #3 searches "Krishi Ratna League Bengal" and finds a page with no `Event`, no `Organization`, no structured identity. Cheap, purely additive. | 7 | 0.5 | **14** |
| 8 | **Captions carry four words where alt text carries names and designations.** Seven gallery clips share the caption "Clip from the hall." A sighted journalist cannot get a name or a spelling off a photograph. Content work, no architecture. | 8 | 1 | **8** |
| 9 | **No `<main>`, no skip link, twelve unnamed `<section>`s, nine empty headings, no `scroll-margin-top` so every anchor lands behind the sticky nav, and the gallery has no lightbox at all.** Lighthouse says 100; Lighthouse is wrong about what it can see. | 7 | 1 | **7** |
| 10 | **Content is markup, not data.** Adding the next press clipping means hand-editing `index.html` and two 120-line-apart blobs in `app.js` in lockstep, with nothing validating that EN and BN agree. Lowest direct impact on a visiting journalist; highest impact on whether items 2, 3, 4 and 8 ever stay fixed. | 6 | 2 | **3** |

**Ranked order to execute: 1, 7, 2, 6, 3, 4, 8, 9, 5, 10.**

I would deviate from that in one place. Item 10 (data architecture) scores last
on raw ratio but it is Phase 1 in your plan for a good reason: doing 2, 3, 4 and
8 as more hand-edited markup means doing them twice. I recommend keeping your
phase order and treating item 1 as a same-day patch that lands before Phase 1,
because it is thirty minutes of work for 4.5× of the LCP budget and it does not
touch anything Phase 1 will rewrite.

---

## 12. TODOs — content I do not have and will not invent

Per the constraint "do not invent facts, quotes, names, or designations."

- **TODO-1 — The four stage quotes.** `v1`–`v4` are self-declared placeholders.
  I need the recording or transcript, or your instruction to cut the four
  articles and keep a third-person summary under the heading. *Blocks: "either
  write the section or delete the heading."*
- **TODO-2 — `rinku.jpg` / `minister-rinku.jpg` are the same file** with two
  different captions ("Smt. Rinku Majumder Ghosh" vs "Smt. Rinku Majumder Ghosh
  and the Minister on stage"). One is wrong. Which? Or is a second photograph
  missing from the repo? Same question for `reena.jpg`/`g-reena.jpg` and
  `g-tea.jpg`/`hospitality.jpg`, though those two pairs carry consistent copy.
- **TODO-3 — Seven gallery clips, one caption.** All seven say "Clip from the
  hall." I need a one-line description of what each of `clip-1` … `clip-7`
  shows. I can watch them and draft neutral descriptions if you prefer, but I
  will not name anyone I cannot identify with certainty.
- **TODO-4 — Press contact block.** The footer has Smt. Reena J. Sarkar
  +91 98300 24611 and Shri Ram Badrinathan +91 91677 19898. Are those the
  correct media contacts to promote, and is there an email address? A press
  page without an email is half a press page.
- **TODO-5 — Photo credit and usage permission.** "Photographs: Bumba and
  Shubhashis" — full names for the credit line? And what is the reproduction
  permission: free use with credit, on request, embargoed? Phase 4 needs an
  explicit statement.
- **TODO-6 — "About KRL Bengal" primer.** Phase 1 asks for what it is, who runs
  it, what launched that day. The site currently asserts the launch happened but
  never says what Krishi Ratna League Bengal *is*. I have nothing to write this
  from — the press release PDF may contain it; confirm I should draw on it.
- **TODO-7 — Organisational boilerplate** for BKS West Bengal and KarmYog for
  the 21st Century (founding, remit, scale). Needed for Phase 4 and for the
  `Organization` JSON-LD in Phase 5.
- **TODO-8 — Dr. Krishan Bir Chaudhary** appears in programme row `p3` ("Video
  keynote from Dr. Krishan Bir Chaudhary") and nowhere else — no photo, no
  designation, no section. Intentional?
- **TODO-9 — Custom domain.** Six hardcoded `krl-media-connect.vercel.app`
  URLs. Tell me the target domain and I will parameterise them now rather than
  twice.
- **TODO-10 — Video captions.** Phase 6 requires captions or a transcript for
  the testimonial (4:47) and the YouTube embed. Is a transcript available, or
  should I flag this as unresolvable for now?

---

## 13. Note on the redesign and scroll-motion brief

Your closing instruction — redesign with the taste skill, and make the page move
as it scrolls rather than scrolling flat — is not Phase 0 work and I have not
started it. Two things from the audit bear on it:

1. **`.reveal` and `@keyframes up` already exist in `styles.css` and are applied
   to nothing.** The intent was there. Whatever motion system I build should
   replace that dead code, not sit beside it.
2. **The current TBT is 0 ms and CLS is 0.014.** Those are the two numbers that
   scroll-driven motion most easily destroys. I will hold them — meaning CSS
   scroll-driven animations and `IntersectionObserver` over any scroll-handler
   library, and everything behind `prefers-reduced-motion`.

I will invoke `design-taste-frontend` and state a Design Read before writing any
markup, per your standing instruction. The editorial voice is preserved as a
hard constraint: "Bamboo, diya, tulsi, a yellow cloth on the lectern" stays
exactly as written.

---

## 14. Anchors and URLs that must keep working

```
/                      the only page
/#top  /#day  /#stage  /#film  /#press  /#media  /#gallery
/press/BKS-KY21C-Press-Release-14-Sep-2026.pdf
/press/Hello-Evening-Kolkata-14-Sep-2026-page-7.pdf
/images/og.jpg                          referenced by every existing share card
/images/*                               may be hotlinked by outlets already
```

`#stage` and `#film` are live anchors not linked from the nav — easy to drop by
accident in a restructure. If Phase 2 moves English to `/en`, `/` must redirect
rather than 404, and `/#press` must survive the move.

---

*End of Phase 0. No files were modified. Awaiting go for Phase 1.*

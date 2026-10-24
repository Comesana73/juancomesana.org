# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Juan Comesaña's academic website (`juancomesana.org`), a Jekyll site published by GitHub Pages straight from `main` (root folder, `github-pages` gem, no separate build service). Merging to `main` deploys. There is no test suite, linter, or package manager beyond Bundler.

Juan rarely edits the site himself; he usually asks Claude to make changes. `README.md` is written for a non-developer and should stay that way. He wants to see proposals before changes are made. He tests the Frame app on iPad and everything else on a Mac.

## Commands

```bash
export PATH="/opt/homebrew/opt/ruby@3.4/bin:$PATH" LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
bundle install
bundle exec jekyll serve --host 0.0.0.0   # http://127.0.0.1:4000/, reachable from the iPad on the same Wi-Fi
bundle exec jekyll build                  # output in _site/
```

Local builds on Juan's Mac use Homebrew's `ruby@3.4` (keg-only, so it must be put first on `PATH` as above). Don't use the macOS system Ruby 2.6: native gems such as `commonmarker` fail to compile against it. Don't use Homebrew's default `ruby` (4.x) either: `github-pages` depends on `commonmarker < 1.0`, which requires Ruby < 4.0. The extra gems in the Gemfile (`csv`, `base64`, `logger`, `webrick`, …) are standard-library gems that Ruby 3.4 stopped bundling. The UTF-8 locale is required, or Sass fails on non-ASCII characters in the Primer theme. Gems install into `vendor/bundle` (set in the untracked `.bundle/config`). GitHub Pages ignores this Gemfile and builds with its own environment, so these settings affect local previews only.

The standalone HTML pages below need no build; open them directly or through `jekyll serve`.

### Local preview for Juan

When Juan wants a local preview, run the server in the background with `--host 0.0.0.0`. Give him the Mac URL (`http://127.0.0.1:4000/<path>`). Give iPad URLs only when the change touches the Frame app (`frame/`): `http://<LocalHostName>.local:4000/frame/` (`scutil --get LocalHostName`) and `http://<Wi-Fi IP>:4000/frame/` (`ipconfig getifaddr en0`) as a fallback. The macOS firewall is on; Homebrew's ruby is already allowed to accept incoming connections.

GitHub Pages has no PR previews, so before merging a PR with visible changes, preview it this way in Juan's clone at `/Users/juancomesana/Documents/GitHub/juancomesana.org` (through a Remote Control session):

1. Run `git status` first. Never commit, push, stash, or discard anything in his clone; if it has uncommitted work, stop and ask.
2. `git fetch origin` and check out the PR branch, then start the server as above.
3. Note that the preview is a different origin from juancomesana.org, so the Frame there starts with default settings and no "My photos".
4. Afterward, stop the server and switch back to `main`; after a merge, `git pull --ff-only`. Build output (`_site/`, `vendor/`, `.bundle/`, `Gemfile.lock`) is gitignored, so previews never leave the clone out of sync with GitHub.

## Two kinds of pages

**Jekyll pages** (`index.md`, `books.md`, `papers.md`, `teaching.md`, `contact.md`, `rec.md`, `rec/*.md`, `teaching/*.md`). Every file gets `layout: default` from `_config.yml` defaults, which wraps it in `_layouts/default.html` + `_includes/`. Content is mostly hand-written HTML inside Markdown (e.g. `<article class="publication">` blocks in `papers.md`, `markdown="1"` on divs that need Markdown inside). Links use `{{ '/path' | relative_url }}`. Styling is all in `assets/css/site.css`; the only shared JS is `assets/js/site.js` (new-tab for external/PDF links, photo-grid lightbox).

- `_includes/head.html` sets a strict Content-Security-Policy: **inline `<script>` is blocked** on Jekyll pages. Page scripts go in `assets/js/site.js`, and any new external host (fonts, analytics, images) must be added to the CSP there. Analytics is GoatCounter.
- PDFs live in `assets/papers/` and `assets/documents/`. `s/` holds duplicate copies at old Squarespace URLs so existing public links keep working; don't remove or rename them, and add a copy there when a paper already had an `/s/...` link. `assets/documents/cv.pdf` is generated outside this repo (from `cv.yaml` in Juan's iCloud `inprogress/cv/`).
- Images are WebP in `assets/images/`.

**Generated textbook chapters** (`phil109/chNN/index.html`, `layout: book`). The PHIL 109 textbook's web version, generated from the LaTeX by `web/build.py` in the Introduction-to-Formal-Reasoning-and-Decision-Making repo; never edit them by hand. Math is pre-rendered with KaTeX (stylesheet and fonts in `assets/katex/`, also copied by the build), styles are in `assets/css/textbook.css`, and `head.html` loads both only for `layout: book`. The section is unlisted: `_config.yml` gives `phil109/` `sitemap: false` and `noindex: true` (which `head.html` turns into a robots meta tag), and nothing links to it yet. Juan chose unlisted but public (October 2026), knowing that the chapter text is readable in this public repo even though the textbook repo is private.

**Standalone single-file apps** (no front matter, so Jekyll copies them verbatim and the site CSP does not apply). Each is one self-contained `index.html` with inline CSS/JS and its own CSP if any:

- `frame/` — "Frame", a home-screen PWA for an always-on iPad: clock, weather, radar, trash/recycling reminders, and a rotating artwork slideshow. See below.
- `apps/*` — teaching tools (Logic Lab, Probability Lab, Decisions & Games Lab). `decision-lab`, `eikosogram-studio`, and `truth-table-builder` are only redirect stubs to their merged successors; keep them so old links work. Shared IBM Plex fonts are self-hosted in `apps/fonts/`.
- `yep/` and `rec/yep/review/` — identical loader pages for the REC Young Epistemologist Prize review; the real interface comes from a Google Apps Script web app (URL in the page). Keep the two copies in sync.
- `private/lucas-f1b9fed5/` — a StatiCrypt-encrypted page; it is generated output, don't hand-edit it.

`private/`, `frame/`, `yep/`, and `rec/yep/review/` are excluded from the sitemap via `_config.yml` defaults and carry `noindex` meta tags. Add both for any new unlisted page.

## Frame app (`frame/index.html`)

One ~1000-line file, organized into `/* ===== section ===== */` blocks: clock, trash/recycling calendar (`TRASH_DAY`, `TRASH_MOVED`, `RECYCLING` dates are hard-coded and need yearly updating), weather (Open-Meteo forecast + air quality, plus weather.gov for NWS forecast/alerts), art, radar (RainViewer tiles on Leaflet from cdnjs, shown automatically when rain is near), settings sheet, and gestures/wake lock. It reloads itself once a night around 3 a.m. to pick up deployed changes.

Art pipeline:
- `COLLECTIONS` maps a setting key to `{ name, src, q }`. `src` selects a fetcher in `FETCHERS`; `q` is a Cleveland Museum of Art Open Access query (always `cc0=1&has_image=1`), or an array of queries to pick from at random.
- `cma` pieces come from Cleveland's API; `fromCMA` jumps to a random 100-item page. Images use the large `print` JPEG with the `web` one as fallback (Cleveland has no resizing service). Very long strips (aspect ≥ 3) are skipped.
- `mine` is "My photos": files the user picks are shrunk to 2560px JPEG and stored in IndexedDB (`frame-photos`) in that browser only; nothing is uploaded.
- `mix` takes turns by source: each refill draws up to six unseen pieces from a random collection of each source and interleaves them. A new source needs a fetcher in `FETCHERS`, collections with that `src`, an entry in `SOURCE_NAMES`, a credit in `pieceCredit`, and inclusion in the `srcs` list in `fetchPieces`.
- State is in `localStorage` (`frame-settings`, `frame-cma` pool, `frame-cma-seen`, `frame-wx`, `frame-compact`).

Sources already tried and rejected (reasons are in the comment above `COLLECTIONS`): Art Institute of Chicago (Cloudflare challenge blocks `<img>`), The Met (API refuses browser requests), Library of Congress (mostly 1024px only), NASA (unreliable). Juan does not want Unsplash or contemporary art.

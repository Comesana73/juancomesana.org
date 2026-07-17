# Juan Comesaña academic website

This repository contains the static website for `juancomesana.org`. It is built with Jekyll, the static site system supported by GitHub Pages.

The site is intentionally simple: most page content is Markdown, the shared page frame is in a small layout file, and the visual styling is in one CSS file.

## How the repository is organized

- `_config.yml` contains the site title, domain, and GitHub Pages settings.
- `_layouts/default.html` is the shared page wrapper used by all pages.
- `_includes/` contains small shared pieces, such as the navigation and metadata.
- `assets/css/site.css` controls the visual design.
- `assets/images/` contains images used by the site, currently saved as WebP files.
- `assets/papers/` contains paper PDFs and conference PDFs.
- `assets/documents/` contains CV PDFs and similar documents.
- `s/` contains compatibility copies of PDFs so older public links from the Squarespace site keep working.
- `index.md` is the home page.
- `about.md`, `books.md`, `papers.md`, `teaching.md`, and `contact.md` are the main pages.
- `rec/` contains the Rutgers Epistemology Conference pages.
- `404.html` is the custom page shown when someone visits a missing URL.
- `robots.txt` points search engines to the sitemap.
- `CNAME` tells GitHub Pages that the site should use `juancomesana.org`.

## Editing an existing page in GitHub

1. Open this repository on GitHub.
2. Click the page file you want to edit, such as `about.md` or `papers.md`.
3. Click the pencil icon, which means “Edit this file.”
4. Edit the text.
5. Use the “Preview” tab to check the formatting.
6. Scroll down to “Commit changes.”
7. Add a short note describing the edit, such as `Update About page`.
8. Commit the change.

GitHub Pages will rebuild the site after the change is committed.

## Adding a paper and uploading its PDF

1. Put the PDF in `assets/papers/`.
2. Use a clear filename with lowercase words and hyphens, such as `new-paper-title.pdf`.
3. Open `papers.md`.
4. Copy one existing `<article class="publication">...</article>` block.
5. Paste it where the paper should appear.
6. Replace the citation text, PDF link, and abstract.
7. Make the PDF link point to the file you uploaded, for example:

   ```markdown
   <a href="/assets/papers/new-paper-title.pdf">pdf</a>
   ```

8. Commit both the PDF and the `papers.md` change.

If the old public website already linked to the PDF under `/s/filename.pdf`, also add a copy of the PDF to the `s/` folder with that same filename.

## Adding or replacing an image

1. Put the image in `assets/images/`.
2. Use a clear filename, such as `book-cover.jpg` or `book-cover.webp`.
3. Find the page that uses the image.
4. Update the image path, for example:

   ```html
   <img src="/assets/images/book-cover.jpg" alt="Cover of Book Title">
   ```

5. Write meaningful alt text. The alt text should describe the image for someone who cannot see it.
6. Commit the image and page changes.

## Previewing changes

Small text edits can be previewed with GitHub’s file preview before committing.

For a full local preview on your computer:

1. Install Ruby and Bundler if they are not already installed.
2. In the repository folder, run:

   ```bash
   bundle install
   bundle exec jekyll serve
   ```

3. Open the local address printed by Jekyll, usually `http://127.0.0.1:4000`.

If you only edit through GitHub’s website, you can also preview by using a separate branch and opening the GitHub Pages build after GitHub finishes publishing it.

## How GitHub Pages publication works

GitHub Pages takes the files in this repository, runs Jekyll, and publishes the generated static website. The published site does not need Squarespace, a separate build service, analytics, or a database.

The `CNAME` file is already set to:

```text
juancomesana.org
```

That file is needed when the site is ready to use the custom domain.

## Settings to enable later

When the site has been reviewed and is ready to publish from GitHub Pages:

1. In GitHub, open the repository settings.
2. Go to “Pages.”
3. Choose the branch that should publish the site, usually `main`.
4. Choose the root folder, not `/docs`.
5. Save the setting.
6. Confirm that GitHub Pages builds successfully.
7. Only after reviewing the published GitHub Pages preview, configure the custom domain if needed.

Do not change DNS until the site has been reviewed and you are ready to move the public domain away from the current website.

## Notes from the initial migration

- The public Teaching page did not show body content beyond the navigation, so `teaching.md` contains a clearly labeled placeholder.
- The public Contact page used a Squarespace form but did not reveal a public email address in the rendered page. The static version does not include a third-party form; add the preferred public email before replacing the live site.
- The large photo gallery below the REC landing page was not copied into this initial version to keep the site light. The main REC image and all conference text were migrated.

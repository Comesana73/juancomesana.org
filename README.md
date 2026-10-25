# Juan Comesaña academic website

This repository holds the website at `juancomesana.org`. GitHub Pages publishes it with Jekyll, the static site system GitHub supports: whatever is on the `main` branch is the live site, a minute or two after it changes. There is no Squarespace, separate build service or database.

Most pages are Markdown with some HTML, the shared page frame is a small layout file, and the styling is in one CSS file.

## How the repository is organized

- `index.md`, `books.md`, `papers.md`, `teaching.md` and `contact.md` are the main pages. The biographical About text is on the home page.
- `rec.md` and `rec/` are the Rutgers Epistemology Conference pages, one page per conference.
- `phil109/` is the PHIL 109 course page and the web version of the textbook (see below).
- `apps/` holds the course labs: the Logic Lab, the Probability Lab and the Decisions & Games Lab. Each is a single self-contained page. A few older addresses there (`decision-lab`, `eikosogram-studio`, `truth-table-builder`, and `teaching/phil109/`) only forward to their replacements, so old links keep working.
- `frame/` is Frame, the clock, weather and art display for the iPad.
- `yep/` and `rec/yep/review/` are the two identical entry pages for reviewing Young Epistemologist Prize submissions.
- `private/` holds password-protected pages.
- `assets/papers/` has paper and conference PDFs, and `assets/documents/` has the CV and the PHIL 109 textbook PDF. `cv.pdf` is built from `cv.yaml` in the iCloud `inprogress/cv/` folder.
- `assets/images/` has the images, saved as WebP files, and `assets/css/site.css` controls the design.
- `s/` has copies of PDFs at their old Squarespace addresses, so older public links keep working. Don't remove or rename them.
- `_config.yml` has the site settings, `_layouts/` and `_includes/` the shared page frame, and `_data/phil109.json` the textbook's contents (written by the textbook build).
- `404.html` is the page shown for a missing address, `robots.txt` points search engines to the sitemap, and `CNAME` tells GitHub Pages to use `juancomesana.org`.
- `CLAUDE.md` has notes for Claude about how the site works. It is not published.

## Editing an existing page on GitHub

1. Open this repository on GitHub.
2. Click the file you want to edit, such as `index.md` or `papers.md`.
3. Click the pencil icon ("Edit this file").
4. Edit the text, and use the "Preview" tab to check the formatting.
5. Click "Commit changes", add a short note such as `Update About page`, and commit.

The site updates a minute or two later.

## Adding a paper and uploading its PDF

1. Put the PDF in `assets/papers/`, with a clear lowercase name such as `new-paper-title.pdf`.
2. Open `papers.md`, copy an existing `<article class="publication">...</article>` block, and paste it where the paper should appear.
3. Replace the citation, the abstract and the PDF link, which should point to the file you uploaded:

   ```markdown
   <a href="{{ '/assets/papers/new-paper-title.pdf' | relative_url }}">pdf</a>
   ```

4. Commit both the PDF and the `papers.md` change.

If the old Squarespace site linked to the PDF as `/s/filename.pdf`, also put a copy in `s/` with that same name.

## Adding or replacing an image

1. Put the image in `assets/images/`, with a clear name such as `book-cover.webp`.
2. In the page that uses it, update the path, for example:

   ```html
   <img src="{{ '/assets/images/book-cover.webp' | relative_url }}" alt="Cover of Book Title">
   ```

3. Write alt text that describes the image for someone who cannot see it.
4. Commit the image and the page.

## The PHIL 109 textbook

The web version of the textbook (`phil109/ch01/` to `phil109/ch10/`, with their drawings and `_data/phil109.json`) is generated from the LaTeX in the private textbook repository, Introduction-to-Formal-Reasoning-and-Decision-Making. Don't edit those files here: change the book and let it be rebuilt.

That happens on its own. When the book changes on the textbook repository's `main`, usually after you sync from Overleaf, a GitHub Action there rebuilds every chapter and opens a pull request here called "PHIL 109 web book: update from the textbook". Nothing goes live until you merge it, and later changes to the book update that same pull request. Check it as described below, then merge it to publish. How the Action works, and the access token it needs, are explained in `web/README.md` in the textbook repository.

The course page (`phil109/index.html`) and the contents page (`phil109/textbook/index.html`) are written by hand and can be edited here like any other page. The section is linked from the Teaching page, but search engines are asked not to list it.

## Previewing a pull request

GitHub Pages only publishes `main`, so a pull request has no preview online. To see one before merging, you can either ask Claude for screenshots of the changed pages, or preview it on your Mac:

1. In GitHub Desktop, choose this repository and click "Fetch origin". Open "Current Branch" and pick the pull request's branch. The pull request page on GitHub shows its name near the top; for the textbook updates it is `textbook-update`.
2. Open Terminal and run:

   ```bash
   cd ~/Documents/GitHub/juancomesana.org
   export PATH="/opt/homebrew/opt/ruby@3.4/bin:$PATH" LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
   bundle exec jekyll serve
   ```

   The first time, run `bundle install` before `bundle exec jekyll serve`.
3. Open `http://127.0.0.1:4000/` in your browser, for example `http://127.0.0.1:4000/phil109/ch06/` for Chapter 6.
4. When you are done, press Ctrl-C in Terminal, and in GitHub Desktop switch "Current Branch" back to `main`.
5. After you merge a textbook update, delete your copy of its branch: in GitHub Desktop, switch to `textbook-update`, choose Branch → Delete…, and confirm. The next textbook update arrives under the same name, and an old copy would get in its way.

The same steps preview the current `main`, for example after editing a page on GitHub.

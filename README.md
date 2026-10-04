# FOLLOW THE PATTY

A six-chapter, static U.S. History interactive documentary following the evidence around the 1993 Jack in the Box *E. coli* O157:H7 outbreak and later meat-safety changes. The supplied research dataset is the authority for every fact, citation, source-verification flag and causal-strength judgment. This is a student research project; its conclusion is an inference, not a claim that the outbreak alone caused the 1996 rule.

## Open the site

- Open `index.html` directly in a current desktop browser, or serve this folder with any static file server. For example: `python3 -m http.server 8000` from the project directory, then visit `http://localhost:8000`.
- The six static routes are `index.html`, `outbreak.html`, `evidence.html`, `change.html`, `historians.html` and `conclusion.html`.
- The site has no backend, package install or build step. GSAP, ScrollTrigger and Lenis load from CDNs when online; if a library is unavailable, the content and native navigation remain available.

## Present the investigation

- Open **Present** in the header or press **P**.
- Use **Next / Back / Home / Exit**, or the left/right arrow keys; **Escape** exits.
- The deck includes a running timer, a six-part segment bar, the outbreak map, causal chain, all six Then/Now topics, three separate finding slides, a ten-topic Q&A grid and all 19 exhibits. The target presentation length is seven minutes.
- Press **I** or choose **Evidence index** to open the topic jumps and searchable exhibit list. A jump opens the corresponding chapter, exhibit, chain link or period.

## Record your judgments

The opening-poll vote, continuity guesses, six causal-force weights and edited conclusion are stored in this browser's `localStorage`; they are not uploaded or shared. The Conclusion page shows your saved opening hypothesis and the forces you marked Major. Use **Restore original wording** to remove your conclusion edits. Clearing this browser's site data also clears these local responses.

## Add or update evidence

Edit `js/data.js` and reload the page. It contains the source records, exhibits `E01`–`E19`, six outbreak case files, map counts and steps, the causal chain, five time periods, Then/Now comparisons, continuity questions, causal forces, historians, source disagreements, conclusion and page copy. Add an exhibit to `FTP.evidence` with its source, type, class, strength, claim and limitations; keep pending research marked `verify: true`. Do not fill a gap with an unsupported claim. Keep `manus-routes.json` aligned with page-route changes. The interactive site reads this data directly. After editing research data or copy, run `node scripts/generate-static-content.js` once to refresh the included no-JavaScript reading copies before publishing.

## How the history proposal guides the investigation

The original project proposal guides the site's question, first-person motivation and selection of information: how the outbreak was traced; what changed in federal regulation from 1993 to 1996 and who pushed for it; how restaurant cooking/handling changed and whether outbreaks became less common; and how much the outbreak explains versus merely precedes the changes. Its four literature-review sources are presented as arguments, with what each helps explain and what it cannot establish. Treat the proposal as a research map—not as evidence for claims that remain unverified. The citations and status labels in `js/data.js` are the factual record, and the 1996 measure is correctly named as a USDA final rule, not an Act.

## Visual and accessibility notes

The site uses semantic landmarks, a skip link, visible focus styles, keyboard-operable controls, alt text and source captions. It reflows to a vertical reading order on small screens. The `prefers-reduced-motion` setting disables the pinned/scrubbed sequences; the same narrative and evidence remain available in reading order. Fonts are self-hosted in `fonts/`.

## Image and map credits

All eight displayed images are public-domain U.S. government works. The downloaded/cropped WebP files live in `img/`; `assets-source/` keeps the source images and PDFs used for those crops.

| Site asset(s) | Source / credit |
|---|---|
| `micrograph-o157h7.webp` | CDC PHIL #10071, Janice Haney Carr (2006), [Wikimedia Commons source record](https://commons.wikimedia.org/wiki/File:Escherichia_coli_O157-H7_CDC_ID-10071.tif). Cropped to remove the instrument text and converted to grayscale. |
| `mmwr-1993-p258.webp`, `mmwr-1993-figure1.webp`, `mmwr-1993-p260.webp` | CDC, *MMWR*, vol. 42, no. 14 (16 Apr. 1993), [PDF](https://www.cdc.gov/mmwr/PDF/wk/mm4214.pdf); p. 258, Figure 1 crop, and p. 260. |
| `fsis-1994-backgrounder.webp`, `fsis-1994-safe-handling-label.webp` | FSIS Backgrounder (May 1994), [source PDF](https://upload.wikimedia.org/wikipedia/commons/6/6f/USDA_rule_mandates_safe_handling_statements_for_raw_meat_and_poultry_products_%28IA_CAT10757247%29.pdf); first-page plate and the label box on page 2. |
| `federal-register-1996-p38806.webp` | USDA FSIS, 1996 final rule, *Federal Register*, vol. 61, p. 38806, [GovInfo PDF](https://www.govinfo.gov/content/pkg/FR-1996-07-25/pdf/96-17837.pdf). |
| `usda-meat-inspection-1999.webp` | USDA photo 99cs0696, [Wikimedia Commons image source](https://upload.wikimedia.org/wikipedia/commons/5/5e/Beef_inspection_USDA.jpg). |
| Western-state outlines | [`us-atlas` states-albers-10m](https://github.com/topojson/us-atlas), reduced to the western states used by the investigation; no restaurant or city locations are plotted. |
| Merriweather and Public Sans | Google Fonts type families, downloaded as local `.ttf` files in `fonts/`. |

No image of the 1993 outbreak is used.

## Prepare the Manus static publish input

WebDev's no-build static host serves the committed `dist/` directory, whose root must contain `index.html`. After changing a page, script, stylesheet, image, font or route, run `node scripts/sync-dist.js` and commit the refreshed `dist/` together with the root source. If research data changed, first run `node scripts/generate-static-content.js`. This prepares publishable files only; it does not start a deployment. GitHub Pages can continue to use the project root as described below.

## Publish on GitHub Pages

1. Create a GitHub repository and copy the **contents** of this project into its root.
2. Commit and push the files to the repository's default branch.
3. In GitHub, open **Settings → Pages**. Choose **Deploy from a branch**, select the default branch and `/ (root)`, then save.
4. Wait for GitHub Pages to provide the site URL. Since this project is plain static HTML/CSS/JavaScript, it needs no build command.

## Project files

- `index.html`, `outbreak.html`, `evidence.html`, `change.html`, `historians.html`, `conclusion.html` — chapter routes and accessible static fallbacks.
- `js/data.js` — single source of truth for research and authored page copy.
- `js/app.js` — shared page renderer and interactions.
- `js/map-paths.js` — state paths derived from the supplied `us-atlas` topology.
- `css/styles.css` — visual system, responsive layouts and reduced-motion behavior.
- `dist/` — committed Manus static output, mirrored from the root website files.
- `scripts/sync-dist.js` — dependency-free command to refresh the committed static output.
- `manus-routes.json` — route declaration for the six pages.

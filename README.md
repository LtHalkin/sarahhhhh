# For You — a romantic puzzle experience

A single-page, offline-friendly site: five short puzzles, then a big
number reveal, then 100 reasons you love her. Pure HTML/CSS/JS — no
build step, no backend, nothing to install. Just open `index.html`,
or deploy the folder as-is to GitHub Pages / Cloudflare Pages.

## Files

```
index.html    – page structure (all 5 puzzles + welcome + final page)
style.css     – all styling, colours, and animations
script.js     – all logic — the CONFIG section at the very top is
                the only part you need to edit
assets/
  photo-placeholder.svg  – demo image for Puzzle 4 (swap this out)
  music.mp3              – NOT included yet — add your own (see below)
```

## Everything you'll want to edit lives at the top of `script.js`

Open `script.js` and look for the `CONFIG` section (clearly marked
with a big comment banner at the very top of the file). It's laid
out puzzle-by-puzzle:

- **`QUIZ_CONFIG`** — Puzzle 1's question, its four options, and
  which one is correct (`correctIndex`: 0, 1, 2, or 3).
- **`TIMELINE_CONFIG`** — Puzzle 2's memories, listed in the real
  order they happened. The page shuffles them for her automatically.
- **`WORDSEARCH_CONFIG`** — Puzzle 3's word list. Add or remove
  freely.
- **`PHOTO_PUZZLE_CONFIG`** — Puzzle 4. Point `imageSrc` at your own
  photo (see below).
- **`CODE_CONFIG`** — Puzzle 5's question and correct answer.
- **`REVEAL_NUMBER`** — the giant number shown after Puzzle 5 (by
  default this just mirrors the Puzzle 5 answer).
- **`reasons`** — the array of 100 reasons, a little further down the
  file under a "REASONS ARRAY" banner. Replace all 100 strings with
  your own. Each one fades in about a second apart (`REASON_INTERVAL_MS`
  near the top of the "engine room" section controls that timing).

You shouldn't need to touch anything below the "ENGINE ROOM" banner —
that's just the code that makes the puzzles work.

## Adding your own photo (Puzzle 4)

1. Drop your image into `assets/` — e.g. `assets/photo.jpg`.
2. In `script.js`, change:
   ```js
   const PHOTO_PUZZLE_CONFIG = {
     imageSrc: "assets/photo.jpg",   // <- your filename
     gridSize: 3
   };
   ```
   `gridSize: 3` is a 3×3 puzzle (9 pieces). Try `4` for a harder
   4×4 (16 pieces). A roughly square photo works best.

## Adding music

1. Drop an MP3 into `assets/` and name it `music.mp3` (or use any
   name and update the `<source src="...">` line near the top of
   `index.html`).
2. That's it — music starts softly right after she taps "Start", and
   there's a small note-shaped button top-right she can use to
   pause/resume it any time. If no file is present, the button
   simply does nothing harmful — the rest of the site works exactly
   the same either way, so it's completely safe to deploy before you
   add a track.

## Trying it out

Because it's just static files, you can preview it by opening
`index.html` directly in a browser, or with any static server, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploying (GitHub + Cloudflare Pages)

1. Push this folder to a GitHub repo.
2. In Cloudflare Pages, create a new project connected to that repo.
3. Build settings: **no build command**, output directory `/`
   (this is a static site — nothing to compile).
4. Deploy. Every push to the repo will auto-update the live site.

There's a small "reveal all" link in the bottom-right corner of the
final page — it's just a convenience for previewing/testing the 100
reasons instantly instead of waiting for them to appear one by one.
Feel free to delete the button (and its listener in `script.js`) once
you're happy with everything, or just leave it — it's subtle enough
not to get in the way.

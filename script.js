/* =====================================================================
   FOR YOU — script.js
   Everything you'll want to personalise lives in the CONFIG section
   right below. Scroll past it and you're in "engine room" territory —
   you shouldn't need to touch anything past the CONFIG block unless
   you want to change how something behaves.
   ===================================================================== */

/* =====================================================================
   ============================  CONFIG  ================================
   Edit the values below. Everything else in this file reads from here.
   ===================================================================== */

/* ---- PUZZLE 1 — multiple choice quiz ----
   Change the question, the four options, and which one is correct.
   correctIndex is 0 for the 1st option, 1 for the 2nd, 2 for the 3rd,
   3 for the 4th. */
const QUIZ_CONFIG = {
  question: 'Where did we first say "I love you"?',
  options: [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  correctIndex: 0
};

/* ---- PUZZLE 2 — memory timeline ----
   List these in the TRUE order they happened. The page shuffles them
   for her automatically — you don't need to. Add or remove as many
   lines as you like. */
const TIMELINE_CONFIG = [
  "First date",
  "First kiss",
  'First "I love you"',
  "First holiday together"
];

/* ---- PUZZLE 3 — word search ----
   Add or remove words freely. Keep them as single words (no spaces)
   for the cleanest grid. They'll automatically be placed forwards,
   backwards, and diagonally. */
const WORDSEARCH_CONFIG = [
  "LOVE",
  "FOREVER",
  "BEAUTIFUL",
  "SOULMATE",
  "US"
];

/* ---- PUZZLE 4 — photo puzzle ----
   Replace assets/photo-placeholder.svg with your own photo (jpg/png
   both work great) and update imageSrc below to match the filename.
   gridSize 3 = a 3x3 puzzle (9 pieces). You can try 4 for a harder
   16-piece puzzle. */
const PHOTO_PUZZLE_CONFIG = {
  imageSrc: "assets/photo-placeholder.svg",
  gridSize: 3
};

/* ---- PUZZLE 5 — the final code ----
   Change the question and/or the correct answer. It's compared as
   text, so "67" and "67 " both work, but letters must match exactly
   if you switch it to a word. */
const CODE_CONFIG = {
  question: "What number always reminds me of you?",
  correctAnswer: "67"
};

/* ---- THE BIG REVEAL NUMBER ----
   This is the giant number shown full-screen right after Puzzle 5.
   By default it mirrors the answer above — change it here if you'd
   like the reveal to show something different from the answer itself. */
const REVEAL_NUMBER = CODE_CONFIG.correctAnswer;

/* ---- FINAL PAGE — 100 reasons ----
   Replace every line with your own reason. Keep it as 100 short
   strings inside the square brackets, separated by commas. This is
   further down the file, clearly marked — search for "REASONS ARRAY". */
/* =====================================================================
   REASONS ARRAY -- edit every line below with your own reason.
   Keep exactly 100 entries (or adjust REASON_INTERVAL_MS above if you
   change the count) -- each one fades in one second apart on the final
   page.
   ===================================================================== */
const reasons = [
  "Reason 1",
  "Reason 2",
  "Reason 3",
  "Reason 4",
  "Reason 5",
  "Reason 6",
  "Reason 7",
  "Reason 8",
  "Reason 9",
  "Reason 10",
  "Reason 11",
  "Reason 12",
  "Reason 13",
  "Reason 14",
  "Reason 15",
  "Reason 16",
  "Reason 17",
  "Reason 18",
  "Reason 19",
  "Reason 20",
  "Reason 21",
  "Reason 22",
  "Reason 23",
  "Reason 24",
  "Reason 25",
  "Reason 26",
  "Reason 27",
  "Reason 28",
  "Reason 29",
  "Reason 30",
  "Reason 31",
  "Reason 32",
  "Reason 33",
  "Reason 34",
  "Reason 35",
  "Reason 36",
  "Reason 37",
  "Reason 38",
  "Reason 39",
  "Reason 40",
  "Reason 41",
  "Reason 42",
  "Reason 43",
  "Reason 44",
  "Reason 45",
  "Reason 46",
  "Reason 47",
  "Reason 48",
  "Reason 49",
  "Reason 50",
  "Reason 51",
  "Reason 52",
  "Reason 53",
  "Reason 54",
  "Reason 55",
  "Reason 56",
  "Reason 57",
  "Reason 58",
  "Reason 59",
  "Reason 60",
  "Reason 61",
  "Reason 62",
  "Reason 63",
  "Reason 64",
  "Reason 65",
  "Reason 66",
  "Reason 67",
  "Reason 68",
  "Reason 69",
  "Reason 70",
  "Reason 71",
  "Reason 72",
  "Reason 73",
  "Reason 74",
  "Reason 75",
  "Reason 76",
  "Reason 77",
  "Reason 78",
  "Reason 79",
  "Reason 80",
  "Reason 81",
  "Reason 82",
  "Reason 83",
  "Reason 84",
  "Reason 85",
  "Reason 86",
  "Reason 87",
  "Reason 88",
  "Reason 89",
  "Reason 90",
  "Reason 91",
  "Reason 92",
  "Reason 93",
  "Reason 94",
  "Reason 95",
  "Reason 96",
  "Reason 97",
  "Reason 98",
  "Reason 99",
  "Reason 100"
];
/* =====================================================================
   ============================  ENGINE ROOM  ============================
   You shouldn't need to edit below this line -- but it's all commented
   in case you're curious or want to tweak the feel.
   ===================================================================== */

const REASON_INTERVAL_MS = 1000; // how many ms between each reason appearing

/* ---------------------------------------------------------------------
   Small helpers
   --------------------------------------------------------------------- */
function shuffle(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function $(id){ return document.getElementById(id); }

/* ---------------------------------------------------------------------
   Screen navigation -- fades the current screen out, then the next
   screen in. Also keeps the progress hearts in sync.
   --------------------------------------------------------------------- */
const PUZZLE_ORDER = [
  "screen-welcome",
  "screen-puzzle1",
  "screen-puzzle2",
  "screen-puzzle3",
  "screen-puzzle4",
  "screen-puzzle5",
  "screen-final"
];

function goToScreen(id){
  const current = document.querySelector(".screen.active");
  const next = $(id);
  if (!next || next === current) return;

  updateProgressBar(id);

  if (current){
    current.classList.remove("active");
    current.classList.add("leaving");
    setTimeout(() => {
      current.classList.remove("leaving");
      current.style.display = "none";
    }, 450);
  }

  setTimeout(() => {
    next.style.display = "flex";
    // force reflow so the animation restarts cleanly
    void next.offsetWidth;
    next.classList.add("active");
  }, current ? 260 : 0);
}

function updateProgressBar(screenId){
  const bar = $("progress-bar");
  const puzzleIndex = PUZZLE_ORDER.indexOf(screenId); // 1..5 for puzzles
  if (puzzleIndex >= 1 && puzzleIndex <= 5){
    bar.classList.remove("hidden");
    $("progress-current").textContent = puzzleIndex;
    const heartsWrap = $("progress-hearts");
    heartsWrap.innerHTML = "";
    for (let i = 1; i <= 5; i++){
      const span = document.createElement("span");
      span.className = "progress-heart";
      span.textContent = "❤";
      if (i < puzzleIndex) span.classList.add("done");
      if (i === puzzleIndex) span.classList.add("current");
      heartsWrap.appendChild(span);
    }
  } else {
    bar.classList.add("hidden");
  }
}

/* A small heart burst shown for about a second after each puzzle is solved */
function showSuccessBurst(){
  const burst = document.createElement("div");
  burst.className = "success-burst";
  burst.innerHTML = '<span class="burst-heart">❤</span>';
  document.body.appendChild(burst);
  requestAnimationFrame(() => burst.classList.add("show"));
  setTimeout(() => burst.remove(), 1150);
}

/* =====================================================================
   Floating hearts background -- runs continuously behind everything
   ===================================================================== */
(function floatingHearts(){
  const canvas = $("hearts-canvas");
  const ctx = canvas.getContext("2d");
  let w, h, hearts;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeHeart(){
    return {
      x: Math.random() * w,
      y: h + Math.random() * 100,
      size: 10 + Math.random() * 16,
      speed: 0.25 + Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 0.4,
      wobble: Math.random() * Math.PI * 2,
      opacity: 0.10 + Math.random() * 0.22
    };
  }

  function init(){
    resize();
    const count = window.innerWidth < 600 ? 12 : 20;
    hearts = Array.from({ length: count }, () => {
      const heart = makeHeart();
      heart.y = Math.random() * h; // spread out on first load
      return heart;
    });
  }

  function drawHeart(x, y, size, opacity){
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    const s = size / 16;
    ctx.moveTo(0, 4 * s);
    ctx.bezierCurveTo(0, 2 * s, -4 * s, -6 * s, -8 * s, -2 * s);
    ctx.bezierCurveTo(-12 * s, 4 * s, -4 * s, 10 * s, 0, 14 * s);
    ctx.bezierCurveTo(4 * s, 10 * s, 12 * s, 4 * s, 8 * s, -2 * s);
    ctx.bezierCurveTo(4 * s, -6 * s, 0, 2 * s, 0, 4 * s);
    ctx.closePath();
    ctx.fillStyle = `rgba(201, 103, 138, ${opacity})`;
    ctx.fill();
    ctx.restore();
  }

  function tick(){
    ctx.clearRect(0, 0, w, h);
    hearts.forEach(heart => {
      heart.y -= heart.speed;
      heart.wobble += 0.01;
      heart.x += heart.drift + Math.sin(heart.wobble) * 0.3;
      if (heart.y < -30){
        Object.assign(heart, makeHeart());
        heart.y = h + 20;
      }
      drawHeart(heart.x, heart.y, heart.size, heart.opacity);
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  init();
  tick();
})();

/* =====================================================================
   Background music toggle
   ===================================================================== */
const bgMusic = $("bg-music");
const musicToggle = $("music-toggle");
const musicIcon = $("music-icon");
let musicStarted = false;

function tryStartMusic(){
  if (musicStarted) return;
  musicStarted = true;
  bgMusic.volume = 0.55;
  bgMusic.play().then(() => {
    musicToggle.classList.add("playing");
    musicIcon.textContent = "♪";
  }).catch(() => {
    // No music.mp3 added yet, or the browser blocked it -- that's fine,
    // she can still tap the button once you've added a track.
    musicStarted = false;
  });
}

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused){
    tryStartMusic();
  } else {
    bgMusic.pause();
    musicToggle.classList.remove("playing");
    musicIcon.textContent = "♪";
  }
});

/* =====================================================================
   WELCOME -> PUZZLE 1
   ===================================================================== */
$("start-btn").addEventListener("click", () => {
  tryStartMusic();
  goToScreen("screen-puzzle1");
});

/* =====================================================================
   PUZZLE 1 -- multiple choice quiz
   ===================================================================== */
(function setupQuiz(){
  $("quiz-question").textContent = QUIZ_CONFIG.question;
  const wrap = $("quiz-options");
  const feedback = $("quiz-feedback");

  QUIZ_CONFIG.options.forEach((label, index) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = label;
    btn.addEventListener("click", () => {
      if (index === QUIZ_CONFIG.correctIndex){
        btn.classList.add("correct");
        feedback.textContent = "That's the one. ❤";
        feedback.classList.add("success");
        [...wrap.children].forEach(b => b.disabled = true);
        showSuccessBurst();
        setTimeout(() => goToScreen("screen-puzzle2"), 900);
      } else {
        btn.classList.add("incorrect");
        feedback.textContent = "Not quite -- try again.";
        feedback.classList.remove("success");
        feedback.classList.add("shake");
        setTimeout(() => {
          btn.classList.remove("incorrect");
          feedback.classList.remove("shake");
        }, 400);
      }
    });
    wrap.appendChild(btn);
  });
})();

/* =====================================================================
   PUZZLE 2 -- drag & drop timeline
   Uses Pointer Events so the same code drives mouse *and* touch drags.
   --------------------------------------------------------------------- */
(function setupTimeline(){
  const list = $("timeline-list");
  const feedback = $("timeline-feedback");
  const shuffled = shuffle(TIMELINE_CONFIG);

  shuffled.forEach(text => {
    const li = document.createElement("li");
    li.className = "timeline-item";
    li.dataset.text = text;
    li.innerHTML = `<span class="drag-dot">⠿</span><span>${text}</span>`;
    list.appendChild(li);
  });

  let draggedItem = null;

  function getDragAfterElement(container, y){
    const items = [...container.querySelectorAll(".timeline-item:not(.dragging)")];
    return items.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset){
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
  }

  list.addEventListener("pointerdown", e => {
    const item = e.target.closest(".timeline-item");
    if (!item) return;
    draggedItem = item;
    item.setPointerCapture(e.pointerId);
    item.classList.add("dragging");
  });

  list.addEventListener("pointermove", e => {
    if (!draggedItem) return;
    const afterElement = getDragAfterElement(list, e.clientY);
    if (afterElement == null){
      list.appendChild(draggedItem);
    } else {
      list.insertBefore(draggedItem, afterElement);
    }
  });

  function endDrag(){
    if (!draggedItem) return;
    draggedItem.classList.remove("dragging");
    draggedItem = null;
  }
  list.addEventListener("pointerup", endDrag);
  list.addEventListener("pointercancel", endDrag);

  $("timeline-check").addEventListener("click", () => {
    const currentOrder = [...list.children].map(li => li.dataset.text);
    const isCorrect = currentOrder.every((text, i) => text === TIMELINE_CONFIG[i]);

    [...list.children].forEach((li, i) => {
      li.classList.remove("correct-final", "wrong-final");
      li.classList.add(currentOrder[i] === TIMELINE_CONFIG[i] ? "correct-final" : "wrong-final");
    });

    if (isCorrect){
      feedback.textContent = "Exactly how it happened. ❤";
      feedback.classList.add("success");
      showSuccessBurst();
      setTimeout(() => goToScreen("screen-puzzle3"), 1000);
    } else {
      feedback.textContent = "Close -- a couple are out of place. Try again.";
      feedback.classList.remove("success");
      feedback.classList.add("shake");
      setTimeout(() => feedback.classList.remove("shake"), 400);
    }
  });
})();

/* =====================================================================
   PUZZLE 3 -- word search
   --------------------------------------------------------------------- */
(function setupWordSearch(){
  const words = WORDSEARCH_CONFIG.map(w => w.toUpperCase().replace(/[^A-Z]/g, ""));
  const longest = Math.max(...words.map(w => w.length));
  const size = Math.max(longest + 2, 9);

  const grid = Array.from({ length: size }, () => Array(size).fill(null));
  const DIRECTIONS = [
    [0, 1], [1, 0], [1, 1], [1, -1],
    [0, -1], [-1, 0], [-1, -1], [-1, 1]
  ];

  function tryPlace(word){
    for (let attempt = 0; attempt < 200; attempt++){
      const [dr, dc] = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      const endRow = row + dr * (word.length - 1);
      const endCol = col + dc * (word.length - 1);
      if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) continue;

      let fits = true;
      for (let i = 0; i < word.length; i++){
        const r = row + dr * i, c = col + dc * i;
        const existing = grid[r][c];
        if (existing !== null && existing !== word[i]){ fits = false; break; }
      }
      if (!fits) continue;

      for (let i = 0; i < word.length; i++){
        const r = row + dr * i, c = col + dc * i;
        grid[r][c] = word[i];
      }
      return true;
    }
    return false;
  }

  words.forEach(tryPlace);

  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++){
    for (let c = 0; c < size; c++){
      if (!grid[r][c]) grid[r][c] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
  }

  const gridEl = $("wordsearch-grid");
  gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  const cellEls = [];
  for (let r = 0; r < size; r++){
    cellEls.push([]);
    for (let c = 0; c < size; c++){
      const cell = document.createElement("div");
      cell.className = "ws-cell";
      cell.textContent = grid[r][c];
      cell.dataset.row = r;
      cell.dataset.col = c;
      gridEl.appendChild(cell);
      cellEls[r].push(cell);
    }
  }

  const wordsWrap = $("wordsearch-words");
  const wordEls = {};
  words.forEach(w => {
    const span = document.createElement("span");
    span.className = "ws-word";
    span.textContent = w;
    wordsWrap.appendChild(span);
    wordEls[w] = span;
  });

  const foundWords = new Set();
  let selecting = false;
  let startCell = null;
  let currentPath = [];

  function cellFromPoint(x, y){
    const el = document.elementFromPoint(x, y);
    return el && el.classList.contains("ws-cell") ? el : null;
  }

  function clearSelectingStyles(){
    currentPath.forEach(cell => cell.classList.remove("selecting"));
  }

  function computePath(start, end){
    const r0 = +start.dataset.row, c0 = +start.dataset.col;
    const r1 = +end.dataset.row, c1 = +end.dataset.col;
    const dr = r1 - r0, dc = c1 - c0;
    let stepR = 0, stepC = 0, steps = 0;

    if (dr === 0 && dc === 0){
      return [start];
    } else if (dr === 0){
      stepC = Math.sign(dc); steps = Math.abs(dc);
    } else if (dc === 0){
      stepR = Math.sign(dr); steps = Math.abs(dr);
    } else if (Math.abs(dr) === Math.abs(dc)){
      stepR = Math.sign(dr); stepC = Math.sign(dc); steps = Math.abs(dr);
    } else {
      return currentPath; // not a straight line -- keep previous valid path
    }

    const path = [];
    for (let i = 0; i <= steps; i++){
      path.push(cellEls[r0 + stepR * i][c0 + stepC * i]);
    }
    return path;
  }

  function finishSelection(){
    if (currentPath.length > 1){
      const forward = currentPath.map(c => c.textContent).join("");
      const backward = forward.split("").reverse().join("");
      const match = words.find(w => (w === forward || w === backward) && !foundWords.has(w));
      if (match){
        foundWords.add(match);
        currentPath.forEach(cell => {
          cell.classList.remove("selecting");
          cell.classList.add("found");
        });
        wordEls[match].classList.add("found");
        if (foundWords.size === words.length){
          showSuccessBurst();
          setTimeout(() => goToScreen("screen-puzzle4"), 1000);
        }
      } else {
        clearSelectingStyles();
      }
    }
    selecting = false;
    startCell = null;
    currentPath = [];
  }

  gridEl.addEventListener("pointerdown", e => {
    const cell = e.target.closest(".ws-cell");
    if (!cell) return;
    selecting = true;
    startCell = cell;
    currentPath = [cell];
    cell.classList.add("selecting");
    gridEl.setPointerCapture(e.pointerId);
  });

  gridEl.addEventListener("pointermove", e => {
    if (!selecting) return;
    const cell = cellFromPoint(e.clientX, e.clientY);
    if (!cell) return;
    const newPath = computePath(startCell, cell);
    clearSelectingStyles();
    currentPath = newPath;
    currentPath.forEach(c => c.classList.add("selecting"));
  });

  gridEl.addEventListener("pointerup", finishSelection);
  gridEl.addEventListener("pointercancel", finishSelection);
})();

/* =====================================================================
   PUZZLE 4 -- photo puzzle (tap two pieces to swap)
   --------------------------------------------------------------------- */
(function setupPhotoPuzzle(){
  const n = PHOTO_PUZZLE_CONFIG.gridSize;
  const wrap = $("photo-puzzle");
  wrap.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

  // currentOrder[position] = correct index of the piece currently sitting there
  let currentOrder = shuffle(Array.from({ length: n * n }, (_, i) => i));
  // make sure it doesn't shuffle into an already-solved state
  const solved = Array.from({ length: n * n }, (_, i) => i);
  while (currentOrder.every((v, i) => v === solved[i])){
    currentOrder = shuffle(solved);
  }

  const tiles = [];
  for (let i = 0; i < n * n; i++){
    const tile = document.createElement("div");
    tile.className = "photo-tile";
    tile.style.backgroundImage = `url(${PHOTO_PUZZLE_CONFIG.imageSrc})`;
    tile.style.backgroundSize = `${n * 100}% ${n * 100}%`;
    wrap.appendChild(tile);
    tiles.push(tile);
  }

  function positionFor(correctIndex){
    const row = Math.floor(correctIndex / n);
    const col = correctIndex % n;
    const step = n === 1 ? 0 : 100 / (n - 1);
    return `${col * step}% ${row * step}%`;
  }

  function render(){
    tiles.forEach((tile, pos) => {
      tile.style.backgroundPosition = positionFor(currentOrder[pos]);
    });
  }
  render();

  let selectedPos = null;

  function checkSolved(){
    if (currentOrder.every((v, i) => v === solved[i])){
      tiles.forEach(t => t.classList.add("solved-flash"));
      showSuccessBurst();
      setTimeout(() => goToScreen("screen-puzzle5"), 1000);
    }
  }

  tiles.forEach((tile, pos) => {
    tile.addEventListener("click", () => {
      if (selectedPos === null){
        selectedPos = pos;
        tile.classList.add("selected");
        return;
      }
      if (selectedPos === pos){
        tile.classList.remove("selected");
        selectedPos = null;
        return;
      }
      // swap
      [currentOrder[selectedPos], currentOrder[pos]] = [currentOrder[pos], currentOrder[selectedPos]];
      tiles[selectedPos].classList.remove("selected");
      selectedPos = null;
      render();
      checkSolved();
    });
  });
})();

/* =====================================================================
   PUZZLE 5 -- the final code, then the big number reveal
   --------------------------------------------------------------------- */
(function setupCodeChallenge(){
  $("code-question").textContent = CODE_CONFIG.question;
  const input = $("code-input");
  const feedback = $("code-feedback");

  function submit(){
    const value = input.value.trim();
    if (value.toLowerCase() === String(CODE_CONFIG.correctAnswer).toLowerCase()){
      feedback.textContent = "";
      input.disabled = true;
      $("code-submit").disabled = true;
      runRevealSequence();
    } else {
      feedback.textContent = "Not the one -- think about it a little more.";
      feedback.classList.add("shake");
      setTimeout(() => feedback.classList.remove("shake"), 400);
    }
  }

  $("code-submit").addEventListener("click", submit);
  input.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
})();

function runRevealSequence(){
  const overlay = $("reveal-overlay");
  const numberEl = $("reveal-number");
  numberEl.textContent = REVEAL_NUMBER;

  overlay.classList.add("show"); // fades to black over ~1s (see CSS)

  setTimeout(() => {
    numberEl.classList.add("pop"); // number fades/pops in, then glows softly
  }, 1000);

  setTimeout(() => {
    numberEl.classList.remove("pop");
    numberEl.classList.add("fade-out"); // slow fade away
  }, 1000 + 1000 + 4000);

  setTimeout(() => {
    overlay.classList.remove("show");
    numberEl.classList.remove("fade-out");
    numberEl.textContent = "";
    goToScreen("screen-final");
    startReasonsReveal();
  }, 1000 + 1000 + 4000 + 1600);
}

/* =====================================================================
   FINAL PAGE -- 100 reasons, one by one, then the closing line + confetti
   --------------------------------------------------------------------- */
let reasonsRevealed = false;

function startReasonsReveal(){
  if (reasonsRevealed) return;
  reasonsRevealed = true;

  const list = $("reasons-list");
  list.innerHTML = "";
  reasons.forEach((text, i) => {
    const div = document.createElement("div");
    div.className = "reason-item";
    div.innerHTML = `<span class="reason-number">${i + 1}.</span>${text}`;
    list.appendChild(div);
  });

  const items = [...list.children];
  let index = 0;
  const timer = setInterval(() => {
    if (index >= items.length){
      clearInterval(timer);
      finishFinalPage();
      return;
    }
    items[index].classList.add("shown");
    list.scrollTop = list.scrollHeight;
    index++;
  }, REASON_INTERVAL_MS);
}

function finishFinalPage(){
  setTimeout(() => {
    $("final-message").textContent = "I'll always choose you. ❤️";
    $("final-message").classList.add("shown");
    launchConfetti();
  }, 500);
}

// Convenience button for previewing the page quickly while you edit --
// reveals every reason immediately instead of one per second.
$("skip-hint").addEventListener("click", () => {
  if (!reasonsRevealed){
    reasonsRevealed = true;
    const list = $("reasons-list");
    list.innerHTML = "";
    reasons.forEach((text, i) => {
      const div = document.createElement("div");
      div.className = "reason-item shown";
      div.innerHTML = `<span class="reason-number">${i + 1}.</span>${text}`;
      list.appendChild(div);
    });
  }
  if (!$("final-message").classList.contains("shown")){
    finishFinalPage();
  }
});

/* =====================================================================
   Gentle confetti for the closing message
   --------------------------------------------------------------------- */
function launchConfetti(){
  const canvas = $("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#C9678A", "#F6D9E1", "#E7C481", "#FFFDFB"];
  const pieces = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.5,
    size: 5 + Math.random() * 6,
    speed: 1 + Math.random() * 2,
    drift: (Math.random() - 0.5) * 1.2,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.15,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  let frame = 0;
  const totalFrames = 260; // roughly a few gentle seconds

  function draw(){
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      p.rotation += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    if (frame < totalFrames){
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  draw();
}

window.addEventListener("resize", () => {
  const c = $("confetti-canvas");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
});

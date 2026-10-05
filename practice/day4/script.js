// ── 1. Select elements ────────────────────────────────────
const textarea = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const clearBtn = document.querySelector("#clear-btn");
const themeToggle = document.querySelector("#theme-toggle");

const MAX_CHARS = 200;
const DRAFT_KEY = "day4-draft";
const THEME_KEY = "day4-theme";

// ── 2. Update character and word counters ─────────────────
function updateCounts() {
  const text = textarea.value;
  const chars = text.length;

  // Count words: split on whitespace, filter out empty strings
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // Update character display
  charCount.textContent = `${chars} / ${MAX_CHARS} characters`;
  wordCount.textContent = `${words} word${words === 1 ? "" : "s"}`;

  // Update warning classes
  charCount.classList.remove("warning", "over");
  if (chars > MAX_CHARS) {
    charCount.classList.add("over");
  } else if (chars > 180) {
    charCount.classList.add("warning");
  }
}

// ── 3. Save draft to localStorage ────────────────────────
function saveDraft() {
  localStorage.setItem(DRAFT_KEY, textarea.value);
}

function clearAll() {
  textarea.value = "";
  localStorage.removeItem(DRAFT_KEY);
  updateCounts();
  textarea.focus();
}

// ── 4. Listen for typing ──────────────────────────────────
textarea.addEventListener("input", () => {
  updateCounts();
  saveDraft();
});

// ── 5. Escape key clears the textarea ────────────────────
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearAll();
  }
});

// ── 6. Clear button ───────────────────────────────────────
clearBtn.addEventListener("click", clearAll);

// ── 7. Dark mode toggle ───────────────────────────────────
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light mode";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "Dark mode";
  }
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme);
});

// ── 8. Restore saved draft and theme on page load ─────────
const savedDraft = localStorage.getItem(DRAFT_KEY);
if (savedDraft) {
  textarea.value = savedDraft;
}

const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme || "light");

// Update counters based on restored draft
updateCounts();
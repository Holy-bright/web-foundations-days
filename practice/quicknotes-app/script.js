// ── 1. SELECT ELEMENTS ────────────────────────────────────
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
const clearAllBtn = document.querySelector("#clear-all-btn");

const STORAGE_KEY = "quicknotes-app";
const MAX_CHARS = 200;

// ── 2. LOAD DATA ──────────────────────────────────────────
let notes = loadNotes();

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ── 3. RENDER ─────────────────────────────────────────────
function render() {
  const query = searchInput.value.trim().toLowerCase();

  // Filter notes if a search term exists
  const visible = query
    ? notes.filter((note) => note.text.toLowerCase().includes(query))
    : notes;

  // Clear the list
  notesList.innerHTML = "";

  if (visible.length === 0 && query !== "") {
    // Search returned nothing
    const li = document.createElement("li");
    li.textContent = "No notes match your search.";
    li.classList.add("no-results");
    notesList.appendChild(li);
  } else {
    // Build one card per visible note
    visible.forEach((note) => {
      const li = document.createElement("li");
      li.classList.add("note-card", `category-${note.category}`);

      // Note body wrapper
      const body = document.createElement("div");
      body.classList.add("note-body");

      // Note text
      const textSpan = document.createElement("span");
      textSpan.classList.add("note-text");
      textSpan.textContent = note.text; // safe: textContent not innerHTML

      // Category label + date
      const meta = document.createElement("span");
      meta.classList.add("note-meta");

      const catLabel = document.createElement("span");
      catLabel.classList.add("category-label");
      catLabel.textContent = note.category;

      const dateSpan = document.createElement("span");
      dateSpan.textContent = note.createdAt;

      meta.appendChild(catLabel);
      meta.appendChild(dateSpan);

      body.appendChild(textSpan);
      body.appendChild(meta);

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.classList.add("delete-btn");
      delBtn.addEventListener("click", () => deleteNote(note.id));

      li.appendChild(body);
      li.appendChild(delBtn);
      notesList.appendChild(li);
    });
  }

  // Update count — always reflects total notes, not filtered count
  updateCount();
}

// ── 4. UPDATE COUNT ───────────────────────────────────────
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// ── 5. ADD NOTE ───────────────────────────────────────────
function addNote(text, category) {
  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };
  notes.push(note);
  saveNotes();
  render();
}

// ── 6. DELETE NOTE ────────────────────────────────────────
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// ── 7. FORM SUBMISSION ────────────────────────────────────
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categorySelect.value;

  // Validation
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    noteInput.focus();
    return;
  }

  if (text.length > MAX_CHARS) {
    errorMessage.textContent = `Notes must be ${MAX_CHARS} characters or fewer.`;
    noteInput.focus();
    return;
  }

  // Valid — clear error and add
  errorMessage.textContent = "";
  addNote(text, category);
  noteInput.value = "";
  noteInput.focus();
});

// ── 8. LIVE SEARCH ────────────────────────────────────────
searchInput.addEventListener("input", () => {
  render();
});

// ── 9. CLEAR ALL (BONUS) ──────────────────────────────────
clearAllBtn.addEventListener("click", () => {
  if (notes.length === 0) return;

  const confirmed = confirm("Delete all notes? This cannot be undone.");
  if (confirmed) {
    notes = [];
    saveNotes();
    render();
  }
});

// ── 10. INITIAL RENDER ────────────────────────────────────
render();
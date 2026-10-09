// ── 1. SELECT ELEMENTS ────────────────────────────────────
const loadBtn = document.querySelector("#load-users");
const statusEl = document.querySelector("#status");
const filterInput = document.querySelector("#filter-input");
const usersList = document.querySelector("#users-list");

const API_URL = "https://jsonplaceholder.typicode.com/users";

// ── 2. DATA STORE ─────────────────────────────────────────
// Store all loaded users here so filter does not re-fetch
let allUsers = [];

// ── 3. RENDER ─────────────────────────────────────────────
function renderUsers(users) {
  usersList.innerHTML = "";

  if (users.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No users match your filter.";
    li.classList.add("no-results");
    usersList.appendChild(li);
    return;
  }

  users.forEach((user) => {
    const li = document.createElement("li");
    li.classList.add("user-card");

    const name = document.createElement("p");
    name.classList.add("user-name");
    name.textContent = user.name;

    const email = document.createElement("p");
    email.classList.add("user-detail");
    email.textContent = `Email: ${user.email}`;

    const city = document.createElement("p");
    city.classList.add("user-detail");
    city.textContent = `City: ${user.address.city}`;

    const company = document.createElement("p");
    company.classList.add("user-detail");
    company.textContent = `Company: ${user.company.name}`;

    li.appendChild(name);
    li.appendChild(email);
    li.appendChild(city);
    li.appendChild(company);

    usersList.appendChild(li);
  });
}

// ── 4. LOAD USERS ─────────────────────────────────────────
async function loadUsers() {
  statusEl.textContent = "Loading users...";
  loadBtn.disabled = true;
  usersList.innerHTML = "";
  filterInput.value = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    allUsers = await response.json();
    renderUsers(allUsers);
    statusEl.textContent = `Loaded ${allUsers.length} users.`;

  } catch (error) {
    statusEl.textContent = "Could not load users. Please try again.";
    console.error("Load error:", error.message);

  } finally {
    loadBtn.disabled = false;
  }
}

// ── 5. FILTER ─────────────────────────────────────────────
filterInput.addEventListener("input", () => {
  const query = filterInput.value.trim().toLowerCase();

  if (query === "") {
    renderUsers(allUsers);
    return;
  }

  const filtered = allUsers.filter((user) =>
    user.name.toLowerCase().includes(query)
  );

  renderUsers(filtered);
});

// ── 6. LOAD BUTTON ────────────────────────────────────────
loadBtn.addEventListener("click", loadUsers);
# Library API Design

A RESTful API for managing books in a library system.

## Base URL

`https://api.library.com`

---

## Endpoints

### 1. List all books

**GET /books**

Returns a list of all books in the library.

Query parameters:
- `author` — filter by author name (not case-sensitive)
- `genre` — filter by genre
- `limit` — maximum number of results (default: 20)

Example request:

Example response (200 OK):
```json
[
  {
    "id": 1,
    "title": "Things Fall Apart",
    "author": "Chinua Achebe",
    "genre": "Fiction",
    "available": true
  }
]
```

Success status: **200 OK**

---

### 2. Get one book

**GET /books/:id**

Returns a single book by its id.

Example request:

Example response (200 OK):
```json
{
  "id": 1,
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "genre": "Fiction",
  "year": 1958,
  "available": true
}
```

Success status: **200 OK**

---

### 3. Create a book

**POST /books**

Adds a new book to the library.

Example request body:
```json
{
  "title": "Weep Not, Child",
  "author": "Ngugi wa Thiong'o",
  "genre": "Fiction",
  "year": 1964
}
```

Success status: **201 Created**

---

### 4. Update a book (partial)

**PATCH /books/:id**

Updates one or more fields of an existing book.

Example request body:
```json
{
  "available": false
}
```

Success status: **200 OK**

---

### 5. Replace a book (full)

**PUT /books/:id**

Replaces all fields of an existing book.

Example request body:
```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "genre": "Fiction",
  "year": 1958,
  "available": true
}
```

Success status: **200 OK**

---

### 6. Delete a book

**DELETE /books/:id**

Removes a book from the library permanently.

Example request:

Success status: **204 No Content**

---

### 7. List books by author (query parameter)

**GET /books?author=ngugi**

Returns all books by authors whose name contains the search term.

Example request:

Success status: **200 OK**

---

## Error Codes

### 400 Bad Request

The request was invalid. The server could not process it.

Example: Creating a book without a required field.
```json
{
  "error": "title is required"
}
```

### 404 Not Found

The requested resource does not exist.

Example: Requesting `GET /books/9999` when no book has id 9999.
```json
{
  "error": "Book not found"
}
```
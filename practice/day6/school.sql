-- Enable foreign key enforcement in SQLite
PRAGMA foreign_keys = ON;

-- ── CREATE TABLES ─────────────────────────────────────────

CREATE TABLE students (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id          INTEGER PRIMARY KEY,
  title       TEXT NOT NULL,
  instructor  TEXT NOT NULL,
  created_at  TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrolments (
  id         INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL,
  course_id  INTEGER NOT NULL,
  grade      TEXT,
  enrolled_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (student_id, course_id),  -- same student cannot enrol twice
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id)  REFERENCES courses(id)  ON DELETE CASCADE
);

-- ── INSERT SAMPLE DATA ────────────────────────────────────

INSERT INTO students (name, email) VALUES
  ('Amina Otieno', 'amina@school.com'),
  ('Brian Kamau',  'brian@school.com'),
  ('Cynthia Weru', 'cynthia@school.com');

INSERT INTO courses (title, instructor) VALUES
  ('Web Foundations',   'Mr Osei'),
  ('Data Science',      'Ms Ndiaye'),
  ('Cloud Engineering', 'Mr Mwangi');

INSERT INTO enrolments (student_id, course_id, grade) VALUES
  (1, 1, 'A'),   -- Amina: Web Foundations
  (1, 2, 'B'),   -- Amina: Data Science
  (2, 1, 'A'),   -- Brian: Web Foundations
  (2, 3, NULL),  -- Brian: Cloud Engineering (no grade yet)
  (3, 2, 'A'),   -- Cynthia: Data Science
  (3, 3, 'B');   -- Cynthia: Cloud Engineering

-- ── QUERY 1: All courses for one student (Amina) ─────────
SELECT courses.title, courses.instructor, enrolments.grade
FROM enrolments
JOIN students ON students.id = enrolments.student_id
JOIN courses  ON courses.id  = enrolments.course_id
WHERE students.name = 'Amina Otieno';

-- ── QUERY 2: All students on one course (Web Foundations) ─
SELECT students.name, students.email, enrolments.grade
FROM enrolments
JOIN students ON students.id = enrolments.student_id
JOIN courses  ON courses.id  = enrolments.course_id
WHERE courses.title = 'Web Foundations';

-- ── QUERY 3: Number of students per course ────────────────
SELECT courses.title, COUNT(enrolments.id) AS student_count
FROM courses
LEFT JOIN enrolments ON enrolments.course_id = courses.id
GROUP BY courses.id
ORDER BY student_count DESC;

-- ── QUERY 4: Students with no enrolments ─────────────────
SELECT students.name, students.email
FROM students
LEFT JOIN enrolments ON enrolments.student_id = students.id
WHERE enrolments.id IS NULL;

-- ── QUERY 5: Update one enrolment's grade ────────────────
UPDATE enrolments
SET grade = 'A'
WHERE student_id = 2 AND course_id = 3;

-- Verify the update
SELECT students.name, courses.title, enrolments.grade
FROM enrolments
JOIN students ON students.id = enrolments.student_id
JOIN courses  ON courses.id  = enrolments.course_id
WHERE student_id = 2 AND course_id = 3;
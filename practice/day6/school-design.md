# School Database Design

## Tables

### students
Stores one record per student.
- `id` — primary key, auto-numbered
- `name` — full name, required
- `email` — unique email address, required
- `created_at` — automatically set when the student is added

### courses
Stores one record per course.
- `id` — primary key, auto-numbered
- `title` — course name, required
- `instructor` — name of the instructor, required

### enrolments
The join table linking students to courses.
- `student_id` — foreign key referencing students.id
- `course_id` — foreign key referencing courses.id
- `grade` — the student's grade (nullable — may not be assigned yet)
- UNIQUE(student_id, course_id) — prevents duplicate enrolments

## Relationships

**students → enrolments → courses** is a **many-to-many** relationship:
- One student can enrol on many courses
- One course can have many students enrolled

A join table (`enrolments`) is required because a foreign key
in either the students or courses table could only represent
one side of the relationship. The join table stores pairs of
ids, one per enrolment, and also holds the grade which belongs
to the enrolment itself — not to the student or the course alone.

**students → enrolments** is also a one-to-many relationship
(one student has many enrolment records), as is
**courses → enrolments** (one course has many enrolment records).

## Index Recommendation

```sql
CREATE INDEX idx_enrolments_student_id ON enrolments(student_id);
```

The most common query is "get all courses for a student."
This filters `enrolments` by `student_id`, so an index on that
column lets the database jump directly to that student's rows
instead of scanning the whole enrolments table.

A second useful index would be on `enrolments.course_id`
for queries that look up all students on a specific course.

## SQL vs NoSQL

A SQL database is the right choice for this system.
The data has clear, stable structure: students, courses and
enrolments each have fixed, well-defined columns. The
relationships between them are important and queried
regularly — finding all courses for a student or all students
on a course both require JOINs across tables, which relational
databases handle efficiently. The grade on an enrolment is also
a case where data integrity matters: a student should not be
able to have two grades for the same course, enforced by the
UNIQUE constraint. A document database would require embedding
courses inside students or duplicating data, making it harder
to update a course title in one place or query across
relationships. SQL gives us correctness, constraints and
JOINs at no extra complexity for this type of data.
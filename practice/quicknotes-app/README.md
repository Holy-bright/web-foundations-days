# QuickNotes

A simple, fast note-taking web app built with HTML, CSS and JavaScript.

## Description

QuickNotes lets you capture ideas instantly in your browser.
Notes are organised by category, searchable in real time,
and saved automatically so they survive page refreshes.
No sign-up, no server, no installation required.

## Features

- Add notes with a category (Personal, Work, Study)
- Delete individual notes
- Live search — filters notes as you type
- Notes saved to localStorage (survive refresh)
- Validation — prevents empty or over-200-character notes
- Responsive layout — works on phones and desktops
- Clear all notes with a confirmation prompt (bonus)
- Visual colour coding per category

## How to run locally

1. Clone or download this repository
2. Open the folder in VS Code
3. Right-click `index.html` and choose **Open with Live Server**
4. The app opens in your browser at `http://127.0.0.1:5500`

No build step or dependencies required.

## What I learned

- How to manipulate the DOM safely using `textContent`
  and `createElement` instead of `innerHTML`
- How to save and restore structured data in `localStorage`
  using `JSON.stringify` and `JSON.parse`
- How the render pattern works: update the data array,
  save it, then rebuild the screen from scratch
- How Flexbox makes form layouts responsive with minimal CSS
- How event listeners connect user actions to JavaScript functions
import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("planning.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      start TEXT,
      end TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS absences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employeeId INTEGER,
      start TEXT,
      end TEXT,
      reason TEXT
    )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT CHECK(role IN ('MANAGER', 'EMPLOYEE'))
  )
`);

  db.run(`ALTER TABLE users ADD COLUMN employeeId INTEGER`, (err) => {
  // ignore si déjà ajouté
});
  
});

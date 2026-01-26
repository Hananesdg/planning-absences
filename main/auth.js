import { db } from "./db.js";

export const login = (email, password) =>
  new Promise((resolve, reject) => {
    db.get(
      `
      SELECT id, email, role, employeeId
      FROM users
      WHERE email = ? AND password = ?
      `,
      [email, password],
      (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      }
    );
  });

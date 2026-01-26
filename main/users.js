import { db } from "./db.js";

export const createUserAccount = ({ firstName, lastName, email, password, role }) =>
  new Promise((resolve, reject) => {
    if (role === "MANAGER") {
      db.run(
        "INSERT INTO users (email, password, role) VALUES (?, ?, 'MANAGER')",
        [email, password],
        function (err) {
          if (err) return reject(err);
          resolve({
            userId: this.lastID,
            role: "MANAGER",
            email,
          });
        }
      );
      return;
    }

    db.serialize(() => {
      db.run(
        "INSERT INTO employees (firstName, lastName) VALUES (?, ?)",
        [firstName, lastName],
        function (err) {
          if (err) return reject(err);

          const employeeId = this.lastID;

          db.run(
            "INSERT INTO users (email, password, role, employeeId) VALUES (?, ?, 'EMPLOYEE', ?)",
            [email, password, employeeId],
            function (err2) {
              if (err2) return reject(err2);

              resolve({
                userId: this.lastID,
                employeeId,
                role: "EMPLOYEE",
                email,
                firstName,
                lastName,
              });
            }
          );
        }
      );
    });
  });

/* 🔴 CET EXPORT MANQUAIT */
export const listEmployeesWithAccounts = () =>
  new Promise((resolve, reject) => {
    db.all(
      `
      SELECT 
        u.id as userId,
        u.email,
        u.role,
        e.id as employeeId,
        e.firstName,
        e.lastName
      FROM users u
      LEFT JOIN employees e ON u.employeeId = e.id
      ORDER BY u.id DESC
      `,
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });


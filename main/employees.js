import { db } from "./db.js";

export const getEmployees = () =>
  new Promise((resolve) => {
    db.all("SELECT * FROM employees", [], (_, rows) => resolve(rows));
  });

export const addEmployee = (firstName, lastName) =>
  new Promise((resolve) => {
    db.run(
      "INSERT INTO employees (firstName, lastName) VALUES (?, ?)",
      [firstName, lastName],
      function () {
        resolve({ id: this.lastID, firstName, lastName });
      }
    );
  });

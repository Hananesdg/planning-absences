import { db } from "./db.js";

db.all("SELECT id, email, password, role FROM users", [], (err, rows) => {
  console.log(rows);
});

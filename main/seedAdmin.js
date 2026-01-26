import { db } from "./db.js";

const ADMIN_EMAIL = "manager@planning.local";
const ADMIN_PASSWORD = "manager123";

db.get(
  "SELECT id FROM users WHERE email = ?",
  [ADMIN_EMAIL],
  (err, row) => {
    if (row) {
      console.log("✅ Compte manager déjà existant");
      return;
    }

    db.run(
      "INSERT INTO users (email, password, role) VALUES (?, ?, 'MANAGER')",
      [ADMIN_EMAIL, ADMIN_PASSWORD],
      () => {
        console.log("🚀 Compte manager créé");
        console.log("Email:", ADMIN_EMAIL);
        console.log("Password:", ADMIN_PASSWORD);
      }
    );
  }
);

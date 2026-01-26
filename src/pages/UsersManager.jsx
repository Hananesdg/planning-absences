import { useEffect, useState } from "react";
import "../styles/usersmanager.css";

export default function UsersManager() {
const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "EMPLOYEE",
});


  const [employees, setEmployees] = useState([]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    const rows = await window.users.listEmployeesWithAccounts();
    setEmployees(rows);
  };

  useEffect(() => {
  console.log("window.users =", window.users);
 }, []);
 

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

const onSubmit = async (e) => {
  e.preventDefault();
  console.log("SUBMIT FORM", form);

  try {
    console.log("CALL createEmployeeAccount");
    const res = await window.users.createUserAccount(form);
    console.log("RESULT =", res);

    setMsg("✅ Compte salarié créé");
    setForm({ firstName: "", lastName: "", email: "", password: "" });
    await load();
  } catch (e2) {
    console.error("CREATE ERROR", e2);
    setErr("❌ Erreur lors de la création");
  }
};

  return (
    <div className="users-manager">
      <h1>Gestion des salariés</h1>

      {/* CREATE USER */}
      <div className="user-form-card">
        <h3>Créer un compte salarié</h3>

        {msg && <p className="success-msg">{msg}</p>}
        {err && <p className="error-msg">{err}</p>}

        <form className="user-form" onSubmit={onSubmit}>
          <select
            name="role"
            value={form.role}
            onChange={onChange}
            required
            >
            <option value="EMPLOYEE">Salarié</option>
            <option value="MANAGER">Manager</option>
            </select>
        
            <input
            name="firstName"
            placeholder="Prénom"
            value={form.firstName}
            onChange={onChange}
            required
            />
            <input
            name="lastName"
            placeholder="Nom"
            value={form.lastName}
            onChange={onChange}
            required
            />
        
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={onChange}
            required
          />
          <button type="submit">Créer</button>
        </form>
      </div>

      {/* LIST */}
      <h3>Liste des salariés</h3>

      <table className="users-table">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
          </tr>
        </thead>
        <tbody>
  {employees.map((r) => (
    <tr key={r.userId}>
      <td>{r.firstName ?? <em>—</em>}</td>
      <td>{r.lastName ?? <em>—</em>}</td>
      <td>{r.email}</td>
      <td>{r.role}</td>
      <td>
        <span className={`badge ${r.role === "MANAGER" ? "badge-manager" : "badge-employee"}`}>
    {r.role}
  </span>
</td>

    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

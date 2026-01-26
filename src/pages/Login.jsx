import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../index.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);

    if (!user) {
      setError("Identifiants incorrects");
      return;
    }

    if (user.role === "MANAGER") navigate("/manager");
    else navigate("/employee");
  };

return (
  <div className="login-box">
    <h2>Connexion</h2>

    {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Se connecter</button>
    </form>
  </div>
);

}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data/mockUsers";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === "manager" ? "/manager" : "/employee");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert("Identifiants incorrects");
      return;
    }

    login(foundUser);
  };

  return (
    <div className="login-box">
      <h2>Connexion</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

import { useState } from "react";
import api from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // If you want real registration, add a backend endpoint; otherwise keep admin-created users.

  const submit = (e) => {
    e.preventDefault();
    alert("Registration is typically handled via admin or a signup endpoint you can add later.");
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, margin: "80px auto", display: "grid", gap: 10 }}>
      <h2>Register (placeholder)</h2>
      <input placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}


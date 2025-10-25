import React, { useState } from "react";

function Signup({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Account created for ${email}`);
    setPage("login");
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Signup</button>
        <p>Already have an account? <span className="link" onClick={() => setPage("login")}>Login</span></p>
      </form>
    </div>
  );
}

export default Signup;

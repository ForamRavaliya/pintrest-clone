import React from "react";

function Navbar({ setPage, setFilter }) {
  return (
    <nav className="navbar">
      <h1 className="logo" onClick={() => setPage("home")}>Pinterest Clone</h1>

      <input type="text" placeholder="Search..." className="searchbar" />

      <div className="nav-categories">
        <button onClick={() => { setFilter("All"); setPage("home"); }}>All</button>
        <button onClick={() => { setFilter("Nature"); setPage("home"); }}>Nature</button>
        <button onClick={() => { setFilter("Travel"); setPage("home"); }}>Travel</button>
        <button onClick={() => { setFilter("Food"); setPage("home"); }}>Food</button>
      </div>

      <div className="nav-buttons">
        <button onClick={() => setPage("upload")}>Upload</button>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("signup")}>Signup</button>
      </div>
    </nav>
  );
}

export default Navbar;

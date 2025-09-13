import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">PintClone</Link>
      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/create">Create</Link>
            <button onClick={logout} className="text-sm">Logout</button>
            <Link to={`/profile/${user._id}`} className="ml-2">{user.username}</Link>
          </>
        ) : (
          <Link to="/auth">Login / Register</Link>
        )}
      </div>
    </nav>
  );
}

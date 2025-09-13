import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './index.css';

export default function App() {
  return (
    <Router>
        <div className="bg-red-500 text-white p-4">
          Tailwind Test
        </div>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 bg-pink-500 text-white shadow-md">
          <h1 className="text-2xl font-bold">PintClone</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </div>
        </nav>

        {/* Page Routes */}
        <div className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

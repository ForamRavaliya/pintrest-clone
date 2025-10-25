import React, { useState } from "react";
import Navbar from "./components/Navbar";
import PinGrid from "./components/PinGrid";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Upload from "./components/Upload";
import PinModal from "./components/PinModal";
import { pinsData } from "./data";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [pins, setPins] = useState(pinsData);
  const [selectedPin, setSelectedPin] = useState(null);

  const addPin = (newPin) => {
    setPins([newPin, ...pins]);
    setPage("home");
  };

  return (
    <div className="app">
      <Navbar setPage={setPage} />

      {/* HOME PAGE */}
      {page === "home" && (
        <>
          <h2 className="main-title">Explore Stunning Pinterest Images</h2>
          <PinGrid pins={pins} setSelectedPin={setSelectedPin} />
        </>
      )}

      {/* UPLOAD PAGE */}
      {page === "upload" && <Upload addPin={addPin} />}

      {/* LOGIN PAGE */}
      {page === "login" && <Login setPage={setPage} />}

      {/* SIGNUP PAGE */}
      {page === "signup" && <Signup setPage={setPage} />}

      {/* IMAGE MODAL */}
      {selectedPin && (
        <PinModal pin={selectedPin} setSelectedPin={setSelectedPin} />
      )}
    </div>
  );
}

export default App;

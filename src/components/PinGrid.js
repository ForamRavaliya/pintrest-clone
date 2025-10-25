import React from "react";
import PinCard from "./PinCard";

function PinGrid({ pins, setSelectedPin }) {
  return (
    <div className="pin-grid">
      {pins.map((pin, i) => (
        <PinCard key={i} pin={pin} setSelectedPin={setSelectedPin} />
      ))}
    </div>
  );
}

export default PinGrid;

import React from "react";

function PinCard({ pin, setSelectedPin }) {
  return (
    <div className="pin-card" onClick={() => setSelectedPin(pin)}>
      <img src={pin.image} alt={pin.title} />
      <p>{pin.title}</p>
    </div>
  );
}

export default PinCard;

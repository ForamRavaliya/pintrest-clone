import React from "react";

function PinModal({ pin, setSelectedPin }) {
  return (
    <div className="modal" onClick={() => setSelectedPin(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={() => setSelectedPin(null)}>&times;</span>
        <img src={pin.image} alt={pin.title} style={{ width: "100%", borderRadius: "10px" }} />
        <h3>{pin.title}</h3>
      </div>
    </div>
  );
}

export default PinModal;

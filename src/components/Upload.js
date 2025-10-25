import React, { useState } from "react";

function Upload({ addPin }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !image) return alert("Please fill all fields");
    addPin({ title, image });
    setTitle("");
    setImage("");
  };

  return (
    <div className="form-container">
      <h2>Upload New Pin</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;

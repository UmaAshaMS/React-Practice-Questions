import React, { useState } from "react";

export default function DynamicList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return; 

    setItems(prev => [...prev, input]);
    setInput("");
  };

  const handleRemove = (indexToRemove) => {
    setItems(prev =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Dynamic List</h2>

      <input
        type="text"
        value={input}
        placeholder="Enter item"
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
        Add
      </button>


      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            {item}
            <button
              onClick={() => handleRemove(index)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
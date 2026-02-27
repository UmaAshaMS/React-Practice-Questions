import React, { useState } from "react";

export default function EmptyState() {
  const [items, setItems] = useState(["HTML", "CSS"]);

  const clearList = () => {
    setItems([]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>List Example</h2>

      <button onClick={clearList}>Clear List</button>

      {items.length === 0 ? (
        <p style={{ marginTop: "20px", color: "gray" }}>
          No Data
        </p>
      ) : (
        <ul style={{ marginTop: "20px" }}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
import React, { useState } from "react";

export default function ReverseList() {
  const [items, setItems] = useState([
    "HTML",
    "CSS",
    "Javascript",
    "React",
    "Redux"
  ]);

  const handleReverse = () => {
    const reversed = [...items].reverse(); // clone first
    setItems(reversed);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Reverse List</h2>

      <button onClick={handleReverse}>
        Reverse List
      </button>

      <ul style={{ marginTop: "20px" }}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
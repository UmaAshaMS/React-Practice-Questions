import React, { useState } from "react";

export default function HighlightList() {
  const [items] = useState([
    { id: 1, name: "HTML" },
    { id: 2, name: "CSS" },
    { id: 3, name: "React" }
  ]);

  const [selectedId, setSelectedId] = useState(null);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Highlight Selected Item</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map(item => (
          <li
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            style={{
              padding: "10px",
              marginBottom: "8px",
              cursor: "pointer",
              backgroundColor:
                selectedId === item.id ? "#90cdf4" : "#f1f1f1",
              fontWeight:
                selectedId === item.id ? "bold" : "normal"
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
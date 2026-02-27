import React from "react";

export default function NameList() {
  const names = ["HTML", "CSS", "JavaScript", "React"];

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <h2>Technology List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
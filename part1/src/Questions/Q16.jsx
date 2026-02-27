import React, { useState } from "react";

export default function SearchFilter() {
  const [search, setSearch] = useState("");

  const items = [
    "HTML",
    "CSS",
    "Javascript",
    "React",
    "Redux"
  ];

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Search Filter</h2>

      <input
        type="text"
        placeholder="Search name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul style={{ marginTop: "20px" }}>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
import React, { useState, useEffect } from "react";

export default function DebounceSearch() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [results, setResults] = useState([]);

  // Debounce logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => clearTimeout(timeout); 
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch) {
      setResults([]);
      return;
    }

    // Simulated API/filter
    const sampleData = ["React", "Redux", "Node", "NextJS", "Angular"];

    const filtered = sampleData.filter(item =>
      item.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    setResults(filtered);
  }, [debouncedSearch]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Debounced Search</h2>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul style={{ marginTop: "20px" }}>
        {results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
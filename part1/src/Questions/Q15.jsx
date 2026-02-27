import React, { useState } from "react";

export default function SortNumbers() {
  const [numbers, setNumbers] = useState([45, 12, 89, 3, 27]);
  const [ascending, setAscending] = useState(true);

  const handleSort = () => {
    const sorted = [...numbers].sort((a, b) =>
      ascending ? a - b : b - a
    );

    setNumbers(sorted);
    setAscending(!ascending);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Sort Numbers</h2>

      <button onClick={handleSort}>
        Sort {ascending ? "Descending" : "Ascending"}
      </button>

      <ul style={{ marginTop: "20px" }}>
        {numbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
}
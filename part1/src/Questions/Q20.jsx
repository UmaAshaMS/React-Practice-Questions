import React from "react";

export default function ConditionalStyleList() {
  const numbers = [1, 2, 3, 4, 5];

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Conditional Styling</h2>

      <ul>
        {numbers.map((num) => (
          <li
            key={num}
            style={{
              color: num % 2 === 0 ? "green" : "red",
              fontWeight: num % 2 === 0 ? "bold" : "normal"
            }}
          >
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
}
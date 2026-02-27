import React, { useState } from "react";

export default function ResetExample() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [count, setCount] = useState(0);

  const handleReset = () => {
    setName("");
    setAge("");
    setCount(0);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Reset All State Example</h2>

      <div>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setCount(prev => prev + 1)}>
          Click Me: {count}
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleReset}>Reset All</button>
      </div>
    </div>
  );
}
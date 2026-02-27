import React, { useState } from "react";

export default function SimpleCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(0);

  const add = () => {
    setResult(Number(num1) + Number(num2));
  };

  const subtract = () => {
    setResult(Number(num1) - Number(num2));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Simple Calculator</h2>

      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="First number"
      />

      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Second number"
        style={{ marginLeft: "10px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={add}>Add</button>
        <button onClick={subtract} style={{ marginLeft: "10px" }}>
          Subtract
        </button>
      </div>

      <h3 style={{ marginTop: "20px" }}>Result: {result}</h3>
    </div>
  );
}
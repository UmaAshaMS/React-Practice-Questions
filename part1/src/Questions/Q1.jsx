// Create a counter with step increment.
import React, { useState } from "react";

export default function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => {
    setCount(prev => prev + Number(step));
  };

  const decrement = () => {
    setCount(prev => prev - Number(step));
  };

  const reset = () => {
    setCount(0);
    setStep(1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Count: {count}</h2>

      <div>
        <label>Step: </label>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(e.target.value)}
          style={{ width: "60px", marginRight: "10px" }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={decrement} style ={{margin : '0 10px'}}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment} style={{ margin: "0 10px" }}>+</button>
      </div>
    </div>
  );
}
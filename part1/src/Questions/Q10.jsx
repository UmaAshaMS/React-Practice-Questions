import React, { useState, useRef, useEffect } from "react";

export default function RenderTracker() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment
      </button>

      <p>Component rendered: {renderCount.current} times</p>
    </div>
  );
}
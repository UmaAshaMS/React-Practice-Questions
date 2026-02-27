import React, { useState, useEffect } from "react";

export default function IntervalCleanup() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log("Interval cleared");
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Interval Cleanup Example</h2>
      <h1>{count}</h1>
    </div>
  );
}
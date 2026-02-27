import React, { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Start / Stop Timer</h2>
      <h1>{seconds} sec</h1>

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)} style={{ marginLeft: "10px" }}>
        Stop
      </button>
    </div>
  );
}
import React, { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(10); 
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Countdown Timer</h2>
      <h1>{timeLeft} sec</h1>

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)} style={{ marginLeft: "10px" }}>
        Stop</button>
      <button
        onClick={() => {
          setTimeLeft(10);
          setIsRunning(false);
        }}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </button>
    </div>
  );
}
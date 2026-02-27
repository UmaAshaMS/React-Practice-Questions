import { useEffect, useState, useRef } from "react";

export default function StopwatchWidget() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start / Stop Logic
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const startStop = () => {
    setRunning(prev => !prev);
  };

  const reset = () => {
    setRunning(false);
    setTime(0);
  };

  // Time Formatting
  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  };

  const pad = (num) => String(num).padStart(2, "0");

  return (
    <div style={styles.container}>
      <h2>Stopwatch</h2>

      <h1>{formatTime()}</h1>

      <button onClick={startStop} style={styles.button}>
        {running ? "Stop" : "Start"}
      </button>

      <button onClick={reset} style={styles.button}>
        Reset
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial"
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    cursor: "pointer"
  }
};
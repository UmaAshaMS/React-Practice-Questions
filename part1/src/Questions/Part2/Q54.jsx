import { useEffect, useState } from "react";

function ProgressBar({ value }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setProgress(current);

      if (current >= value) {
        clearInterval(interval);
      }
    }, 15); // speed of animation

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div style={styles.barContainer}>
      <div
        style={{
          ...styles.barFill,
          width: `${progress}%`
        }}
      >
        {progress}%
      </div>
    </div>
  );
}

export default function ProgressBarList() {
  const [bars, setBars] = useState([30, 60, 80]);

  const addBar = () => {
    const randomValue = Math.floor(Math.random() * 100) + 1;
    setBars([...bars, randomValue]);
  };

  return (
    <div style={styles.container}>
      <h2>Progress Bars</h2>

      <button onClick={addBar} style={styles.button}>
        Add Progress Bar
      </button>

      <div style={{ marginTop: "20px" }}>
        {bars.map((value, index) => (
          <ProgressBar key={index} value={value} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  barContainer: {
    width: "100%",
    height: "25px",
    background: "#eee",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "15px"
  },
  barFill: {
    height: "100%",
    background: "#4caf50",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    transition: "width 0.1s linear"
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
    border: "none",
    background: "#333",
    color: "#fff"
  }
};
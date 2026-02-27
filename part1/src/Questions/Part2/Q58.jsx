import { useEffect, useState } from "react";

function ProgressBar({ value }) {
  const [progress, setProgress] = useState(0);

  const normalizedValue = Math.min(Math.max(value, 0), 100);

  useEffect(() => {
    setProgress(normalizedValue);
  }, [normalizedValue]);

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.fill,
          width: `${progress}%`
        }}
      >
        {progress}%
      </div>
    </div>
  );
}

export default function ProgressTracker() {
  const [percentage, setPercentage] = useState(40);

  return (
    <div style={styles.wrapper}>
      <h2>Operation Progress</h2>

      <ProgressBar value={percentage} />

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPercentage(p => p + 10)}>
          Increase
        </button>

        <button
          onClick={() => setPercentage(p => p - 10)}
          style={{ marginLeft: "10px" }}
        >
          Decrease
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "400px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  container: {
    width: "100%",
    height: "25px",
    background: "#eee",
    borderRadius: "20px",
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    background: "#4caf50",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "width 0.4s ease",
    fontSize: "12px"
  }
};
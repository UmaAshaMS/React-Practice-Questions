import React, { useState, useEffect } from "react";

export default function SequentialProgressBars() {
  const TOTAL_BARS = 5;

  const [progress, setProgress] = useState(
    Array(TOTAL_BARS).fill(0)
  );

  const [activeIndex, setActiveIndex] =
    useState(0);

  /* ---------- SEQUENTIAL FILL ---------- */
  useEffect(() => {
    if (activeIndex >= TOTAL_BARS) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        const updated = [...prev];

        if (updated[activeIndex] >= 100) {
          clearInterval(timer);
          setActiveIndex(i => i + 1);
          return updated;
        }

        updated[activeIndex] += 2;
        return updated;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <div style={{ width: 400, margin: "40px auto" }}>
      <h2>Sequential Progress Bars</h2>

      {progress.map((value, index) => (
        <div key={index} style={styles.wrapper}>
          <div
            style={{
              ...styles.bar,
              width: `${value}%`
            }}
          >
            {Math.floor(value)}%
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  wrapper: {
    height: "25px",
    background: "#eee",
    borderRadius: "6px",
    marginBottom: "12px",
    overflow: "hidden"
  },

  bar: {
    height: "100%",
    background: "limegreen",
    transition: "width 0.04s linear",
    color: "white",
    textAlign: "center",
    fontSize: "12px"
  }
};
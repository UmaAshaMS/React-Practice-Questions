import React, { useState, useEffect } from "react";

export default function ConcurrentProgressBars() {
  const TOTAL_BARS = 8;
  const CONCURRENT_LIMIT = 3;

  const [bars, setBars] = useState(
    Array.from({ length: TOTAL_BARS }, () => ({
      progress: 0,
      status: "pending" // pending | running | done
    }))
  );

  // Start scheduler
  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prevBars) => {
        let updated = [...prevBars];

        // Count running bars
        const runningCount = updated.filter(
          (b) => b.status === "running"
        ).length;

        // Start pending bars if slots available
        if (runningCount < CONCURRENT_LIMIT) {
          for (let i = 0; i < updated.length; i++) {
            if (
              updated[i].status === "pending" &&
              updated.filter(b => b.status === "running").length <
                CONCURRENT_LIMIT
            ) {
              updated[i] = {
                ...updated[i],
                status: "running"
              };
            }
          }
        }

        // Update running bars
        updated = updated.map((bar) => {
          if (bar.status !== "running") return bar;

          const nextProgress = bar.progress + 2;

          if (nextProgress >= 100) {
            return {
              progress: 100,
              status: "done"
            };
          }

          return {
            ...bar,
            progress: nextProgress
          };
        });

        return updated;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h2>Concurrent Progress Bars (Max 3)</h2>

      {bars.map((bar, index) => (
        <div key={index} style={styles.wrapper}>
          <div style={styles.label}>
            Bar {index + 1} — {bar.status}
          </div>

          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressFill,
                width: `${bar.progress}%`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    fontFamily: "sans-serif"
  },

  wrapper: {
    marginBottom: "15px"
  },

  label: {
    marginBottom: "4px",
    fontSize: "14px"
  },

  progressTrack: {
    width: "100%",
    height: "18px",
    background: "#eee",
    borderRadius: "8px",
    overflow: "hidden"
  },

  progressFill: {
    height: "100%",
    background: "royalblue",
    transition: "width 0.1s linear"
  }
};
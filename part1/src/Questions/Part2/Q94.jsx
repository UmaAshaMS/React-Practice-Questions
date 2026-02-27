import React, { useEffect, useState } from "react";

const TOTAL_BARS = 8;
const CONCURRENCY_LIMIT = 3;
const SPEED = 1.5;

export default function ConcurrentProgressManager() {
  const [bars, setBars] = useState(
    Array.from({ length: TOTAL_BARS }, () => ({
      progress: 0,
      status: "pending" // pending | running | paused | done
    }))
  );

  // -------- Scheduler --------
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => {
        let updated = [...prev];

        // Count currently running
        const runningCount = updated.filter(
          b => b.status === "running"
        ).length;

        // Start queued jobs if slots free
        if (runningCount < CONCURRENCY_LIMIT) {
          for (let i = 0; i < updated.length; i++) {
            if (
              updated[i].status === "pending" &&
              updated.filter(
                b => b.status === "running"
              ).length < CONCURRENCY_LIMIT
            ) {
              updated[i] = {
                ...updated[i],
                status: "running"
              };
            }
          }
        }

        // Update running bars
        updated = updated.map(bar => {
          if (bar.status !== "running") return bar;

          const next = bar.progress + SPEED;

          if (next >= 100) {
            return { progress: 100, status: "done" };
          }

          return { ...bar, progress: next };
        });

        return updated;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // -------- Pause --------
  const pauseBar = index => {
    setBars(prev =>
      prev.map((bar, i) =>
        i === index && bar.status === "running"
          ? { ...bar, status: "paused" }
          : bar
      )
    );
  };

  // -------- Resume --------
  const resumeBar = index => {
    setBars(prev =>
      prev.map((bar, i) =>
        i === index && bar.status === "paused"
          ? { ...bar, status: "pending" }
          : bar
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2>Concurrent Progress Bars (Limit 3)</h2>

      {bars.map((bar, index) => (
        <div key={index} style={styles.wrapper}>
          <div style={styles.label}>
            Bar {index + 1} — {bar.status}
          </div>

          <div style={styles.track}>
            <div
              style={{
                ...styles.fill,
                width: `${bar.progress}%`
              }}
            />
          </div>

          <div>
            {bar.status === "running" && (
              <button onClick={() => pauseBar(index)}>
                Pause
              </button>
            )}

            {bar.status === "paused" && (
              <button onClick={() => resumeBar(index)}>
                Resume
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "450px",
    margin: "40px auto",
    fontFamily: "sans-serif"
  },

  wrapper: {
    marginBottom: "18px"
  },

  label: {
    marginBottom: "6px"
  },

  track: {
    width: "100%",
    height: "18px",
    background: "#eee",
    borderRadius: "8px",
    overflow: "hidden"
  },

  fill: {
    height: "100%",
    background: "royalblue",
    transition: "width 0.1s linear"
  }
};
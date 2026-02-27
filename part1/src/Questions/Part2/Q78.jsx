import React, { useEffect, useState } from "react";

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());

  // Update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  // Rotation calculations
  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div style={styles.container}>
      <div style={styles.clock}>
        {/* Hour Hand */}
        <div
          style={{
            ...styles.hand,
            ...styles.hour,
            transform: `rotate(${hourDeg}deg)`
          }}
        />

        {/* Minute Hand */}
        <div
          style={{
            ...styles.hand,
            ...styles.minute,
            transform: `rotate(${minuteDeg}deg)`
          }}
        />

        {/* Second Hand */}
        <div
          style={{
            ...styles.hand,
            ...styles.second,
            transform: `rotate(${secondDeg}deg)`
          }}
        />

        {/* Center Dot */}
        <div style={styles.centerDot} />

        {/* Numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i + 1) * 30;
          return (
            <div
              key={i}
              style={{
                ...styles.number,
                transform: `rotate(${angle}deg)`
              }}
            >
              <span
                style={{
                  transform: `rotate(-${angle}deg)`
                }}
              >
                {i + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  clock: {
    width: "300px",
    height: "300px",
    border: "8px solid black",
    borderRadius: "50%",
    position: "relative"
  },

  hand: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transformOrigin: "bottom",
    transform: "translateX(-50%) rotate(0deg)"
  },

  hour: {
    width: "6px",
    height: "70px",
    background: "black"
  },

  minute: {
    width: "4px",
    height: "100px",
    background: "black"
  },

  second: {
    width: "2px",
    height: "120px",
    background: "red"
  },

  centerDot: {
    width: "12px",
    height: "12px",
    background: "black",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },

  number: {
    position: "absolute",
    width: "100%",
    height: "100%",
    textAlign: "center",
    top: 0,
    left: 0,
    fontWeight: "bold"
  }
};
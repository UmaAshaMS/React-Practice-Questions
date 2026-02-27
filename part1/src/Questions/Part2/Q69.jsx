import { useEffect, useState } from "react";

export default function TrafficLight() {
  const lights = ["green", "yellow", "red"];
  const [activeLight, setActiveLight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLight(prev => (prev + 1) % lights.length);
    }, getDuration(lights[activeLight]));

    return () => clearInterval(interval);
  }, [activeLight]);

  const getDuration = (light) => {
    if (light === "green") return 3000;
    if (light === "yellow") return 1000;
    return 2000; // red
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.light,
          backgroundColor:
            lights[activeLight] === "red"
              ? "red"
              : "#444"
        }}
      />

      <div
        style={{
          ...styles.light,
          backgroundColor:
            lights[activeLight] === "yellow"
              ? "yellow"
              : "#444"
        }}
      />

      <div
        style={{
          ...styles.light,
          backgroundColor:
            lights[activeLight] === "green"
              ? "green"
              : "#444"
        }}
      />
    </div>
  );
}

const styles = {
  container: {
    width: "100px",
    padding: "15px",
    background: "black",
    borderRadius: "10px",
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center"
  },
  light: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#444"
  }
};
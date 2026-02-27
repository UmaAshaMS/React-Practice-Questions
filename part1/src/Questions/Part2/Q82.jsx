import React, { useState, useEffect } from "react";

export default function LightsGrid() {
  const GRID_SIZE = 9;

  const [active, setActive] = useState(
    Array(GRID_SIZE).fill(false)
  );

  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] =
    useState(false);

  const handleClick = (index) => {
    if (active[index] || isDeactivating) return;

    const newActive = [...active];
    newActive[index] = true;

    setActive(newActive);
    setOrder(prev => [...prev, index]);
  };

  /* ---------- START REVERSE TURN OFF ---------- */
  useEffect(() => {
    if (order.length === GRID_SIZE) {
      setIsDeactivating(true);
    }
  }, [order]);

  /* ---------- REVERSE DEACTIVATION ---------- */
  useEffect(() => {
    if (!isDeactivating) return;

    if (order.length === 0) {
      setIsDeactivating(false);
      return;
    }

    const timer = setTimeout(() => {
      setOrder(prev => {
        const newOrder = [...prev];
        const last = newOrder.pop();

        setActive(prevActive => {
          const updated = [...prevActive];
          updated[last] = false;
          return updated;
        });

        return newOrder;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [order, isDeactivating]);

  return (
    <div style={styles.container}>
      <h2>Lights Grid</h2>

      <div style={styles.grid}>
        {active.map((isOn, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              ...styles.light,
              background: isOn
                ? "limegreen"
                : "#ddd"
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 80px)",
    gap: "10px"
  },

  light: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "1px solid #999"
  }
};
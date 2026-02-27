import React, { useEffect, useState } from "react";

export default function BirthYearHistogramWidget() {
  const [data, setData] = useState([]);
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BIN_SIZE = 5; // 5-year grouping

  // -------- Fetch Data ----------
  useEffect(() => {
    async function fetchBirthYears() {
      try {
        setLoading(true);

        // Example API
        // Replace with real endpoint
        const res = await fetch(
          "https://mocki.io/v1/6c8f8c9b-cc1c-4a63-a1a7-2d7e1e7a1111"
        );

        const result = await res.json();

        // Expected format:
        // [1990, 1995, 2001, 1988, ...]
        setData(result);

      } catch (err) {
        setError("Failed to fetch data");

        // fallback mock data
        const mock = Array.from(
          { length: 120 },
          () => 1970 + Math.floor(Math.random() * 40)
        );
        setData(mock);
      } finally {
        setLoading(false);
      }
    }

    fetchBirthYears();
  }, []);

  // -------- Create Histogram ----------
  useEffect(() => {
    if (!data.length) return;

    const min = Math.min(...data);
    const max = Math.max(...data);

    const start = Math.floor(min / BIN_SIZE) * BIN_SIZE;
    const end = Math.ceil(max / BIN_SIZE) * BIN_SIZE;

    const histogram = [];

    for (let i = start; i < end; i += BIN_SIZE) {
      histogram.push({
        label: `${i}-${i + BIN_SIZE - 1}`,
        count: 0
      });
    }

    data.forEach((year) => {
      const index = Math.floor((year - start) / BIN_SIZE);
      if (histogram[index]) {
        histogram[index].count++;
      }
    });

    setBins(histogram);
  }, [data]);

  const maxCount = Math.max(...bins.map(b => b.count), 1);

  // -------- UI ----------
  if (loading) return <p>Loading birth year data...</p>;
  if (error) console.warn(error);

  return (
    <div style={styles.container}>
      <h2>Birth Year Histogram</h2>

      <div style={styles.chart}>
        {bins.map((bin, index) => (
          <div key={index} style={styles.barWrapper}>
            <div
              role="img"
              aria-label={`${bin.count} people born between ${bin.label}`}
              style={{
                ...styles.bar,
                height: `${(bin.count / maxCount) * 200}px`
              }}
            />
            <span style={styles.label}>{bin.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "700px",
    margin: "40px auto",
    fontFamily: "sans-serif",
    textAlign: "center"
  },

  chart: {
    display: "flex",
    alignItems: "flex-end",
    gap: "10px",
    height: "250px",
    borderBottom: "2px solid #333",
    padding: "20px"
  },

  barWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1
  },

  bar: {
    width: "100%",
    background: "royalblue",
    transition: "height 0.4s ease"
  },

  label: {
    marginTop: "8px",
    fontSize: "12px"
  }
};
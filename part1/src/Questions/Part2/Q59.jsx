import { useState } from "react";

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const handleCelsiusChange = (e) => {
    const value = e.target.value;
    setCelsius(value);

    if (value === "") {
      setFahrenheit("");
      return;
    }

    const f = (value * 9) / 5 + 32;
    setFahrenheit(f.toFixed(2));
  };

  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);

    if (value === "") {
      setCelsius("");
      return;
    }

    const c = ((value - 32) * 5) / 9;
    setCelsius(c.toFixed(2));
  };

  return (
    <div style={styles.container}>
      <h2>Temperature Converter</h2>

      <div style={styles.inputGroup}>
        <label>Celsius (°C)</label>
        <input
          type="number"
          value={celsius}
          onChange={handleCelsiusChange}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label>Fahrenheit (°F)</label>
        <input
          type="number"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
          style={styles.input}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px"
  },
  input: {
    padding: "10px",
    fontSize: "14px"
  }
};
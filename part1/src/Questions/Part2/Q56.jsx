import { useState } from "react";

export default function FlightBooking() {
  const [tripType, setTripType] = useState("oneway");
  const [form, setForm] = useState({
    from: "",
    to: "",
    departure: "",
    returnDate: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!form.from || !form.to || !form.departure) {
      return "Please fill all required fields.";
    }

    if (tripType === "roundtrip") {
      if (!form.returnDate) {
        return "Please select return date.";
      }

      if (new Date(form.returnDate) < new Date(form.departure)) {
        return "Return date cannot be before departure date.";
      }
    }

    if (form.from === form.to) {
      return "Origin and destination cannot be same.";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    setMessage(
      `Flight booked from ${form.from} to ${form.to} on ${form.departure}${
        tripType === "roundtrip"
          ? ` and returning on ${form.returnDate}`
          : ""
      }`
    );

    setForm({
      from: "",
      to: "",
      departure: "",
      returnDate: ""
    });
  };

  return (
    <div style={styles.container}>
      <h2>Book a Flight</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>
            <input
              type="radio"
              value="oneway"
              checked={tripType === "oneway"}
              onChange={() => setTripType("oneway")}
            />
            One Way
          </label>

          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              value="roundtrip"
              checked={tripType === "roundtrip"}
              onChange={() => setTripType("roundtrip")}
            />
            Round Trip
          </label>
        </div>

        <input
          type="text"
          name="from"
          placeholder="From"
          value={form.from}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="to"
          placeholder="To"
          value={form.to}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="date"
          name="departure"
          value={form.departure}
          onChange={handleChange}
          style={styles.input}
        />

        {tripType === "roundtrip" && (
          <input
            type="date"
            name="returnDate"
            value={form.returnDate}
            onChange={handleChange}
            style={styles.input}
          />
        )}

        <button type="submit" style={styles.button}>
          Book Flight
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    padding: "10px",
    fontSize: "14px"
  },
  button: {
    padding: "10px",
    background: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  message: {
    marginTop: "20px",
    fontWeight: "bold"
  }
};
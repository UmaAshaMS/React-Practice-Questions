import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.message) {
      return "Name, Email and Message are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Invalid email format";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setStatus({ loading: false, error, success: "" });
      return;
    }

    try {
      setStatus({ loading: true, error: "", success: "" });

      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus({
        loading: false,
        error: "",
        success: "Feedback submitted successfully!"
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (err) {
      setStatus({
        loading: false,
        error: "Something went wrong. Please try again.",
        success: ""
      });
    }
  };

  return (
    <div style={styles.container}>
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number (optional)"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="message"
          placeholder="Your Feedback"
          value={form.message}
          onChange={handleChange}
          style={styles.textarea}
        />

        <button type="submit" disabled={status.loading} style={styles.button}>
          {status.loading ? "Submitting..." : "Submit"}
        </button>

        {status.error && <p style={styles.error}>{status.error}</p>}
        {status.success && <p style={styles.success}>{status.success}</p>}
      </form>
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
  textarea: {
    padding: "10px",
    minHeight: "100px",
    fontSize: "14px"
  },
  button: {
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  error: {
    color: "red"
  },
  success: {
    color: "green"
  }
};
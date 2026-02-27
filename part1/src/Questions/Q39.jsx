import React, { useState } from "react";

export default function ProfileForm() {
  const defaultState = {
    firstName: "",
    email: ""
  };

  const [formData, setFormData] = useState(defaultState);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (!value.trim()) {
      errorMessage = `${name} is required`;
    }

    if (name === "email" && value && !validateEmail(value)) {
      errorMessage = "Invalid email format";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage
    }));
  };

  // 🔥 Clear Specific Field + Clear Error
  const clearField = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: ""
    }));

    setErrors((prev) => ({
      ...prev,
      [fieldName]: ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Profile Form</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type="button"
            onClick={() => clearField("firstName")}
            style={{ marginLeft: "5px" }}
          >
            Clear
          </button>

          {errors.firstName && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {errors.firstName}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type="button"
            onClick={() => clearField("email")}
            style={{ marginLeft: "5px" }}
          >
            Clear
          </button>

          {errors.email && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {errors.email}
            </p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
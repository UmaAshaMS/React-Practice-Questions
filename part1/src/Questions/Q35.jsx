import React, { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const passwordScore = getPasswordStrength(formData.password);

  const getStrengthLabel = () => {
    if (passwordScore <= 1) return "Weak";
    if (passwordScore <= 3) return "Medium";
    return "Strong";
  };

  const isFormValid =
    validateEmail(formData.email) &&
    passwordScore >= 3; // require at least medium strength

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "email") {
      if (!value) {
        errorMessage = "Email is required";
      } else if (!validateEmail(value)) {
        errorMessage = "Invalid email format";
      }
    }

    if (name === "password") {
      if (!value) {
        errorMessage = "Password is required";
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Login Form</h2>

      <form>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {formData.password && (
            <div style={{ marginTop: "8px" }}>
              <div
                style={{
                  height: "6px",
                  width: `${passwordScore * 25}%`,
                  backgroundColor:
                    passwordScore <= 1
                      ? "red"
                      : passwordScore <= 3
                      ? "orange"
                      : "green",
                  transition: "0.3s"
                }}
              />
              <p style={{ fontSize: "14px", marginTop: "4px" }}>
                Strength: {getStrengthLabel()}
              </p>
            </div>
          )}

          {errors.password && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {errors.password}
            </p>
          )}
        </div>

        <button type="submit" disabled={!isFormValid}>
          Login
        </button>
      </form>
    </div>
  );
}
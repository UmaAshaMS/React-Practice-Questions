import React from "react";

export default function ButtonApp() {

  //Reusable Button Component
  const Button = ({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    type = "button",
    onClick
  }) => {

    const baseStyle = {
      border: "none",
      borderRadius: "6px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.2s ease"
    };

    const variants = {
      primary: {
        backgroundColor: "#2563eb",
        color: "#fff"
      },
      secondary: {
        backgroundColor: "#e5e7eb",
        color: "#111"
      },
      danger: {
        backgroundColor: "#dc2626",
        color: "#fff"
      }
    };

    const sizes = {
      sm: {
        padding: "6px 12px",
        fontSize: "12px"
      },
      md: {
        padding: "8px 16px",
        fontSize: "14px"
      },
      lg: {
        padding: "12px 20px",
        fontSize: "16px"
      }
    };

    const finalStyle = {
      ...baseStyle,
      ...variants[variant],
      ...sizes[size],
      opacity: disabled || loading ? 0.6 : 1,
      pointerEvents: disabled || loading ? "none" : "auto"
    };

    return (
      <button
        type={type}
        onClick={onClick}
        style={finalStyle}
        disabled={disabled || loading}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  };

  //Usage
  return (
    <div style={{ padding: "40px", display: "flex", gap: "12px" }}>
      <Button variant="primary">Primary</Button>

      <Button variant="secondary">Secondary</Button>

      <Button variant="danger">Danger</Button>

      <Button variant="primary" size="lg">
        Large Button
      </Button>

      <Button variant="primary" loading>
        Submitting
      </Button>

      <Button variant="secondary" disabled>
        Disabled
      </Button>
    </div>
  );
}
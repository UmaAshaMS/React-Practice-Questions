import React, { useState, useRef } from "react";

export default function AccessibleTabs() {
  const tabs = [
    {
      label: "Home",
      content: "Welcome to Home tab"
    },
    {
      label: "Profile",
      content: "User profile information"
    },
    {
      label: "Settings",
      content: "Application settings"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  /* ---------- KEYBOARD NAVIGATION ---------- */
  const handleKeyDown = (e, index) => {
    const total = tabs.length;

    switch (e.key) {
      case "ArrowRight":
        tabRefs.current[(index + 1) % total]?.focus();
        break;

      case "ArrowLeft":
        tabRefs.current[
          (index - 1 + total) % total
        ]?.focus();
        break;

      case "Home":
        tabRefs.current[0]?.focus();
        break;

      case "End":
        tabRefs.current[total - 1]?.focus();
        break;

      case "Enter":
      case " ":
        e.preventDefault();
        setActiveIndex(index);
        break;

      default:
        break;
    }
  };

  return (
    <div style={{ width: 500, margin: "40px auto" }}>
      <h2>Accessible Tabs</h2>

      {/* -------- TAB LIST -------- */}
      <div role="tablist" aria-label="Sample Tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            role="tab"
            id={`tab-${index}`}
            aria-selected={activeIndex === index}
            aria-controls={`panel-${index}`}
            tabIndex={
              activeIndex === index ? 0 : -1
            }
            onClick={() =>
              setActiveIndex(index)
            }
            onKeyDown={(e) =>
              handleKeyDown(e, index)
            }
            style={{
              padding: "10px 16px",
              marginRight: 5,
              borderBottom:
                activeIndex === index
                  ? "3px solid blue"
                  : "1px solid gray",
              background:
                activeIndex === index
                  ? "#eee"
                  : "#fff",
              cursor: "pointer"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* -------- TAB PANELS -------- */}
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`panel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={activeIndex !== index}
          style={{
            padding: 20,
            border: "1px solid #ccc",
            marginTop: 10
          }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
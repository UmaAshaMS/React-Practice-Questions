import React, { useState, useRef } from "react";

export default function AccessibleTabs() {
  const tabs = [
    { id: "tab-1", label: "Profile", content: "Profile information content" },
    { id: "tab-2", label: "Settings", content: "Settings content here" },
    { id: "tab-3", label: "Dashboard", content: "Dashboard analytics content" }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  const focusTab = (index) => {
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (e, index) => {
    let newIndex = index;

    switch (e.key) {
      case "ArrowRight":
        newIndex = (index + 1) % tabs.length;
        break;

      case "ArrowLeft":
        newIndex = (index - 1 + tabs.length) % tabs.length;
        break;

      case "Home":
        newIndex = 0;
        break;

      case "End":
        newIndex = tabs.length - 1;
        break;

      case "Enter":
      case " ":
        setActiveIndex(index);
        return;

      default:
        return;
    }

    e.preventDefault();
    focusTab(newIndex);
  };

  return (
    <div style={styles.container}>
      {/* TAB LIST */}
      <div role="tablist" aria-label="Sample Tabs" style={styles.tabList}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[index] = el)}
            role="tab"
            id={tab.id}
            aria-selected={activeIndex === index}
            aria-controls={`panel-${index}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              ...styles.tab,
              ...(activeIndex === index ? styles.activeTab : {})
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB PANELS */}
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`panel-${index}`}
          aria-labelledby={tab.id}
          hidden={activeIndex !== index}
          tabIndex={0}
          style={styles.panel}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    fontFamily: "sans-serif"
  },

  tabList: {
    display: "flex",
    borderBottom: "2px solid #ccc"
  },

  tab: {
    padding: "10px 16px",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    outline: "none"
  },

  activeTab: {
    borderBottom: "3px solid royalblue",
    fontWeight: "bold"
  },

  panel: {
    padding: "20px",
    border: "1px solid #ccc",
    marginTop: "10px"
  }
};
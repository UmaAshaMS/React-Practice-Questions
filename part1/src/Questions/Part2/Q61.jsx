import { useState } from "react";

function Tabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={styles.container}>
      
      {/* Tab Headers */}
      <div style={styles.tabList}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              ...styles.tabButton,
              borderBottom:
                activeIndex === index
                  ? "3px solid blue"
                  : "3px solid transparent"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Panel */}
      <div style={styles.panel}>
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}

export default function TabsExample() {
  const tabData = [
    {
      label: "Home",
      content: <p>Welcome to Home Tab</p>
    },
    {
      label: "Profile",
      content: <p>This is Profile information</p>
    },
    {
      label: "Settings",
      content: <p>Manage your settings here</p>
    }
  ];

  return <Tabs tabs={tabData} />;
}

const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  tabList: {
    display: "flex",
    borderBottom: "1px solid #ccc"
  },
  tabButton: {
    flex: 1,
    padding: "10px",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontWeight: "bold"
  },
  panel: {
    padding: "20px"
  }
};
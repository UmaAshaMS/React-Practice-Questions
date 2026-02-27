import { useState } from "react";

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    {
      title: "Section 1",
      content: "This is the content for section 1."
    },
    {
      title: "Section 2",
      content: "This is the content for section 2."
    },
    {
      title: "Section 3",
      content: "This is the content for section 3."
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      {data.map((item, index) => (
        <div key={index} style={styles.item}>
          <div
            style={styles.title}
            onClick={() => handleToggle(index)}
          >
            {item.title}
          </div>

          {activeIndex === index && (
            <div style={styles.content}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    fontFamily: "Arial"
  },
  item: {
    border: "1px solid #ddd",
    marginBottom: "10px",
    borderRadius: "6px",
    overflow: "hidden"
  },
  title: {
    padding: "12px",
    background: "#f2f2f2",
    cursor: "pointer",
    fontWeight: "bold"
  },
  content: {
    padding: "12px",
    background: "#fff"
  }
};
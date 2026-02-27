import React, { useState, useRef } from "react";

export default function AccessibleAccordionDemo() {
  const items = [
    {
      title: "Section 1",
      content: "This is content for section 1"
    },
    {
      title: "Section 2",
      content: "This is content for section 2"
    },
    {
      title: "Section 3",
      content: "This is content for section 3"
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const buttonRefs = useRef([]);

  const toggleAccordion = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const handleKeyDown = (e, index) => {
    const total = items.length;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        buttonRefs.current[(index + 1) % total]?.focus();
        break;

      case "ArrowUp":
        e.preventDefault();
        buttonRefs.current[
          (index - 1 + total) % total
        ]?.focus();
        break;

      case "Home":
        e.preventDefault();
        buttonRefs.current[0]?.focus();
        break;

      case "End":
        e.preventDefault();
        buttonRefs.current[total - 1]?.focus();
        break;

      default:
        break;
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2>Accessible Accordion</h2>

      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index}>
            {/* Accordion Header */}
            <h3>
              <button
                ref={(el) => (buttonRefs.current[index] = el)}
                aria-expanded={isOpen}
                aria-controls={`panel-${index}`}
                id={`accordion-${index}`}
                onClick={() => toggleAccordion(index)}
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  textAlign: "left",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  background: "#f5f5f5"
                }}
              >
                {item.title}
              </button>
            </h3>

            {/* Accordion Panel */}
            <div
              id={`panel-${index}`}
              role="region"
              aria-labelledby={`accordion-${index}`}
              hidden={!isOpen}
              style={{
                border: "1px solid #ccc",
                borderTop: "none",
                padding: "12px"
              }}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
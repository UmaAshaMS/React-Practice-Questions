import React, { useState, useRef } from "react";

export default function AccessibleAccordion() {
  const items = [
    {
      title: "What is React?",
      content: "React is a JavaScript library for building UI."
    },
    {
      title: "What is Accessibility?",
      content: "Accessibility ensures products are usable by everyone."
    },
    {
      title: "What is ARIA?",
      content:
        "ARIA provides semantic meaning for assistive technologies."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const buttonRefs = useRef([]);

  const toggleItem = (index) => {
    setOpenIndex(prev =>
      prev === index ? null : index
    );
  };

  const handleKeyDown = (event, index) => {
    const total = items.length;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        buttonRefs.current[
          (index + 1) % total
        ]?.focus();
        break;

      case "ArrowUp":
        event.preventDefault();
        buttonRefs.current[
          (index - 1 + total) % total
        ]?.focus();
        break;

      case "Home":
        event.preventDefault();
        buttonRefs.current[0]?.focus();
        break;

      case "End":
        event.preventDefault();
        buttonRefs.current[
          total - 1
        ]?.focus();
        break;

      case "Enter":
      case " ":
        event.preventDefault();
        toggleItem(index);
        break;

      default:
        break;
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Arial"
      }}
    >
      <h2>Accessible Accordion</h2>

      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index}>
            <h3>
              <button
                ref={(el) =>
                  (buttonRefs.current[index] = el)
                }
                id={`accordion-header-${index}`}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${index}`}
                onClick={() => toggleItem(index)}
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  textAlign: "left",
                  border: "1px solid #ccc",
                  background: "#f3f3f3",
                  cursor: "pointer"
                }}
              >
                {item.title}
              </button>
            </h3>

            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-header-${index}`}
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
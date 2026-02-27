import React, { useState, useRef, useEffect } from "react";

export default function DropdownApp() {
  const options = ["Profile", "Settings", "Logout"];

  return (
    <div style={{ padding: "40px" }}>
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>

        <Dropdown.Menu>
          {options.map((item) => (
            <Dropdown.Item
              key={item}
              onClick={() => alert(item)}
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

function Dropdown({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
}

Dropdown.Trigger = function Trigger({ children, isOpen, setIsOpen }) {
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {children}
    </button>
  );
};

Dropdown.Menu = function Menu({ children, isOpen }) {
  if (!isOpen) return null;

  return (
    <div style={menuStyle}>
      {children}
    </div>
  );
};

Dropdown.Item = function Item({ children, onClick }) {
  return (
    <div
      style={itemStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const menuStyle = {
  position: "absolute",
  top: "100%",
  left: 0,
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "6px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  marginTop: "6px",
  minWidth: "150px"
};

const itemStyle = {
  padding: "10px 14px",
  cursor: "pointer"
};
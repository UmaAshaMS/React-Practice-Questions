import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function ModalApp() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Confirmation</Modal.Header>
        <Modal.Body>
          Are you sure you want to continue?
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button style={{ marginLeft: "10px" }}>Confirm</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function Modal({ isOpen, onClose, children }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={backdropStyle}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={modalStyle}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.Header = function ModalHeader({ children }) {
  return (
    <div style={{ padding: "16px", borderBottom: "1px solid #eee", fontWeight: "600" }}>
      {children}
    </div>
  );
};

Modal.Body = function ModalBody({ children }) {
  return <div style={{ padding: "16px" }}>{children}</div>;
};

Modal.Footer = function ModalFooter({ children }) {
  return (
    <div style={{ padding: "12px 16px", borderTop: "1px solid #eee", textAlign: "right" }}>
      {children}
    </div>
  );
};


const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modalStyle = {
  background: "#fff",
  borderRadius: "10px",
  width: "400px",
  maxWidth: "90%",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  overflow: "hidden"
};
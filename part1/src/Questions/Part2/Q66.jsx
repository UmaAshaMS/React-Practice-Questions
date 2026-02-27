import { useState } from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button style={styles.closeBtn} onClick={onClose}>
          ✖
        </button>

        {children}
      </div>
    </div>
  );
}

export default function ModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.container}>
      <h2>Reusable Modal Example</h2>

      <button onClick={() => setOpen(true)}>
        Open Modal
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <h3>Hello</h3>
        <p>This is a message from Wynxio Technologies.</p>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial"
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px",
    position: "relative"
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px"
  }
};
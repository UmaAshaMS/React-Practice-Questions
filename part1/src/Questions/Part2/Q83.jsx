import React, { useState, useRef, useEffect } from "react";

export default function SemiAccessibleModalDemo() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const modalRef = useRef(null);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  /* ---------- Focus Management ---------- */
  useEffect(() => {
    if (open) {
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      triggerRef.current?.focus();
    }
  }, [open]);

  /* ---------- ESC CLOSE ---------- */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () =>
      document.removeEventListener("keydown", handleEsc);
  }, [open]);

  return (
    <div style={{ padding: 40 }}>
      <button ref={triggerRef} onClick={openModal}>
        Open Modal
      </button>

      {open && (
        <div style={styles.overlay}>
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            tabIndex={-1}
            style={styles.modal}
          >
            <h2 id="modal-title">Modal Title</h2>

            <p id="modal-description">
              This is a semi-accessible modal dialog.
            </p>

            <button onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    outline: "none"
  }
};
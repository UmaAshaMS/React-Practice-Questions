import React, { useEffect, useRef, useState } from "react";

export default function AccessibleModalDialog() {
  const [open, setOpen] = useState(false);

  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  // ---------- Focus Trap ----------
  useEffect(() => {
    if (!open) return;

    const modal = modalRef.current;

    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleKeyDown = (e) => {
      // ESC closes
      if (e.key === "Escape") {
        closeModal();
      }

      // TAB Trap
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () =>
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [open]);

  // ---------- Prevent Background Scroll ----------
  useEffect(() => {
    document.body.style.overflow = open
      ? "hidden"
      : "auto";
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    triggerRef.current?.focus(); // restore focus
  };

  return (
    <div style={styles.container}>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
      >
        Open Modal
      </button>

      {open && (
        <div
          style={styles.overlay}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            style={styles.modal}
          >
            <h2 id="modal-title">
              Accessible Modal
            </h2>

            <p id="modal-desc">
              This modal traps keyboard focus.
            </p>

            <input placeholder="Type here..." />

            <button>Action</button>

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
  container: {
    fontFamily: "sans-serif",
    padding: "40px"
  },

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
    padding: "25px",
    borderRadius: "8px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }
};
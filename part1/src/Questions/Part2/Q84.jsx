import React, { useState, useRef, useEffect } from "react";

export default function AccessibleModalExample() {
  const [open, setOpen] = useState(false);

  const triggerRef = useRef(null);
  const modalRef = useRef(null);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  /* ---------- FOCUS MANAGEMENT ---------- */
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
      /* ESC CLOSE */
      if (e.key === "Escape") {
        closeModal();
      }

      /* BASIC FOCUS TRAP */
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (
          !e.shiftKey &&
          document.activeElement === last
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
      document.body.style.overflow = "auto";
      triggerRef.current?.focus();
    };
  }, [open]);

  /* ---------- OVERLAY CLICK ---------- */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <button ref={triggerRef} onClick={openModal}>
        Open Modal
      </button>

      {open && (
        <div
          style={styles.overlay}
          onMouseDown={handleOverlayClick}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-desc"
            style={styles.modal}
          >
            <h2 id="dialog-title">Settings</h2>

            <p id="dialog-desc">
              Update your preferences here.
            </p>

            <input placeholder="Your name" />

            <div style={{ marginTop: 20 }}>
              <button onClick={closeModal}>
                Cancel
              </button>

              <button onClick={closeModal}>
                Save
              </button>
            </div>
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
    padding: "24px",
    borderRadius: "8px",
    width: "320px"
  }
};
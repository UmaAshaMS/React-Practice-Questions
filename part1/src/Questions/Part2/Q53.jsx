import React from "react";

export default function HolyGrailLayout() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>Header</header>

      <div style={styles.main}>
        <aside style={styles.sidebarLeft}>Left Sidebar</aside>

        <main style={styles.content}>
          <h2>Main Content</h2>
          <p>
            This is the main content area. It expands and shrinks
            depending on available space.
          </p>
        </main>

        <aside style={styles.sidebarRight}>Right Sidebar</aside>
      </div>

      <footer style={styles.footer}>Footer</footer>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Arial"
  },
  header: {
    background: "#333",
    color: "#fff",
    padding: "20px",
    textAlign: "center"
  },
  main: {
    display: "flex",
    flex: 1
  },
  sidebarLeft: {
    width: "200px",
    background: "#f4f4f4",
    padding: "20px"
  },
  content: {
    flex: 1,
    padding: "20px",
    background: "#fff"
  },
  sidebarRight: {
    width: "200px",
    background: "#f4f4f4",
    padding: "20px"
  },
  footer: {
    background: "#333",
    color: "#fff",
    padding: "20px",
    textAlign: "center"
  }
};
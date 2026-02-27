import { useEffect, useState } from "react";

export default function SmoothImageCarousel() {
  const images = [
    "https://picsum.photos/id/1015/800/400",
    "https://picsum.photos/id/1016/800/400",
    "https://picsum.photos/id/1018/800/400",
    "https://picsum.photos/id/1020/800/400",
  ];

  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [offset, setOffset] = useState(0);

  const total = images.length;

  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  /* ---------- Slide ---------- */
  const slide = (direction) => {
    if (animating) return;

    setAnimating(true);
    setOffset(direction === "next" ? -100 : 100);

    setTimeout(() => {
      setIndex((i) =>
        direction === "next"
          ? (i + 1) % total
          : (i - 1 + total) % total
      );

      setOffset(0);
      setAnimating(false);
    }, 400);
  };

  /* ---------- Auto Play ---------- */
  useEffect(() => {
    const id = setInterval(() => {
      slide("next");
    }, 3000);

    return () => clearInterval(id);
  }, [animating]);

  /* ---------- Styles ---------- */
  const styles = {
    container: {
      width: "800px",
      overflow: "hidden",
      margin: "40px auto",
      position: "relative",
    },
    track: {
      display: "flex",
      transform: `translateX(${offset}%)`,
      transition: animating
        ? "transform 0.4s ease"
        : "none",
    },
    img: {
      width: "800px",
      height: "400px",
      objectFit: "cover",
      flexShrink: 0,
    },
    btn: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgba(0,0,0,0.5)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.track}>
        {/* ONLY 3 IMAGES IN DOM */}
        <img
          src={images[prevIndex]}
          style={styles.img}
        />
        <img
          src={images[index]}
          style={styles.img}
        />
        <img
          src={images[nextIndex]}
          style={styles.img}
        />
      </div>

      <button
        style={{ ...styles.btn, left: 10 }}
        onClick={() => slide("prev")}
      >
        ◀
      </button>

      <button
        style={{ ...styles.btn, right: 10 }}
        onClick={() => slide("next")}
      >
        ▶
      </button>
    </div>
  );
}
import React, { useEffect, useState, useRef } from "react";

export default function SmoothImageCarousel() {
  const images = [
    "https://picsum.photos/id/1015/800/400",
    "https://picsum.photos/id/1016/800/400",
    "https://picsum.photos/id/1018/800/400",
    "https://picsum.photos/id/1020/800/400"
  ];

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  // ---------- Auto Play ----------
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // ---------- Navigation ----------
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  return (
    <div
      style={styles.carousel}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Slides */}
      <div
        style={{
          ...styles.track,
          transform: `translateX(-${index * 100}%)`
        }}
      >
        {images.map((src, i) => (
          <img key={i} src={src} style={styles.image} />
        ))}
      </div>

      {/* Controls */}
      <button style={styles.prev} onClick={prevSlide}>
        ❮
      </button>

      <button style={styles.next} onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
}

const styles = {
  carousel: {
    width: "800px",
    height: "400px",
    margin: "40px auto",
    overflow: "hidden",
    position: "relative",
    borderRadius: "10px"
  },

  track: {
    display: "flex",
    transition: "transform 0.6s ease-in-out",
    height: "100%"
  },

  image: {
    width: "800px",
    height: "400px",
    objectFit: "cover",
    flexShrink: 0
  },

  prev: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    fontSize: "24px",
    cursor: "pointer"
  },

  next: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    fontSize: "24px",
    cursor: "pointer"
  }
};
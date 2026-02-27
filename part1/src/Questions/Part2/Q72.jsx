import { useEffect, useState } from "react";

export default function ImageCarousel() {
  const images = [
    "https://picsum.photos/id/1015/600/300",
    "https://picsum.photos/id/1016/600/300",
    "https://picsum.photos/id/1018/600/300",
    "https://picsum.photos/id/1020/600/300"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % images.length
    );
  };


  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <img
        src={images[currentIndex]}
        alt="carousel"
        style={styles.image}
      />

      <button onClick={prevSlide} style={styles.prev}>
        ❮
      </button>

      <button onClick={nextSlide} style={styles.next}>
        ❯
      </button>
    </div>
  );
}

const styles = {
  container: {
    width: "600px",
    margin: "40px auto",
    position: "relative"
  },
  image: {
    width: "100%",
    borderRadius: "8px"
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
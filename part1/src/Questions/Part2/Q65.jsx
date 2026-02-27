import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handleLike = () => {
    setLiked(prev => !prev);
    setCount(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handleLike}
        style={{
          ...styles.button,
          backgroundColor: liked ? "#ff4d4d" : "#ddd",
          color: liked ? "white" : "black"
        }}
      >
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>

      <p>{count} Likes</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "Arial"
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }
};
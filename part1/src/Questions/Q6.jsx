import React, { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(prev => !prev);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={toggleLike}
        style={{
          padding: "10px 20px",
          backgroundColor: liked ? "crimson" : "lightgray",
          color: liked ? "white" : "black",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {liked ? "Liked" : "Like"}
      </button>
    </div>
  );
}
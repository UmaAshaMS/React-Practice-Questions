import { useState } from "react";

function Tweet({ name, username, content, time, avatar }) {
  const [likes, setLikes] = useState(12);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div style={styles.tweet}>
      <img src={avatar} alt="avatar" style={styles.avatar} />

      <div style={styles.body}>
        <div style={styles.header}>
          <span style={styles.name}>{name}</span>
          <span style={styles.username}>@{username}</span>
          <span style={styles.time}>· {time}</span>
        </div>

        <p style={styles.content}>{content}</p>

        <div style={styles.actions}>
          <span>💬</span>
          <span>🔁</span>

          <span
            onClick={handleLike}
            style={{
              cursor: "pointer",
              color: liked ? "red" : "black"
            }}
          >
            ❤️ {likes}
          </span>

          <span>📤</span>
        </div>
      </div>
    </div>
  );
}

export default function TweetCard() {
  return (
    <div style={{ marginTop: "40px" }}>
      <Tweet
        name="Wynxio Technologies"
        username="wynxio_tech"
        time="2h"
        content="Providing Technology courses step by step 🚀"
        avatar="data:image/png;base64,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"
      />
    </div>
  );
}

const styles = {
  tweet: {
    display: "flex",
    gap: "12px",
    borderBottom: "1px solid #ddd",
    padding: "15px",
    maxWidth: "500px",
    margin: "auto",
    fontFamily: "Arial"
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%"
  },
  body: {
    flex: 1
  },
  header: {
    display: "flex",
    gap: "8px",
    alignItems: "center"
  },
  name: {
    fontWeight: "bold"
  },
  username: {
    color: "gray"
  },
  time: {
    color: "gray"
  },
  content: {
    margin: "8px 0"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "250px",
    marginTop: "10px"
  }
};
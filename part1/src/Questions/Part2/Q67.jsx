
import { useState } from "react";

export default function StarRating() {
  const totalStars = 5;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={index}
            style={{
              fontSize: "35px",
              cursor: "pointer",
              color:
                starValue <= (hover || rating)
                  ? "gold"
                  : "gray"
            }}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        );
      })}

      <p>Rating: {rating}</p>
    </div>
  );
}
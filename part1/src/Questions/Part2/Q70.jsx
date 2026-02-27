import { useEffect, useState } from "react";

const digits = {
  0: [1,1,1,1,1,1,0],
  1: [0,1,1,0,0,0,0],
  2: [1,1,0,1,1,0,1],
  3: [1,1,1,1,0,0,1],
  4: [0,1,1,0,0,1,1],
  5: [1,0,1,1,0,1,1],
  6: [1,0,1,1,1,1,1],
  7: [1,1,1,0,0,0,0],
  8: [1,1,1,1,1,1,1],
  9: [1,1,1,1,0,1,1]
};

function Segment({ active, style }) {
  return (
    <div
      style={{
        ...style,
        backgroundColor: active ? "red" : "#330000"
      }}
    />
  );
}

function Digit({ number }) {
  const seg = digits[number];

  return (
    <div style={styles.digit}>
      <Segment active={seg[0]} style={styles.top} />
      <Segment active={seg[1]} style={styles.topRight} />
      <Segment active={seg[2]} style={styles.bottomRight} />
      <Segment active={seg[3]} style={styles.bottom} />
      <Segment active={seg[4]} style={styles.bottomLeft} />
      <Segment active={seg[5]} style={styles.topLeft} />
      <Segment active={seg[6]} style={styles.middle} />
    </div>
  );
}

export default function SevenSegmentClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time
    .toLocaleTimeString("en-GB")
    .replace(/:/g, "");

  return (
    <div style={styles.clock}>
      {formattedTime.split("").map((num, i) => (
        <Digit key={i} number={Number(num)} />
      ))}
    </div>
  );
}

const styles = {
  clock: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "50px",
    background: "black",
    padding: "20px"
  },
  digit: {
    position: "relative",
    width: "40px",
    height: "80px"
  },
  segment: {
    position: "absolute"
  },
  top: { position:"absolute", top:0, left:8, width:24, height:6 },
  middle:{ position:"absolute", top:36, left:8, width:24, height:6 },
  bottom:{ position:"absolute", bottom:0, left:8, width:24, height:6 },
  topLeft:{ position:"absolute", top:6, left:0, width:6, height:30 },
  bottomLeft:{ position:"absolute", bottom:6, left:0, width:6, height:30 },
  topRight:{ position:"absolute", top:6, right:0, width:6, height:30 },
  bottomRight:{ position:"absolute", bottom:6, right:0, width:6, height:30 }
};
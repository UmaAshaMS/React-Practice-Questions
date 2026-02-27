import { useState } from "react";

export default function DiceRoller() {
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomNumber);
  };

  return (
    <div style={styles.container}>
      <h2>Dice Roller</h2>

      <div style={styles.dice}>
        {diceValue}
      </div>

      <button onClick={rollDice} style={styles.button}>
        Roll Dice
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial"
  },
  dice: {
    width: "100px",
    height: "100px",
    margin: "20px auto",
    border: "3px solid black",
    borderRadius: "10px",
    fontSize: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer"
  }
};
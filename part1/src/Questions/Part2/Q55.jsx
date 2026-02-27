import { useState } from "react";

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = (e) => {
    e.preventDefault();

    const P = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(loanTerm);

    if (!P || !annualRate || !years) {
      setMonthlyPayment(null);
      return;
    }

    const r = annualRate / 100 / 12; // monthly interest rate
    const n = years * 12; // total months

    const M =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    setMonthlyPayment(M.toFixed(2));
  };

  return (
    <div style={styles.container}>
      <h2>Mortgage Calculator</h2>

      <form onSubmit={calculateMortgage} style={styles.form}>
        <input
          type="number"
          placeholder="Loan Amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Loan Term (Years)"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Calculate
        </button>
      </form>

      {monthlyPayment && (
        <div style={styles.result}>
          Monthly Payment: ₹ {monthlyPayment}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    padding: "10px",
    fontSize: "14px"
  },
  button: {
    padding: "10px",
    background: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  result: {
    marginTop: "20px",
    fontWeight: "bold",
    fontSize: "18px"
  }
};
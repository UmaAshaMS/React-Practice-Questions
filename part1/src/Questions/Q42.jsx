// import React, { useState } from "react";

// export default function InputApp() {

//   //Reusable Input Component
//   const Input = ({
//     label,
//     error,
//     type = "text",
//     ...props
//   }) => {
//     const baseStyle = {
//       padding: "8px",
//       borderRadius: "6px",
//       border: error ? "1px solid red" : "1px solid #ccc",
//       outline: "none",
//       width: "100%"
//     };

//     return (
//       <div style={{ marginBottom: "15px", width: "250px" }}>
//         {label && (
//           <label style={{ display: "block", marginBottom: "5px" }}>
//             {label}
//           </label>
//         )}

//         <input
//           type={type}
//           style={baseStyle}
//           {...props}
//         />

//         {error && (
//           <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
//             {error}
//           </p>
//         )}
//       </div>
//     );
//   };

//   //Usage
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     let newErrors = {};
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.password) newErrors.password = "Password is required";

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       console.log("Submitted:", formData);
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Reusable Input Demo</h2>

//       <form onSubmit={handleSubmit}>
//         <Input
//           label="Email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           error={errors.email}
//         />

//         <Input
//           label="Password"
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           error={errors.password}
//         />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }



import React from "react";

export default function InputApp() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = () => {
    if (!email.includes("@")) {
      setError("Invalid email address");
    } else {
      setError("");
      alert("Submitted");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px" }}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        error={error}
      />

      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Submit
      </button>
    </div>
  );
}

//Reusable Input Component
function Input({
  label,
  error,
  style,
  ...props
}) {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px"
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: error ? "1px solid red" : "1px solid #ccc",
    outline: "none"
  };

  const errorStyle = {
    color: "red",
    fontSize: "12px",
    marginTop: "4px"
  };

  return (
    <div style={containerStyle}>
      {label && <label style={{ marginBottom: "6px" }}>{label}</label>}

      <input style={{ ...inputStyle, ...style }} {...props} />

      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}
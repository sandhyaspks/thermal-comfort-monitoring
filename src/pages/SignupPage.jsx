// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import "./SignupPage.css";

// const SignupPage = () => {
//   const { signup } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState(""); // fixed: removed default "test@example.com"
//   const [password, setPassword] = useState(""); // fixed: removed default "password123"
//   const [confirmPassword, setConfirmPassword] = useState(""); // fixed: removed default "password123"
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setError("✅ Signup successful! Redirecting to login...");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         setError("❌ " + data.msg);
//       }
//     } catch (err) {
//       setError("❌ Server error, try again.");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f7f7f7",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "flex-end",
//       }}
//     >
//       <div
//         style={{
//           flex: 1,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//           background: "#f7f7f7",
//         }}
//       >
//         <div style={{ maxWidth: 400, marginRight: 60 }}>
//           <h2
//             style={{
//               fontWeight: 700,
//               fontSize: 32,
//               color: "#222",
//               marginBottom: 18,
//             }}
//           >
//             Join Us!
//           </h2>
//           <p style={{ fontSize: 18, color: "#555" }}>
//             Sign up to start monitoring and improving your classroom's comfort.
//             Enjoy smart controls and real-time insights for a better environment.
//           </p>
//         </div>
//       </div>
//       <div
//         style={{
//           background: "#fff",
//           padding: 40,
//           borderRadius: 14,
//           boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
//           maxWidth: 400,
//           width: "100%",
//           marginRight: 80,
//         }}
//       >
//         <h2
//           style={{
//             textAlign: "center",
//             fontWeight: 700,
//             fontSize: 28,
//             marginBottom: 28,
//             color: "#222",
//           }}
//         >
//           Sign Up
//         </h2>
//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", flexDirection: "column", gap: 20 }}
//         >
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             style={{
//               padding: "12px 16px",
//               borderRadius: 6,
//               border: "1px solid #ddd",
//               fontSize: 16,
//             }}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{
//               padding: "12px 16px",
//               borderRadius: 6,
//               border: "1px solid #ddd",
//               fontSize: 16,
//             }}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{
//               padding: "12px 16px",
//               borderRadius: 6,
//               border: "1px solid #ddd",
//               fontSize: 16,
//             }}
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             style={{
//               padding: "12px 16px",
//               borderRadius: 6,
//               border: "1px solid #ddd",
//               fontSize: 16,
//             }}
//           />
//           {error && (
//             <div style={{ color: "red", fontSize: 15, textAlign: "center" }}>
//               {error}
//             </div>
//           )}
//           <button
//             type="submit"
//             style={{
//               background: "#222",
//               color: "#fff",
//               border: "none",
//               borderRadius: 6,
//               padding: "12px 0",
//               fontSize: 18,
//               fontWeight: 600,
//               cursor: "pointer",
//             }}
//           >
//             Sign Up
//           </button>
//         </form>
//         <p style={{ textAlign: "center", marginTop: 20 }}>
//           Already have an account?{" "}
//           <Link to="/login" style={{ color: "#222", fontWeight: 500 }}>
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;




import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        "https://thermal-comfort-monitoring-backend.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setError("✅ Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError("❌ " + data.msg);
      }
    } catch (err) {
      setError("❌ Server error, try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#f7f7f7",
        }}
      >
        <div style={{ maxWidth: 400, marginRight: 60 }}>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 32,
              color: "#222",
              marginBottom: 18,
            }}
          >
            Join Us!
          </h2>
          <p style={{ fontSize: 18, color: "#555" }}>
            Sign up to start monitoring and improving your classroom's comfort.
            Enjoy smart controls and real-time insights for a better environment.
          </p>
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          padding: 40,
          borderRadius: 14,
          boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
          maxWidth: 400,
          width: "100%",
          marginRight: 80,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: 28,
            marginBottom: 28,
            color: "#222",
          }}
        >
          Sign Up
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "12px 16px",
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px 16px",
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px 16px",
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              padding: "12px 16px",
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          />
          {error && (
            <div style={{ color: "red", fontSize: 15, textAlign: "center" }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "12px 0",
              fontSize: 18,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: 20 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#222", fontWeight: 500 }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import "./LoginPage.css";

// const LoginPage = () => {
//   const { login } = useContext(AuthContext); // get login function from context
//   const navigate = useNavigate();
//   const [email, setEmail] = useState(""); // fixed: removed default "Your email"
//   const [password, setPassword] = useState(""); // fixed: removed default "password123"
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("Loading...");

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("✅ Login successful!");
//         localStorage.setItem("token", data.token);

//         // **Update AuthContext so PrivateRoute allows access**
//         login(data.user);

//         // Navigate to dashboard after successful login
//         navigate("/dashboard");
//       } else {
//         setError("❌ " + data.msg);
//         setMessage("");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("❌ Server error, try again.");
//       setMessage("");
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
//             Welcome Back!
//           </h2>
//           <p style={{ fontSize: 18, color: "#555" }}>
//             Log in to access your classroom comfort dashboard and control your
//             environment for a better learning experience.
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
//           Login
//         </h2>
//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", flexDirection: "column", gap: 20 }}
//         >
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
//           {error && (
//             <div
//               style={{
//                 color: "red",
//                 fontSize: 15,
//                 textAlign: "center",
//                 marginTop: 10,
//               }}
//             >
//               {error}
//             </div>
//           )}
//           {message && (
//             <div
//               style={{
//                 color: message.startsWith("✅")
//                   ? "green"
//                   : message.startsWith("❌")
//                   ? "red"
//                   : "black",
//                 fontSize: 15,
//                 textAlign: "center",
//                 marginTop: 10,
//               }}
//             >
//               {message}
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
//             Login
//           </button>
//         </form>
//         <p style={{ textAlign: "center", marginTop: 20 }}>
//           Don't have an account?{" "}
//           <Link to="/signup" style={{ color: "#222", fontWeight: 500 }}>
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;





import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("Loading...");

    try {
      const res = await fetch(
        "https://thermal-comfort-monitoring-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful!");
        localStorage.setItem("token", data.token);

        // Update AuthContext so PrivateRoute allows access
        login(data.user);

        // Navigate to dashboard after successful login
        navigate("/dashboard");
      } else {
        setError("❌ " + data.msg);
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Server error, try again.");
      setMessage("");
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
            Welcome Back!
          </h2>
          <p style={{ fontSize: 18, color: "#555" }}>
            Log in to access your classroom comfort dashboard and control your
            environment for a better learning experience.
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
          Login
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
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
          {error && (
            <div
              style={{
                color: "red",
                fontSize: 15,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {error}
            </div>
          )}
          {message && (
            <div
              style={{
                color: message.startsWith("✅")
                  ? "green"
                  : message.startsWith("❌")
                  ? "red"
                  : "black",
                fontSize: 15,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {message}
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
            Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: 20 }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#222", fontWeight: 500 }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

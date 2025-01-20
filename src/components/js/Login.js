// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   auth,
//   googleProvider,
//   db,
// } from "./firebaseConfig"; // Ensure correct Firebase configuration
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import "../css/Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   // Function to fetch user role from Firestore
//   const fetchUserRole = async (uid) => {
//     try {
//       const userDoc = doc(db, "users", uid); // Adjust collection name if necessary
//       const userSnapshot = await getDoc(userDoc);
//       if (userSnapshot.exists()) {
//         return userSnapshot.data().role; // Retrieve 'role' field from user data
//       } else {
//         console.error("No such user in database!");
//         return null;
//       }
//     } catch (error) {
//       console.error("Error fetching user role:", error.message);
//       return null;
//     }
//   };

//   // Redirect user based on their role
//   const redirectBasedOnRole = async (uid) => {
//     const role = await fetchUserRole(uid);
//     if (role === "buddy") {
//       navigate("/buddy-dashboard");
//     } else if (role === "organizer") {
//       navigate("/group-dashboard");
//     } else {
//       console.error("Invalid role or role not found");
//     }
//   };

//   // Email and password login handler
//   const handleEmailPasswordLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Log user information and redirect based on their role
//       console.log("Email/Password login successful:", user);
//       await redirectBasedOnRole(user.uid);
//     } catch (error) {
//       console.error("Error with email/password login:", error.message);
//     }
//   };

//   // Google login handler
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       // Log user information and redirect based on their role
//       console.log("Google login successful:", user);
//       await redirectBasedOnRole(user.uid);
//     } catch (error) {
//       console.error("Error with Google login:", error.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>

//       {/* Login with Email and Password */}
//       <form onSubmit={handleEmailPasswordLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <div className="password-container">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <span
//             className="toggle-password"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </span>
//         </div>
//         <button type="submit">Login with Email</button>
//       </form>

//       {/* Login with Google */}
//       <button onClick={handleGoogleLogin}>Login with Google</button>

//       <p>
//         Don’t have an account? <a href="/signup">Sign up here</a>
//       </p>
//     </div>
//   );
// }

// export default Login;














import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider,
  db,
} from "./firebaseConfig"; // Ensure correct Firebase configuration
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Function to fetch user role from Firestore
  const fetchUserRole = async (uid) => {
    try {
      const userDoc = doc(db, "users", uid); // Adjust collection name if necessary
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        return userSnapshot.data().role; // Retrieve 'role' field from user data
      } else {
        console.error("No such user in database!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user role:", error.message);
      return null;
    }
  };

  // Redirect user based on their role
  const redirectBasedOnRole = async (uid) => {
    const role = await fetchUserRole(uid);
    if (role === "buddy") {
      navigate("/buddy-dashboard");
    } else if (role === "organizer") {
      navigate("/group-dashboard");
    } else {
      console.error("Invalid role or role not found");
    }
  };

  // Email and password login handler
  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Log user information and redirect based on their role
      console.log("Email/Password login successful:", user);
      await redirectBasedOnRole(user.uid);
    } catch (error) {
      console.error("Error with email/password login:", error.message);
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Log user information and redirect based on their role
      console.log("Google login successful:", user);
      await redirectBasedOnRole(user.uid);
    } catch (error) {
      console.error("Error with Google login:", error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      {/* Login with Email and Password */}
      <form onSubmit={handleEmailPasswordLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Login with Google */}
      <button onClick={handleGoogleLogin}>Login with Google</button>

      <p>
        Don’t have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
}

export default Login;

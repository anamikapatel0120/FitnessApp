// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   auth,
//   googleProvider,
// } from "./firebaseConfig"; // Ensure Firebase configuration
// import {
//   createUserWithEmailAndPassword,
//   signInWithPhoneNumber,
//   signInWithPopup,
//   RecaptchaVerifier,
//   updateProfile,
// } from "firebase/auth";
// import "../css/Signup.css";

// function Signup() {
//   const [signUpMethod, setSignUpMethod] = useState("email"); // email or phone
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);

//   const [role, setRole] = useState("buddy"); // Default role: Workout Buddy
//   const [fitnessGoals, setFitnessGoals] = useState("");
//   const [workoutPreferences, setWorkoutPreferences] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [activityType, setActivityType] = useState("");
//   const [location, setLocation] = useState("");
//   const [schedule, setSchedule] = useState("");

//   const [profilePic, setProfilePic] = useState(null);
//   const [useDefaultPic, setUseDefaultPic] = useState(true);

//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         { size: "invisible" },
//         auth
//       );
//     }
//   };

//   const handleSendOtp = async () => {
//     if (!phoneNumber) {
//       alert("Please enter a valid phone number.");
//       return;
//     }

//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//       setOtpSent(true);
//       console.log("OTP sent successfully");
//     } catch (error) {
//       console.error("Error sending OTP:", error.message);
//       alert("Failed to send OTP. Please try again.");
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (isLoading) return; // Prevent multiple submissions
//     setIsLoading(true);

//     if (signUpMethod === "email") {
//       if (password !== confirmPassword) {
//         alert("Passwords do not match!");
//         setIsLoading(false);
//         return;
//       }
//       try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         await updateProfile(user, {
//           displayName: role,
//           photoURL: useDefaultPic
//             ? "default-profile-pic-url"
//             : URL.createObjectURL(profilePic),
//         });

//         console.log("User registered successfully.");
//         navigate(role === "buddy" ? "/buddy-dashboard" : "/group-dashboard");
//       } catch (error) {
//         console.error("Error during signup:", error.message);
//         alert("Signup failed. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       if (!otp) {
//         alert("Please enter the OTP sent to your phone.");
//         setIsLoading(false);
//         return;
//       }
//       // Logic to verify OTP with Firebase can be added here
//       console.log("Phone number registration successful");
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignup = async () => {
//     if (isLoading) return; // Prevent multiple submissions
//     setIsLoading(true);

//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       console.log("User signed up with Google:", user);

//       navigate(role === "buddy" ? "/buddy-dashboard" : "/group-dashboard");
//     } catch (error) {
//       console.error("Error with Google Signup:", error.message);
//       alert("Google Signup failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h1>Sign Up</h1>
//       <div className="signup-methods">
//         <button
//           className={signUpMethod === "email" ? "active" : ""}
//           onClick={() => setSignUpMethod("email")}
//         >
//           Sign Up Using Email
//         </button>
//         <button
//           className={signUpMethod === "phone" ? "active" : ""}
//           onClick={() => setSignUpMethod("phone")}
//         >
//           Sign Up Using Phone
//         </button>
//       </div>

//       <form onSubmit={handleSignup}>
//         {signUpMethod === "email" && (
//           <>
//             <input
//               type="email"
//               placeholder="Email"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <div className="password-container">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <span
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </span>
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </>
//         )}

//         {signUpMethod === "phone" && (
//           <>
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               required
//             />
//             <button type="button" onClick={handleSendOtp} disabled={otpSent}>
//               {otpSent ? "Resend OTP" : "Send OTP"}
//             </button>
//             {otpSent && (
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//             )}
//           </>
//         )}

//         <h3>Upload Profile Picture or Use Default Profile Picture</h3>
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               checked={useDefaultPic}
//               onChange={() => setUseDefaultPic(!useDefaultPic)}
//             />
//             Use default profile picture
//           </label>
//           {!useDefaultPic && (
//             <input
//               type="file"
//               onChange={(e) => setProfilePic(e.target.files[0])}
//               accept="image/*"
//             />
//           )}
//         </div>

//         <h3>Preferences</h3>
//         <div className="role-selection">
//           <label>
//             <input
//               type="radio"
//               name="role"
//               value="buddy"
//               checked={role === "buddy"}
//               onChange={() => setRole("buddy")}
//             />
//             Workout Buddy
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="role"
//               value="organizer"
//               checked={role === "organizer"}
//               onChange={() => setRole("organizer")}
//             />
//             Fitness Group Organizer
//           </label>
//         </div>

//         {role === "buddy" && (
//           <div className="role-specific-container active">
//             <textarea
//               placeholder="Fitness Goals"
//               onChange={(e) => setFitnessGoals(e.target.value)}
//               required
//             />
//             <textarea
//               placeholder="Workout Preferences (e.g., gym, yoga, running)"
//               onChange={(e) => setWorkoutPreferences(e.target.value)}
//               required
//             />
//             <textarea
//               placeholder="Availability (e.g., mornings, evenings)"
//               onChange={(e) => setAvailability(e.target.value)}
//               required
//             />
//           </div>
//         )}

//         {role === "organizer" && (
//           <div className="role-specific-container active">
//             <textarea
//               placeholder="Activity Type"
//               onChange={(e) => setActivityType(e.target.value)}
//               required
//             />
//             <textarea
//               placeholder="Location"
//               onChange={(e) => setLocation(e.target.value)}
//               required
//             />
//             <textarea
//               placeholder="Schedule"
//               onChange={(e) => setSchedule(e.target.value)}
//               required
//             />
//           </div>
//         )}

//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Signing Up..." : "Sign Up"}
//         </button>
//       </form>
//       <button onClick={handleGoogleSignup} disabled={isLoading}>
//         {isLoading ? "Processing..." : "Sign Up with Google"}
//       </button>
//       <p>
//         Already have an account? <a href="/login">Login here</a>
//       </p>
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// }

// export default Signup;









import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider,
} from "./firebaseConfig"; // Ensure Firebase configuration
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import "../css/Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState("buddy"); // Default role: Workout Buddy
  const [fitnessGoals, setFitnessGoals] = useState("");
  const [workoutPreferences, setWorkoutPreferences] = useState("");
  const [availability, setAvailability] = useState("");
  const [activityType, setActivityType] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");

  const [profilePic, setProfilePic] = useState(null);
  const [useDefaultPic, setUseDefaultPic] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: role,
        photoURL: useDefaultPic
          ? "default-profile-pic-url"
          : URL.createObjectURL(profilePic),
      });

      console.log("User registered successfully.");
      navigate(role === "buddy" ? "/buddy-dashboard" : "/group-dashboard");
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed up with Google:", user);

      navigate(role === "buddy" ? "/buddy-dashboard" : "/group-dashboard");
    } catch (error) {
      console.error("Error with Google Signup:", error.message);
      alert("Google Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
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
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <h3>Upload Profile Picture or Use Default Profile Picture</h3>
        <div>
          <label>
            <input
              type="checkbox"
              checked={useDefaultPic}
              onChange={() => setUseDefaultPic(!useDefaultPic)}
            />
            Use default profile picture
          </label>
          {!useDefaultPic && (
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              accept="image/*"
            />
          )}
        </div>

        <h3>Preferences</h3>
        <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="buddy"
              checked={role === "buddy"}
              onChange={() => setRole("buddy")}
            />
            Workout Buddy
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="organizer"
              checked={role === "organizer"}
              onChange={() => setRole("organizer")}
            />
            Fitness Group Organizer
          </label>
        </div>

        {role === "buddy" && (
          <div className="role-specific-container active">
            <textarea
              placeholder="Fitness Goals"
              onChange={(e) => setFitnessGoals(e.target.value)}
              required
            />
            <textarea
              placeholder="Workout Preferences (e.g., gym, yoga, running)"
              onChange={(e) => setWorkoutPreferences(e.target.value)}
              required
            />
            <textarea
              placeholder="Availability (e.g., mornings, evenings)"
              onChange={(e) => setAvailability(e.target.value)}
              required
            />
          </div>
        )}

        {role === "organizer" && (
          <div className="role-specific-container active">
            <textarea
              placeholder="Activity Type"
              onChange={(e) => setActivityType(e.target.value)}
              required
            />
            <textarea
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <textarea
              placeholder="Schedule"
              onChange={(e) => setSchedule(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <button onClick={handleGoogleSignup} disabled={isLoading}>
        {isLoading ? "Processing..." : "Sign Up with Google"}
      </button>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}

export default Signup;

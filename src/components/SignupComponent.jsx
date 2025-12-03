import React, { useState } from "react";
// Import the necessary hook for navigation
import { useNavigate } from "react-router-dom";
import styles from "./SignupComponent.module.css"; // Use your CSS module here

const SignupComponentWithRouter = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the navigate function from React Router
  const navigate = useNavigate();

  // Access the environment variable
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  // const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'; // Use fallback for safety

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful sign-up
        setMessage("Sign-up successful! Redirecting to login page...");

        // Use navigate to send the user to the login page after a short delay
        setTimeout(() => {
          navigate("/login"); // Redirect the user to the /login route
        }, 2000); // Redirect after 2 seconds
      } else {
        // Handle backend errors
        setMessage(`Sign up failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Network error during sign up:", error);
      setMessage(
        "A network error occurred. Check your connection or server status."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <h2>Sign Up</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? "Signing Up..." : "Create Account"}
        </button>

        {message && (
          <p /* className={message.includes('failed') || message.includes('error') ? styles.errorMessage : styles.successMessage} */
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignupComponentWithRouter;

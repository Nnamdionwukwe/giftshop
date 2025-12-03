import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Using the same styles for login might be okay, but ideally use Login.module.css
// For this example, let's assume we have Login.module.css with the previous styles applied.
import styles from "./LoginPage.module.css";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    setMessage("");

    try {
      // Send POST request to the backend login API
      const response = await fetch(
        "https://myserver-five-nu.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Success: Store the token and user data
        localStorage.setItem("userToken", data.accessToken);

        setMessage(data.message || "Login successful!");

        // If a callback was passed (e.g., from App.jsx), use it
        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }

        // Redirect user to the home page or a dashboard page
        navigate("/products");
      } else {
        // Handle specific backend error messages (e.g., "Invalid credentials")
        setMessage(
          `Login failed: ${data.message || "Check your credentials."}`
        );
      }
    } catch (err) {
      // Handle network errors or total server failure
      console.error("Network error during login:", err);
      setMessage("A network error occurred. Is the server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
        <h2>Log In</h2>

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
          {isLoading ? "Logging In..." : "Login"}
        </button>

        {message && (
          <p
            className={
              message.includes("failed") || message.includes("error")
                ? styles.errorMessage
                : styles.successMessage
            }
          >
            {message}
          </p>
        )}

        <p className={styles.signupPrompt}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

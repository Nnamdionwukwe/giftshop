import React from "react";
// Import Link component for navigation without full page reloads
import { Link } from "react-router-dom";
// Import the specific CSS module file
import styles from "./HomePage.module.css";

const HomePage = ({ user, handleLogout }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to My App</h1>
        <nav className={styles.nav}>
          {user ? (
            // Links shown when the user IS logged in
            <>
              <span className={styles.welcomeMessage}>
                Hello, {user.email}!
              </span>
              <Link to="/profile" className={styles.navLink}>
                Profile
              </Link>
              <Link to="/api/products" className={styles.navLink}>
                Products
              </Link>
              {/* Call the logout handler function when clicked */}
              <button onClick={handleLogout} className={styles.logoutButton}>
                Log Out
              </button>
            </>
          ) : (
            // Links shown when the user is NOT logged in
            <>
              <Link to="/login" className={styles.navLink}>
                Log In
              </Link>
              <Link to="/signup" className={styles.navLink}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className={styles.mainContent}>
        {user ? (
          <div>
            <h2>You are logged in.</h2>
            <p>You can now access protected content and routes.</p>
          </div>
        ) : (
          <div>
            <h2>Please log in or sign up to continue.</h2>
            <p>This application demonstrates secure authentication flows.</p>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 My App</p>
      </footer>
    </div>
  );
};

export default HomePage;

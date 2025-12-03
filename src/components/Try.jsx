import React, { useState } from "react";

function Try() {
  const [name, setName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default browser page reload

    // The endpoint matches the backend route structure: /api/data
    // ❗️ IMPORTANT: Replace with your actual deployed backend base URL
    const backendUrl = "https://myserver-five-nu.vercel.app";

    setIsLoading(true);
    setError("");
    setResponseMessage("");

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate that the body is JSON
        },
        // Send the data exactly as the backend expects: { name: "value" }
        body: JSON.stringify({ name: name }),
      });

      // Check for a successful response status
      if (response.ok) {
        const data = await response.json();
        // The backend responds with: { message: `Received data for: ${name}` }
        setResponseMessage(data.message);
        setName(""); // Clear the input field
      } else {
        // Handle errors returned by the backend (like the 400 'Name is required' error)
        const errorData = await response.json();
        setError(errorData.error || "An unexpected error occurred.");
      }
    } catch (networkError) {
      // Handle network issues (e.g., server offline, CORS issue)
      setError("Network error: Could not connect to the backend API.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Submit Name to Backend API</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name here"
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Data"}
        </button>
      </form>

      {responseMessage && (
        <p style={{ color: "green", marginTop: "10px" }}>
          ✅ Success: {responseMessage}
        </p>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>❌ Error: {error}</p>
      )}
    </div>
  );
}

export default Try;

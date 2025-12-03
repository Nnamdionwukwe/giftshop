// App.jsx (Main application file)
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginComponent from "./LoginComponent"; // Assuming you have a login component
import HomePage from "./components//HomePage"; // A placeholder home page
import SignupComponent from "./components/SignupComponent";
import LoginPage from "./components/LoginPage";
import ProductListWithoutVercel from "./components/ProductListWithoutVercel";
import Try from "./components/try";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Try />} />
        <Route path="/products" element={<ProductListWithoutVercel />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add protected routes here */}
      </Routes>
    </Router>
  );
}

export default App;

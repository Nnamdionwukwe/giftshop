import React, { useState, useEffect } from "react";
// Assuming you have a Spinner component/CSS from the previous example
import Spinner from "./Spinner";

function ProductListWithoutVercel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // The URL MUST match where your backend is running
  const API_URL = "/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Use the full absolute URL because it's a different origin/port
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Conditional Rendering using the spinner
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Product Catalog</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductListWithoutVercel;

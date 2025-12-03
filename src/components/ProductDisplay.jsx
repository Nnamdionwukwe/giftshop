import React, { useState, useEffect } from "react";
// Assuming you have a Spinner component
// import Spinner from './Spinner';

function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        // Fetch using a relative path. This points to http://localhost:3000/api/products
        // when running locally with `vercel dev`.
        const response = await fetch(" http://localhost:3000/api/products");

        if (!response.ok) {
          // A 404 Not Found error would land here
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading products...</div>; // Use your Spinner component here
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductDisplay;

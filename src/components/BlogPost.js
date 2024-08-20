import React, { useState, useEffect } from "react";

function BlogPost() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/1");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {product ? (
        <div>
          <h1>{product.title}</h1>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: "100%", height: "auto", borderRadius: "10px" }}
          />
          <h3 style={{ color: "#888", marginTop: "10px" }}>{product.brand}</h3>
          <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
            {product.description}
          </p>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Price: ${product.price}
          </p>
          <p style={{ color: "#555" }}>Rating: {product.rating} / 5</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogPost;

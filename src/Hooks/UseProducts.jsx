import { useState, useEffect } from "react";

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://strapi-store-server.onrender.com/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToBag = () => {
    if (product) {
      const bagItems = JSON.parse(localStorage.getItem("bag")) || [];
      const existingItemIndex = bagItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        bagItems[existingItemIndex].quantity += 1;
      } else {
        bagItems.push({
          id: product.id,
          title: product.attributes.title,
          price: product.attributes.price,
          image: product.attributes.image,
          quantity: 1,
        });
      }

      localStorage.setItem("bag", JSON.stringify(bagItems));
      alert("Savatga qo'shildi!");
    }
  };

  return { product, addToBag, loading, error };
}

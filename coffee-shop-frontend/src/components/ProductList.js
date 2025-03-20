import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService'; // Fetch products from backend
import { useCart } from '../context/CartContext'; // Access CartContext

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Get addToCart function from CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button 
            onClick={() => handleAddToCart(product)} 
            className="bg-blue-500 text-white p-2">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

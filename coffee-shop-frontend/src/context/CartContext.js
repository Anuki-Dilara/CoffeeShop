import React, { createContext, useState, useContext } from 'react';

// Create a Context for the Cart
const CartContext = createContext();

// CartProvider Component to wrap your app and manage cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingProductIndex = updatedCart.findIndex(item => item._id === product._id);

      if (existingProductIndex >= 0) {
        // If product already exists in cart, increase quantity
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        // If product doesn't exist, add it to the cart with quantity 1
        updatedCart.push({ ...product, quantity: 1 });
      }

      return updatedCart;
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex(item => item._id === productId);

      if (productIndex >= 0) {
        updatedCart[productIndex].quantity = quantity;
      }

      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => useContext(CartContext);

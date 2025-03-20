import React from 'react';
import { useCart } from '../context/CartContext'; // Access CartContext

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // Get cart data and functions

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };

  return (
    <div className="p-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item._id} className="flex justify-between items-center border-b py-2">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                <span className="ml-4">{item.name}</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 p-2"
                >
                  Remove
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                  className="ml-2 p-2 w-16"
                  min="1"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

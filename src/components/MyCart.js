import React from "react";

const MyCart = ({ cartItems, removeFromCart }) => {
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl z-50 border border-gray-300">
      <h3 className="text-lg font-bold mb-4">Your Cart</h3>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 italic">Your cart is empty.</p>
      ) : (
        <ul className="p-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between p-2">
              <div className="flex items-center mr-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain mr-2"
                />
                <div>
                  <p className="text-gray-800 font-semibold">{item.title}</p>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  {item.quantity > 1 && (
                    <p className="text-red-500">Quantity: {item.quantity}</p>
                  )}
                </div>
              </div>
              <button
                className="text-white text-md bg-red-500 px-3 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300 border-none focus:outline-none focus:ring-2 focus:ring-red"
                onClick={() => removeFromCart(item)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="mt-4 text-right">
          <p className="text-gray-600">
            Total Price: ${calculateTotalPrice().toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyCart;

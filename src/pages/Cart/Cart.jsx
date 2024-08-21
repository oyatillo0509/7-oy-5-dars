import React, { useState, useEffect } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("bag")) || [];
    setCartItems(storedItems);
  }, []);

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("bag", JSON.stringify(updatedItems));
  };

  const updateQuantity = (id, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("bag", JSON.stringify(updatedItems));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shipping = 500; 
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
    };
  };

  const totals = calculateTotal();

  if (cartItems.length === 0)
    return <div className="text-center py-20 text-2xl">Your cart is empty</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-5xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-12">
          Shopping Cart
        </h1>
        <div className="space-y-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover border"
                />
                <div className="ml-6">
                  <h2 className="text-xl font-semibold text-gray-700">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{item.modifier}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Color:{" "}
                    <span
                      className="inline-block w-4 h-4 rounded-full border"
                      style={{ backgroundColor: item.color }}
                    ></span>
                  </p>
                  <div className="mt-4">
                    <label className="text-gray-700 text-sm mr-2">
                      Quantity:
                    </label>
                    <select
                      className="border rounded-md text-sm px-2 py-1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">
                  ${(item.price / 100).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-800 transition-colors mt-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gray-100 p-6 rounded-lg">
          <div className="flex justify-between text-lg font-medium text-gray-700">
            <p>Subtotal:</p>
            <p>${(totals.subtotal / 100).toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg font-medium text-gray-700 mt-2">
            <p>Shipping:</p>
            <p>${(totals.shipping / 100).toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg font-medium text-gray-700 mt-2">
            <p>Tax:</p>
            <p>${(totals.tax / 100).toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 mt-6">
            <p>Total:</p>
            <p>${(totals.total / 100).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

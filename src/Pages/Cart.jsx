import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import ProductCard from "../Fragments/ProductCard";
import images from "../Constants/Images";

export default function Cart() {
  const { cart } = useContext(CartContext);

  // Calculate total items and total price
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Fake checkout function
  const handleCheckout = () => {
    alert("Hold on for more updates");
  };

  return (
    <div className="relative overflow-hidden py-10 bg-white/50 dark:bg-gray-900/80 dark:text-[#F9F9F7] text-black">
      
      {/* Background Overlay for Better Contrast */}
      <div className="absolute inset-0 -z-10 bg-black/10 dark:bg-black/40"></div>

      {/* Decorative Background Image */}
      <img
        src={images.sidesEmptyLs}
        alt="Love Healthy Food"
        className="absolute -z-10 w-full opacity-40 dark:opacity-80 left-1/2 -translate-x-1/2 translate-y-8"
      />

      {/* Floating Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed top-20 right-6 bg-gray-200/70 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-lg shadow-xl text-center w-72 z-50">
          <h3 className="text-xl font-semibold mb-2">Cart Summary</h3>
          <p className="text-lg">
            <span className="font-bold">Total Items:</span> {totalItems}
          </p>
          <p className="text-lg text-green-700 dark:text-green-400 font-bold">
            Total Price: ${totalPrice}
          </p>

          {/* Fake Checkout Button */}
          <button
            onClick={handleCheckout}
            className="mt-4 px-6 py-3 text-lg font-semibold rounded-lg bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white shadow-md transition-all"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      {/* Page Title */}
      <h2 className="text-3xl font-bold text-center mb-6 sm:mb-8">
        My Shopping Cart
      </h2>

      {/* Cart Section */}
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 p-6 md:p-10 max-w-[95%] mx-auto">
          {cart.map((product) => (
            <ProductCard key={product.id} item={product} showQuantityControls={true} />
          ))}
        </div>
      ) : (
        // No Items Found Message
        <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
          <img 
            src={images.emptyCart}  // Ensure this exists in `images.js`
            alt="Cart is Empty" 
            className="w-40 h-40 opacity-60 mb-4"
          />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Your cart is empty. Start shopping now! 🛒
          </p>
        </div>
      )}

    </div>
  );
}

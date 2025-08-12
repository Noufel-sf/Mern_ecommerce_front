import React, { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import Cartitem from "./Cartitem";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, deleteCartItem, updateCart } = useCart();
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    setLocalCart([...cart]);
  }, [cart]);

  // Function to handle quantity increase
  const handleQuantity = (index) => {
    setLocalCart((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        cart_qty: updated[index].cart_qty + 1,
      };
      return updated;
    });

    
    const updatedCart = [...localCart];
    updatedCart[index] = {
      ...updatedCart[index],
      cart_qty: updatedCart[index].cart_qty + 1,
    };
    updateCart(updatedCart);
  };
  // Function to decrease quantity
  const Decrease_Qty = (index) => {
    const localCart = [...cart];
    if (localCart[index].cart_qty > 1) {
      const updatedCart = [...localCart];
      updatedCart[index] = {
        ...updatedCart[index],
        cart_qty: updatedCart[index].cart_qty - 1,
      };
      updateCart(updatedCart);
    } else {
      deleteCartItem(index);
  }
}
  console.log("Local Cart:", localCart);

  return (
    <div className="max-w-5xl mx-auto p-8 title">
      <h1 className="text-4xl font-bold mb-6 text-[var(--secondary-color)]">
        Your Cart
      </h1>
      <div className="bg-white rounded-lg p-6">
        {localCart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          localCart.map((item, index) => (
            <div key={index} className="mb-4">
              <Cartitem
                name={item.name}
                price={item.offer_price}
                img={item.selectedImage || ""}
                category={item.category}
                Qty={item.cart_qty}
                Delete_cartItem={() => deleteCartItem(index)}
                Handle_Qty={() => handleQuantity(index)}
                Decrease_Qty={() => Decrease_Qty(index)}
                loading="lazy"
              />
            </div>
          ))
        )}

        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-xl font-bold text-[var(--primary-color)]">
            {localCart.reduce(
              (total, item) => total + item.offer_price * item.cart_qty,
              0
            )}
            $
          </span>
        </div>

        <div className="mt-6 text-right">
          <Link to="/orderInfo">
            <button className="bg-black font-bold hover:bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-300">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;

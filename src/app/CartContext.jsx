import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {


  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  // const [user, setUser] = useState({});


    useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate the count of unique items in the cart
  const cartItemCount = cart.length;



const addToCart = (item, selectedImage) => {
  console.log("Adding to cart:", item, selectedImage);

  // Check if item with same _id and selected image already exists
  const existingItemIndex = cart.findIndex(
    (cartItem) =>
      cartItem._id === item._id &&
      cartItem.selectedImage === selectedImage
  );

  if (existingItemIndex !== -1) {
    // If exists, increment quantity
    const updatedCart = [...cart];
    updatedCart[existingItemIndex].cart_qty =
      (updatedCart[existingItemIndex].cart_qty || 0) + 1;
    setCart(updatedCart);
  } else {
    // New color/image variant → add as separate product in cart
    const newItem = {
      ...item,
      selectedImage, // Track selected image separately
      cart_qty: 1,
      isAdded: true,
    };
    setCart((prev) => [...prev, newItem]);
  }
};


  const deleteCartItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // Clear cart from local storage
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteCartItem,
        clearCart,
        updateCart,
        cartItemCount, // Add this to the context value
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

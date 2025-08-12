import React, { useState } from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { Link } from "react-router-dom";
import process from "process";

export default function OrderInfo() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    wilaya: "",
    baladiya: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { cart ,clearCart} = useCart(); // from CartContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((total, item) => total + item.offer_price * item.cart_qty, 0);

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const saveOrderToLocalStorage = () => {
    localStorage.setItem("Order", JSON.stringify(formData));
  };
 
  const saveOrderToDB = async () => {

    const orderData = {
      username: formData.name,
      surname: formData.surname,
      phoneNumber: formData.phone,
      baladiya: formData.baladiya,
      wilaya: formData.wilaya,
      totalAmount: total,
      Order_products: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.cart_qty,
        price: item.price,
        coverimg: item.selectedImage,
      })),
    };

    try {
      const res = await axios.post(
        `${apiUrl}/api/order/submitorder`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        alert("✅ Your order has been submitted successfully!");
        clearCart(); // Clear the cart from context
        localStorage.removeItem("cart");
      }
    } catch (err) {
      console.error("❌ Failed to submit the user order", err);
      alert("❌ Failed to submit your order.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, surname, phone, baladiya, wilaya } = formData;

    if (!name || !surname || !phone || !baladiya || !wilaya) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validatePhone(phone)) {
      alert("Please enter a valid Algerian phone number.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setSubmitted(true);
    setShowDialog(true);
    saveOrderToLocalStorage();
    saveOrderToDB();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
      {/* Order Form */}
      <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Your Order
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "surname", "phone", "baladiya", "wilaya"].map((field) => (
              <div key={field}>
                <label className="block font-medium text-sm capitalize">
                  {field}
                </label>
                <input
                  type={field === "phone" ? "tel" : "text"}
                  name={field}
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[var(--primary-color)] cursor-pointer text-white py-2 rounded-md hover:bg-[var(--secondary-color)] transition"
            >
              Confirm Order
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-green-600">
              Order Confirmed!
            </h3>
            <p className="text-gray-700">
              Thank you for your order, {formData.name} {formData.surname}!
            </p>
            <div className="text-left bg-gray-100 p-4 rounded-md">
              <p><strong>Name:</strong> {formData.name} {formData.surname}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>City:</strong> {formData.baladiya}</p>
              <p><strong>Wilaya:</strong> {formData.wilaya}</p>
            </div>
            <Link to="/">
            <button className="mt-4 bg-[var(--primary-color)] cursor-pointer text-white px-4 py-2 rounded hover:bg-[var(--secondary-color)]">
              back to shopping
            </button>
            </Link>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-md text-center">
              <h4 className="text-lg font-semibold mb-2">
                Thank you for your order 🎉
              </h4>
              <p className="text-sm text-gray-600">
                Your order has been received. We’ll contact you shortly.
              </p>
              <button
                onClick={() => setShowDialog(false)}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cart Summary */}
      <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-4">
                <img
                  src={item.selectedImage || item.images?.img1}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">Qty: {item.cart_qty}</p>
                </div>
                <div className="text-right font-medium">
                  ${item.offer_price * item.cart_qty}
                </div>
              </div>
            ))}
            <div className="text-right font-bold text-lg pt-4 border-t">
              Total: <span className="text-[var(--primary-color)]">${total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

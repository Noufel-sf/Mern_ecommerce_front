import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import { useCart } from "../CartContext";

function Navbarr() {
  const [open, setOpen] = useState(false);
  const { cartItemCount } = useCart();



  return (
    <nav className="w-full py-10">
      <div className="flex items-center justify-between px-6 py-4 lg:max-w-[80%] mx-auto">
        {/* Logo */}
        <Link to="/" className="text-3xl lg:text-5xl  text-[var(--secondary-color)]">
          <span className="text-[var(--primary-color)] capitalize">shoppy</span>store
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-3xl text-[var(--primary-color)]">
            {open ? "✖" : "☰"}
          </button>
        </div>

        {/* Menu */}
        <div
          className={`${
            open ? "block top-30 z-40 " : "hidden"
          } md:flex absolute md:relative  left-0 w-full md:w-auto bg-white md:bg-transparent p-5 md:p-0 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className="capitalize text-xl font-semibold text-[var(--secondary-color)] hover:text-[var(--primary-color)]"
              >
                {link.name}
              </Link>
            ))}

        
            {/* Cart icon */}
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="text-[var(--secondary-color)] hover:text-[var(--primary-color)] text-2xl"
            >
              <FaBagShopping className="relative" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--primary-color)] text-white rounded-full px-2 text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

    
    </nav>
  );
}

export default Navbarr;

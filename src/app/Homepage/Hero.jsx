import React, { useEffect, useState } from "react";
import Headerimg from "/hero.jpg";
import Product from "../Productspage/Product";
import Services from "./Services";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import axios from "axios";

function Hero() {
  const { addToCart } = useCart();
  const [Productlist, setProductlist] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/heroproducts"
      );
      console.log("the 4 products ", response.data);
      setProductlist(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5  md:max-w-[80%] mx-auto">
      <div className="lg:h-[70vh] h-[70vh] border rounded-[42px] bg-[var(--background-color)] text-white flex items-center justify-center relative overflow-hidden">
        <div className="flex flex-col lg:flex-row-reverse py-12 gap-12 px-6  lg:px-20 w-full h-full">
          {/* Left Image Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <img
              src="/hero2.png"
              alt="hero img"
              className="h-[220px] lg:h-[400px] max-w-md lg:max-w-lg"
            />
          </div>

          {/* Right Text Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-2xl text-black lg:text-7xl font-extrabold leading-tight title">
              Discover Amazing
              <span className="text-[var(--primary-color)]"> Products</span>
            </h1>
            <p className="text-lg lg:text-xl mt-4 text-gray-600">
              Explore our wide range of high-quality products designed to
              enhance your lifestyle.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] cursor-pointer text-white py-3 px-8 rounded-full font-semibold transition duration-300 text-[12px] md:text-xl">
                Shop Now
              </button>
              <button className="border border-white cursor-pointer text-black bg-white hover:text-[var(--background-color)] py-3 px-8 rounded-full font-semibold transition duration-300 text-[12px] md:text-xl">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <Services />
      <section className="flex flex-col mt-40  mx-auto gap-12 lg:gap-25 ">
        <h1 className="capitalize text-2xl lg:text-4xl relative text-left font-bold text-[var(--secondary-color)]">
          Explore our products
          <span className="absolute left-22 -bottom-1 w-[180px] h-0.5 bg-orange-500"></span>
        </h1>
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3  place-items-center lg:grid-cols-4 gap-3 lg:gap-20  px-4">
            {Productlist.map((product, index) => (
              <Product
                key={index}
                coverUrl={product.images?.coverimg.url || ""}
                name={product.name}
                brand={product.brand}
                price={product.price}
                Qty={product.stock_quantity}
                AddTocart={() => addToCart(product)}
                category={product.category}
                _id={product._id}
                loading="lazy"
              />
            ))}
          </div>
          <Link to="/products">
            <button className="bg-[var(--secondary-color)]  hover:bg-[var(--primary-color)] transition duration-300  capitalize text-white py-4 px-12 font-bold cursor-pointer rounded-full text-2xl mt-12 title">
              Explore all products
            </button>{" "}
          </Link>
        </div>
      </section>

      {/* Banner section */}
      <Banner />
    </div>
  );
}

export default Hero;

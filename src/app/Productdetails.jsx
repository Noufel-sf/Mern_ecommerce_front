import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from 'react-icons/fa';
import { useCart } from './CartContext';

function Productdetails() {
  const apiUrl = import.meta.env.VITE_API_URL; // Use the environment variable for API URL
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart } = useCart();
  const { id } = useParams();
  const [stockQuantity, setStockQuantity] = useState(0);


  // getting the products with their id from the db

  useEffect(() => {
    axios.get(`${apiUrl}/api/products/${id}`)
    .then((res) => {
      setProduct(res.data);
      setSelectedImage(res.data.images?.coverimg.url); // default image
    })
    .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  //product images
  const imageList = [product.images?.coverimg.url, product.images?.img2.url, product.images?.img3.url, product.images?.img4.url].filter(Boolean);
  
  const changeStockQuantitywithselectedImage = () => {
          if(selectedImage){
            console.log("selectedimg  ", selectedImage);
            imageList.forEach((img) => {
              if (img === selectedImage) {
                const imageKey = Object.keys(product.images).find(key => product.images[key].url === img);
                if (imageKey) {
                  setStockQuantity(product.images[imageKey].quantity);
                }
              }
            });
          }
  }

  useEffect(() => {
    changeStockQuantitywithselectedImage()
  }, [selectedImage]);



  if (!product.name) return <div className="text-center mt-10">Loading product details...</div>;


  return (
    <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-start md:items-center lg:flex-row gap-12">
      {/* Left Section - Images */}
      <div className="flex flex-col items-start">
        <div className="w-full h-300px lg:w-[500px] lg:h-[400px] bg-[var(--background-color)] rounded-lg overflow-hidden mb-4">
          <img
            src={selectedImage || ""}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {imageList.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`product-thumbnail-${idx}`}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 rounded-md object-cover border cursor-pointer transition ${
                selectedImage === img ? "border-orange-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Section - Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-6xl font-semibold mb-2 capitalize">{product.name}</h1>

          <div className="flex items-center gap-2 mb-2">
            <FaStar className="text-orange-400" />
            <span className="text-gray-600">(4.5)</span>
          </div>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="text-3xl font-bold text-gray-900 mb-2">
            ${product.offer_price?.toFixed(2)}{' '}
            <span className="text-gray-400 text-xl line-through ml-2">
              ${product.price?.toFixed(2)}
            </span>
          </div>

          <div className="border-t pt-4 mt-4 text-sm text-gray-700 space-y-1">
            <p><span className="font-semibold">Brand:</span> {product.brand || "Generic"}</p>
            <p><span className="font-semibold">Color:</span> {product.colors || "Multi"}</p>
            <p><span className="font-semibold">Category:</span> {product.category || "Electronics"}</p>
            <p><span className="font-bold text-[var(--primary-color)]">Stock Quantity:</span> {stockQuantity || 0}</p>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            className="bg-black cursor-pointer text-white px-6 py-3 rounded-md hover:bg-gray-800"
            onClick={() => addToCart(product,selectedImage)}
          >
            Add to Cart
          </button>
          <Link to={`/orderInfo`}>
            <button
              className="bg-[var(--primary-color)] cursor-pointer text-white px-6 py-3 rounded-md hover:bg-orange-600"
            >
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Productdetails;

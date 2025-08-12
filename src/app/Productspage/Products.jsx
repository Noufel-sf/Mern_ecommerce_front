import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';
import Services from '../Homepage/Services';
import process from 'process';

const categories = ['all', 'Phone', 'Earphone', 'Charger'];

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [Productlist, setProductlist] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      setProductlist(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'all'
      ? Productlist
      : Productlist.filter((product) => product.category === selectedCategory);

  return (
    <div className="mt-20 w-[%95] px-4 lg:px-10 md:max-w-[80%] mx-auto">
      <h1 className="text-3xl lg:text-4xl font-bold text-[var(--secondary-color)] mb-10 relative">
        Our Products
          <span className="absolute left-12 -bottom-1 w-[120px] h-0.5 bg-orange-500"></span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filter */}
        <aside className="lg:w-1/5 w-full">
          <div className=" rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4 text-[var(--primary-color)]">Filter by Category</h2>

            {/* Desktop Categories List */}
            <ul className="hidden lg:block space-y-2">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer capitalize font-medium ${
                    selectedCategory === cat
                      ? 'text-[var(--primary-color)]'
                      : 'text-gray-600'
                  } hover:text-[var(--primary-color)] transition`}
                >
                  {cat}
                </li>
              ))}
            </ul>

            {/* Mobile Dropdown */}
            <div className="lg:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Product
                key={index}
                coverUrl={product.images?.coverimg.url || ''}
                loading="lazy"
                name={product.name}
                author={product.brand}
                price={product.price}
                Qty={product.stock_quantity}
                _id={product._id}
                category={product.category}
              />
            ))}
          </div>
        </main>
      </div>

      <div className="mt-20">
        <Services />
      </div>
    </div>
  );
}

export default Products;

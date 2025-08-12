import React from 'react'


import {
  Edit,
  Trash2,
} from "lucide-react";

function UpdateProductdialog({selectedProduct, setSelectedProduct , Updateproduct, CancelUpdate }) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[50%] max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Update Product</h2>
            <form className="flex items-start gap-12">
              <div className="flex flex-col gap-2">
                <label htmlFor="product-name">Product Name</label>
                <input
                  type="text"
                  placeholder="Product Name"
                  defaultValue={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  placeholder="Brand"
                  defaultValue={selectedProduct.brand}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      brand: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label htmlFor="description">Description</label>
                <textarea
                  placeholder="Description"
                  defaultValue={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label htmlFor="category">Category</label>
                <select
                  defaultValue={selectedProduct.category}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Phone">Phone</option>
                  <option value="T-shirt">T-shirt</option>
                  <option value="jacket">jacket</option>
                  <option value="camera">Camera</option>
                  <option value="Earphone">Earphone</option>
                  <option value="Charger">Charger</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  defaultValue={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label htmlFor="buyed_price">Buyed Price</label>
                <input
                  type="number"
                  placeholder="Offer Price"
                  defaultValue={selectedProduct.offer_price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      offer_price: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label htmlFor="stock_quantity">Stock Quantity</label>
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  defaultValue={selectedProduct.stock_quantity}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      stock_quantity: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label htmlFor="colors">Colors</label>
                <input
                  type="text"
                  placeholder="Colors (comma separated)"
                  defaultValue={selectedProduct.colors}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      colors: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center flex-col gap-5">
                <div className="flex items-center gap-3">
                  {["coverimg", "img2", "img3", "img4"].map((key) => (
                    <div key={key} className="flex flex-col items-center mt-4">
                      {/* Image Preview */}
                      {selectedProduct.images?.[key]?.url ? (
                        <div className="relative">
                          <img
                            src={selectedProduct.images[key].url}
                            alt={`${key}`}
                            className="w-20 h-20 object-cover border border-gray-300 rounded"
                          />

                          {/* Hidden File Input + Edit Icon */}
                          <label
                            htmlFor={`file-${key}`}
                            className="absolute top-0 right-0 cursor-pointer bg-white rounded-full p-1 shadow"
                          >
                            <Edit className="h-4 w-4" />
                                 <label htmlFor={`file-${key}`} className="absolute top-6 right-0 cursor-pointer bg-white rounded-full p-1 shadow">
                           
                          </label>
                          </label>
                          <input
                            id={`file-${key}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const previewUrl = URL.createObjectURL(file);
                                setSelectedProduct((prev) => ({
                                  ...prev,
                                  images: {
                                    ...prev.images,
                                    [key]: {
                                      ...prev.images?.[key],
                                      url: previewUrl, // Update preview
                                      file: file, // Keep file for uploading later
                                    },
                                  },
                                }));
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 flex items-center relative justify-center bg-gray-100 border border-gray-300 rounded text-sm text-gray-500">
                          <label
                            htmlFor={`file-${key}`}
                            className="absolute top-0 right-0 cursor-pointer bg-white rounded-full p-1 shadow"
                          >
                            <Edit className="h-4 w-4" />
                          </label>
                         
                          <input
                            id={`file-${key}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const previewUrl = URL.createObjectURL(file);
                                setSelectedProduct((prev) => ({
                                  ...prev,
                                  images: {
                                    ...prev.images,
                                    [key]: {
                                      ...prev.images?.[key],
                                      url: previewUrl, // Update preview
                                      file: file, // Keep file for uploading later
                                    },
                                  },
                                }));
                              }
                            }}
                          />
                        </div>
                      )}

                      {/* Quantity */}
                      <input
                        type="number"
                        placeholder="Quantity"
                        defaultValue={selectedProduct.images?.[key]?.quantity}
                        onChange={(e) =>
                          setSelectedProduct((prev) => ({
                            ...prev,
                            images: {
                              ...prev.images,
                              [key]: {
                                ...prev.images?.[key],
                                quantity: Number(e.target.value),
                              },
                            },
                            stock_quantity: prev.images?.[key]?.quantity,
                          }))
                        }
                        className="w-[80px] px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    Updateproduct(selectedProduct);
                  }}
                  className="w-full cursor-pointer px-4 py-2 text-white rounded-md bg-black hover:bg-[var(--primary-color)] transition"
                >
                  Update Product
                </button>
                <button
                  type="button"
                  className="w-full px-4 cursor-pointer py-2 text-white rounded-md bg-gray-600 hover:bg-gray-700 transition"
                  onClick={CancelUpdate}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
    
  )
}

export default UpdateProductdialog
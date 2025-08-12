import React from 'react';

function AddProduct({ newProduct, setNewProduct, AddProduct }) {


  
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...(newProduct.images || [])];
      const currentImage = updatedImages[index] || {};
      updatedImages[index] = { ...currentImage, file }; // Store the file inside an object
      setNewProduct({ ...newProduct, images: updatedImages });
    }
  };

const handleQuantityChange = (e, index) => {
  const updatedImages = [...(newProduct.images || [])];
  const currentImage = updatedImages[index] || {};
  updatedImages[index] = {
    ...currentImage,
    quantity: Number(e.target.value),
  };

  // Calculate total stock from all image quantities
  const totalStock = updatedImages.reduce((sum, img) => {
    return sum + (Number(img?.quantity) || 0);
  }, 0);

  setNewProduct({
    ...newProduct,
    images: updatedImages,
    stock_quantity: totalStock,
  });
};

  return (
    <div className="max-w-[40%]">
      <form
        onSubmit={AddProduct}
        className="bg-white p-6 shadow-sm border rounded-lg space-y-4"
      >
        <h3 className="text-3xl text-[var(--primary)] font-extrabold">
          Add New Product
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => {
            const image = newProduct.images?.[i];
            const imageUrl =
              image?.file instanceof File
                ? URL.createObjectURL(image.file)
                : image?.file || '';

            return (
              <div key={i} className="flex flex-col">
                <label
                  className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center text-gray-400 cursor-pointer h-24 bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
                >
                  {!imageUrl ? <span className="text-sm">Upload</span> : null}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, i)}
                  />
                </label>
                <span className="text-xs text-gray-500 mt-1">Image {i + 1}</span>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={image?.quantity || ''}
                  onChange={(e) => handleQuantityChange(e, i)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            );
          })}
        </div>

        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md"
          required
        />

        <textarea
          placeholder="Product Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="w-full p-5 border rounded-md"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            required
          />

          <input
            type="text"
            placeholder="Colors (comma separated)"
            value={newProduct.colors || ''}
            onChange={(e) =>
              setNewProduct({ ...newProduct, colors: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
          />
        
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col">
            <h2>Category</h2>
            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="Phone">Phone</option>
              <option value="Earphone">Air Pods</option>
              <option value="Laptop">Laptop</option>
              <option value="Wristwatch">Wristwatch</option>
              <option value="Charger">Charger</option>
            </select>
          </div>

          <div className="flex flex-col">
            <h2>Price</h2>
            <input
              type="number"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <h2>Offer Price</h2>
            <input
              type="number"
              placeholder="Offer Price"
              value={newProduct.offer_price || 0}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  offer_price: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <h2>Buyed Price</h2>
            <input
              type="number"
              placeholder="Buyed Price"
              value={newProduct.buyed_price || 0}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  buyed_price: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-extrabold cursor-pointer bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--secondary)] transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default AddProduct;

import { Plus, Edit, Trash2, Search } from "lucide-react";

const ProductsRow = ({ product, handleUpdate, handleDelete }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <img
        src={product.images.coverimg.url}
        alt={product.name}
        className="w-16 h-16 object-cover rounded"
      />
    </td>
    <td className="px-5 py-4 whitespace-nowrap font-bold text-gray-900">{product.name}</td>
    <td className="px-12 py-4 whitespace-nowrap text-gray-600 text-sm">{product.stock_quantity}</td>
    <td className="px-5 py-4 whitespace-nowrap text-green-600 font-bold">${product.offer_price}</td>
    <td className="px-5 py-4 whitespace-nowrap text-right">
      <div className="flex items-center justify-end space-x-2">
        <button
          className="text-gray-600 cursor-pointer hover:text-gray-900"
          onClick={() => handleUpdate(product)}
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          className="text-red-600 hover:text-red-900 cursor-pointer"
          onClick={() => handleDelete(product)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </td>
  </tr>
);

const ProductsContent = ({
  Products,
  handleUpdate,
  handleDelete,
  handleSearch,
}) => {


  return (
    <div className="space-y-6 max-w-[60%]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl text-[var(--primary)] font-extrabold capitalize">Products</h1>
          <p className="text-gray-600 text-xl mt-2 font-bold">Manage your products</p>
        </div>
     
      </div>

  
       
        <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-2xl text-[var(--primary)] font-extrabold">All Products</h3>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Products..."
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">cover</th>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xl font-extrabold text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-right text-xl font-extrabold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Products.map((product) => (
                <ProductsRow
                  key={product._id}
                  product={product}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
    
    </div>
  );
};

export default ProductsContent;

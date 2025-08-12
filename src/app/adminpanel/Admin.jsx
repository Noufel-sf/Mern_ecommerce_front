import { useState, useEffect } from "react";
import axios from "axios";
import process from "process";

import {
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  PackageIcon,
  BaggageClaim,
  Edit,
} from "lucide-react";


import ProductsContent from "./ProductsContent";
import OrdersContent from "./OrdersContent";
import SettingsContent from "./SettingsContent";
import DashboardContent from "./DashboardContent";
import AddProductContent from "./AddProductContent";
import UpdateProductdialog from "./UpdateProductdialog";

const Admin = () => {
  // states
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [Products, setProducts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(false);
  const [Orders, setOrders] = useState([]);
  const [selectedOrder, setselectedOrder] = useState(null);
  const [Revenue, setRevenue] = useState(0);

  // handle products CRUD operations

  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: 0,
    offer_price: 0,
    category: "",
    stock_quantity: 0,
    colors: "",
    images: [],
  });

  const AddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("brand", newProduct.brand);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("offer_price", newProduct.offer_price);
    formData.append("colors", newProduct.colors);
    formData.append("category", newProduct.category);
    formData.append("buyed_price", newProduct.buyed_price); // ✅ NEW FIELD

    // Create quantities object to track quantities for each image slot
    const quantities = {
      coverimg: 0,
      img2: 0,
      img3: 0,
      img4: 0,
    };

    // Append each image and map quantities by index
    newProduct.images.forEach((imgObj, index) => {
      if (imgObj?.file instanceof File) {
        formData.append("images", imgObj.file);

        const key =
          index === 0
            ? "coverimg"
            : index === 1
            ? "img2"
            : index === 2
            ? "img3"
            : "img4";

        quantities[key] = Number(imgObj.quantity) || 0;
      }
    });

    // Send quantities as stringified object
    formData.append("quantities", JSON.stringify(quantities));

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProducts([...Products, response.data]);
      clearNewProduct();
      alert("Product added successfully");
      setAddProduct(false);
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // update product functions
const Updateproduct = async (item) => {
  try {
    const updatedImages = { ...item.images };

    // Upload new images to Cloudinary
    for (const key of Object.keys(updatedImages)) {
      if (updatedImages[key]?.file) {
        const formData = new FormData();
        formData.append("file", updatedImages[key].file);
        formData.append("upload_preset", "updateimg"); // Replace with your Cloudinary unsigned preset
        formData.append("cloud_name", "dmjez15fo"); // Replace with your Cloudinary name

        const res = await axios.post(
          `${process.env.cloudinary_URL}`,
          formData
        );

        updatedImages[key] = {
          url: res.data.secure_url,
          quantity: updatedImages[key].quantity || 0
        };
      }
    }

    // Build the final updated product
    const finalProduct = { ...item, images: updatedImages };

    // Send to backend
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/products/${item._id}`,
      finalProduct
    );

    setProducts(
      Products.map((product) =>
        product._id === response.data._id ? response.data : product
      )
    );
    setShowUpdate(false);
    setSelectedProduct(null);

  } catch (error) {
    console.error("Error updating product", error);
  }
};


  const handleUpdate = (item) => {
    setSelectedProduct(item);
    setShowUpdate(true);
    setUpdateProduct(true);
  };

  const CancelUpdate = () => {
    setShowUpdate(false);
    setSelectedProduct(null);
  };



  // delete product functions
  const DeleteProduct = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/products/${selectedProduct._id}`
      );
      setProducts(
        Products.filter((product) => product._id !== selectedProduct._id)
      );
      setShowConfirm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedProduct(null);
  };

  const clearNewProduct = () => {
    setNewProduct({
      name: "",
      brand: "",
      description: "",
      price: "",
      offer_price: "",
      buyed_price: "",
      colors: "",
      category: "",
      images: [
        { file: null, quantity: 0 },
        { file: null, quantity: 0 },
        { file: null, quantity: 0 },
        { file: null, quantity: 0 },
      ],
    });
  };
  // the end products CRUD operations

  // Order CRUD operations

  const fetchOrders = async () => {
    // Check if user exists and has a token before making the request

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/order`, {});

      setOrders(response.data);
      console.log("Fetched orders:", response.data);
    } catch (err) {
      console.error(
        "❌ Error fetching orders:",
        err.response?.data || err.message
      );
    }
  };

  // Only fetch orders when user is available
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderResult = async (order) => {
    console.log("Handling order result for:", order);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/order/confirm/${order._id}`
      );

      console.log("Order confirmed:", response.data);

      alert("Order confirmed ✅");
    } catch (err) {
      console.error(
        "❌ Error confirming the order:",
        err.response?.data || err.message
      );
      alert("Failed to confirm order");
    }
  };

  // fucntion to delete an order
  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/order/delete/${orderId}`
      );
      setOrders(Orders.filter((order) => order._id !== selectedOrder._id));
      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  // getting the actual revenu from the db

  const fetchRevenue = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/revenue`);
      console.log("Fetched revenue:", res.data.total);
      setRevenue(res.data.total);
    } catch (err) {
      console.error("❌ Error fetching revenue:", err);
    }
  };
  useEffect(() => {
    fetchRevenue();
  }, [Revenue]);

// logout the admin user
const handleLogout = async () => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/logout`, {}, { withCredentials: true });
    alert("Logged out successfully");
    window.location.href = "/login"; // Redirect to login page
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

  // admin panel sidebarr pages

  const sidebarItems = [
    { id: "Dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "Add product", label: "Add product", icon: PackageIcon },
    { id: "Products", label: "Products", icon: PackageIcon },
    { id: "Orders", label: "Orders", icon: PackageIcon },
    { id: "Settings", label: "Settings", icon: PackageIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <DashboardContent
            Orderscount={Orders.length}
            productscount={Products.length}
            Revenue={Revenue}
          />
        );
      case "Products":
        return (
          <ProductsContent
            Products={Products}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            handleUpdate={handleUpdate}
            handleDelete={(item) => {
              setSelectedProduct(item);
              setShowConfirm(true);
            }}
          />
        );
      case "Orders":
        return (
          <OrdersContent
            Orders={Orders}
            deleteOrder={deleteOrder}
            handleDelete={(item) => {
              setselectedOrder(item);
              setShowConfirm(true);
            }}
            handleOrderResult={handleOrderResult}
          />
        );
      case "Add product":
        return (
          <AddProductContent
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            AddProduct={AddProduct}
            setAddProduct={setAddProduct}
          />
        );

      case "Settings":
        return <SettingsContent />;
      default:
        return (
          <DashboardContent
            Orderscount={Orders.length}
            productscount={Products.length}
            Revenue={Revenue}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`$${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h2 className="text-3xl font-extrabold text-gray-800">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X className="h-6 w-6 text-[var(--primary)]" />
          </button>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center cursor-pointer px-6 py-3 text-left text-2xl capitalize font-extrabold hover:bg-gray-50 transition $$
                  {
                    activeTab === item.id
                      ? "bg-red-100 text-red-500"
                      : "text-gray-700"
                  }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
            >
              <Menu className="h-6 w-6 cursor-pointer" />
            </button>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white  bg-[var(--primary-color)] p-2 rounded-full relative cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Confirm delete dialog */}
      {showConfirm && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm mb-6">
              Are you sure you want to delete{" "}
              <strong>{selectedProduct.title}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={DeleteProduct}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Update Product dialog */}
      {showUpdate && selectedProduct && updateProduct && (
        <UpdateProductdialog
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          Updateproduct={Updateproduct}
          CancelUpdate={CancelUpdate}
        />
      )}
    </div>
  );
};

export default Admin;

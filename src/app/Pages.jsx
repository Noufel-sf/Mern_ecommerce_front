import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbarr from './Components/Navbarr'
import Footer from './Components/Footer'
import Home from './Homepage/Home'
import Products from './Productspage/Products'
import AboutUs from './AboutUs'
import ContactUs from './Contactuspage/ContactUs' // Fixed typo in directory name
import Cart from './Cartpage/Cart'
import Admin from './adminpanel/Admin'
import { CartProvider } from './CartContext'
import LayoutWrapper from './LayoutWrapper'
import Productdetails from './Productdetails'
import OrderInfo from './OrderInfo'
import Loginpage from './adminpanel/Loginpage'
import ProtectedRoute from './adminpanel/ProtectedRoute' // <-- import it


function Pages() {
  return (
    <div>
     <CartProvider>
       <LayoutWrapper>  
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path="/orderInfo" element={<OrderInfo />} />
          <Route path="/login" element={<Loginpage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
      </Routes>
      </LayoutWrapper>
      </CartProvider>
    </div>
  )
}

export default Pages

import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbarr from './Components/Navbarr';
import Footer from './Components/Footer';

export default function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isAdmin && <Navbarr />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}

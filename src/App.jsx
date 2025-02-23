import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './Context/AuthContext';
import ThemeProvider from './Context/ThemeContext';
import Navbar from './Layouts/Navbar';
import Footer from './Layouts/Footer';

// Lazy-loaded pages
const Home = lazy(() => import('./Pages/Home'));
const Products = lazy(() => import('./Pages/Products'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails'));
const Favourites = lazy(() => import('./Pages/Favourites'));
const Cart = lazy(() => import('./Pages/Cart'));
const ErrorPage = lazy(() => import('./Pages/ErrorPage'));

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/productdetails/:id" element={<ProductDetails />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

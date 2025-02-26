import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './Context/AuthContext';
import ThemeProvider from './Context/ThemeContext';
import Navbar from './Layouts/Navbar';
import Footer from './Layouts/Footer';
import { ProductContextProvider } from './APIContext/ProductContext';
import { FavouritesContextProvider } from './Context/FavouritesContext';

// Lazy-loaded pages
const Home = lazy(() => import('./Pages/Home'));
const Products = lazy(() => import('./Pages/Products'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails'));
const Favourites = lazy(() => import('./Pages/Favourites'));
const Cart = lazy(() => import('./Pages/Cart'));
const ErrorPage = lazy(() => import('./Pages/ErrorPage'));
const Category = lazy(() => import('./Pages/Category'));

function App() {
  return (
    <AuthProvider>
      <FavouritesContextProvider>
        <ProductContextProvider>
          <ThemeProvider>
            <BrowserRouter>
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/favourites" element={<Favourites />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/category/:categoryName" element={<Category />} />
                    <Route path="/*" element={<ErrorPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </BrowserRouter>
          </ThemeProvider>
        </ProductContextProvider>
      </FavouritesContextProvider>
    </AuthProvider>
  );
}

export default App;

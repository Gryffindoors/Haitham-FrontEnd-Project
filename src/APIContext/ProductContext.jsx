import React, { createContext, useEffect, useState } from "react";
import AxiosInstance from "../Axios/AxiosInstance";

export const ProductContext = createContext({
  categories: [],
  productsByCategory: {},
  allProducts: [],
  loading: true,
  error: null,
});

export function ProductContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get("category")
      .then((resp) => {
        const categoryData = resp.data.data || [];

        // Extract unique categories
        const uniqueCategories = categoryData.map((cat) => cat.category);

        // Group products by category
        const groupedProducts = categoryData.reduce((acc, cat) => {
          acc[cat.category] = cat.items || [];
          return acc;
        }, {});

        // Collect all products
        const allAvailableProducts = categoryData.flatMap((cat) => cat.items || []);

        setCategories(uniqueCategories);
        setProductsByCategory(groupedProducts);
        setAllProducts(allAvailableProducts);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductContext.Provider value={{ categories, productsByCategory, allProducts, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}

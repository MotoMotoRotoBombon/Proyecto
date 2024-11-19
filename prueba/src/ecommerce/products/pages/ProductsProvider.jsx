import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getProduct, getProducts } from "../../../ecommerce/products/service/get/productService";
import { esperar } from "../../../../src/security/institutes/helpers/Utils";
import { TOAST_EXITO } from "../../../ecommerce/products/components/elements/messages/MyToastAlerts";
import "react-toastify/dist/ReactToastify.css";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productSel, setProductSel] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    fetchDataProducts();
  }, []);

  const fetchDataProducts = async () => {
    setLoadingTable(true);
    try {
      const productos = await getProducts();
      setProducts(productos || []);
    } catch (error) {
      toast.error("Error al cargar los productos.");
      console.error("Error al obtener los productos:", error);
    } finally {
      setLoadingTable(false);
    }
  };

  const fetchDataProductSelect = async (id) => {
    setLoadingTable(true);
    try {
      const producto = await getProduct(id);
      setProductSel(producto || null);
    } catch (error) {
      toast.error(`Error al obtener el producto con ID ${id}.`);
      console.error(`Error al obtener producto con ID ${id}:`, error);
    } finally {
      setLoadingTable(false);
    }
  };

  const contextValue = {
    products,
    productSel,
    loadingTable,
    fetchDataProducts,
    fetchDataProductSelect,
    setProductSel,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {loadingTable ? <div>Cargando...</div> : children}
      <ToastContainer />
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);

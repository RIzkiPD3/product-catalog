import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/Product";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, product: Omit<Product, "id">) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("crudProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    setIsLoaded(true);
  }, []);

  // Save products to localStorage whenever they change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("crudProducts", JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now(), // Simple ID generation using timestamp
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: number, updatedProduct: Omit<Product, "id">) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...updatedProduct, id } : p))
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const value: ProductContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
}

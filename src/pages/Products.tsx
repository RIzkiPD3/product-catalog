import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { addToCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Gagal memuat data");

        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryFiltered = filteredProducts.filter((item) =>
    selectedCategory === "all"
      ? true
      : item.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  // Loading UI
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Loading...
        </p>
      </div>
    );

  // Error UI
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-lg font-medium text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20">
      <h1 className="text-3xl font-bold mt-6 text-black dark:text-white">
        Product Catalog
      </h1>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />

      {categoryFiltered.length === 0 ? (
        <p className="text-lg mt-5 font-medium text-gray-600 dark:text-gray-300">
          Produk tidak ditemukan.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {categoryFiltered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700"
            >
              {/* Card image + title → klik ke Detail */}
              <Link
                to={`/product/${item.id}`}
                className="flex flex-col hover:scale-105 transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-contain"
                />

                <p className="text-sm font-medium mt-3 min-h-10 text-gray-900 dark:text-gray-100">
                  {item.title}
                </p>

                <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-2 text-lg">
                  ${item.price}
                </p>
              </Link>

              {/* Add to Cart button */}
              <button
                onClick={() =>
                  addToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                  })
                }
                className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition text-sm font-medium"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

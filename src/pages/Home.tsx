import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import CartBadge from "../components/CartBadge";
import { useCart } from "../context/CartContext";

export default function Home() {
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

  if (loading)
    return (
      <p className="text-center text-lg mt-10 font-medium">Loading...</p>
    );

  if (error)
    return (
      <p className="text-center text-lg mt-10 font-medium text-red-500">
        {error}
      </p>
    );

  return (
    <div className="w-[90%] max-w-5xl mx-auto text-center relative">
      <CartBadge />

      <h1 className="text-3xl font-bold mt-10">Product Catalog</h1>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <CategoryFilter
        value={selectedCategory}
        onChange={setSelectedCategory}
      />

      {categoryFiltered.length === 0 ? (
        <p className="text-lg mt-5 font-medium text-gray-600">
          Produk tidak ditemukan.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {categoryFiltered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition cursor-pointer border flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-contain"
              />

              <p className="text-sm font-medium mt-3 min-h-[40px]">
                {item.title}
              </p>

              <p className="text-indigo-600 font-bold mt-2 text-lg">
                ${item.price}
              </p>

              <button
                onClick={() =>
                  addToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                  })
                }
                className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
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

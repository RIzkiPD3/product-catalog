import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="w-[90%] max-w-5xl mx-auto text-center">
      <h1 className="text-3xl font-bold mt-10">Product Catalog</h1>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {filteredProducts.length === 0 ? (
        <p className="text-lg mt-5 font-medium text-gray-600">
          Produk tidak ditemukan.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition cursor-pointer border"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

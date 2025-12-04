import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products: crudProducts } = useProducts();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // First, check if product exists in CRUD products
        const crudProduct = crudProducts.find(p => p.id === Number(id));
        
        if (crudProduct) {
          setProduct(crudProduct);
          setLoading(false);
          return;
        }

        // If not found in CRUD, fetch from API
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Gagal memuat produk");

        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, crudProducts]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center dark:text-white">
        Loading...
      </div>
    );

  // Lempar error saat render agar ErrorBoundary bisa menangkap
  if (error) {
    throw new Error(error);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 dark:text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-64 h-64 object-contain rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

          <p className="text-gray-600 dark:text-gray-300 mb-2 capitalize">
            Category: {product.category}
          </p>

          <p className="text-indigo-600 dark:text-indigo-400 text-xl font-bold mb-4">
            ${product.price}
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {product.description}
          </p>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              })
            }
            className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import type { Product } from "../types/Product";
import ProductFormModal from "../components/ProductFormModal";
import ConfirmModal from "../components/ConfirmModal";

export default function Dashboard() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deletingProductId, setDeletingProductId] = useState<number | null>(
    null
  );

  const handleAddProduct = (product: Omit<Product, "id">) => {
    addProduct(product);
    setIsFormOpen(false);
  };

  const handleEditProduct = (product: Omit<Product, "id">) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, product);
      setEditingProduct(undefined);
      setIsFormOpen(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeletingProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingProductId !== null) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  const openAddModal = () => {
    setEditingProduct(undefined);
    setIsFormOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Produk
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Kelola produk Anda dengan mudah
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium shadow-md hover:shadow-lg"
        >
          + Tambah Produk
        </button>
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg
              className="w-24 h-24 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Belum ada produk
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Mulai tambahkan produk pertama Anda
          </p>
          <button
            onClick={openAddModal}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            Tambah Produk Pertama
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Gambar
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Nama Produk
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {product.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {product.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        ${product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => (
              <div key={product.id} className="p-4">
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">
                        {product.category}
                      </span>
                      <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product.id)}
                        className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Count */}
      {products.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Total: {products.length} produk
        </div>
      )}

      {/* Modals */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(undefined);
        }}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        initialData={editingProduct}
        mode={editingProduct ? "edit" : "add"}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingProductId(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Hapus Produk"
        message="Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import type { Product } from "../types/Product";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, "id">) => void;
  initialData?: Product;
  mode: "add" | "edit";
}

export default function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        price: initialData.price.toString(),
        category: initialData.category,
        description: initialData.description,
        image: initialData.image,
      });
    } else {
      setFormData({
        title: "",
        price: "",
        category: "",
        description: "",
        image: "",
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Nama produk harus diisi";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Harga harus diisi";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Harga harus berupa angka positif";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Kategori harus diisi";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Deskripsi harus diisi";
    }

    if (!formData.image.trim()) {
      newErrors.image = "URL gambar harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      title: formData.title,
      price: Number(formData.price),
      category: formData.category,
      description: formData.description,
      image: formData.image,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {mode === "add" ? "Tambah Produk Baru" : "Edit Produk"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nama Produk *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Masukkan nama produk"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Harga *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Masukkan harga"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kategori *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Contoh: electronics, clothing, dll"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Deskripsi *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Masukkan deskripsi produk"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL Gambar *
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preview Gambar
              </label>
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-contain border border-gray-300 dark:border-gray-600 rounded-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/150?text=Invalid+URL";
                }}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              {mode === "add" ? "Tambah Produk" : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

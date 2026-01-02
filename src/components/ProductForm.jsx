import { useState } from "react";

export default function ProductForm({ onSave, editingProduct }) {
  const [form, setForm] = useState({
    name: editingProduct?.name || "",
    price: editingProduct?.price || "",
    category: editingProduct?.category || "",
    stock: editingProduct?.stock || "",
    description: editingProduct?.description || ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.name?.trim()) err.name = "Required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) 
      err.price = "Must be positive";
    if (!form.category?.trim()) err.category = "Required";
    if (form.stock && (isNaN(form.stock) || Number(form.stock) < 0)) 
      err.stock = "Must be non-negative";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({...form, id: editingProduct?.id});
    setForm({ name: "", price: "", category: "", stock: "", description: "" });
    setErrors({});
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <h2 className="text-2xl font-bold mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {editingProduct ? "✏️ Edit Product" : "➕ Add Product"}
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
            <input
              placeholder="Product name"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">⚠️ {errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($) *</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                errors.price ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">⚠️ {errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
            <input
              placeholder="e.g., Electronics"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                errors.category ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            {errors.category && <p className="mt-1 text-sm text-red-600">⚠️ {errors.category}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
            <input
              type="number"
              placeholder="0"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                errors.stock ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
            {errors.stock && <p className="mt-1 text-sm text-red-600">⚠️ {errors.stock}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Product description..."
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition"
          >
            {editingProduct ? "💾 Update" : "✨ Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState } from "react";

export default function ProductForm({ onSave, editingProduct, onCancelEdit }) {
  const getInitialForm = () => ({
    name: editingProduct?.name || "",
    price: editingProduct?.price || "",
    category: editingProduct?.category || "",
    stock: editingProduct?.stock || "",
    description: editingProduct?.description || "",
  });

  const [form, setForm] = useState(getInitialForm());
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
    onSave({ ...form, id: editingProduct?.id });
    setForm({ name: "", price: "", category: "", stock: "", description: "" });
    setErrors({});
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-xl">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Form</p>
          <h2 className="text-2xl font-semibold text-slate-900">
            {editingProduct ? "Edit product" : "Add a new product"}
          </h2>
          <p className="text-sm text-slate-600">Fill in essential merchandising details. Validation keeps data clean.</p>
        </div>
        {editingProduct && (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">Editing</span>
        )}
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Name *</label>
            <input
              placeholder="Product name"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition ${
                errors.name ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
              }`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="mt-1 text-sm text-rose-600">⚠️ {errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Price ($) *</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition ${
                errors.price ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
              }`}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            {errors.price && <p className="mt-1 text-sm text-rose-600">⚠️ {errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
            <input
              placeholder="e.g., Electronics"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition ${
                errors.category ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
              }`}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            {errors.category && <p className="mt-1 text-sm text-rose-600">⚠️ {errors.category}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Stock</label>
            <input
              type="number"
              placeholder="0"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition ${
                errors.stock ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
              }`}
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
            {errors.stock && <p className="mt-1 text-sm text-rose-600">⚠️ {errors.stock}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea
              placeholder="Product description..."
              rows="3"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-slate-900 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition"
          >
            {editingProduct ? "💾 Update" : "✨ Add"}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-5 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-lg hover:shadow-xl transition duration-200 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">SKU</p>
          <h3 className="text-xl font-semibold text-slate-900 line-clamp-1">{product.name}</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold whitespace-nowrap">
          {product.category}
        </span>
      </div>

      <p className="text-slate-600 text-sm mb-4 line-clamp-3 min-h-12">{product.description || "No description"}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <p className="text-xs text-slate-500">Unit price</p>
          <span className="text-2xl font-semibold text-emerald-700">${Number(product.price).toFixed(2)}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          product.stock > 10
            ? "bg-emerald-100 text-emerald-800"
            : product.stock > 0
              ? "bg-amber-100 text-amber-800"
              : "bg-rose-100 text-rose-800"
        }`}>
          📦 {product.stock} in stock
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onEdit(product)}
          className="rounded-lg bg-slate-900 text-white font-semibold py-2.5 px-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="rounded-lg bg-rose-500 text-white font-semibold py-2.5 px-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

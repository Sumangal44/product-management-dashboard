export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-180 text-left text-sm">
          <thead className="bg-linear-to-r from-slate-900 via-slate-800 to-emerald-700 text-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-wide">Name</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-wide">Price</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-wide">Category</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-wide">Stock</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-wide">Description</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p, i) => (
              <tr key={p.id} className={`transition hover:bg-emerald-50/50 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-slate-900 whitespace-nowrap">{p.name}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 text-emerald-700 font-bold">${Number(p.price).toFixed(2)}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-sky-100 text-sky-800 whitespace-nowrap">
                    {p.category}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                    p.stock > 10
                      ? "bg-emerald-100 text-emerald-800"
                      : p.stock > 0
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                  }`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-600 max-w-xs truncate">{p.description || "—"}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(p)}
                      className="px-3 sm:px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="px-3 sm:px-4 py-2 rounded-lg bg-rose-500 text-white font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

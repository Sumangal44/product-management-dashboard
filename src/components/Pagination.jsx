export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-sm transition"
      >
        ← Prev
      </button>

      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`w-10 h-10 rounded-lg font-semibold transition ${
              currentPage === i + 1
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-sm transition"
      >
        Next →
      </button>
    </div>
  );
}

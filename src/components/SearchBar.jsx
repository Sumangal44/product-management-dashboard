export default function SearchBar({
  search,
  setSearch,
  onClear,
  categories = [],
  categoryFilter = "all",
  onCategoryChange,
}) {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-slate-600">Search catalogue</span>
        {categories.length > 0 && (
          <span className="text-xs text-slate-500 hidden sm:inline">Filter by category</span>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <label className="relative flex-1 block">
          <input
            type="text"
            placeholder="Find by name or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
          {search && (
            <button
              type="button"
              onClick={() => (onClear ? onClear() : setSearch(""))}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        {categories.length > 0 && (
          <label className="flex items-center gap-2 sm:w-56">
            <span className="text-xs font-semibold text-slate-600 sm:hidden">Category</span>
            <div className="relative w-full">
              <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 transition"
              >
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
            </div>
          </label>
        )}
      </div>
    </div>
  );
}

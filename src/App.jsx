import { useMemo, useState} from "react";
import { initialProducts } from "./data/initialProducts";
import { useDebounce } from "./hooks/useDebounce";
import SearchBar from "./components/SearchBar";
import ViewToggle from "./components/ViewToggle";
import ProductTable from "./components/ProductTable";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import Pagination from "./components/Pagination";

const ITEMS_PER_PAGE = 6;

const stockStatus = (stock = 0) => {
  if (Number(stock) <= 0) return "out";
  if (Number(stock) <= 10) return "low";
  return "in";
};

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [view, setView] = useState("table");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);

  const debouncedSearch = useDebounce(search);

  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.category && set.add(p.category));
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() =>
    products.filter((p) => {
      const matchesSearch = !debouncedSearch ||
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (p.category || "").toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      const matchesStock = stockFilter === "all" || stockStatus(p.stock) === stockFilter;

      return matchesSearch && matchesCategory && matchesStock;
    }), [products, debouncedSearch, categoryFilter, stockFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const stats = useMemo(() => {
    const totalValue = products.reduce((sum, p) => sum + Number(p.price || 0) * Number(p.stock || 0), 0);
    const averagePrice = products.length
      ? products.reduce((sum, p) => sum + Number(p.price || 0), 0) / products.length
      : 0;
    return {
      totalProducts: products.length,
      lowStock: products.filter((p) => stockStatus(p.stock) === "low").length,
      outOfStock: products.filter((p) => stockStatus(p.stock) === "out").length,
      totalValue,
      averagePrice,
    };
  }, [products]);

  const saveProduct = (product) => {
    if (product.id) {
      setProducts((p) => p.map((i) => (i.id === product.id ? product : i)));
    } else {
      setProducts((p) => [...p, { ...product, id: Date.now() }]);
    }
    setEditing(null);
    setPage(1);
  };

  const deleteProduct = (id) => {
    if (confirm("Delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setEditing(null);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setStockFilter("all");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="ambient-grid" aria-hidden />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-6 sm:py-10 space-y-8">
        <header className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
              <span className="text-lg">🛠️</span>
              <span>Product Operations</span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 leading-tight">Inventory Control Dashboard</h1>
              <p className="text-slate-600 mt-3 max-w-2xl">A crisp workspace for merchandising teams to monitor catalogue health, spot low-stock items, and action updates in seconds.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="pill px-3 py-1 text-sm font-semibold text-slate-700">Realtime sync</span>
              <span className="pill px-3 py-1 text-sm font-semibold text-slate-700">Audit-ready</span>
              <span className="pill px-3 py-1 text-sm font-semibold text-slate-700">Role-aware UI</span>
            </div>
          </div>

          <div className="flex flex-col items-stretch sm:flex-row gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white font-semibold text-slate-700 hover:-translate-y-0.5 hover:shadow-lg transition duration-200"
            >
              Reset filters
            </button>
            <ViewToggle view={view} setView={setView} />
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-slate-500">Catalogue size</p>
            <p className="text-3xl font-semibold text-slate-900">{stats.totalProducts}</p>
            <p className="text-sm text-slate-500">Active SKUs tracked</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-slate-500">Inventory value</p>
            <p className="text-3xl font-semibold text-slate-900">${stats.totalValue.toLocaleString()}</p>
            <p className="text-sm text-emerald-700 font-semibold">Liquid assets snapshot</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-slate-500">Low / Out</p>
            <p className="text-3xl font-semibold text-slate-900">{stats.lowStock} low · {stats.outOfStock} out</p>
            <p className="text-sm text-amber-600 font-semibold">Escalate replenishment</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-slate-500">Average ticket</p>
            <p className="text-3xl font-semibold text-slate-900">${stats.averagePrice.toFixed(2)}</p>
            <p className="text-sm text-slate-500">Per SKU across catalogue</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[420px,1fr] items-start">
          <ProductForm onSave={saveProduct} editingProduct={editing} onCancelEdit={() => setEditing(null)} />

          <div className="space-y-5">
            <div className="glass-card rounded-2xl p-5 shadow-lg">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="w-full lg:max-w-lg">
                  <SearchBar
                    search={search}
                    setSearch={(value) => setSearch(value)}
                    onClear={() => setSearch("")}
                    categories={categories}
                    categoryFilter={categoryFilter}
                    onCategoryChange={setCategoryFilter}
                  />
                </div>

                <div className="flex gap-2">
                  {["all", "in", "low", "out"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStockFilter(status)}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold border transition ${
                        stockFilter === status
                          ? "bg-slate-900 text-white border-slate-900"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {status === "all" ? "All stock" : status === "in" ? "In stock" : status === "low" ? "Low" : "Out"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 shadow-lg">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <p className="text-slate-500 text-sm">Showing {paginated.length} of {filtered.length} products</p>
                  <p className="text-slate-900 font-semibold">Precise filters keep your shelf lean.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm">Page {currentPage} / {totalPages}</span>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-lg font-semibold text-slate-800 mb-2">No products match the filters</p>
                  <p className="text-slate-600 mb-4">Try clearing filters or adding a new SKU.</p>
                  <button
                    onClick={() => {
                      resetFilters();
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  {view === "table" ? (
                    <ProductTable
                      products={paginated}
                      onEdit={setEditing}
                      onDelete={deleteProduct}
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {paginated.map((p) => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          onEdit={setEditing}
                          onDelete={deleteProduct}
                        />
                      ))}
                    </div>
                  )}

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

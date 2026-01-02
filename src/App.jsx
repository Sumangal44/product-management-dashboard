import { useState, useMemo } from "react";
import { initialProducts } from "./data/initialProducts";
import { useDebounce } from "./hooks/useDebounce";
import SearchBar from "./components/SearchBar";
import ViewToggle from "./components/ViewToggle";
import ProductTable from "./components/ProductTable";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import Pagination from "./components/Pagination";

const ITEMS_PER_PAGE = 5;

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);

  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() =>
    products.filter(p =>
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(debouncedSearch.toLowerCase())
    ), [products, debouncedSearch]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const saveProduct = (product) => {
    if (product.id) {
      setProducts(p => p.map(i => i.id === product.id ? product : i));
    } else {
      setProducts(p => [...p, { ...product, id: Date.now() }]);
    }
    setEditing(null);
  };

  const deleteProduct = (id) => {
    if (confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      setEditing(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            🛍️ Product Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage your inventory with ease</p>
        </header>

        <ProductForm onSave={saveProduct} editingProduct={editing} />

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="w-full md:w-96">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
            <ViewToggle view={view} setView={setView} />
          </div>

          <div className="mb-4">
            <p className="text-gray-600 font-semibold">
              📊 Showing {paginated.length} of {filtered.length} products
            </p>
          </div>

          {view === "table" ? (
            <ProductTable
              products={paginated}
              onEdit={setEditing}
              onDelete={deleteProduct}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

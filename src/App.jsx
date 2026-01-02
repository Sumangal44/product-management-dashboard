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
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
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

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <ProductForm onSave={saveProduct} editingProduct={editing} />

      <div className="flex flex-col md:flex-row justify-between gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <ViewToggle view={view} setView={setView} />
      </div>

      {view === "table"
        ? <ProductTable products={paginated} onEdit={setEditing} />
        : <ProductCard products={paginated} onEdit={setEditing} />}

      <Pagination page={page} total={totalPages} setPage={setPage} />
    </div>
  );
}

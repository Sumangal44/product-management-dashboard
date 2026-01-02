export default function ViewToggle({ view, setView }) {
  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1 rounded ${view === "table" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setView("table")}
      >
        Table
      </button>
      <button
        className={`px-3 py-1 rounded ${view === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setView("grid")}
      >
        Grid
      </button>
    </div>
  );
}

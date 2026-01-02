export default function ViewToggle({ view, setView }) {
  return (
    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => setView("table")}
        className={`px-4 py-2 rounded-md font-semibold transition-all ${
          view === "table"
            ? "bg-white text-blue-600 shadow-md"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        📋 Table
      </button>
      <button
        onClick={() => setView("card")}
        className={`px-4 py-2 rounded-md font-semibold transition-all ${
          view === "card"
            ? "bg-white text-blue-600 shadow-md"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        🎴 Cards
      </button>
    </div>
  );
}

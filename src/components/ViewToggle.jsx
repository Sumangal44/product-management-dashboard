export default function ViewToggle({ view, setView }) {
  const options = [
    { id: "table", label: "Table", icon: "📋" },
    { id: "card", label: "Cards", icon: "🗂️" },
  ];

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-1 py-1 shadow-sm">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => setView(option.id)}
          className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
            view === option.id
              ? "bg-slate-900 text-white shadow-md"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <span>{option.icon}</span>
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}

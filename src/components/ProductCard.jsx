export default function ProductCard({ products, onEdit }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {products.map(p => (
        <div key={p.id} className="border rounded p-4 shadow">
          <h3 className="font-bold">{p.name}</h3>
          <p>₹{p.price}</p>
          <p>{p.category}</p>
          <p className={`mt-1 ${p.stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {p.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <button
            className="mt-2 text-blue-600"
            onClick={() => onEdit(p)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

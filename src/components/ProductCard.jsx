export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{product.name}</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-10">
        {product.description || "No description"}
      </p>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-green-600">${Number(product.price).toFixed(2)}</span>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          product.stock > 10 ? 'bg-green-100 text-green-800' : 
          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          📦 {product.stock} in stock
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

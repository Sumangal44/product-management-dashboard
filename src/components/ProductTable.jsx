export default function ProductTable({ products, onEdit }) {
  return (
    <table className="w-full border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Stock</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td className="p-2 border">{p.name}</td>
            <td className="p-2 border">₹{p.price}</td>
            <td className="p-2 border">{p.category}</td>
            <td className="p-2 border">{p.stock}</td>
            <td className="p-2 border">
              <button
                className="text-blue-600"
                onClick={() => onEdit(p)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

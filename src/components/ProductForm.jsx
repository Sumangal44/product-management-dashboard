import { useState } from "react";

export default function ProductForm({ onSave, editingProduct }) {
  const [form, setForm] = useState({
    name: "", price: "", category: "", stock: "", description: ""
  });
  const [errors, setErrors] = useState({});

  const currentForm = editingProduct ? {
    name: editingProduct.name || "",
    price: editingProduct.price || "",
    category: editingProduct.category || "",
    stock: editingProduct.stock || "",
    description: editingProduct.description || ""
  } : form;

  const validate = () => {
    const err = {};
    if (!form.name?.trim()) err.name = "Required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) err.price = "Must be a positive number";
    if (!form.category?.trim()) err.category = "Required";
    if (form.stock && (isNaN(form.stock) || Number(form.stock) < 0)) err.stock = "Must be a non-negative number";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(currentForm);
    setForm({ name: "", price: "", category: "", stock: "", description: "" });
    setErrors({});
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="font-bold mb-2">{editingProduct ? "Edit" : "Add"} Product</h2>
      {["name", "price", "category", "stock", "description"].map(f => (
        <div key={f} className="mb-2">
          <input
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            className="w-full p-2 border rounded"
            value={currentForm[f]}
            onChange={(e) => setForm({ ...currentForm, [f]: e.target.value })}
            type={f === "price" || f === "stock" ? "number" : "text"}
          />
          {errors[f] && <span className="text-red-500 text-sm">{errors[f]}</span>}
        </div>
      ))}
      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
}

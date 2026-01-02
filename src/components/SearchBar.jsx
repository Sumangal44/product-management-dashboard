export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search product..."
      className="w-full md:w-1/3 p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

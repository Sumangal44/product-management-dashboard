export default function Pagination({ page, total, setPage }) {
  return (
    <div className="flex gap-3 justify-center mt-4">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
      <span>{page} / {total}</span>
      <button disabled={page === total} onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

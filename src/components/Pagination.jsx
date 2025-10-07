// src/components/Table/Pagination.jsx
export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const getCompactPages = (total, current) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    const set = new Set([
      1,
      2,
      total - 1,
      total,
      current - 1,
      current,
      current + 1,
    ]);
    const arr = Array.from(set)
      .filter((p) => p >= 1 && p <= total)
      .sort((a, b) => a - b);

    const out = [];
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i]);
      const next = arr[i + 1];
      if (next && next - arr[i] > 1) out.push("dots");
    }
    return out;
  };

  const pageItems = getCompactPages(totalPages, page);
  const goto = (p) => onChange(Math.min(Math.max(1, p), totalPages));

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="mt-6 flex flex-col items-center gap-2"
    >
      {/* Mobile compact */}
      <div className="join sm:hidden">
        <button
          className="join-item btn btn-sm"
          onClick={() => goto(page - 1)}
          disabled={page === 1}
          aria-label="Sebelumnya"
        >
          «
        </button>
        <button className="join-item btn btn-sm" disabled>
          {page} / {totalPages}
        </button>
        <button
          className="join-item btn btn-sm"
          onClick={() => goto(page + 1)}
          disabled={page === totalPages}
          aria-label="Berikutnya"
        >
          »
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex">
        <div className="join">
          <button
            className="join-item btn btn-sm md:btn-md"
            onClick={() => goto(page - 1)}
            disabled={page === 1}
            aria-label="Sebelumnya"
          >
            «
          </button>

          {pageItems.map((p, idx) =>
            p === "dots" ? (
              <button
                key={`dots-${idx}`}
                className="join-item btn btn-sm md:btn-md btn-disabled opacity-50"
                disabled
                aria-hidden="true"
              >
                …
              </button>
            ) : (
              <button
                key={p}
                className={`join-item btn btn-sm md:btn-md ${
                  page === p ? "btn-primary" : ""
                }`}
                onClick={() => goto(p)}
                aria-current={page === p ? "page" : undefined}
                aria-label={`Halaman ${p}`}
              >
                {p}
              </button>
            )
          )}

          <button
            className="join-item btn btn-sm md:btn-md"
            onClick={() => goto(page + 1)}
            disabled={page === totalPages}
            aria-label="Berikutnya"
          >
            »
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-base-content/70">
        Halaman {page} dari {totalPages}
      </p>
    </nav>
  );
}

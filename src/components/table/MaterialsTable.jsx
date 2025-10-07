import MaterialsTableRow from "./MaterialsTableRow.jsx";

export default function MaterialsTable({
  items,
  offset = 0, // nomor awal (mis: (page-1)*pageSize)
  loading = false,
  error = null,
  onView,
}) {
  return (
    <div className="overflow-x-auto border border-base-200 rounded-lg">
      <table className="table table-zebra w-full bg-base-100">
        <thead className="bg-base-200">
          <tr>
            <th>No</th>
            <th>File</th>
            <th>Tanggal</th>
            <th>Oleh</th>
            <th>Aksi</th>
          </tr>
        </thead>

        {/* aria-live supaya SR tahu ada update saat loading selesai */}
        <tbody aria-live="polite">
          {loading && (
            <tr>
              <td colSpan={5}>
                <div
                  className="flex items-center justify-center py-16"
                  role="status"
                >
                  <span className="loading loading-spinner loading-lg text-primary mr-3" />
                  <span className="text-base font-medium text-primary">
                    Memuat…
                  </span>
                </div>
              </td>
            </tr>
          )}

          {!loading && error && (
            <tr>
              <td colSpan={5} className="py-10 text-center text-error">
                {error}
              </td>
            </tr>
          )}

          {!loading && !error && items.length === 0 && (
            <tr>
              <td colSpan={5} className="py-10 text-center opacity-70">
                Tidak ada data.
              </td>
            </tr>
          )}

          {!loading &&
            !error &&
            items.map((item, i) => (
              <MaterialsTableRow
                key={item.id ?? `${item.file}-${i}`}
                index={offset + i + 1}
                item={item}
                onView={onView}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

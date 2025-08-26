// src/components/Table/MaterialsTable.jsx
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
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>No</th>
            <th>File</th>
            <th>Tanggal</th>
            <th>Oleh</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={5} className="py-10 text-center">
                Memuat…
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

import VideosTableRow from "./VideoTableRow.jsx";

export default function VideosTable({
  items,
  offset = 0,
  loading = false,
  error = null,
  onOpen,
}) {
  return (
    <div className="overflow-x-auto border border-base-200 rounded-lg">
      <table className="table table-zebra w-full bg-base-100">
        <thead className="bg-base-200">
          <tr>
            <th>No</th>
            <th>Judul Video</th>
            <th>Kelas</th>
            <th>Mata Pelajaran</th>
            <th>Link</th>
          </tr>
        </thead>

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
                Belum ada video.
              </td>
            </tr>
          )}

          {!loading &&
            !error &&
            items.map((item, i) => (
              <VideosTableRow
                key={item.id ?? `${item.title}-${i}`}
                index={offset + i + 1}
                item={item}
                onOpen={onOpen}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

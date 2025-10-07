// src/components/Table/MaterialsTableRow.jsx
export default function MaterialsTableRow({ index, item, onView, onDownload }) {
  return (
    <tr>
      <td>{index}</td>

      {/* Nama file */}
      <td className="max-w-[24rem]">
        <div className="truncate" title={item.file}>
          {item.file}
        </div>
      </td>

      {/* Kelas & Mapel */}
      <td>{item.className}</td>
      <td>{item.subject}</td>

      {/* Tombol aksi */}
      <td>
        <div className="flex flex-wrap gap-2">
          {/* Lihat */}
          <button
            type="button"
            className="btn btn-xs btn-primary"
            onClick={(e) => {
              e.preventDefault();
              onView?.(item);
            }}
          >
            Lihat
          </button>

          {/* Download */}
          <a
            className={`btn btn-xs btn-secondary ${
              !item.url ? "pointer-events-none opacity-50" : ""
            }`}
            href={item.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!item.url}
          >
            Download
          </a>
        </div>
      </td>
    </tr>
  );
}

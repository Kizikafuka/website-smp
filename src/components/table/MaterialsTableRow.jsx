// src/components/Table/MaterialsTableRow.jsx
export default function MaterialsTableRow({ index, item, onView, onDownload }) {
  return (
    <tr>
      <td>{index}</td>
      <td className="truncate">{item.file}</td>
      <td>
        {new Date(item.tanggal).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </td>
      <td>{item.oleh}</td>
      <td>
        <div className="flex gap-2">
          <button
            className="btn btn-xs btn-primary"
            onClick={() => onView?.(item)}
          >
            Lihat
          </button>
          <a className="btn btn-xs btn-secondary" href={item.url} download>
            Download
          </a>
        </div>
      </td>
    </tr>
  );
}

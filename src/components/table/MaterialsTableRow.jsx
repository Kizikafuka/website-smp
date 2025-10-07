import { useState } from "react";

export default function MaterialsTableRow({ index, item, onView, onDownload }) {
  const [busy, setBusy] = useState(null); // 'view' | 'download' | null

  const dateStr = (() => {
    if (!item?.tanggal) return "-";
    const d = new Date(item.tanggal);
    return isNaN(d)
      ? "-"
      : d.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
  })();

  const hasUrl = Boolean(item?.url);

  const handleAction = async (type, fn) => {
    try {
      setBusy(type);
      await Promise.resolve(fn?.(item));
    } finally {
      setBusy(null);
    }
  };

  return (
    <tr aria-busy={!!busy}>
      <td className="whitespace-nowrap">{index}</td>

      {/* batasi lebar agar truncate efektif + tooltip via title */}
      <td className="max-w-[18rem] truncate" title={item.file || ""}>
        {item.file || "-"}
      </td>

      <td className="whitespace-nowrap" title={dateStr}>
        {dateStr}
      </td>
      <td className="whitespace-nowrap" title={item.oleh || ""}>
        {item.oleh || "-"}
      </td>

      <td>
        <div className="flex flex-wrap gap-2">
          {/* Lihat */}
          <button
            type="button"
            className="btn btn-xs btn-primary"
            onClick={() => handleAction("view", onView)}
            aria-label={`Lihat ${item.file}`}
            disabled={busy === "view"}
          >
            {busy === "view" ? (
              <>
                <span className="loading loading-spinner loading-xs mr-1" />
                Memuat…
              </>
            ) : (
              "Lihat"
            )}
          </button>

          {/* Download */}
          {onDownload ? (
            <button
              type="button"
              className="btn btn-xs btn-secondary"
              onClick={() => hasUrl && handleAction("download", onDownload)}
              aria-label={`Unduh ${item.file}`}
              disabled={!hasUrl || busy === "download"}
            >
              {busy === "download" ? (
                <>
                  <span className="loading loading-spinner loading-xs mr-1" />
                  Mengunduh…
                </>
              ) : (
                "Download"
              )}
            </button>
          ) : (
            <a
              className={`btn btn-xs btn-secondary ${
                !hasUrl ? "pointer-events-none" : ""
              }`}
              href={hasUrl ? item.url : undefined}
              download
              aria-label={`Unduh ${item.file}`}
              aria-disabled={!hasUrl}
            >
              Download
            </a>
          )}
        </div>
      </td>
    </tr>
  );
}

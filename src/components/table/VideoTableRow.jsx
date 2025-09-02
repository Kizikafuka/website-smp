// src/components/table/VideoTableRow.jsx
export default function VideosTableRow({ index, item, onOpen }) {
  return (
    <tr>
      <td>{index}</td>
      <td className="max-w-[24rem]">
        <div className="truncate" title={item.title}>
          {item.title}
        </div>
      </td>
      <td>{item.className}</td>
      <td>{item.subject}</td>
      <td>
        <a
          className="btn btn-xs btn-primary"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            // kalau mau intercept pakai handler:
            if (onOpen) {
              e.preventDefault();
              onOpen(item);
            }
          }}
        >
          Buka
        </a>
      </td>
    </tr>
  );
}

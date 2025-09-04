// src/components/EksItemCard.jsx

/**
 * A reusable row to display a label and value in the card.
 */
function DetailRow({ label, value }) {
  return (
    <div>
      <div className="text-xs text-base-content/60">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

/**
 * Card to display extracurricular activity information.
 */
export default function EksItemCard({
  photo,
  name,
  coach,
  schedule,
  location,
}) {
  const details = [
    { label: "Nama Ekskul:", value: name },
    { label: "Pembina:", value: coach },
    { label: "Jadwal:", value: schedule },
    { label: "Lokasi:", value: location },
  ];

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm">
      {photo && (
        <figure className="overflow-hidden">
          <img
            src={photo}
            alt={`Foto kegiatan ${name}`}
            className="w-full h-48 object-cover"
          />
        </figure>
      )}
      <div className="card-body p-5 text-sm leading-6 space-y-3">
        {details.map((item, idx) => (
          <DetailRow key={idx} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}

// src/components/EksItemCard.jsx

function DetailRow({ label, value }) {
  const display = value ?? "-";
  return (
    <div className="min-w-0">
      <dt className="text-xs text-base-content/60">{label}</dt>
      <dd
        className="font-semibold truncate"
        title={typeof display === "string" ? display : undefined}
      >
        {display}
      </dd>
    </div>
  );
}

/** Card to display extracurricular activity information. */
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
      {photo ? (
        <figure className="overflow-hidden">
          <img
            src={photo}
            alt={
              name ? `Foto kegiatan ${name}` : "Foto kegiatan ekstrakurikuler"
            }
            className="w-full aspect-[16/9] object-cover"
            loading="lazy"
            decoding="async"
          />
        </figure>
      ) : null}

      <div className="card-body p-5 text-sm leading-6 space-y-3">
        <dl className="grid gap-3">
          {details.map((item, idx) => (
            <DetailRow key={idx} label={item.label} value={item.value} />
          ))}
        </dl>
      </div>
    </div>
  );
}

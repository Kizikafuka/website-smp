// src/components/EksCard.jsx
export default function EksItemCard({
  photo,
  name, // nama ekskul
  coach, // pembina
  schedule, // jadwal, contoh: "Jumat 15.30–17.00"
  location, // lokasi latihan
}) {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm">
      {photo && (
        <figure className="overflow-hidden">
          <img src={photo} alt={name} className="w-full h-48 object-cover" />
        </figure>
      )}
      <div className="card-body p-5 text-sm leading-6">
        <div>
          <div className="text-xs text-base-content/60">Nama Ekskul:</div>
          <div className="font-semibold">{name}</div>
        </div>

        <div>
          <div className="text-xs text-base-content/60">Pembina:</div>
          <div className="font-semibold">{coach}</div>
        </div>

        <div>
          <div className="text-xs text-base-content/60">Jadwal:</div>
          <div className="font-semibold">{schedule}</div>
        </div>

        <div>
          <div className="text-xs text-base-content/60">Lokasi:</div>
          <div className="font-semibold">{location}</div>
        </div>
      </div>
    </div>
  );
}

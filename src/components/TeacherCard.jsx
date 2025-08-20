export default function TeacherCard({
  photo,
  name,
  gender, //
  birthplace, // "Balikpapan"
  birthdate, // "17 Agustus 1945"
  role, // "Guru Mata Pelajaran"
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
          <div className="text-xs text-base-content/60">Nama:</div>
          <div className="font-semibold">{name}</div>
        </div>

        <div>
          <div className="text-xs text-base-content/60">Jenis Kelamin:</div>
          <div className="font-semibold">{gender}</div>
        </div>

        <div>
          <div className="text-xs text-base-content/60">
            Tempat, Tanggal Lahir:
          </div>
          <div className="font-semibold">
            {birthplace}, {birthdate}
          </div>
        </div>

        <div>
          <div className="text-xs text-base-content/60">Jenis GTK:</div>
          <div className="font-semibold">{role}</div>
        </div>
      </div>
    </div>
  );
}

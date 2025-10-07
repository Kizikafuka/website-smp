// src/components/TeacherCard.jsx
import defaultPhoto from "../assets/images/default-teacher.png";

export default function TeacherCard({
  photo,
  name = "-",
  gender = "-",
  birthplace = "-",
  birthdate = "-",
  role = "-",
  className = "",
}) {
  return (
    <article
      className={`card bg-base-100 border border-base-200 shadow-sm rounded-2xl ${className}`}
      aria-labelledby={`teacher-${name}`}
    >
      {/* Header: Foto + Nama */}
      <div className="flex flex-col items-center text-center p-6">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 bg-base-200">
          <img
            src={photo || defaultPhoto}
            alt={name}
            onError={(e) => (e.currentTarget.src = defaultPhoto)}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>

        <h3
          id={`teacher-${name}`}
          className="mt-4 text-lg sm:text-xl font-bold text-primary"
        >
          {name}
        </h3>
        <p className="text-sm text-base-content/70">{role}</p>
      </div>

      {/* Detail yang rapi */}
      <div className="px-6 pb-6">
        <dl className="mt-2 divide-y divide-base-200 rounded-box border border-base-200 bg-base-100">
          {/* Jenis Kelamin */}
          <div className="grid grid-cols-1 sm:grid-cols-[140px,1fr] gap-1 sm:gap-3 p-4">
            <dt className="text-[11px] uppercase tracking-wide text-base-content/60">
              Jenis Kelamin
            </dt>
            <dd className="font-medium text-sm sm:text-base">{gender}</dd>
          </div>

          {/* Tempat Lahir */}
          <div className="grid grid-cols-1 sm:grid-cols-[140px,1fr] gap-1 sm:gap-3 p-4">
            <dt className="text-[11px] uppercase tracking-wide text-base-content/60">
              Tempat Lahir
            </dt>
            <dd className="font-medium text-sm sm:text-base">{birthplace}</dd>
          </div>

          {/* Tanggal Lahir */}
          <div className="grid grid-cols-1 sm:grid-cols-[140px,1fr] gap-1 sm:gap-3 p-4">
            <dt className="text-[11px] uppercase tracking-wide text-base-content/60">
              Tanggal Lahir
            </dt>
            <dd className="font-medium text-sm sm:text-base">{birthdate}</dd>
          </div>

          {/* Jenis GTK */}
          <div className="grid grid-cols-1 sm:grid-cols-[140px,1fr] gap-1 sm:gap-3 p-4">
            <dt className="text-[11px] uppercase tracking-wide text-base-content/60">
              Jenis GTK
            </dt>
            <dd className="font-medium text-sm sm:text-base">{role}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

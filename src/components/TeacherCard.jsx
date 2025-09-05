// src/components/TeacherCard.jsx
import defaultPhoto from "../assets/images/default-teacher.png"; // optional placeholder

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
      className={`card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      {/* Foto Guru */}
      <figure className="relative w-full aspect-[3/4] bg-base-200 overflow-hidden">
        <img
          src={photo || defaultPhoto}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </figure>

      {/* Detail Guru */}
      <div className="card-body p-5 text-sm leading-6">
        <dl className="space-y-3">
          {/* Nama */}
          <div>
            <dt className="text-xs text-base-content/60">Nama:</dt>
            <dd className="font-semibold">{name}</dd>
          </div>

          {/* Jenis Kelamin */}
          <div>
            <dt className="text-xs text-base-content/60">Jenis Kelamin:</dt>
            <dd className="font-semibold">{gender}</dd>
          </div>

          {/* Tempat, Tanggal Lahir */}
          <div>
            <dt className="text-xs text-base-content/60">
              Tempat, Tanggal Lahir:
            </dt>
            <dd className="font-semibold">
              {birthplace}
              {birthplace && birthdate ? ", " : ""}
              {birthdate}
            </dd>
          </div>

          {/* Jenis GTK */}
          <div>
            <dt className="text-xs text-base-content/60">Jenis GTK:</dt>
            <dd className="font-semibold">{role}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

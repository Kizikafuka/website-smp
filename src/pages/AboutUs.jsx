// src/pages/AboutUs.jsx
import mapPin from "../assets/icons/map-pin.svg";
import kepalaSekolahImg from "../assets/images/kepsek.png";

export default function AboutUs() {
  return (
    <>
      {/* HERO */}
      <section
        className="bg-base-200 px-4 sm:px-8 lg:px-24 py-10"
        aria-labelledby="page-title"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Sambutan Kepala Sekolah */}
          <article className="rounded-box bg-base-100 border border-base-200 shadow-sm p-6 sm:p-8">
            <h1
              id="page-title"
              className="text-2xl sm:text-3xl font-extrabold text-primary"
            >
              Sambutan Kepala Sekolah
            </h1>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-base-content/80">
              Assalamualaikum warahmatullahi wabarakatuh. Selamat datang di
              website resmi SMP Negeri 10 Balikpapan. Website ini kami hadirkan
              sebagai media informasi dan komunikasi yang efektif untuk siswa,
              guru, orang tua, serta masyarakat umum.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm sm:text-base text-base-content/80">
              <img src={mapPin} alt="" aria-hidden="true" className="w-5 h-5" />
              <span>SMP Negeri 10 Balikpapan</span>
            </div>
          </article>

          {/* Foto Kepala Sekolah (tanpa hover anim) */}
          <figure className="relative mx-auto w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 aspect-[4/5] rounded-box overflow-hidden bg-base-300 shadow-md">
            <img
              src={kepalaSekolahImg}
              alt="Kepala Sekolah SMP Negeri 10 Balikpapan"
              className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        {/* Quick stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Siswa Aktif", value: "820+" },
            { label: "Guru & Staf", value: "65+" },
            { label: "Ekskul", value: "18" },
            { label: "Prestasi/Thn", value: "40+" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="stat bg-base-100 rounded-box border border-base-200 shadow-sm text-center p-4"
            >
              <div className="stat-value text-primary text-2xl sm:text-3xl">
                {value}
              </div>
              <div className="stat-desc text-base-content/70">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="px-4 sm:px-8 lg:px-24 mt-16 sm:mt-20">
        <div className="max-w-screen-2xl mx-auto grid gap-6 md:grid-cols-2">
          {/* Visi */}
          <article className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition">
            <div className="card-body">
              <h3 className="card-title text-primary">Visi</h3>
              <p className="mt-2 text-base leading-relaxed">
                “Menjadi sekolah yang berkarakter, berprestasi, dan berwawasan
                lingkungan.”
              </p>
            </div>
          </article>

          {/* Misi */}
          <article className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition">
            <div className="card-body">
              <h3 className="card-title text-primary">Misi</h3>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-base leading-relaxed">
                <li>Menumbuhkan akhlak mulia dan budaya disiplin.</li>
                <li>
                  Mengembangkan proses belajar yang aktif, kreatif, dan
                  menyenangkan.
                </li>
                <li>Mendorong prestasi akademik dan non-akademik.</li>
                <li>Mewujudkan lingkungan sekolah yang bersih dan hijau.</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* Quote */}
      <section className="px-4 sm:px-8 lg:px-24 mt-16 sm:mt-20">
        <div className="max-w-screen-lg mx-auto">
          <figure className="rounded-box border border-base-200 bg-base-100 shadow-sm p-6 sm:p-8">
            <blockquote className="text-lg sm:text-xl leading-relaxed text-base-content/90">
              “Pendidikan bukan hanya tentang nilai, tetapi tentang karakter,
              daya juang, dan kemampuan berkolaborasi. Kami membimbing siswa
              untuk tumbuh sebagai pembelajar sepanjang hayat.”
            </blockquote>
            <figcaption className="mt-4 text-base-content/70">
              — Kepala Sekolah,{" "}
              <span className="font-semibold text-primary">
                SMP Negeri 10 Balikpapan
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 sm:px-8 lg:px-24 mt-16 sm:mt-20">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-primary text-center sm:text-left">
            Perjalanan Singkat
          </h2>

          <ol className="relative border-s border-base-300 pl-6 space-y-6">
            {[
              {
                year: "1998",
                text: "Pendirian sekolah dan pembukaan angkatan pertama.",
              },
              {
                year: "2010",
                text: "Akreditasi A dan pengembangan fasilitas laboratorium.",
              },
              {
                year: "2020",
                text: "Transformasi digital & pembelajaran berbasis proyek.",
              },
              {
                year: "2024",
                text: "Penguatan ekosistem literasi & adiwiyata.",
              },
            ].map(({ year, text }) => (
              <li key={year} className="relative">
                <span className="absolute -left-[9px] top-1 size-4 rounded-full bg-primary" />
                <div className="rounded-box bg-base-100 border border-base-200 p-4 shadow-sm">
                  <div className="text-sm text-base-content/70">{year}</div>
                  <div className="font-semibold">{text}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Lokasi */}
      <section className="px-4 sm:px-8 lg:px-24 mt-16 sm:mt-20 mb-16">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-primary text-center sm:text-left">
            Lokasi Sekolah
          </h2>

          <div className="card bg-base-100 border border-base-200 shadow-sm">
            <div className="card-body">
              <div className="rounded-lg overflow-hidden border border-base-200">
                <div className="aspect-video">
                  <iframe
                    title="Lokasi SMP Negeri 10 Balikpapan"
                    src="https://www.google.com/maps?q=SMP+Negeri+10+Balikpapan&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="mt-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=SMP+Negeri+10+Balikpapan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm md:btn-md"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// src/pages/AboutUs.jsx
import calendarIcon from "../assets/icons/calendar.svg";
import clock from "../assets/icons/clock.svg";
import mapPin from "../assets/icons/map-pin.svg";
import kepalaSekolahImg from "../assets/images/kepsek.png";

export default function AboutUs() {
  return (
    <>
      {/* HERO Sambutan */}
      <div className="hero bg-base-200 px-4 sm:px-8 lg:px-24 py-8">
        <div className="hero-content flex-col lg:flex-row items-center gap-8">
          <figure className="relative w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 aspect-[4/5] bg-base-300 rounded-lg shadow-2xl mx-auto lg:mx-0 overflow-hidden shrink-0">
            <img
              src={kepalaSekolahImg}
              alt="Kepala Sekolah SMP Negeri 10 Balikpapan"
              className="absolute inset-0 w-full h-full object-cover object-[50%_20%]" /* bias crop a bit upward */
              loading="lazy"
              decoding="async"
              sizes="(min-width:1280px) 20rem, (min-width:1024px) 18rem, (min-width:768px) 16rem, (min-width:640px) 14rem, 10rem"
            />
          </figure>

          <div className="max-w-prose lg:max-w-xl flex flex-col justify-center">
            <h1
              id="page-title"
              className="text-2xl sm:text-3xl font-extrabold mb-3"
            >
              Sambutan Kepala Sekolah
            </h1>

            <p className="text-base sm:text-lg leading-relaxed">
              Assalamualaikum warahmatullahi wabarakatuh. Selamat datang di
              website resmi SMP Negeri 10 Balikpapan. Website ini kami hadirkan
              sebagai media informasi dan komunikasi yang efektif untuk siswa,
              guru, orang tua, serta masyarakat umum.
            </p>

            <div className="mt-4 space-y-2 text-sm sm:text-base">
              <p className="flex items-center gap-2">
                <img
                  src={calendarIcon}
                  alt=""
                  aria-hidden="true"
                  className="w-5 h-5"
                />
                <time dateTime="2024-08-12">Senin, 12 Agustus 2024</time>
              </p>
              <p className="flex items-center gap-2">
                <img
                  src={clock}
                  alt=""
                  aria-hidden="true"
                  className="w-5 h-5"
                />
                <time>09.00 WITA</time>
              </p>
              <p className="flex items-center gap-2">
                <img
                  src={mapPin}
                  alt=""
                  aria-hidden="true"
                  className="w-5 h-5"
                />
                SMP Negeri 10 Balikpapan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visi & Misi */}
      <section className="mt-[72px] px-4 sm:px-8 lg:px-24">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center sm:text-left">
            Visi &amp; Misi
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Visi */}
            <div className="card bg-base-100 shadow-sm border border-base-200">
              <div className="card-body">
                <h3 className="card-title">Visi</h3>
                <p className="text-base leading-relaxed">
                  “Menjadi sekolah yang berkarakter, berprestasi, dan berwawasan
                  lingkungan.”
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="card bg-base-100 shadow-sm border border-base-200">
              <div className="card-body">
                <h3 className="card-title">Misi</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Menumbuhkan akhlak mulia dan budaya disiplin.</li>
                  <li>
                    Mengembangkan proses belajar yang aktif, kreatif, dan
                    menyenangkan.
                  </li>
                  <li>Mendorong prestasi akademik dan non-akademik.</li>
                  <li>Mewujudkan lingkungan sekolah yang bersih dan hijau.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lokasi / Google Maps */}
      <section className="mt-[72px] px-4 sm:px-8 lg:px-24 mb-[72px]">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center sm:text-left">
            Lokasi Sekolah
          </h2>

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
              className="btn btn-sm md:btn-md"
            >
              Buka di Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

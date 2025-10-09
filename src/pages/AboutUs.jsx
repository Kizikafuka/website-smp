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
            <p className="mt-3 text-lg leading-relaxed text-base-content/80">
              Assalamualaikum warahmatullahi wabarakatuh. Selamat datang di
              website resmi SMP Negeri 10 Balikpapan. Website ini kami hadirkan
              sebagai media informasi dan komunikasi yang efektif untuk siswa,
              guru, orang tua, serta masyarakat umum.
            </p>

            <div className="mt-4 flex items-center gap-2 text-base text-base-content/80">
              <img src={mapPin} alt="" aria-hidden="true" className="w-5 h-5" />
              <span>SMP Negeri 10 Balikpapan</span>
            </div>
          </article>

          {/* Foto Kepala Sekolah */}
          <figure className="relative mx-auto w-52 sm:w-60 md:w-72 lg:w-80 aspect-[4/5] rounded-box overflow-hidden bg-base-300 shadow-md">
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
              className="stat bg-base-100 rounded-box border border-base-200 shadow-sm text-center p-5"
            >
              <div className="stat-value text-primary text-3xl sm:text-4xl">
                {value}
              </div>
              <div className="stat-desc text-base-content/70 text-base">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VISI, MISI, TUJUAN (Accordion - Single Open) */}
      <section className="px-4 sm:px-8 lg:px-24 mt-20">
        <div className="max-w-screen-lg mx-auto">
          <div className="join join-vertical bg-base-100 rounded-box border border-base-200 text-[1.05rem] leading-relaxed">
            {/* A. Visi */}
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="vm-accordion" defaultChecked />
              <div className="collapse-title font-semibold text-primary text-lg">
                A. Visi
              </div>
              <div className="collapse-content prose prose-base dark:prose-invert max-w-none">
                <p className="font-medium">
                  “TERWUJUDNYA INSAN YANG BERIMAN, BERPRESTASI, TERAMPIL DAN
                  PEDULI LINGKUNGAN”
                </p>
                <h4 className="mt-4 font-semibold text-base-content/80">
                  Indikator Visi:
                </h4>
                <ul className="mt-2 list-disc pl-6 space-y-2">
                  <li>
                    Terwujudnya pelaksanaan ibadah berjamaah secara konsisten
                    dan berkesinambungan.
                  </li>
                  <li>
                    Terwujudnya murid yang berkarakter dan berakhlak mulia.
                  </li>
                  <li>
                    Terwujudnya murid yang unggul dalam bidang akademik dan non
                    akademik.
                  </li>
                  <li>Terwujudnya pendidikan berwawasan global.</li>
                  <li>
                    Terwujudnya pendidikan yang mengembangkan keterampilan abad
                    21.
                  </li>
                  <li>
                    Terwujudnya lingkungan belajar yang bersih, indah, aman,
                    nyaman, dan menyenangkan.
                  </li>
                </ul>
              </div>
            </div>

            {/* B. Misi */}
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="vm-accordion" />
              <div className="collapse-title font-semibold text-primary text-lg">
                B. Misi
              </div>
              <div className="collapse-content prose prose-base dark:prose-invert max-w-none">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Mewajibkan pelaksanaan ibadah rutin, seperti shalat
                    berjamaah dan kegiatan ibadah keagamaan lainnya.
                  </li>
                  <li>
                    Menanamkan sikap dan perilaku berakhlak mulia melalui
                    kurikulum, pembelajaran, dan pembiasaan sehari-hari.
                  </li>
                  <li>
                    Membiasakan perilaku hormat dan santun kepada guru, orang
                    tua, teman, dan sesama melalui penerapan 5S.
                  </li>
                  <li>
                    Menyelenggarakan pembelajaran yang aktif, inovatif, kreatif,
                    efektif, dan menyenangkan.
                  </li>
                  <li>
                    Mengembangkan potensi, minat, dan bakat murid melalui
                    kegiatan ekstrakurikuler secara terarah dan berkelanjutan.
                  </li>
                  <li>
                    Menanamkan nilai-nilai karakter, disiplin, dan tanggung
                    jawab dalam setiap kegiatan akademik maupun non-akademik.
                  </li>
                  <li>
                    Membekali murid dengan keterampilan abad 21 (critical
                    thinking, creativity, collaboration, communication).
                  </li>
                  <li>
                    Mewujudkan pembelajaran yang berpusat pada murid.
                    <ul className="mt-2 pl-6 list-disc marker:text-base-content/50 space-y-1">
                      <li>
                        Melakukan proses pembelajaran dengan menumbuhkan
                        pendidikan berkarakter global.
                      </li>
                      <li>
                        Mendorong keterampilan berpikir kritis, analitis, dan
                        reflektif.
                      </li>
                      <li>
                        Mendorong pembelajaran yang mandiri serta kolaboratif.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Mewujudkan pendidikan yang terintegrasi keterampilan abad
                    ke-21.
                    <ul className="mt-2 pl-6 list-disc marker:text-base-content/50 space-y-1">
                      <li>Membentuk kreativitas dan inovasi.</li>
                      <li>
                        Memperkuat keterampilan komunikasi dan kolaborasi.
                      </li>
                      <li>Membekali dengan numerasi dan literasi digital.</li>
                    </ul>
                  </li>
                  <li>
                    Mewujudkan budaya peduli kebersihan dan kesehatan di seluruh
                    warga sekolah.
                  </li>
                  <li>
                    Mewujudkan tata lingkungan sekolah yang hijau, indah, dan
                    asri.
                  </li>
                  <li>
                    Mewujudkan peran serta seluruh warga sekolah dan masyarakat
                    dalam menjaga lingkungan belajar.
                  </li>
                </ul>
              </div>
            </div>

            {/* C. Tujuan */}
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="vm-accordion" />
              <div className="collapse-title font-semibold text-primary text-lg">
                C. Tujuan
              </div>
              <div className="collapse-content prose prose-base dark:prose-invert max-w-none">
                <p>
                  Tujuan pendidikan pada SMP Negeri 10 Balikpapan adalah langkah
                  untuk mewujudkan visi sekolah dalam jangka waktu tertentu.
                  Pada tahun pelajaran 2025/2026 SMP Negeri 10 Balikpapan
                  mencanangkan tujuan pendidikan yang diharapkan yaitu:
                </p>
                <ul className="mt-2 list-disc pl-6 space-y-2">
                  <li>
                    Menjadikan iman sebagai dasar perilaku sehari-hari di
                    lingkungan sekolah dan masyarakat.
                  </li>
                  <li>
                    Sekolah sebagai tempat yang kondusif untuk pembinaan akhlak
                    dan spiritualitas.
                  </li>
                  <li>
                    Menjadikan generasi yang seimbang antara IQ, EQ, dan SQ.
                  </li>
                  <li>
                    Menyiapkan murid menjadi pemimpin masa depan yang bermoral
                    dan berintegritas tinggi.
                  </li>
                  <li>
                    Meningkatkan kualitas proses belajar mengajar yang berpusat
                    pada peserta didik.
                  </li>
                  <li>
                    Membiasakan penggunaan metode dan media pembelajaran yang
                    bervariasi.
                  </li>
                  <li>
                    Memberikan kesempatan seluas-luasnya kepada murid untuk
                    mengikuti kegiatan ekstrakurikuler.
                  </li>
                  <li>
                    Menumbuhkan sikap sportivitas, kreativitas, dan rasa percaya
                    diri.
                  </li>
                  <li>
                    Melahirkan prestasi murid di bidang olahraga, seni, dan
                    keterampilan lainnya.
                  </li>
                  <li>
                    Membiasakan murid berperilaku jujur, disiplin, dan
                    bertanggung jawab.
                  </li>
                  <li>
                    Membiasakan 7 KAIH (Kebiasaan Anak Indonesia Hebat) dalam
                    kehidupan sehari-hari.
                  </li>
                  <li>
                    Menciptakan budaya sekolah yang berkarakter positif, saling
                    menghargai, dan gotong royong.
                  </li>
                  <li>
                    Melakukan pembinaan yang berkelanjutan terhadap pelanggaran
                    tata tertib sekolah.
                  </li>
                  <li>
                    Mengembangkan kemampuan berpikir kritis dan memecahkan
                    masalah.
                  </li>
                  <li>
                    Mendorong kreativitas dalam menghasilkan karya inovatif.
                  </li>
                  <li>
                    Membiasakan kerja sama dan komunikasi efektif dalam
                    kelompok.
                  </li>
                  <li>
                    Meningkatkan daya saing murid dalam kegiatan akademik maupun
                    non-akademik.
                  </li>
                  <li>
                    Mewujudkan pembelajaran yang berpusat pada murid.
                    <ul className="mt-2 pl-6 list-disc marker:text-base-content/50 space-y-1">
                      <li>
                        Menunjukkan sikap toleransi, empati, dan tanggung jawab
                        sosial.
                      </li>
                      <li>
                        Menganalisis isu global dan lokal secara kritis serta
                        mencari solusi inovatif.
                      </li>
                      <li>
                        Merencanakan dan melaksanakan proyek pembelajaran secara
                        mandiri maupun kolaboratif.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Mewujudkan pendidikan yang mengembangkan keterampilan abad
                    ke-21.
                    <ul className="mt-2 pl-6 list-disc marker:text-base-content/50 space-y-1">
                      <li>
                        Menciptakan karya orisinal dan kreatif untuk
                        menyelesaikan masalah nyata.
                      </li>
                      <li>
                        Mengembangkan kemampuan komunikasi dan kolaborasi lintas
                        budaya.
                      </li>
                      <li>
                        Menguasai teknologi secara bijak, etis, dan bertanggung
                        jawab.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Terwujudnya budaya peduli kebersihan dan kesehatan seluruh
                    warga sekolah.
                    <ul className="mt-2 pl-6 list-disc marker:text-base-content/50 space-y-1">
                      <li>
                        Meningkatkan kepedulian terhadap kebersihan dan
                        kesehatan lingkungan.
                      </li>
                      <li>
                        Membiasakan menjaga kebersihan kelas dan lingkungan
                        sekolah.
                      </li>
                      <li>Melaksanakan program 3R (Reduce, Reuse, Recycle).</li>
                      <li>
                        Menerapkan gaya hidup sehat dan bersih di sekolah.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Terwujudnya tata lingkungan sekolah yang hijau, indah, dan
                    asri.
                    <ul className="mt-2 pl-6 list-disc marker:text-base-content/50 space-y-1">
                      <li>
                        Membentuk lingkungan sekolah yang hijau dan tertata
                        rapi.
                      </li>
                      <li>
                        Menyediakan area hijau seperti taman sekolah dan pot
                        tanaman.
                      </li>
                      <li>Menata ruang kelas yang nyaman dan bersih.</li>
                      <li>
                        Menjaga sarana prasarana agar terawat dengan baik.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Terwujudnya partisipasi seluruh warga sekolah dan
                    masyarakat.
                    <ul className="mt-2 pl-6 list-disc marker:text-base-content/50 space-y-1">
                      <li>
                        Melibatkan warga sekolah dan masyarakat dalam program
                        kebersihan dan keindahan.
                      </li>
                      <li>
                        Bekerja sama dengan pihak luar (DLH, komunitas, alumni).
                      </li>
                      <li>
                        Membangun budaya gotong royong antara guru, murid, dan
                        masyarakat sekitar.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="px-4 sm:px-8 lg:px-24 mt-20">
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

      {/* TIMELINE */}
      <section className="px-4 sm:px-8 lg:px-24 mt-20">
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
                <div className="rounded-box bg-base-100 border border-base-200 p-5 shadow-sm">
                  <div className="text-sm text-base-content/70">{year}</div>
                  <div className="font-semibold text-base">{text}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* LOKASI */}
      <section className="px-4 sm:px-8 lg:px-24 mt-20 mb-20">
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

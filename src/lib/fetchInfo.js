export async function fetchInfo() {
  const res = await fetch(`/data/info.json?ts=${Date.now()}`);
  if (!res.ok) throw new Error("Gagal memuat info.json");
  return res.json();
}

// Format tanggal Indonesia singkat untuk tile (contoh: "08 Jul 2025")
export function formatTanggalTile(iso) {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

// Pecah untuk varian row: ["08", "Jul 2025"]
export function splitTanggalRow(iso) {
  const str = formatTanggalTile(iso); // "08 Jul 2025"
  const [day, ...rest] = str.split(" ");
  return [day, rest.join(" ")]; // ["08", "Jul 2025"]
}

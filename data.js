/* ============================================================
   DATA.JS  —  EDIT DI SINI SAJA (nama web, banner, game, link)
   ============================================================ */

const SITE = {
  nama: "Mobilador Seru",
  linkWhatsApp: "https://whatsapp.com/channel/GANTI_LINK_SALURAN_WA",
  linkYouTube: "https://www.youtube.com/@ridwan.gamingid"
};

/* BANNER: gambar = nama file gambar (contoh "banner1.jpg"), kosongkan "" kalau belum ada.
   Ukuran yang disarankan 1920x640 px. */
const BANNERS = [
  { gambar: "bener1.png", judul: "Download Game Gratis", teks: "Pilih game favoritmu, lihat detailnya, lalu download langsung." },
  { gambar: "bener2.jpg", judul: "Game Baru Setiap Minggu", teks: "Cek terus daftar game terbaru di sini." },
  { gambar: "bener3.jpg", judul: "Ikuti Saluran Kami", teks: "Dapatkan info update lewat WhatsApp." }
];

/* GAME: tambah / hapus / ubah sesuka kamu.
   gambar  = nama file gambar cover (kosongkan "" kalau belum ada)
   link    = LINK FILE DOWNLOAD (contoh: "https://situsmu.com/file/game.apk")
   namaFile= nama file saat tersimpan di HP/PC */
const GAMES = [
  {
    id: "game-1",
    nama: "Nama Game 1",
    gambar: "",
    ukuran: "120 MB",
    platform: "Android",
    versi: "1.0.0",
    populer: true,
    deskripsi: "Tulis deskripsi singkat game di sini.",
    link: "https://www.mediafire.com/file/d7etq0i83xndp3p/GG_3_X_NARUTO.apk/file",
    namaFile: "game1.apk"
  },
  {
    id: "game-2",
    nama: "Nama Game 2",
    gambar: "",
    ukuran: "250 MB",
    platform: "Android",
    versi: "2.3.1",
    populer: true,
    deskripsi: "Tulis deskripsi singkat game di sini.",
    link: "https://example.com/file/game2.apk",
    namaFile: "game2.apk"
  },
  {
    id: "game-3",
    nama: "Nama Game 3",
    gambar: "",
    ukuran: "1.2 GB",
    platform: "PC",
    versi: "0.9.5",
    populer: true,
    deskripsi: "Tulis deskripsi singkat game di sini.",
    link: "https://example.com/file/game3.zip",
    namaFile: "game3.zip"
  },
  {
    id: "game-4",
    nama: "Nama Game 4",
    gambar: "",
    ukuran: "85 MB",
    platform: "Android",
    versi: "1.4.0",
    populer: false,
    deskripsi: "Tulis deskripsi singkat game di sini.",
    link: "https://example.com/file/game4.apk",
    namaFile: "game4.apk"
  },
  {
    id: "game-5",
    nama: "Nama Game 5",
    gambar: "",
    ukuran: "310 MB",
    platform: "Android",
    versi: "3.0.2",
    populer: false,
    deskripsi: "Tulis deskripsi singkat game di sini.",
    link: "https://example.com/file/game5.apk",
    namaFile: "game5.apk"
  },
  {
    id: "game-6",
    nama: "Nama Game 6",
    gambar: "",
    ukuran: "2.1 GB",
    platform: "PC",
    versi: "1.1.0",
    populer: false,
    deskripsi: "Tulis deskripsi singkat game di sini.",
    link: "https://example.com/file/game6.zip",
    namaFile: "game6.zip"
  }
];

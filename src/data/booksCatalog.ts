import { Book } from '../types/library';

export const HERO_LIBRARY_IMAGE = '/src/assets/images/hero_library_reading_1795676325167.jpg';

export const BOOKS_CATALOG: Book[] = [
  {
    id: 'bk-arsitektur-sistem-desain',
    title: 'Arsitektur Sistem & Pola Pikir Desain',
    subtitle: 'Merancang Produk Digital yang Terukur dan Berkelanjutan',
    author: 'Raka Mahendra',
    publisher: 'Penerbit Lintas Media',
    year: 2025,
    pages: 264,
    isbn: '978-602-8145-12-4',
    category: 'Skill',
    clinicTrack: 'Desain & Produk Digital',
    rating: 4.9,
    borrowCount: 1420,
    isPopular: true,
    synopsis:
      'Panduan komprehensif bagi perancang produk dan pengembang perangkat lunak untuk menyatukan sistem tipografi, komponen antarmuka, dan arsitektur informasi dalam satu fondasi kerja yang rapi dan mudah dipelihara.',
    learningTakeaways: [
      'Menyusun skala tipografi dan hierarki ruang tanpa ketergantungan pada dekorasi berlebih.',
      'Membangun pustaka komponen yang konsisten antara tim desain dan rekayasa.',
      'Mengukur beban kognitif pengguna pada alur navigasi dan formulir kompleks.',
    ],
    practiceTasks: [
      'Audit 3 halaman utama produk Anda menggunakan prinsip proporsi 60-30-10.',
      'Buat inventaris token warna semantik yang memisahkan permukaan dan aksen.',
      'Susun dokumentasi komponen untuk tombol, kartu, dan tabel data.',
    ],
    cover: {
      imageSrc: '/src/assets/images/cover_skill_architecture_1795676325741.jpg',
      bgClass: 'bg-[#EFF3F8]',
      inkClass: 'text-[#1E3A8A]',
      accentHex: '#1E3A8A',
      motif: 'grid',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Bab 1: Anatomi Keteraturan Visual',
        estimatedMinutes: 8,
        pullQuote:
          'Desain antarmuka yang baik tidak memamerkan kerumitan alat pembuatnya; ia menuntun mata pembaca langsung menuju makna.',
        paragraphs: [
          'Setiap sistem digital yang bertahan lama selalu bertumpu pada keputusan struktural yang sederhana namun konsisten. Ketika kita membuka sebuah halaman atau aplikasi, otak manusia memindai pola sebelum membaca satu kata pun. Jarak antar elemen, ketebalan garis pembatas, dan keselarasan kolom secara diam-diam menentukan apakah sebuah informasi terasa dapat dipercaya.',
          'Banyak tim produk terjebak dalam penambahan hiasan visual untuk menutupi lemahnya struktur informasi. Padahal, ruang kosong yang terukur jauh lebih efektif dalam memisahkan gagasan daripada kotak berlapis-lapis. Dengan menjaga ruang luar wadah tetap lebih besar daripada jarak antar elemen di dalamnya, mata pengguna memperoleh jeda bernapas yang alami.',
          'Mulailah setiap perancangan dengan menuliskan hierarki pembacaan: apa satu hal terpenting yang harus dipahami dalam tiga detik pertama, apa aksi pendukungnya, dan informasi mana yang cukup hadir sebagai konteks tenang di latar belakang.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Bab 2: Bahasa Komponen dan Skala Tipografi',
        estimatedMinutes: 10,
        pullQuote:
          'Tipografi bukan sekadar memilih rupa huruf yang indah, melainkan mengatur ritme napas antara judul, isi, dan angka.',
        paragraphs: [
          'Dalam produk digital modern, teks mencakup lebih dari delapan puluh persen permukaan layar. Pemilihan dua keluarga huruf yang saling melengkapi—satu huruf berkarakter untuk judul dan satu huruf yang jernih untuk bacaan panjang—sudah memadai untuk membangun identitas yang matang.',
          'Untuk tabel, jadwal peminjaman, maupun metrik perkembangan belajar, angka tabular wajib digunakan agar setiap digit berdiri sejajar secara vertikal. Ketidaksejajaran satu piksel pada deretan angka tanggal atau durasi sering kali membuat pengguna sulit membandingkan baris data dengan cepat.',
          'Selain itu, lebar kolom bacaan ideal berada di kisaran enam puluh hingga tujuh puluh lima karakter per baris. Baris yang terlalu panjang membuat mata lelah saat berpindah ke baris berikutnya, sedangkan baris yang terlalu sempit memutus alur kalimat.',
        ],
      },
      {
        id: 'ch-3',
        number: 3,
        title: 'Bab 3: Menjaga Konsistensi Saat Tim Bertumbuh',
        estimatedMinutes: 9,
        paragraphs: [
          'Tantangan terbesar dalam pengelolaan sistem desain bukanlah saat membuatnya pertama kali, melainkan enam bulan setelah puluhan fitur baru ditambahkan. Tanpa kesepakatan penamaan token dan aturan komponen, variasi kecil akan bermunculan dan menggerogoti kohesi pengalaman.',
          'Lakukan tinjauan berkala setiap dua minggu bersama desainer dan insinyur front-end. Dokumentasikan bukan hanya bentuk akhir sebuah komponen, tetapi juga kapan ia boleh dan tidak boleh digunakan. Kejelasan batasan inilah yang memberi kecepatan kerja bagi seluruh tim.',
        ],
      },
    ],
  },
  {
    id: 'bk-seni-berpikir-jernih',
    title: 'Seni Berpikir Jernih di Tengah Kebisingan',
    subtitle: 'Latihan Fokus Mendalam dan Pengambilan Keputusan',
    author: 'Nadia Kusumawardhani',
    publisher: 'Aksara Cendekia',
    year: 2025,
    pages: 218,
    isbn: '978-602-7721-08-3',
    category: 'Self Development',
    clinicTrack: 'Fokus & Kebiasaan',
    rating: 4.8,
    borrowCount: 1685,
    isPopular: true,
    synopsis:
      'Buku pengembangan diri yang membedah bagaimana perhatian kita terfragmentasi oleh ritme kerja serba cepat, disertai kerangka latihan harian untuk memulihkan ketenangan berpikir dan ketuntasan kerja.',
    learningTakeaways: [
      'Mengenali perbedaan antara kesibukan semu dan kemajuan kerja yang bermakna.',
      'Menerapkan blok waktu fokus 90 menit tanpa gangguan notifikasi non-esensial.',
      'Menyusun jurnal refleksi mingguan untuk mengevaluasi kualitas keputusan.',
    ],
    practiceTasks: [
      'Terapkan satu sesi kerja mendalam 60 menit setiap pagi sebelum membuka surel atau pesan instan.',
      'Catat tiga keputusan terpenting pekan ini beserta asumsi dasarnya.',
      'Tetapkan jam tutup layar 45 menit sebelum tidur selama lima hari berturut-turut.',
    ],
    cover: {
      imageSrc: '/src/assets/images/cover_self_reflection_1795676325396.jpg',
      bgClass: 'bg-[#EEF1EE]',
      inkClass: 'text-[#1F2937]',
      accentHex: '#3F6212',
      motif: 'horizon',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Bab 1: Ekonomi Perhatian dan Biaya Peralihan',
        estimatedMinutes: 7,
        pullQuote:
          'Setiap kali kita berpindah tugas karena gangguan kecil, sebagian perhatian tertinggal di tugas sebelumnya dan tidak segera kembali.',
        paragraphs: [
          'Kita hidup di masa ketika akses terhadap informasi tidak pernah semudah ini, namun kejernihan pikiran justru terasa semakin langka. Banyak profesional mengira dirinya mampu mengerjakan empat hal sekaligus, padahal otak manusia sebenarnya hanya memindahkan sorotan perhatian secara cepat dari satu konteks ke konteks lain.',
          'Biaya peralihan konteks ini tidak langsung tampak dalam hitungan menit, tetapi terasa nyata pada akhir hari: kepala terasa penuh, pekerjaan besar belum beranjak, dan kepuasan batin menurun. Memahami mekanisme ini adalah langkah pertama untuk merebut kembali kendali atas hari kerja kita.',
          'Kejernihan berpikir lahir dari keberanian menyederhanakan daftar prioritas. Alih-alih menambah daftar tugas, mulailah dengan menentukan dua hal yang benar-benar layak mendapatkan energi terbaik Anda pagi ini.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Bab 2: Ritual Memasuki Kondisi Fokus Mendalam',
        estimatedMinutes: 9,
        pullQuote:
          'Disiplin bukan tentang memaksa diri tanpa henti, melainkan merancang lingkungan agar pilihan baik terasa paling mudah dilakukan.',
        paragraphs: [
          'Pikiran menyukai penanda transisi. Sama seperti perpustakaan fisik yang langsung mengubah cara kita bersikap saat melangkah masuk, ruang kerja digital pun membutuhkan penanda batas. Menyiapkan meja rapi, menutup tab yang tidak relevan, dan menuliskan satu tujuan sesi dalam satu kalimat memberi sinyal jelas bagi otak.',
          'Gunakan ritme sembilan puluh menit kerja terfokus diikuti lima belas menit jeda tanpa layar. Berjalan sejenak, minum air, atau menatap cakrawala jauh membantu sistem saraf memulihkan kapasitas analisis sebelum memasuki putaran berikutnya.',
        ],
      },
      {
        id: 'ch-3',
        number: 3,
        title: 'Bab 3: Pengambilan Keputusan dengan Jarak Emosi',
        estimatedMinutes: 8,
        paragraphs: [
          'Keputusan terburuk sering kali lahir saat kita bereaksi terlalu cepat terhadap tekanan sesaat. Memberi jeda dua puluh empat jam untuk keputusan strategis memungkinkan fakta mengendap dan emosi mereda.',
          'Tuliskan skenario terbaik, skenario paling mungkin, dan langkah mitigasi jika asumsi meleset. Ketika risiko terlihat di atas kertas, rasa cemas berkurang dan tindakan menjadi lebih terarah.',
        ],
      },
    ],
  },
  {
    id: 'bk-rekayasa-perangkat-lunak',
    title: 'Kriya Rekayasa Perangkat Lunak Modern',
    subtitle: 'Prinsip Pemrograman Bersih, Pengujian, dan Skala Sistem',
    author: 'Dimas Pratama Putra',
    publisher: 'Pustaka Teknologi Nusantara',
    year: 2024,
    pages: 342,
    isbn: '978-602-9910-44-7',
    category: 'Skill',
    clinicTrack: 'Desain & Produk Digital',
    rating: 4.9,
    borrowCount: 1310,
    isPopular: true,
    synopsis:
      'Membahas praktik nyata membangun kode yang mudah dibaca manusia, pemodelan tipe data yang aman, pengujian otomatis, serta strategi refactoring bertahap pada proyek berskala besar.',
    learningTakeaways: [
      'Menulis fungsi berfokus tunggal dengan kontrak input dan output yang eksplisit.',
      'Merancang lapisan domain yang terpisah dari kerangka kerja antarmuka.',
      'Membangun jaring pengaman pengujian sebelum melakukan perubahan arsitektur.',
    ],
    practiceTasks: [
      'Identifikasi satu modul panjang di proyek Anda dan pisahkan logika bisnis dari komponen tampilan.',
      'Tambahkan pengujian unit untuk tiga kasus tepi (edge case) terpenting.',
      'Lakukan peninjauan kode dengan fokus pada penamaan variabel yang deskriptif.',
    ],
    cover: {
      imageSrc: '/src/assets/images/cover_systems_craft_1795676327004.jpg',
      bgClass: 'bg-[#111827]',
      inkClass: 'text-[#F9FAFB]',
      accentHex: '#D97706',
      motif: 'prism',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Bab 1: Kode Ditulis untuk Dibaca Manusia',
        estimatedMinutes: 10,
        pullQuote:
          'Mesin hanya peduli apakah instruksi dapat dijalankan; rekan tim Anda peduli apakah niat di balik instruksi itu dapat dipahami enam bulan lagi.',
        paragraphs: [
          'Sebagian besar waktu seorang insinyur perangkat lunak dihabiskan bukan untuk mengetik baris baru, melainkan membaca dan menalar kode yang sudah ada. Karena itu, kejelasan ekspresi jauh lebih berharga daripada trik sintaks yang singkat namun membingungkan.',
          'Nama variabel dan fungsi seharusnya menjelaskan tujuan domain, bukan sekadar jenis strukturnya. Alih-alih menamai daftar dengan kata umum seperti dataList, pilihlah nama yang langsung bercerita seperti activeLoanRecords atau overdueNotifications.',
          'Ketika kode terasa jernih saat dibaca dari atas ke bawah layaknya esai teknis, bug lebih mudah terlihat sebelum aplikasi sempat dijalankan.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Bab 2: Pemodelan State yang Mustahil Salah',
        estimatedMinutes: 11,
        paragraphs: [
          'Banyak kesalahan pada aplikasi berasal dari kombinasi status yang saling bertentangan, misalnya sebuah pinjaman tercatat sudah dikembalikan tetapi masih memiliki penanda terlambat yang aktif. Dengan sistem tipe yang ketat dan state turunan (derived state), celah semacam ini dapat ditutup sejak tahap kompilasi.',
          'Simpanlah fakta dasar sebagai sumber kebenaran tunggal—seperti tanggal jatuh tempo dan status pengembalian—lalu hitung kondisi keterlambatan secara dinamis berdasarkan waktu terkini.',
        ],
      },
      {
        id: 'ch-3',
        number: 3,
        title: 'Bab 3: Refactoring sebagai Kebiasaan Harian',
        estimatedMinutes: 9,
        paragraphs: [
          'Merapikan kode bukanlah proyek besar yang menunggu persetujuan kuartalan, melainkan kebiasaan kecil setiap kali kita menyentuh sebuah berkas. Prinsipnya sederhana: tinggalkan modul sedikit lebih rapi daripada kondisi saat Anda pertama kali membukanya.',
        ],
      },
    ],
  },
  {
    id: 'bk-catatan-nusantara',
    title: 'Jejak Maritim & Cerita dari Pesisir Timur',
    subtitle: 'Kumpulan Esai Sejarah, Budaya, dan Lanskap Kepulauan',
    author: 'Siti Rahmawati',
    publisher: 'Balai Pustaka Baru',
    year: 2024,
    pages: 296,
    isbn: '978-602-5412-89-0',
    category: 'Buku Umum',
    rating: 4.8,
    borrowCount: 1190,
    isPopular: true,
    synopsis:
      'Sebuah perjalanan literer menelusuri kota-kota pelabuhan tua di Nusantara, tradisi perkapalan kayu, jalur rempah, hingga kisah masyarakat pesisir yang merawat ingatan kolektif di tengah perubahan zaman.',
    cover: {
      imageSrc: '/src/assets/images/cover_general_archipelago_1795676327052.jpg',
      bgClass: 'bg-[#E6ECEA]',
      inkClass: 'text-[#111827]',
      accentHex: '#14532D',
      motif: 'wave',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Bab 1: Angin Muson dan Kota-Kota Bandar',
        estimatedMinutes: 9,
        pullQuote:
          'Di kepulauan ini, laut bukanlah pemisah antar daratan, melainkan jalan raya purba yang mempertemukan bahasa, rasa, dan gagasan.',
        paragraphs: [
          'Sebelum peta modern digambar dengan garis batas tegas, arah angin muson adalah kalender hidup bagi para pelaut Nusantara. Ketika angin bertiup dari timur, perahu-perahu layar meninggalkan pelabuhan rempah menuju bandar dagang di barat, membawa bukan hanya cengkih dan pala, melainkan juga hikayat, teknik tenun, serta kosa kata baru.',
          'Di dermaga tua yang kini sunyi, sisa-sisa gudang batu karang dan menara pandang masih berdiri menyimpan gema percakapan lintas bangsa. Membaca sejarah pesisir berarti memahami bahwa keterbukaan dan keluwesan telah lama menjadi watak dasar kebudayaan maritim kita.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Bab 2: Kayu Ulin, Pahatan, dan Doa Para Pembuat Perahu',
        estimatedMinutes: 10,
        paragraphs: [
          'Di pesisir selatan, pembuatan perahu tradisional masih dikerjakan tanpa gambar cetak biru modern. Sang punggawa membaca lengkung papan kayu dengan telapak tangan dan ingatan turun-temurun yang diwariskan dari generasi ke generasi.',
          'Setiap sambungan pasak kayu memiliki nama dan makna tersendiri, mengingatkan bahwa karya yang tangguh lahir dari kesabaran menghormati karakter bahan alam.',
        ],
      },
      {
        id: 'ch-3',
        number: 3,
        title: 'Bab 3: Menjaga Ingatan Pesisir untuk Masa Depan',
        estimatedMinutes: 8,
        paragraphs: [
          'Perubahan iklim dan modernisasi pelabuhan membawa tantangan baru bagi komunitas pesisir. Namun di banyak kampung bahari, generasi muda mulai mendokumentasikan kisah lisan para tetua laut dalam arsip digital dan taman bacaan warga.',
        ],
      },
    ],
  },
  {
    id: 'bk-komunikasi-strategis',
    title: 'Komunikasi Strategis & Seni Mendengar Aktif',
    subtitle: 'Membangun Kepercayaan dalam Diskusi dan Kepemimpinan Tim',
    author: 'Budi Santoso Wijaya',
    publisher: 'Cakra Ilmu',
    year: 2025,
    pages: 204,
    isbn: '978-602-4410-19-2',
    category: 'Skill',
    clinicTrack: 'Komunikasi & Negosiasi',
    rating: 4.7,
    borrowCount: 980,
    isPopular: true,
    synopsis:
      'Membedah teknik menyusun argumen yang ringkas, memimpin rapat tanpa bertele-tele, memberi umpan balik yang membangun, serta mendengarkan secara aktif dalam situasi negosiasi.',
    learningTakeaways: [
      'Menyampaikan inti gagasan di awal kalimat dengan metode piramida terbalik.',
      'Memisahkan pengamatan objektif dari penilaian pribadi saat memberi umpan balik.',
      'Mengajukan pertanyaan terbuka yang memicu kolaborasi lintas tim.',
    ],
    practiceTasks: [
      'Rangkum pembaruan proyek mingguan Anda menjadi maksimal tiga poin utama.',
      'Latih parafrase ulang pernyataan lawan bicara sebelum mengajukan tanggapan.',
    ],
    cover: {
      bgClass: 'bg-[#1E3A8A]',
      inkClass: 'text-[#FFFFFF]',
      accentHex: '#93C5FD',
      motif: 'compass',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Bab 1: Kejelasan Sebelum Kelancaran',
        estimatedMinutes: 8,
        pullQuote:
          'Pembicara yang efektif tidak berusaha terdengar pintar; ia berusaha membuat gagasan yang rumit terasa terang bagi pendengarnya.',
        paragraphs: [
          'Banyak kesalahpahaman di ruang rapat terjadi bukan karena niat buruk, melainkan karena pembicara menunda kesimpulan hingga akhir paparan. Pendengar yang lelah sudah kehilangan benang merah sebelum poin terpenting diucapkan.',
          'Mulailah dengan menyatakan keputusan atau usulan utama dalam satu kalimat padat, lalu susul dengan dua hingga tiga alasan pendukung beserta contoh konkret.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Bab 2: Mendengar untuk Memahami, Bukan Menjawab',
        estimatedMinutes: 9,
        paragraphs: [
          'Sebagian besar dari kita mendengar sambil menyiapkan bantahan di kepala. Akibatnya, nuansa kekhawatiran lawan bicara terlewatkan. Ketika kita berani berhenti sejenak dan merangkum kembali maksud rekan kerja dengan bahasa netral, ketegangan sering kali langsung mencair.',
        ],
      },
    ],
  },
  {
    id: 'bk-kebiasaan-atomik-harian',
    title: 'Arsitektur Kebiasaan & Ritme Pertumbuhan',
    subtitle: 'Mengubah Konsistensi Kecil Menjadi Kemajuan Jangka Panjang',
    author: 'Larasati Permata',
    publisher: 'Aksara Cendekia',
    year: 2024,
    pages: 232,
    isbn: '978-602-7721-51-9',
    category: 'Self Development',
    clinicTrack: 'Fokus & Kebiasaan',
    rating: 4.9,
    borrowCount: 1540,
    isPopular: true,
    synopsis:
      'Menguraikan cara merancang sistem kebiasaan pribadi yang realistis untuk membaca, belajar keterampilan baru, dan menjaga kesehatan mental tanpa bergantung pada motivasi sesaat.',
    learningTakeaways: [
      'Menautkan kebiasaan baru ke rutinitas harian yang sudah mapan (habit stacking).',
      'Menerapkan aturan dua menit untuk mengatasi hambatan awal saat malas.',
      'Menjaga kesinambungan dengan aturan tidak pernah absen dua kali berturut-turut.',
    ],
    practiceTasks: [
      'Tentukan waktu tetap 15 menit setiap hari khusus untuk membaca buku di Pustaka Aksara.',
      'Catat pencapaian belajar harian secara sederhana selama 14 hari.',
    ],
    cover: {
      bgClass: 'bg-[#F1F5F9]',
      inkClass: 'text-[#0F172A]',
      accentHex: '#1E3A8A',
      motif: 'horizon',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Bab 1: Sistem Mengalahkan Sasaran Sesaat',
        estimatedMinutes: 8,
        pullQuote:
          'Kita tidak naik ke level target yang kita cita-citakan; kita bertumpu pada kualitas sistem harian yang kita jalankan.',
        paragraphs: [
          'Hampir semua orang menetapkan target yang serupa pada awal tahun—ingin membaca dua puluh buku, menguasai bahasa pemrograman baru, atau menulis secara rutin. Namun target hanya menunjukkan arah; sistem harianlah yang menggerakkan langkah.',
          'Jika Anda ingin menjadi pembaca yang tekun, jangan mulai dengan memaksakan lima puluh halaman per hari. Mulailah dengan sepuluh halaman setelah menyeduh kopi pagi, di kursi yang sama, tanpa ponsel di sebelah Anda.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Bab 2: Merancang Lingkungan yang Mendukung',
        estimatedMinutes: 7,
        paragraphs: [
          'Kemauan keras adalah sumber daya yang terbatas dan mudah menipis setelah seharian bekerja. Oleh karena itu, kurangi jumlah langkah menuju kebiasaan baik dan perbanyak hambatan menuju kebiasaan yang menguras waktu.',
        ],
      },
    ],
  },
  {
    id: 'bk-analisis-data-praktis',
    title: 'Literasi Data & Penalaran Statistik Terapan',
    subtitle: 'Membaca Pola, Menghindari Bias, dan Mengambil Keputusan Berbasis Bukti',
    author: 'Hendro Wijanarko',
    publisher: 'Pustaka Teknologi Nusantara',
    year: 2025,
    pages: 280,
    isbn: '978-602-9910-72-0',
    category: 'Skill',
    clinicTrack: 'Desain & Produk Digital',
    rating: 4.7,
    borrowCount: 865,
    isPopular: false,
    synopsis:
      'Buku keterampilan praktis untuk memahami korelasi versus kausalitas, merancang metrik yang jujur, dan mempresentasikan temuan data secara visual tanpa menyesatkan pembaca.',
    learningTakeaways: [
      'Membedakan rata-rata dengan median ketika menghadapi data berdistribusi miring.',
      'Menghindari perangkap metrik semu (vanity metrics) dalam evaluasi produk.',
    ],
    practiceTasks: [
      'Evaluasi satu laporan mingguan dan periksa apakah skala sumbu grafik dimulai dari nol.',
    ],
    cover: {
      bgClass: 'bg-[#0F172A]',
      inkClass: 'text-[#F8FAFC]',
      accentHex: '#38BDF8',
      motif: 'grid',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Bab 1: Angka Tidak Pernah Berbicara Sendiri',
        estimatedMinutes: 9,
        paragraphs: [
          'Sering kali kita mendengar ungkapan bahwa data berbicara dengan sendirinya. Padahal, data selalu memerlukan konteks pengumpulan, definisi metrik, dan pertanyaan yang tepat agar tidak menghasilkan kesimpulan keliru.',
          'Sebelum mempercayai sebuah persentase kenaikan, tanyakan selalu berapa ukuran sampelnya dan bagaimana kondisi pembandingnya.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Bab 2: Visualisasi Data yang Jujur',
        estimatedMinutes: 8,
        paragraphs: [
          'Grafik yang baik memperjelas perbandingan tanpa memaksa pembaca memecahkan teka-teki warna. Gunakan penanda sumbu yang terang, label langsung pada kurva penting, dan angka tabular pada ringkasan tabel.',
        ],
      },
    ],
  },
  {
    id: 'bk-kepemimpinan-tenang',
    title: 'Kepemimpinan Tenang di Era Perubahan Cepat',
    subtitle: 'Menumbuhkan Kemandirian Tim dan Kejelasan Arah Kerja',
    author: 'Arif Rahman Hakim',
    publisher: 'Cakra Ilmu',
    year: 2024,
    pages: 248,
    isbn: '978-602-4410-55-0',
    category: 'Skill',
    clinicTrack: 'Karier & Kepemimpinan',
    rating: 4.8,
    borrowCount: 1050,
    isPopular: true,
    synopsis:
      'Mengajak para pemimpin tim dan manajer proyek beralih dari pengawasan mikro menuju pendelegasian yang jelas, penyelarasan tujuan, serta penciptaan ruang aman untuk belajar dari kesalahan.',
    learningTakeaways: [
      'Menetapkan hasil yang diharapkan tanpa mendikte setiap langkah teknis.',
      'Menjalankan sesi bimbingan satu lawan satu (1-on-1) yang berorientasi pertumbuhan.',
    ],
    practiceTasks: [
      'Siapkan tiga pertanyaan reflektif untuk sesi 1-on-1 bersama anggota tim minggu ini.',
    ],
    cover: {
      bgClass: 'bg-[#1F2937]',
      inkClass: 'text-[#F9FAFB]',
      accentHex: '#60A5FA',
      motif: 'compass',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Bab 1: Dari Pengendali Menjadi Penunjuk Arah',
        estimatedMinutes: 9,
        paragraphs: [
          'Pemimpin yang baru naik peran sering merasa harus menjawab semua pertanyaan teknis agar terlihat kompeten. Padahal, kekuatan utama seorang pemimpin justru terletak pada kemampuannya merumuskan masalah dengan jernih dan memberi ruang bagi keahlian tim untuk bersinar.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Bab 2: Kejelasan Kontrak Harapan',
        estimatedMinutes: 8,
        paragraphs: [
          'Sebagian besar kekecewaan dalam kolaborasi bersumber dari harapan yang tidak pernah diucapkan secara eksplisit. Menuliskan definisi selesai, tenggat waktu, dan batas wewenang di awal proyek melindungi seluruh tim dari kelelahan.',
        ],
      },
    ],
  },
  {
    id: 'bk-seni-mengelola-waktu',
    title: 'Keseimbangan Ritme: Energi, Istirahat, dan Karya',
    subtitle: 'Merawat Keberlanjutan Diri Tanpa Kehilangan Daya Cipta',
    author: 'dr. Sekar Ayuningtyas',
    publisher: 'Aksara Cendekia',
    year: 2025,
    pages: 196,
    isbn: '978-602-7721-90-8',
    category: 'Self Development',
    clinicTrack: 'Fokus & Kebiasaan',
    rating: 4.8,
    borrowCount: 1120,
    isPopular: false,
    synopsis:
      'Meninjau produktivitas dari sudut pandang ritme biologis dan kesehatan mental. Membantu pembaca mengenali tanda awal kejenuhan kerja serta membangun pemulihan aktif yang efektif.',
    learningTakeaways: [
      'Mengelola energi kognitif berdasarkan jam puncak biologis harian.',
      'Membedakan istirahat pasif (menggulir layar) dan pemulihan aktif yang menyegarkan otak.',
    ],
    practiceTasks: [
      'Petakan jam energi tertinggi Anda selama tiga hari dan jadwalkan tugas tersulit di sana.',
    ],
    cover: {
      bgClass: 'bg-[#ECFDF5]',
      inkClass: 'text-[#064E3B]',
      accentHex: '#059669',
      motif: 'wave',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Bab 1: Produktivitas Bukan Tentang Jam Kerja Panjang',
        estimatedMinutes: 8,
        paragraphs: [
          'Tubuh manusia bekerja dalam siklus ultradian, bukan garis lurus mesin pabrik. Memaksakan kerja saat cadangan fokus sudah habis hanya menghasilkan lebih banyak revisi keesokan harinya.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Bab 2: Seni Berhenti Sebelum Lelah Berlebihan',
        estimatedMinutes: 7,
        paragraphs: [
          'Menutup buku atau laptop saat pikiran masih memiliki sedikit sisa energi justru memudahkan kita memulai kembali esok pagi dengan penuh antusiasme.',
        ],
      },
    ],
  },
  {
    id: 'bk-ekonomi-kota-kecil',
    title: 'Ekonomi Sehari-hari & Kehidupan Kota',
    subtitle: 'Memahami Bagaimana Pasar, Transportasi, dan Ruang Publik Bekerja',
    author: 'Prof. Darmawan Hadi',
    publisher: 'Pustaka Semesta',
    year: 2024,
    pages: 312,
    isbn: '978-602-3109-41-6',
    category: 'Buku Umum',
    rating: 4.7,
    borrowCount: 910,
    isPopular: true,
    synopsis:
      'Penjelasan jernih dan membumi mengenai fenomena ekonomi di sekitar kita—mulai dari harga kopi pagi, tata kelola angkutan kota, hingga mengapa perpustakaan umum menjadi investasi sosial terbaik.',
    cover: {
      bgClass: 'bg-[#F3F4F6]',
      inkClass: 'text-[#111827]',
      accentHex: '#1E3A8A',
      motif: 'grid',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Bab 1: Infrastruktur Tak Terlihat di Sekitar Kita',
        estimatedMinutes: 9,
        paragraphs: [
          'Setiap kota yang nyaman selalu ditopang oleh infrastruktur sosial: trotoar yang aman, taman yang terbuka untuk semua usia, serta perpustakaan yang mengizinkan siapa pun masuk tanpa syarat belanja.',
          'Tempat-tempat ketiga ini mempertemukan warga dari beragam latar belakang dan merawat rasa memiliki terhadap ruang bersama.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Bab 2: Mengapa Akses Pengetahuan Mengubah Mobilitas Sosial',
        estimatedMinutes: 10,
        paragraphs: [
          'Ketika buku berkualitas dapat dipinjam secara merata tanpa hambatan geografis, peluang belajar tidak lagi terpusat pada segelintir wilayah saja.',
        ],
      },
    ],
  },
  {
    id: 'bk-antologi-senja-jakarta',
    title: 'Hujan di Atas Kubah Stasiun Lama',
    subtitle: 'Kumpulan Cerita Pendek Tentang Perjumpaan dan Waktu',
    author: 'Maira Indrawati',
    publisher: 'Balai Pustaka Baru',
    year: 2025,
    pages: 184,
    isbn: '978-602-5412-94-4',
    category: 'Buku Umum',
    rating: 4.9,
    borrowCount: 1275,
    isPopular: true,
    synopsis:
      'Dua belas cerita pendek yang memotret kehangatan relasi manusia di sudut-sudut kota: penjaga kios buku bekas, masinis kereta malam, hingga dua sahabat yang bertukar surat selama satu dekade.',
    cover: {
      bgClass: 'bg-[#27272A]',
      inkClass: 'text-[#FAFAFA]',
      accentHex: '#A1A1AA',
      motif: 'horizon',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Cerita 1: Penjaga Katalog di Lantai Tiga',
        estimatedMinutes: 8,
        pullQuote:
          'Ada buku-buku yang baru menemukan pembacanya dua puluh tahun setelah pertama kali dicetak, tepat ketika seseorang paling membutuhkannya.',
        paragraphs: [
          'Hujan sore selalu membawa aroma kertas tua ke ruang baca lantai tiga. Pak Harun hafal letak hampir setiap jilid tanpa perlu melirik kartu indeks, namun ia selalu berpura-pura mencarinya beberapa detik agar pengunjung merasa punya waktu menenangkan napas setelah menerobos macet.',
          'Di sudut meja dekat jendela besar, seorang mahasiswi membuka catatan pinggir yang pernah ditinggalkan pembaca bertahun-tahun silam, seolah sedang berbincang diam-diam melintasi waktu.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Cerita 2: Kereta Terakhir Menuju Selatan',
        estimatedMinutes: 9,
        paragraphs: [
          'Lampu peron memantul di genangan air aspal. Dua penumpang yang kebetulan membaca novel dari pengarang yang sama bertukar senyum singkat sebelum suara peluit keberangkatan membelah malam.',
        ],
      },
    ],
  },
  {
    id: 'bk-negosiasi-kolaboratif',
    title: 'Negosiasi Berbasis Kepentingan Bersama',
    subtitle: 'Menemukan Solusi Adil Tanpa Mengorbankan Hubungan Baik',
    author: 'Ratna Dewi Anggraini',
    publisher: 'Cakra Ilmu',
    year: 2025,
    pages: 224,
    isbn: '978-602-4410-81-9',
    category: 'Self Development',
    clinicTrack: 'Komunikasi & Negosiasi',
    rating: 4.7,
    borrowCount: 790,
    isPopular: false,
    synopsis:
      'Panduan praktis bernegosiasi dalam karier, kerja sama bisnis, maupun kesepakatan tim dengan berfokus pada kepentingan inti di balik posisi yang kaku.',
    learningTakeaways: [
      'Menggali alasan di balik tuntutan pihak lain sebelum mengajukan penawaran tandingan.',
      'Menyiapkan alternatif terbaik (BATNA) secara tenang sebelum duduk di meja diskusi.',
    ],
    practiceTasks: [
      'Tuliskan kepentingan inti dan alternatif cadangan Anda sebelum negosiasi kontrak atau jadwal berikutnya.',
    ],
    cover: {
      bgClass: 'bg-[#EDE9FE]',
      inkClass: 'text-[#1E1B4B]',
      accentHex: '#4338CA',
      motif: 'prism',
    },
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Bab 1: Memisahkan Orang dari Permasalahan',
        estimatedMinutes: 8,
        paragraphs: [
          'Negosiasi sering macet ketika perbedaan pendapat dianggap sebagai serangan pribadi. Dengan bersikap lembut terhadap orangnya dan tegas terhadap kriteria objektif masalahnya, ruang kompromi terbuka jauh lebih lebar.',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Bab 2: Menggali Kepentingan di Balik Posisi',
        estimatedMinutes: 9,
        paragraphs: [
          'Posisi adalah apa yang seseorang katakan ia inginkan; kepentingan adalah alasan mengapa ia menginginkannya. Begitu alasan dasarnya dipahami, sering kali muncul lebih dari satu jalan keluar yang menguntungkan kedua belah pihak.',
        ],
      },
    ],
  },
];

import { AlertTriangle, ArrowRight, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { HERO_LIBRARY_IMAGE } from '../data/booksCatalog';
import { AppTab, Book, BookCategory, LoanRecord } from '../types/library';
import { getLoanDueSummary } from '../utils/dateUtils';
import { BookCard } from './BookCard';

interface HomeViewProps {
  books: Book[];
  activeLoans: LoanRecord[];
  favoriteIds: string[];
  showOverdueBanner: boolean;
  onToggleFavorite: (bookId: string) => void;
  onOpenDetail: (book: Book) => void;
  onReadNow: (book: Book) => void;
  onQuickBorrow: (book: Book) => void;
  onNavigate: (tab: AppTab) => void;
}

type FilterOption = 'Semua' | BookCategory;

export function HomeView({
  books,
  activeLoans,
  favoriteIds,
  showOverdueBanner,
  onToggleFavorite,
  onOpenDetail,
  onReadNow,
  onQuickBorrow,
  onNavigate,
}: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>('Semua');
  const [heroImgError, setHeroImgError] = useState(false);

  const overdueLoans = useMemo(() => {
    return activeLoans
      .map((loan) => ({
        loan,
        book: books.find((b) => b.id === loan.bookId),
        due: getLoanDueSummary(loan.dueDate),
      }))
      .filter((item) => item.book && item.due.isOverdue);
  }, [activeLoans, books]);

  const activeLoanByBookId = useMemo(() => {
    const map = new Map<string, LoanRecord>();
    for (const loan of activeLoans) {
      map.set(loan.bookId, loan);
    }
    return map;
  }, [activeLoans]);

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return books.filter((book) => {
      const matchesCat =
        selectedCategory === 'Semua' || book.category === selectedCategory;
      const matchesQuery =
        q === '' ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q) ||
        book.synopsis.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [books, searchQuery, selectedCategory]);

  const popularByCategory = useMemo(() => {
    const sortPopular = (list: Book[]) =>
      [...list].sort((a, b) => Number(b.isPopular) - Number(a.isPopular) || b.borrowCount - a.borrowCount);

    return {
      skill: sortPopular(books.filter((b) => b.category === 'Skill')).slice(0, 4),
      selfDev: sortPopular(books.filter((b) => b.category === 'Self Development')).slice(0, 4),
      general: sortPopular(books.filter((b) => b.category === 'Buku Umum')).slice(0, 4),
    };
  }, [books]);

  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'Semua';

  const clinicCount = useMemo(
    () => books.filter((b) => b.category === 'Skill' || b.category === 'Self Development').length,
    [books]
  );

  const filterOptions: FilterOption[] = ['Semua', 'Skill', 'Self Development', 'Buku Umum'];

  return (
    <div className="space-y-12 pb-16">
      {/* Operational Overdue Reminder Ribbon (when overdue loans exist) */}
      {showOverdueBanner && overdueLoans.length > 0 && (
        <section
          aria-label="Peringatan buku terlambat"
          className="bg-red-50 border-b border-red-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-start sm:items-center gap-2.5 text-sm text-red-900">
              <AlertTriangle className="w-4 h-4 text-red-700 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
              <p>
                <span className="font-semibold">
                  Pengingat Pengembalian ({overdueLoans.length} buku terlambat):
                </span>{' '}
                <span className="text-red-800">
                  {overdueLoans[0].book?.title} ({overdueLoans[0].due.label})
                  {overdueLoans.length > 1 ? ` dan ${overdueLoans.length - 1} buku lainnya` : ''}.
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('notifikasi')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-900 hover:text-red-700 underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Kelola Pengembalian</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </section>
      )}

      {/* Editorial 2-Column Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-gray-200 rounded-2xl p-6 sm:p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
                Perpustakaan Daring &amp; Klinik Belajar
              </p>
              <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-gray-900 leading-[1.15] [text-wrap:balance]">
                Pinjam Buku Pilihan, Baca Nyaman di Satu Ruang.
              </h1>
              <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-xl">
                Jelajahi koleksi populer seputar keterampilan kerja, pengembangan diri, serta bacaan umum. Kelola daftar favorit, riwayat peminjaman, dan pengingat tenggat langsung dari pustaka pribadi Anda.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {/* Integrated Search Bar */}
              <div className="relative">
                <Search
                  className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul buku, nama penulis, atau topik keterampilan..."
                  aria-label="Cari buku di katalog"
                  className="w-full pl-10 pr-10 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-[#1E3A8A] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Hapus pencarian"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('klinik')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E3A8A] text-white text-sm font-medium hover:bg-[#172D6E] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Masuk Klinik Belajar</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('pustaka')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Buka Pustaka Saya</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] rounded-2xl overflow-hidden border border-gray-200 bg-stone-100">
              {!heroImgError ? (
                <img
                  src={HERO_LIBRARY_IMAGE}
                  alt="Ruang baca modern Pustaka Aksara dengan rak buku kayu dan cahaya alami"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-100 to-stone-200 text-slate-700">
                  <p className="font-serif text-xl font-semibold">Ruang Baca Pustaka Aksara</p>
                  <p className="mt-2 text-sm text-slate-600">Akses bacaan bermutu kapan saja</p>
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.14em] text-white/80">
                  Kurasi Pekan Ini
                </p>
                <p className="mt-1 font-serif text-lg font-medium leading-snug">
                  {books[0].title} — {books[0].author}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Operational Summary Strip below Hero */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
            <p className="text-xs text-gray-500">Koleksi Tersedia</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-gray-900 tabular-nums">
              {books.length} Judul
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
            <p className="text-xs text-gray-500">Pinjaman Aktif Anda</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-gray-900 tabular-nums">
              {activeLoans.length} Buku
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
            <p className="text-xs text-gray-500">Daftar Favorit</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-gray-900 tabular-nums">
              {favoriteIds.length} Tersimpan
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
            <p className="text-xs text-gray-500">Koleksi Klinik Belajar</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-gray-900 tabular-nums">
              {clinicCount} Modul
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Filter & Popular Books Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900">
              {isFiltering ? 'Hasil Pencarian Katalog' : 'Buku Populer Pilihan Pembaca'}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {isFiltering
                ? `Menampilkan ${filteredBooks.length} judul sesuai filter yang dipilih.`
                : 'Judul paling banyak dipinjam di kategori Skill, Self Development, dan Buku Umum.'}
            </p>
          </div>

          {/* Interactive Segmented Category Tabs */}
          <div
            role="tablist"
            aria-label="Filter kategori buku"
            className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg self-start md:self-auto overflow-x-auto max-w-full"
          >
            {filterOptions.map((option) => {
              const active = selectedCategory === option;
              return (
                <button
                  key={option}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(option)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {isFiltering ? (
          filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  activeLoan={activeLoanByBookId.get(book.id)}
                  isFavorite={favoriteIds.includes(book.id)}
                  onToggleFavorite={onToggleFavorite}
                  onOpenDetail={onOpenDetail}
                  onReadNow={onReadNow}
                  onQuickBorrow={onQuickBorrow}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <p className="font-serif text-xl font-semibold text-gray-900">
                Belum ada buku yang cocok
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Coba gunakan kata kunci lain atau kembalikan filter ke Semua kategori.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                }}
                className="mt-5 px-4 py-2 rounded-lg bg-[#1E3A8A] text-white text-sm font-medium hover:bg-[#172D6E] cursor-pointer"
              >
                Atur Ulang Filter
              </button>
            </div>
          )
        ) : (
          <div className="space-y-12">
            {/* Shelf 1: Popular Skill */}
            <div className="space-y-5">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900">
                    Populer di Keterampilan &amp; Skill
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-600">
                    Rekayasa perangkat lunak, desain produk, literasi data, dan komunikasi strategis.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('klinik')}
                  className="text-xs font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Lihat di Klinik Belajar
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularByCategory.skill.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    activeLoan={activeLoanByBookId.get(book.id)}
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggleFavorite={onToggleFavorite}
                    onOpenDetail={onOpenDetail}
                    onReadNow={onReadNow}
                    onQuickBorrow={onQuickBorrow}
                  />
                ))}
              </div>
            </div>

            {/* Shelf 2: Popular Self Development */}
            <div className="space-y-5 pt-4 border-t border-gray-200/80">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900">
                    Populer di Self Development
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-600">
                    Fokus mendalam, pembentukan kebiasaan, keseimbangan ritme kerja, dan negosiasi.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('klinik')}
                  className="text-xs font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Buka Jalur Klinik
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularByCategory.selfDev.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    activeLoan={activeLoanByBookId.get(book.id)}
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggleFavorite={onToggleFavorite}
                    onOpenDetail={onOpenDetail}
                    onReadNow={onReadNow}
                    onQuickBorrow={onQuickBorrow}
                  />
                ))}
              </div>
            </div>

            {/* Shelf 3: Popular Buku Umum */}
            <div className="space-y-5 pt-4 border-t border-gray-200/80">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900">
                    Populer di Buku Umum
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-600">
                    Esai sejarah maritim, ekonomi perkotaan, hingga antologi sastra kontemporer.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('Buku Umum')}
                  className="text-xs font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Semua Buku Umum
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularByCategory.general.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    activeLoan={activeLoanByBookId.get(book.id)}
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggleFavorite={onToggleFavorite}
                    onOpenDetail={onOpenDetail}
                    onReadNow={onReadNow}
                    onQuickBorrow={onQuickBorrow}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

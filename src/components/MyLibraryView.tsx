import {
  AlertTriangle,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock,
  Heart,
  History,
  RotateCcw,
} from 'lucide-react';
import { useMemo } from 'react';
import { Book, LoanRecord, MyLibrarySubTab, ReadingState } from '../types/library';
import { formatDateID, getDayDifferenceFromNow, getLoanDueSummary } from '../utils/dateUtils';
import { BookCard } from './BookCard';
import { BookCover } from './BookCover';

interface MyLibraryViewProps {
  subTab: MyLibrarySubTab;
  onChangeSubTab: (tab: MyLibrarySubTab) => void;
  books: Book[];
  loans: LoanRecord[];
  favoriteIds: string[];
  readingStates: Record<string, ReadingState>;
  onToggleFavorite: (bookId: string) => void;
  onOpenDetail: (book: Book) => void;
  onReadNow: (book: Book) => void;
  onQuickBorrow: (book: Book) => void;
  onReturnLoan: (loanId: string) => void;
  onExtendLoan: (loanId: string) => void;
}

export function MyLibraryView({
  subTab,
  onChangeSubTab,
  books,
  loans,
  favoriteIds,
  readingStates,
  onToggleFavorite,
  onOpenDetail,
  onReadNow,
  onQuickBorrow,
  onReturnLoan,
  onExtendLoan,
}: MyLibraryViewProps) {
  const bookById = useMemo(() => {
    const map = new Map<string, Book>();
    for (const b of books) map.set(b.id, b);
    return map;
  }, [books]);

  const activeLoans = useMemo(
    () =>
      loans
        .filter((l) => l.status === 'active')
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    [loans]
  );

  const favoriteBooks = useMemo(
    () => books.filter((b) => favoriteIds.includes(b.id)),
    [books, favoriteIds]
  );

  const sortedHistory = useMemo(
    () =>
      [...loans].sort(
        (a, b) => new Date(b.borrowedAt).getTime() - new Date(a.borrowedAt).getTime()
      ),
    [loans]
  );

  const activeLoanByBookId = useMemo(() => {
    const map = new Map<string, LoanRecord>();
    for (const l of activeLoans) map.set(l.bookId, l);
    return map;
  }, [activeLoans]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 pb-16">
      {/* Header & Sub-tab Segmented Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-gray-200 pb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1E3A8A]">
            My Library · Pustaka Saya
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-gray-900">
            Koleksi Pribadi &amp; Peminjaman
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Kelola buku yang sedang dipinjam, daftar buku favorit pilihan Anda, serta seluruh riwayat peminjaman.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Submenu Pustaka Saya"
          className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-xl self-start overflow-x-auto max-w-full"
        >
          <button
            role="tab"
            aria-selected={subTab === 'pinjaman'}
            type="button"
            onClick={() => onChangeSubTab('pinjaman')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              subTab === 'pinjaman'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Pinjaman Aktif ({activeLoans.length})</span>
          </button>

          <button
            role="tab"
            aria-selected={subTab === 'favorit'}
            type="button"
            onClick={() => onChangeSubTab('favorit')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              subTab === 'favorit'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Daftar Favorit ({favoriteBooks.length})</span>
          </button>

          <button
            role="tab"
            aria-selected={subTab === 'riwayat'}
            type="button"
            onClick={() => onChangeSubTab('riwayat')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              subTab === 'riwayat'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <History className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Riwayat Peminjaman ({sortedHistory.length})</span>
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Active Loans */}
      {subTab === 'pinjaman' && (
        <section aria-label="Daftar pinjaman aktif" className="space-y-4">
          {activeLoans.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <p className="font-serif text-xl font-semibold text-gray-900">
                Belum ada buku yang sedang dipinjam
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Jelajahi katalog di Beranda atau Klinik Belajar untuk meminjam dan membaca buku secara daring.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {activeLoans.map((loan) => {
                const book = bookById.get(loan.bookId);
                if (!book) return null;
                const due = getLoanDueSummary(loan.dueDate);
                const reading = readingStates[book.id];
                const totalChapters = book.chapters.length;
                const completedCount = reading?.completedChapterIds.length ?? 0;
                const progressPct = Math.round((completedCount / totalChapters) * 100);

                return (
                  <article
                    key={loan.id}
                    className={`bg-white border rounded-2xl p-5 flex flex-col sm:flex-row gap-5 ${
                      due.isOverdue ? 'border-red-300 bg-red-50/20' : 'border-gray-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onReadNow(book)}
                      className="w-28 shrink-0 cursor-pointer self-start focus-visible:outline-2 focus-visible:outline-[#1E3A8A] rounded-lg"
                    >
                      <BookCover book={book} compact className="rounded-lg w-full" />
                    </button>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="text-gray-500">{book.category}</span>
                          {due.isOverdue ? (
                            <span className="inline-flex items-center gap-1 text-red-700 font-semibold tabular-nums">
                              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{due.label}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[#1E3A8A] font-medium tabular-nums">
                              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{due.label}</span>
                            </span>
                          )}
                        </div>

                        <h2 className="mt-1.5 font-serif text-xl font-semibold text-gray-900 leading-snug">
                          {book.title}
                        </h2>
                        <p className="mt-0.5 text-sm text-gray-600">{book.author}</p>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600 tabular-nums">
                          <div>
                            <span className="text-gray-400 block">Dipinjam</span>
                            <span className="font-medium text-gray-800">
                              {formatDateID(loan.borrowedAt)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">Batas Kembali</span>
                            <span
                              className={`font-medium ${
                                due.isOverdue ? 'text-red-700' : 'text-gray-800'
                              }`}
                            >
                              {formatDateID(loan.dueDate)}
                            </span>
                          </div>
                        </div>

                        {/* Reading progress bar */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-gray-500 tabular-nums">
                            <span>Progres baca</span>
                            <span>
                              {completedCount}/{totalChapters} bab ({progressPct}%)
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#1E3A8A] transition-all duration-300"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onReadNow(book)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1E3A8A] text-white text-xs font-medium hover:bg-[#172D6E] cursor-pointer whitespace-nowrap"
                        >
                          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Baca Buku</span>
                        </button>

                        {!loan.extended && (
                          <button
                            type="button"
                            onClick={() => onExtendLoan(loan.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-xs font-medium hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                          >
                            <CalendarClock className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Perpanjang +3 Hari</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onReturnLoan(loan.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-xs font-medium hover:border-red-200 hover:bg-red-50 hover:text-red-800 cursor-pointer whitespace-nowrap"
                        >
                          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Kembalikan</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Sub-tab 2: Daftar Favorit */}
      {subTab === 'favorit' && (
        <section aria-label="Daftar buku favorit" className="space-y-4">
          {favoriteBooks.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <p className="font-serif text-xl font-semibold text-gray-900">
                Daftar favorit masih kosong
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Tekan ikon hati pada buku mana pun untuk menyimpannya di daftar favorit Anda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  activeLoan={activeLoanByBookId.get(book.id)}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onOpenDetail={onOpenDetail}
                  onReadNow={onReadNow}
                  onQuickBorrow={onQuickBorrow}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Sub-tab 3: Riwayat Peminjaman */}
      {subTab === 'riwayat' && (
        <section aria-label="Riwayat peminjaman buku" className="space-y-4">
          {sortedHistory.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <p className="font-serif text-xl font-semibold text-gray-900">
                Belum ada riwayat peminjaman
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Setiap buku yang Anda pinjam dan kembalikan akan tercatat rapi di sini.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-[#F8F9FA] text-xs font-semibold text-gray-600">
                      <th className="py-3.5 px-5">Judul Buku</th>
                      <th className="py-3.5 px-4">Kategori</th>
                      <th className="py-3.5 px-4">Tgl Pinjam</th>
                      <th className="py-3.5 px-4">Jatuh Tempo</th>
                      <th className="py-3.5 px-4">Tgl Kembali</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {sortedHistory.map((loan) => {
                      const book = bookById.get(loan.bookId);
                      if (!book) return null;

                      const isReturned = loan.status === 'returned';
                      const dueInfo = getLoanDueSummary(loan.dueDate);
                      const wasReturnedLate =
                        isReturned &&
                        loan.returnedAt &&
                        getDayDifferenceFromNow(
                          loan.dueDate,
                          new Date(loan.returnedAt).getTime()
                        ) < 0;

                      return (
                        <tr key={loan.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-4 px-5">
                            <button
                              type="button"
                              onClick={() => onOpenDetail(book)}
                              className="text-left font-medium text-gray-900 hover:text-[#1E3A8A] cursor-pointer"
                            >
                              {book.title}
                            </button>
                            <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
                          </td>
                          <td className="py-4 px-4 text-xs text-gray-600 whitespace-nowrap">
                            {book.category}
                          </td>
                          <td className="py-4 px-4 font-mono text-xs text-gray-700 tabular-nums whitespace-nowrap">
                            {formatDateID(loan.borrowedAt)}
                          </td>
                          <td className="py-4 px-4 font-mono text-xs text-gray-700 tabular-nums whitespace-nowrap">
                            {formatDateID(loan.dueDate)}
                          </td>
                          <td className="py-4 px-4 font-mono text-xs text-gray-700 tabular-nums whitespace-nowrap">
                            {loan.returnedAt ? formatDateID(loan.returnedAt) : '—'}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-xs">
                            {isReturned ? (
                              <span
                                className={`inline-flex items-center gap-1.5 font-medium ${
                                  wasReturnedLate ? 'text-amber-800' : 'text-emerald-800'
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>
                                  {wasReturnedLate
                                    ? 'Dikembalikan (Terlambat)'
                                    : 'Dikembalikan Tepat Waktu'}
                                </span>
                              </span>
                            ) : dueInfo.isOverdue ? (
                              <span className="inline-flex items-center gap-1.5 text-red-700 font-semibold tabular-nums">
                                <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>{dueInfo.label}</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-[#1E3A8A] font-medium tabular-nums">
                                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Dipinjam · {dueInfo.label}</span>
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-5 text-right whitespace-nowrap">
                            {isReturned ? (
                              activeLoanByBookId.has(book.id) ? (
                                <button
                                  type="button"
                                  onClick={() => onReadNow(book)}
                                  className="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
                                >
                                  Baca Lagi
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => onQuickBorrow(book)}
                                  className="text-xs font-semibold text-gray-800 hover:text-[#1E3A8A] hover:underline cursor-pointer"
                                >
                                  Pinjam Ulang
                                </button>
                              )
                            ) : (
                              <button
                                type="button"
                                onClick={() => onReturnLoan(loan.id)}
                                className="text-xs font-semibold text-red-700 hover:underline cursor-pointer"
                              >
                                Kembalikan
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

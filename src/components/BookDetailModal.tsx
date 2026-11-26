import {
  AlertTriangle,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock,
  Heart,
  RotateCcw,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Book, LoanRecord } from '../types/library';
import { formatDateID, getLoanDueSummary } from '../utils/dateUtils';
import { BookCover } from './BookCover';

interface BookDetailModalProps {
  book: Book | null;
  activeLoan?: LoanRecord;
  isFavorite: boolean;
  onClose: () => void;
  onBorrow: (book: Book, durationDays: number) => void;
  onReadNow: (book: Book) => void;
  onReturnLoan: (loanId: string) => void;
  onExtendLoan: (loanId: string) => void;
  onToggleFavorite: (bookId: string) => void;
}

export function BookDetailModal({
  book,
  activeLoan,
  isFavorite,
  onClose,
  onBorrow,
  onReadNow,
  onReturnLoan,
  onExtendLoan,
  onToggleFavorite,
}: BookDetailModalProps) {
  const [durationDays, setDurationDays] = useState<number>(7);

  useEffect(() => {
    if (!book) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const dueInfo = activeLoan ? getLoanDueSummary(activeLoan.dueDate) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-book-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">
            Detail Katalog · {book.category}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail buku"
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            <div className="sm:col-span-4 max-w-[200px] sm:max-w-none mx-auto w-full">
              <BookCover book={book} className="rounded-xl w-full" />
            </div>

            <div className="sm:col-span-8 space-y-4">
              <div>
                <h2
                  id="detail-book-title"
                  className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight"
                >
                  {book.title}
                </h2>
                <p className="mt-1.5 text-sm sm:text-base text-gray-600">{book.subtitle}</p>
                <p className="mt-2 text-sm font-medium text-gray-900">Oleh {book.author}</p>
              </div>

              {/* Clean unboxed accession metadata grid */}
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-gray-200 text-xs">
                <div>
                  <dt className="text-gray-500">Penerbit</dt>
                  <dd className="mt-0.5 font-medium text-gray-900 truncate">{book.publisher}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Tahun</dt>
                  <dd className="mt-0.5 font-medium text-gray-900 tabular-nums">{book.year}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Tebal</dt>
                  <dd className="mt-0.5 font-medium text-gray-900 tabular-nums">
                    {book.pages} hlm
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Pembaca</dt>
                  <dd className="mt-0.5 font-medium text-gray-900 tabular-nums">
                    {book.borrowCount.toLocaleString('id-ID')}x dipinjam
                  </dd>
                </div>
              </dl>

              <p className="text-sm text-gray-700 leading-relaxed">{book.synopsis}</p>

              {/* Borrow / Read Control Box */}
              {activeLoan && dueInfo ? (
                <div
                  className={`p-4 rounded-xl border ${
                    dueInfo.isOverdue
                      ? 'bg-red-50/50 border-red-200'
                      : 'bg-[#F8F9FA] border-gray-200'
                  } space-y-3`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    {dueInfo.isOverdue ? (
                      <span className="inline-flex items-center gap-1.5 text-red-700 font-semibold tabular-nums">
                        <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                        <span>{dueInfo.label} (Jatuh tempo {formatDateID(activeLoan.dueDate)})</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[#1E3A8A] font-medium tabular-nums">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        <span>
                          Sedang dipinjam · {dueInfo.label} ({formatDateID(activeLoan.dueDate)})
                        </span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onReadNow(book)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E3A8A] text-white text-sm font-medium hover:bg-[#172D6E] cursor-pointer whitespace-nowrap"
                    >
                      <BookOpen className="w-4 h-4" aria-hidden="true" />
                      <span>Baca di Aplikasi</span>
                    </button>

                    {!activeLoan.extended && (
                      <button
                        type="button"
                        onClick={() => onExtendLoan(activeLoan.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-800 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                      >
                        <CalendarClock className="w-4 h-4" aria-hidden="true" />
                        <span>Perpanjang +3 Hari</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onReturnLoan(activeLoan.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-800 cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      <span>Kembalikan</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-gray-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span>Tersedia untuk dipinjam secara daring</span>
                    </span>
                    <span className="font-mono text-xs text-gray-500">ISBN {book.isbn}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-1 p-1 bg-white border border-gray-200 rounded-lg">
                      {[3, 7, 14].map((days) => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setDurationDays(days)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium tabular-nums cursor-pointer transition-colors ${
                            durationDays === days
                              ? 'bg-[#1E3A8A] text-white'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {days} hari
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onBorrow(book, durationDays)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E3A8A] text-white text-sm font-medium hover:bg-[#172D6E] cursor-pointer whitespace-nowrap"
                    >
                      <span>Pinjam Buku ({durationDays} Hari)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(book.id)}
                      aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                        isFavorite
                          ? 'border-red-200 bg-red-50 text-red-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                      <span>{isFavorite ? 'Favorit' : 'Simpan'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chapter List Preview */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-serif text-lg font-semibold text-gray-900">
              Daftar Isi ({book.chapters.length} Bab)
            </h3>
            <div className="mt-3 divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
              {book.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="px-4 py-3 flex items-center justify-between gap-4 bg-white text-sm"
                >
                  <span className="font-medium text-gray-800">{chapter.title}</span>
                  <span className="font-mono text-xs text-gray-500 tabular-nums shrink-0">
                    ~{chapter.estimatedMinutes} mnt
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

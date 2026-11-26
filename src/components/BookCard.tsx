import { AlertTriangle, BookOpen, CheckCircle2, Clock, Heart } from 'lucide-react';
import { Book, LoanRecord } from '../types/library';
import { getLoanDueSummary } from '../utils/dateUtils';
import { BookCover } from './BookCover';

interface BookCardProps {
  book: Book;
  activeLoan?: LoanRecord;
  isFavorite: boolean;
  onToggleFavorite: (bookId: string) => void;
  onOpenDetail: (book: Book) => void;
  onReadNow: (book: Book) => void;
  onQuickBorrow: (book: Book) => void;
}

export function BookCard({
  book,
  activeLoan,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
  onReadNow,
  onQuickBorrow,
}: BookCardProps) {
  const dueInfo = activeLoan ? getLoanDueSummary(activeLoan.dueDate) : null;

  return (
    <article className="group flex flex-col bg-white border border-gray-200/90 rounded-xl p-4 transition-colors duration-150 hover:border-gray-300">
      <button
        type="button"
        onClick={() => onOpenDetail(book)}
        className="text-left block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] rounded-lg"
      >
        <BookCover book={book} className="rounded-lg w-full" />
      </button>

      {/* Clean unboxed metadata line */}
      <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500 truncate">
        <span className="font-medium text-gray-700">{book.category}</span>
        <span aria-hidden="true">·</span>
        <span className="tabular-nums">{book.pages} hlm</span>
        <span aria-hidden="true">·</span>
        <span className="tabular-nums">Skor {book.rating.toFixed(1)}</span>
      </div>

      <button
        type="button"
        onClick={() => onOpenDetail(book)}
        className="mt-1.5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
      >
        <h3 className="font-serif text-lg font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#1E3A8A] transition-colors">
          {book.title}
        </h3>
      </button>

      <p className="mt-1 text-sm text-gray-600 truncate">{book.author}</p>

      {/* Dual-coded status line (never color-only) */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
        {dueInfo ? (
          dueInfo.isOverdue ? (
            <span className="inline-flex items-center gap-1.5 text-red-700 font-medium tabular-nums">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{dueInfo.label}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[#1E3A8A] font-medium tabular-nums">
              <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{dueInfo.label}</span>
            </span>
          )
        ) : (
          <span className="inline-flex items-center gap-1.5 text-emerald-800 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Tersedia daring</span>
          </span>
        )}
      </div>

      {/* Action Row */}
      <div className="mt-3 flex items-center gap-2">
        {activeLoan ? (
          <button
            type="button"
            onClick={() => onReadNow(book)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#1E3A8A] text-white text-xs font-medium hover:bg-[#172D6E] transition-colors whitespace-nowrap cursor-pointer min-h-[40px]"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Baca Sekarang</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onQuickBorrow(book)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-[#1E3A8A] transition-colors whitespace-nowrap cursor-pointer min-h-[40px]"
          >
            <span>Pinjam Buku</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onToggleFavorite(book.id)}
          aria-label={
            isFavorite
              ? `Hapus ${book.title} dari daftar favorit`
              : `Simpan ${book.title} ke daftar favorit`
          }
          aria-pressed={isFavorite}
          className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border transition-colors cursor-pointer shrink-0 ${
            isFavorite
              ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
              : 'border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:border-gray-300'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}

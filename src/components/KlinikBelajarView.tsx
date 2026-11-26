import { BookOpen, CheckSquare, Heart, Square } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Book, ClinicTrack, LoanRecord } from '../types/library';
import { BookCover } from './BookCover';

interface KlinikBelajarViewProps {
  books: Book[];
  activeLoans: LoanRecord[];
  favoriteIds: string[];
  completedPracticeTasks: Record<string, boolean>;
  onTogglePracticeTask: (taskKey: string) => void;
  onToggleFavorite: (bookId: string) => void;
  onOpenDetail: (book: Book) => void;
  onReadNow: (book: Book) => void;
  onQuickBorrow: (book: Book) => void;
}

type TrackFilter = 'Semua Jalur' | ClinicTrack;

const TRACK_OPTIONS: TrackFilter[] = [
  'Semua Jalur',
  'Desain & Produk Digital',
  'Karier & Kepemimpinan',
  'Fokus & Kebiasaan',
  'Komunikasi & Negosiasi',
];

export function KlinikBelajarView({
  books,
  activeLoans,
  favoriteIds,
  completedPracticeTasks,
  onTogglePracticeTask,
  onToggleFavorite,
  onOpenDetail,
  onReadNow,
  onQuickBorrow,
}: KlinikBelajarViewProps) {
  const [selectedTrack, setSelectedTrack] = useState<TrackFilter>('Semua Jalur');
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | 'Skill' | 'Self Development'>(
    'Semua'
  );

  const clinicBooks = useMemo(() => {
    return books.filter((book) => {
      const isSkillOrSelfDev =
        book.category === 'Skill' || book.category === 'Self Development';
      if (!isSkillOrSelfDev) return false;
      const matchCat =
        selectedCategory === 'Semua' || book.category === selectedCategory;
      const matchTrack =
        selectedTrack === 'Semua Jalur' || book.clinicTrack === selectedTrack;
      return matchCat && matchTrack;
    });
  }, [books, selectedCategory, selectedTrack]);

  const activeLoanMap = useMemo(() => {
    const map = new Map<string, LoanRecord>();
    for (const l of activeLoans) {
      map.set(l.bookId, l);
    }
    return map;
  }, [activeLoans]);

  const totalTasks = useMemo(() => {
    return books
      .filter((b) => b.category === 'Skill' || b.category === 'Self Development')
      .reduce((sum, b) => sum + (b.practiceTasks?.length ?? 0), 0);
  }, [books]);

  const completedCount = useMemo(() => {
    return Object.values(completedPracticeTasks).filter(Boolean).length;
  }, [completedPracticeTasks]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 pb-16">
      {/* Header & Clinic Progress */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1E3A8A]">
            Klinik Belajar Terpadu
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-gray-900 [text-wrap:balance]">
            Kurasi Buku Skill &amp; Self Development dengan Latihan Praktik
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Setiap buku di Klinik Belajar dilengkapi intisari praktis dan target latihan yang dapat Anda tandai setelah selesai membaca dan menerapkannya.
          </p>
        </div>

        <div className="bg-[#F8F9FA] border border-gray-200 rounded-xl p-5 min-w-[260px]">
          <p className="text-xs text-gray-500">Kemajuan Target Praktik</p>
          <div className="mt-1 flex items-baseline justify-between gap-3">
            <span className="font-serif text-2xl font-semibold text-gray-900 tabular-nums">
              {completedCount} / {totalTasks}
            </span>
            <span className="font-mono text-xs text-[#1E3A8A] tabular-nums">
              {totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0}% selesai
            </span>
          </div>
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1E3A8A] transition-all duration-300"
              style={{
                width: `${totalTasks > 0 ? Math.min(100, (completedCount / totalTasks) * 100) : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {TRACK_OPTIONS.map((track) => {
            const active = selectedTrack === track;
            return (
              <button
                key={track}
                type="button"
                onClick={() => setSelectedTrack(track)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#1E3A8A] text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {track}
              </button>
            );
          })}
        </div>

        <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg self-start">
          {(['Semua', 'Skill', 'Self Development'] as const).map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                  active ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clinic Modules List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clinicBooks.map((book) => {
          const activeLoan = activeLoanMap.get(book.id);
          const isFav = favoriteIds.includes(book.id);

          return (
            <article
              key={book.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  type="button"
                  onClick={() => onOpenDetail(book)}
                  className="w-28 sm:w-32 shrink-0 cursor-pointer self-start focus-visible:outline-2 focus-visible:outline-[#1E3A8A] rounded-lg"
                >
                  <BookCover book={book} compact className="rounded-lg w-full" />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium text-[#1E3A8A]">{book.category}</span>
                    {book.clinicTrack && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{book.clinicTrack}</span>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenDetail(book)}
                    className="mt-1.5 text-left cursor-pointer hover:text-[#1E3A8A] transition-colors"
                  >
                    <h2 className="font-serif text-xl font-semibold text-gray-900 leading-snug">
                      {book.title}
                    </h2>
                  </button>
                  <p className="mt-1 text-sm text-gray-600">{book.author}</p>
                  <p className="mt-2.5 text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {book.synopsis}
                  </p>
                </div>
              </div>

              {/* Intisari & Checklist Target Praktik */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                {book.learningTakeaways && book.learningTakeaways.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                      Intisari Materi
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-gray-700 list-disc pl-4">
                      {book.learningTakeaways.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {book.practiceTasks && book.practiceTasks.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                      Target Praktik Mandiri
                    </h3>
                    <div className="mt-2 space-y-2">
                      {book.practiceTasks.map((task, idx) => {
                        const taskKey = `${book.id}::task-${idx}`;
                        const checked = Boolean(completedPracticeTasks[taskKey]);
                        return (
                          <button
                            key={taskKey}
                            type="button"
                            onClick={() => onTogglePracticeTask(taskKey)}
                            className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-lg bg-[#F8F9FA] hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            {checked ? (
                              <CheckSquare
                                className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                            ) : (
                              <Square
                                className="w-4 h-4 text-gray-400 shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                            )}
                            <span
                              className={`text-sm leading-snug ${
                                checked ? 'line-through text-gray-400' : 'text-gray-800'
                              }`}
                            >
                              {task}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 flex-1">
                  {activeLoan ? (
                    <button
                      type="button"
                      onClick={() => onReadNow(book)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E3A8A] text-white text-sm font-medium hover:bg-[#172D6E] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" aria-hidden="true" />
                      <span>Baca Modul Sekarang</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onQuickBorrow(book)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-[#1E3A8A] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span>Pinjam &amp; Mulai Belajar</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onOpenDetail(book)}
                    className="px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Detail Buku
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(book.id)}
                  aria-label={isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border cursor-pointer transition-colors ${
                    isFav
                      ? 'border-red-200 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-white text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

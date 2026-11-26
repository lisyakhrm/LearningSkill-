import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  List,
  NotebookPen,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Book, ReadingState } from '../types/library';

interface ReaderViewProps {
  book: Book;
  readingState: ReadingState;
  onUpdateReadingState: (bookId: string, next: ReadingState) => void;
  onClose: () => void;
}

type ReaderTheme = 'putih' | 'gading' | 'gelap';
type FontScale = 'kecil' | 'normal' | 'besar';

export function ReaderView({
  book,
  readingState,
  onUpdateReadingState,
  onClose,
}: ReaderViewProps) {
  const [theme, setTheme] = useState<ReaderTheme>('gading');
  const [fontScale, setFontScale] = useState<FontScale>('normal');
  const [showToc, setShowToc] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const safeChapterIndex = Math.min(
    Math.max(0, readingState.currentChapterIndex),
    book.chapters.length - 1
  );
  const currentChapter = book.chapters[safeChapterIndex];
  const isChapterCompleted = readingState.completedChapterIds.includes(currentChapter.id);
  const isBookmarked = readingState.bookmarkedChapterIds.includes(currentChapter.id);

  const progressPct = Math.round(
    ((safeChapterIndex + 1) / book.chapters.length) * 100
  );

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (showToc) {
          setShowToc(false);
        } else {
          onClose();
        }
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, showToc]);

  function selectChapter(index: number) {
    onUpdateReadingState(book.id, {
      ...readingState,
      currentChapterIndex: index,
      lastReadAt: new Date().toISOString(),
    });
    setShowToc(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleChapterCompleted() {
    const exists = readingState.completedChapterIds.includes(currentChapter.id);
    const nextIds = exists
      ? readingState.completedChapterIds.filter((id) => id !== currentChapter.id)
      : [...readingState.completedChapterIds, currentChapter.id];

    onUpdateReadingState(book.id, {
      ...readingState,
      completedChapterIds: nextIds,
      lastReadAt: new Date().toISOString(),
    });
  }

  function toggleBookmark() {
    const exists = readingState.bookmarkedChapterIds.includes(currentChapter.id);
    const nextIds = exists
      ? readingState.bookmarkedChapterIds.filter((id) => id !== currentChapter.id)
      : [...readingState.bookmarkedChapterIds, currentChapter.id];

    onUpdateReadingState(book.id, {
      ...readingState,
      bookmarkedChapterIds: nextIds,
      lastReadAt: new Date().toISOString(),
    });
  }

  function handleNextChapter() {
    if (!isChapterCompleted) {
      const nextCompleted = [...readingState.completedChapterIds, currentChapter.id];
      const nextIndex = Math.min(safeChapterIndex + 1, book.chapters.length - 1);
      onUpdateReadingState(book.id, {
        ...readingState,
        completedChapterIds: Array.from(new Set(nextCompleted)),
        currentChapterIndex: nextIndex,
        lastReadAt: new Date().toISOString(),
      });
    } else if (safeChapterIndex < book.chapters.length - 1) {
      selectChapter(safeChapterIndex + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const themeClasses = {
    putih: {
      page: 'bg-white text-gray-900',
      chrome: 'bg-white/95 border-gray-200 text-gray-900',
      muted: 'text-gray-500',
      divider: 'border-gray-200',
      surface: 'bg-gray-50 border-gray-200',
    },
    gading: {
      page: 'bg-[#F8F6F1] text-[#1F1D1A]',
      chrome: 'bg-[#F8F6F1]/95 border-[#E6E1D6] text-[#1F1D1A]',
      muted: 'text-[#6B655C]',
      divider: 'border-[#E6E1D6]',
      surface: 'bg-[#F1EDE4] border-[#DFD8CA]',
    },
    gelap: {
      page: 'bg-[#12161F] text-[#E5E7EB]',
      chrome: 'bg-[#12161F]/95 border-slate-800 text-[#F3F4F6]',
      muted: 'text-slate-400',
      divider: 'border-slate-800',
      surface: 'bg-slate-900 border-slate-800',
    },
  }[theme];

  const proseSizeClass = {
    kecil: 'text-[15px] leading-[1.75]',
    normal: 'text-[17px] leading-[1.82]',
    besar: 'text-[19px] leading-[1.85]',
  }[fontScale];

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.page}`}>
      {/* Thin Top Reading Progress Bar */}
      <div className="fixed top-0 inset-x-0 z-50 h-1 bg-black/5">
        <div
          className="h-full bg-[#1E3A8A] transition-all duration-200"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Reader Toolbar */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-sm ${themeClasses.chrome}`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 ${themeClasses.surface}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Keluar</span>
            </button>

            <div className="min-w-0 hidden sm:block">
              <p className="font-serif text-sm font-semibold truncate">{book.title}</p>
              <p className={`text-xs truncate ${themeClasses.muted}`}>
                {currentChapter.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Selector */}
            <div
              role="group"
              aria-label="Tema kertas baca"
              className={`hidden sm:inline-flex items-center p-0.5 rounded-lg border ${themeClasses.surface}`}
            >
              {(['putih', 'gading', 'gelap'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`px-2.5 py-1 text-xs rounded-md capitalize cursor-pointer transition-colors ${
                    theme === t
                      ? 'bg-[#1E3A8A] text-white font-medium'
                      : `${themeClasses.muted}`
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Font Scale */}
            <div
              role="group"
              aria-label="Ukuran huruf bacaan"
              className={`inline-flex items-center p-0.5 rounded-lg border ${themeClasses.surface}`}
            >
              {(
                [
                  { id: 'kecil', label: 'A-' },
                  { id: 'normal', label: 'A' },
                  { id: 'besar', label: 'A+' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFontScale(f.id)}
                  className={`px-2.5 py-1 text-xs rounded-md cursor-pointer transition-colors ${
                    fontScale === f.id
                      ? 'bg-[#1E3A8A] text-white font-medium'
                      : `${themeClasses.muted}`
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Bookmark */}
            <button
              type="button"
              onClick={toggleBookmark}
              aria-label="Tandai bab ini"
              aria-pressed={isBookmarked}
              className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                isBookmarked
                  ? 'border-[#1E3A8A] bg-[#1E3A8A]/10 text-[#1E3A8A]'
                  : themeClasses.surface
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Notes Toggle */}
            <button
              type="button"
              onClick={() => setShowNotes((prev) => !prev)}
              aria-label="Catatan baca"
              aria-expanded={showNotes}
              className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                showNotes
                  ? 'border-[#1E3A8A] bg-[#1E3A8A]/10 text-[#1E3A8A]'
                  : themeClasses.surface
              }`}
            >
              <NotebookPen className="w-4 h-4" />
            </button>

            {/* Table of Contents */}
            <button
              type="button"
              onClick={() => setShowToc(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer whitespace-nowrap ${themeClasses.surface}`}
            >
              <List className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden md:inline">Daftar Isi</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Editorial Reading Column */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className={`pb-6 border-b ${themeClasses.divider}`}>
          <p className={`text-xs uppercase tracking-[0.16em] ${themeClasses.muted}`}>
            {book.category} · Bab {currentChapter.number} dari {book.chapters.length} · ~
            {currentChapter.estimatedMinutes} menit baca
          </p>
          <h1 className="mt-3 font-serif text-2xl sm:text-4xl font-semibold leading-tight">
            {currentChapter.title}
          </h1>
          <p className={`mt-2 text-sm ${themeClasses.muted}`}>
            {book.title} — {book.author}
          </p>
        </div>

        {/* Collapsible Personal Note Box */}
        {showNotes && (
          <div className={`mt-6 p-4 rounded-xl border ${themeClasses.surface}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <label
                htmlFor="reader-personal-note"
                className="text-xs font-semibold uppercase tracking-[0.12em]"
              >
                Catatan Baca Pribadi
              </label>
              <span className={`text-xs ${themeClasses.muted}`}>Tersimpan otomatis</span>
            </div>
            <textarea
              id="reader-personal-note"
              rows={3}
              value={readingState.note}
              onChange={(e) =>
                onUpdateReadingState(book.id, {
                  ...readingState,
                  note: e.target.value,
                })
              }
              placeholder="Tulis gagasan penting atau ringkasan dari bab ini..."
              className={`w-full p-3 rounded-lg border text-sm focus:outline-none focus:border-[#1E3A8A] ${
                theme === 'gelap'
                  ? 'bg-slate-950 border-slate-700 text-slate-100'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            />
          </div>
        )}

        {/* Chapter Body Prose */}
        <article className={`mt-8 space-y-6 ${proseSizeClass}`}>
          {currentChapter.paragraphs.map((para, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? 'first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none'
                  : ''
              }
            >
              {para}
            </p>
          ))}

          {currentChapter.pullQuote && (
            <blockquote
              className={`my-10 py-6 border-y text-center font-serif italic text-xl sm:text-2xl leading-relaxed ${themeClasses.divider}`}
            >
              “{currentChapter.pullQuote}”
            </blockquote>
          )}
        </article>

        {/* Chapter Footer Navigation */}
        <footer className={`mt-14 pt-8 border-t space-y-6 ${themeClasses.divider}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={toggleChapterCompleted}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                isChapterCompleted
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : themeClasses.surface
              }`}
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>
                {isChapterCompleted ? 'Bab Telah Selesai Dibaca' : 'Tandai Bab Selesai'}
              </span>
            </button>

            <span className={`font-mono text-xs tabular-nums ${themeClasses.muted}`}>
              Kemajuan buku: {readingState.completedChapterIds.length}/{book.chapters.length} bab
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={safeChapterIndex === 0}
              onClick={() => selectChapter(safeChapterIndex - 1)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                safeChapterIndex === 0
                  ? 'opacity-40 cursor-not-allowed'
                  : `cursor-pointer ${themeClasses.surface}`
              }`}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Bab Sebelumnya</span>
            </button>

            {safeChapterIndex < book.chapters.length - 1 ? (
              <button
                type="button"
                onClick={handleNextChapter}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E3A8A] text-white text-sm font-medium hover:bg-[#172D6E] cursor-pointer"
              >
                <span>Bab Berikutnya</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (!isChapterCompleted) toggleChapterCompleted();
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>Selesai Membaca</span>
              </button>
            )}
          </div>
        </footer>
      </main>

      {/* Table of Contents Drawer */}
      {showToc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Daftar Isi Buku"
          className="fixed inset-0 z-50 bg-black/45 flex justify-end"
          onClick={() => setShowToc(false)}
        >
          <div
            className="w-full max-w-sm bg-white text-gray-900 h-full overflow-y-auto p-6 space-y-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Daftar Isi</p>
                <h2 className="mt-1 font-serif text-lg font-semibold">{book.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowToc(false)}
                aria-label="Tutup daftar isi"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {book.chapters.map((ch, idx) => {
                const isCurrent = idx === safeChapterIndex;
                const done = readingState.completedChapterIds.includes(ch.id);
                const bookmarked = readingState.bookmarkedChapterIds.includes(ch.id);

                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => selectChapter(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      isCurrent
                        ? 'border-[#1E3A8A] bg-[#1E3A8A]/5'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
                      <span className="tabular-nums">Bab {ch.number}</span>
                      <div className="flex items-center gap-2">
                        {bookmarked && (
                          <Bookmark className="w-3.5 h-3.5 text-[#1E3A8A] fill-current" />
                        )}
                        {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                      </div>
                    </div>
                    <p
                      className={`mt-1 text-sm font-medium ${
                        isCurrent ? 'text-[#1E3A8A]' : 'text-gray-900'
                      }`}
                    >
                      {ch.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

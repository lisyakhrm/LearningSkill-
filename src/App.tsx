import { useEffect, useMemo, useState } from 'react';
import { BookDetailModal } from './components/BookDetailModal';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { KlinikBelajarView } from './components/KlinikBelajarView';
import { MyLibraryView } from './components/MyLibraryView';
import { NotificationsView } from './components/NotificationsView';
import { ReaderView } from './components/ReaderView';
import { BOOKS_CATALOG } from './data/booksCatalog';
import {
  AppTab,
  Book,
  DerivedNotification,
  LoanRecord,
  MyLibrarySubTab,
  NotificationSettings,
  ReadingState,
} from './types/library';
import { addDaysISO, formatDateID, getLoanDueSummary } from './utils/dateUtils';

const STORAGE_KEY = 'pustaka_aksara_state_v1';

interface PersistedState {
  loans: LoanRecord[];
  favoriteIds: string[];
  readingStates: Record<string, ReadingState>;
  completedPracticeTasks: Record<string, boolean>;
  readNotificationIds: string[];
  notificationSettings: NotificationSettings;
}

function buildInitialState(): PersistedState {
  const now = Date.now();
  return {
    loans: [
      {
        id: 'loan-seed-1',
        bookId: 'bk-arsitektur-sistem-desain',
        borrowedAt: addDaysISO(now, -9),
        dueDate: addDaysISO(now, -2), // Terlambat 2 hari untuk demonstrasi sistem pengingat
        status: 'active',
        extended: false,
        durationDays: 7,
      },
      {
        id: 'loan-seed-2',
        bookId: 'bk-seni-berpikir-jernih',
        borrowedAt: addDaysISO(now, -6),
        dueDate: addDaysISO(now, 1), // Jatuh tempo besok
        status: 'active',
        extended: false,
        durationDays: 7,
      },
      {
        id: 'loan-seed-3',
        bookId: 'bk-catatan-nusantara',
        borrowedAt: addDaysISO(now, -21),
        dueDate: addDaysISO(now, -14),
        returnedAt: addDaysISO(now, -15),
        status: 'returned',
        extended: false,
        durationDays: 7,
      },
      {
        id: 'loan-seed-4',
        bookId: 'bk-kebiasaan-atomik-harian',
        borrowedAt: addDaysISO(now, -32),
        dueDate: addDaysISO(now, -25),
        returnedAt: addDaysISO(now, -24),
        status: 'returned',
        extended: true,
        durationDays: 7,
      },
    ],
    favoriteIds: [
      'bk-rekayasa-perangkat-lunak',
      'bk-catatan-nusantara',
      'bk-seni-berpikir-jernih',
    ],
    readingStates: {
      'bk-arsitektur-sistem-desain': {
        currentChapterIndex: 1,
        completedChapterIds: ['ch-1'],
        bookmarkedChapterIds: ['ch-1'],
        note: 'Proporsi ruang kosong dan angka tabular membuat tabel jadwal jauh lebih terbaca.',
        lastReadAt: addDaysISO(now, -3),
      },
      'bk-seni-berpikir-jernih': {
        currentChapterIndex: 0,
        completedChapterIds: [],
        bookmarkedChapterIds: [],
        note: '',
        lastReadAt: addDaysISO(now, -1),
      },
    },
    completedPracticeTasks: {
      'bk-arsitektur-sistem-desain::task-0': true,
    },
    readNotificationIds: [],
    notificationSettings: {
      remindBeforeDays: 2,
      dailyOverdueAlert: true,
      showHomeBanner: true,
    },
  };
}

function loadPersistedState(): PersistedState {
  if (typeof window === 'undefined') return buildInitialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildInitialState();
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    const defaults = buildInitialState();
    return {
      loans: Array.isArray(parsed.loans) ? parsed.loans : defaults.loans,
      favoriteIds: Array.isArray(parsed.favoriteIds)
        ? parsed.favoriteIds
        : defaults.favoriteIds,
      readingStates:
        parsed.readingStates && typeof parsed.readingStates === 'object'
          ? parsed.readingStates
          : defaults.readingStates,
      completedPracticeTasks:
        parsed.completedPracticeTasks && typeof parsed.completedPracticeTasks === 'object'
          ? parsed.completedPracticeTasks
          : defaults.completedPracticeTasks,
      readNotificationIds: Array.isArray(parsed.readNotificationIds)
        ? parsed.readNotificationIds
        : defaults.readNotificationIds,
      notificationSettings:
        parsed.notificationSettings && typeof parsed.notificationSettings === 'object'
          ? { ...defaults.notificationSettings, ...parsed.notificationSettings }
          : defaults.notificationSettings,
    };
  } catch {
    return buildInitialState();
  }
}

interface ToastMessage {
  id: number;
  text: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function App() {
  const [state, setState] = useState<PersistedState>(() => loadPersistedState());
  const [activeTab, setActiveTab] = useState<AppTab>('beranda');
  const [myLibrarySubTab, setMyLibrarySubTab] = useState<MyLibrarySubTab>('pinjaman');
  const [selectedBookDetail, setSelectedBookDetail] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const activeLoans = useMemo(
    () => state.loans.filter((l) => l.status === 'active'),
    [state.loans]
  );

  const bookMap = useMemo(() => {
    const map = new Map<string, Book>();
    for (const book of BOOKS_CATALOG) {
      map.set(book.id, book);
    }
    return map;
  }, []);

  const notifications = useMemo<DerivedNotification[]>(() => {
    const items: DerivedNotification[] = [];
    const { remindBeforeDays, dailyOverdueAlert } = state.notificationSettings;

    for (const loan of activeLoans) {
      const book = bookMap.get(loan.bookId);
      if (!book) continue;
      const due = getLoanDueSummary(loan.dueDate);

      if (due.isOverdue && dailyOverdueAlert) {
        const notifId = `overdue::${loan.id}::${due.daysOverdue}`;
        items.push({
          id: notifId,
          loanId: loan.id,
          bookId: book.id,
          bookTitle: book.title,
          type: 'overdue',
          daysOverdue: due.daysOverdue,
          daysRemaining: 0,
          title: `Buku "${book.title}" Terlambat Dikembalikan`,
          message: `Batas peminjaman berakhir pada ${formatDateID(loan.dueDate)} (${due.daysOverdue} hari yang lalu). Segera kembalikan buku atau perpanjang durasi baca agar koleksi dapat diakses pembaca lain.`,
          timestamp: loan.dueDate,
          isRead: state.readNotificationIds.includes(notifId),
        });
      } else if (!due.isOverdue && due.daysRemaining <= remindBeforeDays) {
        const notifId = `due-soon::${loan.id}::${due.daysRemaining}`;
        items.push({
          id: notifId,
          loanId: loan.id,
          bookId: book.id,
          bookTitle: book.title,
          type: 'due_soon',
          daysOverdue: 0,
          daysRemaining: due.daysRemaining,
          title:
            due.daysRemaining === 0
              ? `Batas Pengembalian Hari Ini: "${book.title}"`
              : `Pengingat Jatuh Tempo: "${book.title}"`,
          message:
            due.daysRemaining === 0
              ? `Peminjaman buku ini berakhir hari ini (${formatDateID(loan.dueDate)}). Selesaikan bacaan Anda atau perpanjang jika masih diperlukan.`
              : `Peminjaman buku ini akan berakhir dalam ${due.daysRemaining} hari pada ${formatDateID(loan.dueDate)}.`,
          timestamp: loan.dueDate,
          isRead: state.readNotificationIds.includes(notifId),
        });
      }
    }

    return items.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'overdue' ? -1 : 1;
      return b.daysOverdue - a.daysOverdue;
    });
  }, [activeLoans, bookMap, state.notificationSettings, state.readNotificationIds]);

  const unreadAlertCount = notifications.filter((n) => !n.isRead).length;
  const overdueCount = notifications.filter((n) => n.type === 'overdue').length;

  function showToast(text: string, actionLabel?: string, onAction?: () => void) {
    setToast({ id: Date.now(), text, actionLabel, onAction });
  }

  function handleToggleFavorite(bookId: string) {
    const exists = state.favoriteIds.includes(bookId);
    const book = bookMap.get(bookId);
    setState((prev) => ({
      ...prev,
      favoriteIds: exists
        ? prev.favoriteIds.filter((id) => id !== bookId)
        : [...prev.favoriteIds, bookId],
    }));
    if (book) {
      showToast(
        exists
          ? `"${book.title}" dihapus dari Daftar Favorit.`
          : `"${book.title}" disimpan ke Daftar Favorit.`
      );
    }
  }

  function handleBorrowBook(book: Book, durationDays: number = 7) {
    const alreadyActive = activeLoans.find((l) => l.bookId === book.id);
    if (alreadyActive) {
      setReadingBook(book);
      setSelectedBookDetail(null);
      return;
    }

    const now = Date.now();
    const newLoan: LoanRecord = {
      id: `loan-${now}-${Math.random().toString(36).slice(2, 6)}`,
      bookId: book.id,
      borrowedAt: new Date(now).toISOString(),
      dueDate: addDaysISO(now, durationDays),
      status: 'active',
      extended: false,
      durationDays,
    };

    setState((prev) => ({
      ...prev,
      loans: [newLoan, ...prev.loans],
      readingStates: prev.readingStates[book.id]
        ? prev.readingStates
        : {
            ...prev.readingStates,
            [book.id]: {
              currentChapterIndex: 0,
              completedChapterIds: [],
              bookmarkedChapterIds: [],
              note: '',
            },
          },
    }));

    setSelectedBookDetail(null);
    showToast(
      `Berhasil meminjam "${book.title}" hingga ${formatDateID(newLoan.dueDate)}.`,
      'Baca Sekarang',
      () => setReadingBook(book)
    );
  }

  function handleReturnLoan(loanId: string) {
    const target = state.loans.find((l) => l.id === loanId);
    if (!target) return;
    const book = bookMap.get(target.bookId);

    setState((prev) => ({
      ...prev,
      loans: prev.loans.map((loan) =>
        loan.id === loanId
          ? {
              ...loan,
              status: 'returned',
              returnedAt: new Date().toISOString(),
            }
          : loan
      ),
    }));

    if (selectedBookDetail?.id === target.bookId) {
      setSelectedBookDetail(null);
    }
    showToast(
      book
        ? `"${book.title}" telah dikembalikan dan tercatat di Riwayat Peminjaman.`
        : 'Buku berhasil dikembalikan.'
    );
  }

  function handleExtendLoan(loanId: string) {
    const target = state.loans.find((l) => l.id === loanId);
    if (!target || target.extended) return;
    const book = bookMap.get(target.bookId);

    // Extend from whichever is later: current due date or now, +3 days
    const baseMs = Math.max(new Date(target.dueDate).getTime(), Date.now());
    const nextDue = addDaysISO(baseMs, 3);

    setState((prev) => ({
      ...prev,
      loans: prev.loans.map((loan) =>
        loan.id === loanId
          ? {
              ...loan,
              dueDate: nextDue,
              extended: true,
              durationDays: loan.durationDays + 3,
            }
          : loan
      ),
    }));

    showToast(
      book
        ? `Masa pinjam "${book.title}" diperpanjang hingga ${formatDateID(nextDue)}.`
        : 'Masa peminjaman diperpanjang 3 hari.'
    );
  }

  function handleSimulateOverdue(loanId: string) {
    const target = state.loans.find((l) => l.id === loanId);
    if (!target) return;
    const book = bookMap.get(target.bookId);
    const pastDue = addDaysISO(Date.now(), -3);

    setState((prev) => ({
      ...prev,
      loans: prev.loans.map((loan) =>
        loan.id === loanId ? { ...loan, dueDate: pastDue } : loan
      ),
    }));

    showToast(
      book
        ? `Simulasi aktif: "${book.title}" kini tercatat terlambat 3 hari.`
        : 'Simulasi keterlambatan diaktifkan.'
    );
  }

  function handleOpenReader(book: Book) {
    const hasLoan = activeLoans.some((l) => l.bookId === book.id);
    if (!hasLoan) {
      handleBorrowBook(book, 7);
    }
    setSelectedBookDetail(null);
    setReadingBook(book);
  }

  function handleUpdateReadingState(bookId: string, next: ReadingState) {
    setState((prev) => ({
      ...prev,
      readingStates: {
        ...prev.readingStates,
        [bookId]: next,
      },
    }));
  }

  function handleTogglePracticeTask(taskKey: string) {
    setState((prev) => ({
      ...prev,
      completedPracticeTasks: {
        ...prev.completedPracticeTasks,
        [taskKey]: !prev.completedPracticeTasks[taskKey],
      },
    }));
  }

  function handleMarkNotificationRead(notificationId: string) {
    setState((prev) => ({
      ...prev,
      readNotificationIds: prev.readNotificationIds.includes(notificationId)
        ? prev.readNotificationIds
        : [...prev.readNotificationIds, notificationId],
    }));
  }

  function handleMarkAllRead() {
    const allIds = notifications.map((n) => n.id);
    setState((prev) => ({
      ...prev,
      readNotificationIds: Array.from(new Set([...prev.readNotificationIds, ...allIds])),
    }));
  }

  function handlePrimaryHeaderAction() {
    if (activeLoans.length > 0) {
      const mostRecentLoan = [...activeLoans].sort((a, b) => {
        const ra = state.readingStates[a.bookId]?.lastReadAt ?? a.borrowedAt;
        const rb = state.readingStates[b.bookId]?.lastReadAt ?? b.borrowedAt;
        return new Date(rb).getTime() - new Date(ra).getTime();
      })[0];
      const book = bookMap.get(mostRecentLoan.bookId);
      if (book) {
        setReadingBook(book);
        return;
      }
    }
    setActiveTab('beranda');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  }

  // When ReaderView is open, render the dedicated distraction-free reading experience
  if (readingBook) {
    const currentReadingState: ReadingState = state.readingStates[readingBook.id] ?? {
      currentChapterIndex: 0,
      completedChapterIds: [],
      bookmarkedChapterIds: [],
      note: '',
    };

    return (
      <ReaderView
        book={readingBook}
        readingState={currentReadingState}
        onUpdateReadingState={handleUpdateReadingState}
        onClose={() => setReadingBook(null)}
      />
    );
  }

  const detailActiveLoan = selectedBookDetail
    ? activeLoans.find((l) => l.bookId === selectedBookDetail.id)
    : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#111827]">
      <Header
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        unreadAlertCount={unreadAlertCount}
        overdueCount={overdueCount}
        hasActiveLoan={activeLoans.length > 0}
        onPrimaryAction={handlePrimaryHeaderAction}
      />

      <main className="flex-1">
        {activeTab === 'beranda' && (
          <HomeView
            books={BOOKS_CATALOG}
            activeLoans={activeLoans}
            favoriteIds={state.favoriteIds}
            showOverdueBanner={state.notificationSettings.showHomeBanner}
            onToggleFavorite={handleToggleFavorite}
            onOpenDetail={setSelectedBookDetail}
            onReadNow={handleOpenReader}
            onQuickBorrow={(book) => handleBorrowBook(book, 7)}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'klinik' && (
          <KlinikBelajarView
            books={BOOKS_CATALOG}
            activeLoans={activeLoans}
            favoriteIds={state.favoriteIds}
            completedPracticeTasks={state.completedPracticeTasks}
            onTogglePracticeTask={handleTogglePracticeTask}
            onToggleFavorite={handleToggleFavorite}
            onOpenDetail={setSelectedBookDetail}
            onReadNow={handleOpenReader}
            onQuickBorrow={(book) => handleBorrowBook(book, 7)}
          />
        )}

        {activeTab === 'pustaka' && (
          <MyLibraryView
            subTab={myLibrarySubTab}
            onChangeSubTab={setMyLibrarySubTab}
            books={BOOKS_CATALOG}
            loans={state.loans}
            favoriteIds={state.favoriteIds}
            readingStates={state.readingStates}
            onToggleFavorite={handleToggleFavorite}
            onOpenDetail={setSelectedBookDetail}
            onReadNow={handleOpenReader}
            onQuickBorrow={(book) => handleBorrowBook(book, 7)}
            onReturnLoan={handleReturnLoan}
            onExtendLoan={handleExtendLoan}
          />
        )}

        {activeTab === 'notifikasi' && (
          <NotificationsView
            notifications={notifications}
            books={BOOKS_CATALOG}
            activeLoans={activeLoans}
            settings={state.notificationSettings}
            onUpdateSettings={(next) =>
              setState((prev) => ({ ...prev, notificationSettings: next }))
            }
            onMarkAsRead={handleMarkNotificationRead}
            onMarkAllRead={handleMarkAllRead}
            onReturnLoan={handleReturnLoan}
            onExtendLoan={handleExtendLoan}
            onReadBook={handleOpenReader}
            onSimulateOverdue={handleSimulateOverdue}
          />
        )}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            <span className="font-serif text-sm font-semibold text-gray-900">
              Pustaka Aksara
            </span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>Perpustakaan Digital &amp; Klinik Belajar Daring</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => setActiveTab('beranda')}
              className="hover:text-gray-900 cursor-pointer"
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('klinik')}
              className="hover:text-gray-900 cursor-pointer"
            >
              Klinik Belajar
            </button>
            <button
              type="button"
              onClick={() => {
                setMyLibrarySubTab('favorit');
                setActiveTab('pustaka');
              }}
              className="hover:text-gray-900 cursor-pointer"
            >
              Daftar Favorit
            </button>
            <button
              type="button"
              onClick={() => {
                setMyLibrarySubTab('riwayat');
                setActiveTab('pustaka');
              }}
              className="hover:text-gray-900 cursor-pointer"
            >
              Riwayat Peminjaman
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('notifikasi')}
              className="hover:text-gray-900 cursor-pointer"
            >
              Notifikasi
            </button>
          </div>
        </div>
      </footer>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBookDetail}
        activeLoan={detailActiveLoan}
        isFavorite={
          selectedBookDetail ? state.favoriteIds.includes(selectedBookDetail.id) : false
        }
        onClose={() => setSelectedBookDetail(null)}
        onBorrow={handleBorrowBook}
        onReadNow={handleOpenReader}
        onReturnLoan={handleReturnLoan}
        onExtendLoan={handleExtendLoan}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Non-blocking Confirmation Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between gap-4 text-xs"
        >
          <p className="leading-snug">{toast.text}</p>
          {toast.actionLabel && toast.onAction && (
            <button
              type="button"
              onClick={() => {
                toast.onAction?.();
                setToast(null);
              }}
              className="font-semibold text-sky-300 hover:text-sky-200 whitespace-nowrap shrink-0 cursor-pointer underline underline-offset-4"
            >
              {toast.actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

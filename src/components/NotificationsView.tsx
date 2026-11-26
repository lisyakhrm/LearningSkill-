import {
  AlertTriangle,
  Bell,
  BookOpen,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  Book,
  DerivedNotification,
  LoanRecord,
  NotificationSettings,
} from '../types/library';
import { formatDateID } from '../utils/dateUtils';

interface NotificationsViewProps {
  notifications: DerivedNotification[];
  books: Book[];
  activeLoans: LoanRecord[];
  settings: NotificationSettings;
  onUpdateSettings: (next: NotificationSettings) => void;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllRead: () => void;
  onReturnLoan: (loanId: string) => void;
  onExtendLoan: (loanId: string) => void;
  onReadBook: (book: Book) => void;
  onSimulateOverdue: (loanId: string) => void;
}

export function NotificationsView({
  notifications,
  books,
  activeLoans,
  settings,
  onUpdateSettings,
  onMarkAsRead,
  onMarkAllRead,
  onReturnLoan,
  onExtendLoan,
  onReadBook,
  onSimulateOverdue,
}: NotificationsViewProps) {
  const [filter, setFilter] = useState<'semua' | 'terlambat' | 'jatuh_tempo'>('semua');
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission | 'unsupported'>(
    typeof window !== 'undefined' && 'Notification' in window
      ? window.Notification.permission
      : 'unsupported'
  );

  const bookMap = useMemo(() => {
    const m = new Map<string, Book>();
    for (const b of books) m.set(b.id, b);
    return m;
  }, [books]);

  const loanMap = useMemo(() => {
    const m = new Map<string, LoanRecord>();
    for (const l of activeLoans) m.set(l.id, l);
    return m;
  }, [activeLoans]);

  const filteredNotifications = useMemo(() => {
    if (filter === 'terlambat') {
      return notifications.filter((n) => n.type === 'overdue');
    }
    if (filter === 'jatuh_tempo') {
      return notifications.filter((n) => n.type === 'due_soon');
    }
    return notifications;
  }, [notifications, filter]);

  const overdueCount = notifications.filter((n) => n.type === 'overdue').length;
  const dueSoonCount = notifications.filter((n) => n.type === 'due_soon').length;

  const nonOverdueLoans = useMemo(() => {
    const overdueLoanIds = new Set(
      notifications.filter((n) => n.type === 'overdue').map((n) => n.loanId)
    );
    return activeLoans.filter((l) => !overdueLoanIds.has(l.id));
  }, [activeLoans, notifications]);

  async function handleRequestBrowserNotification() {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    try {
      const result = await window.Notification.requestPermission();
      setBrowserPermission(result);
      if (result === 'granted' && overdueCount > 0) {
        new window.Notification('Pengingat Pustaka Aksara', {
          body: `Terdapat ${overdueCount} buku yang telah melewati batas pengembalian.`,
        });
      }
    } catch {
      // Ignore permission rejection in embedded frames
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1E3A8A]">
            Sistem Pengingat Otomatis
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-gray-900">
            Notifikasi &amp; Pengingat Pengembalian
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Pantau buku yang telah melewati batas waktu maupun yang mendekati tanggal jatuh tempo pengembalian.
          </p>
        </div>

        {notifications.some((n) => !n.isRead) && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-800 hover:bg-gray-50 cursor-pointer whitespace-nowrap self-start"
          >
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Tandai Semua Dibaca</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Notification Feed */}
        <div className="lg:col-span-8 space-y-5">
          {/* Filter Segmented Control */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setFilter('semua')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${
                  filter === 'semua'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Semua ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('terlambat')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${
                  filter === 'terlambat'
                    ? 'bg-white text-red-700 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Terlambat ({overdueCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('jatuh_tempo')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${
                  filter === 'jatuh_tempo'
                    ? 'bg-white text-[#1E3A8A] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Jatuh Tempo Segera ({dueSoonCount})
              </button>
            </div>
          </div>

          {filteredNotifications.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <CheckCircle2
                className="w-8 h-8 text-emerald-700 mx-auto"
                aria-hidden="true"
              />
              <h2 className="mt-3 font-serif text-xl font-semibold text-gray-900">
                Semua Pengembalian Aman dan Tepat Waktu
              </h2>
              <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
                Saat ini tidak ada pinjaman yang terlambat atau mendekati batas waktu pada kategori ini.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((item) => {
                const book = bookMap.get(item.bookId);
                const loan = loanMap.get(item.loanId);
                if (!book || !loan) return null;

                const isOverdue = item.type === 'overdue';

                return (
                  <article
                    key={item.id}
                    className={`bg-white border rounded-2xl p-5 sm:p-6 transition-colors ${
                      isOverdue
                        ? 'border-red-300 bg-red-50/30'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg shrink-0 ${
                            isOverdue
                              ? 'bg-red-100 text-red-700'
                              : 'bg-[#1E3A8A]/10 text-[#1E3A8A]'
                          }`}
                        >
                          {isOverdue ? (
                            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                          ) : (
                            <Clock className="w-4 h-4" aria-hidden="true" />
                          )}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span
                              className={`font-semibold ${
                                isOverdue ? 'text-red-800' : 'text-[#1E3A8A]'
                              }`}
                            >
                              {isOverdue
                                ? `Peringatan Terlambat · ${item.daysOverdue} hari`
                                : 'Pengingat Jatuh Tempo'}
                            </span>
                            <span aria-hidden="true" className="text-gray-400">
                              ·
                            </span>
                            <span className="text-gray-500 tabular-nums">
                              Batas kembali {formatDateID(loan.dueDate)}
                            </span>
                            {!item.isRead && (
                              <>
                                <span aria-hidden="true" className="text-gray-400">
                                  ·
                                </span>
                                <span className="font-semibold text-gray-900">Belum dibaca</span>
                              </>
                            )}
                          </div>

                          <h2 className="mt-1.5 font-serif text-lg sm:text-xl font-semibold text-gray-900">
                            {item.title}
                          </h2>
                          <p className="mt-1.5 text-sm text-gray-700 leading-relaxed">
                            {item.message}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-200/70 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onReturnLoan(loan.id)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-white cursor-pointer whitespace-nowrap ${
                            isOverdue
                              ? 'bg-red-700 hover:bg-red-800'
                              : 'bg-gray-900 hover:bg-[#1E3A8A]'
                          }`}
                        >
                          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Kembalikan Buku Sekarang</span>
                        </button>

                        {!loan.extended && (
                          <button
                            type="button"
                            onClick={() => onExtendLoan(loan.id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-800 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                          >
                            <CalendarClock className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Perpanjang (+3 Hari)</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onReadBook(book)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                        >
                          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Buka Bacaan</span>
                        </button>
                      </div>

                      {!item.isRead && (
                        <button
                          type="button"
                          onClick={() => onMarkAsRead(item.id)}
                          className="text-xs font-medium text-gray-600 hover:text-gray-900 underline underline-offset-4 cursor-pointer"
                        >
                          Tandai dibaca
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Notification Preferences & Overdue Reminder Simulation */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
            <div>
              <h2 className="font-serif text-xl font-semibold text-gray-900">
                Pengaturan Pengingat
              </h2>
              <p className="mt-1 text-xs text-gray-600">
                Atur bagaimana Pustaka Aksara mengingatkan jadwal pengembalian Anda.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <label className="flex items-start justify-between gap-3 cursor-pointer">
                <span>
                  <span className="font-medium text-gray-900 block">
                    Peringatan Harian Buku Terlambat
                  </span>
                  <span className="text-xs text-gray-500">
                    Tampilkan pengingat prioritas tinggi jika melewati batas kembali.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={settings.dailyOverdueAlert}
                  onChange={(e) =>
                    onUpdateSettings({ ...settings, dailyOverdueAlert: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 accent-[#1E3A8A] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-start justify-between gap-3 cursor-pointer">
                <span>
                  <span className="font-medium text-gray-900 block">
                    Pita Pengingat di Beranda
                  </span>
                  <span className="text-xs text-gray-500">
                    Munculkan pemberitahuan ringkas di halaman utama saat ada buku terlambat.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={settings.showHomeBanner}
                  onChange={(e) =>
                    onUpdateSettings({ ...settings, showHomeBanner: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 accent-[#1E3A8A] rounded cursor-pointer"
                />
              </label>

              <div className="pt-2 border-t border-gray-100">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Ingatkan sebelum jatuh tempo
                </label>
                <select
                  value={settings.remindBeforeDays}
                  onChange={(e) =>
                    onUpdateSettings({
                      ...settings,
                      remindBeforeDays: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#F8F9FA] text-sm text-gray-900 focus:outline-none focus:border-[#1E3A8A]"
                >
                  <option value={1}>1 hari sebelum jatuh tempo</option>
                  <option value={2}>2 hari sebelum jatuh tempo</option>
                  <option value={3}>3 hari sebelum jatuh tempo</option>
                </select>
              </div>

              {browserPermission !== 'unsupported' && (
                <div className="pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleRequestBrowserNotification}
                    disabled={browserPermission === 'granted'}
                    className={`w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-medium border transition-colors ${
                      browserPermission === 'granted'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 cursor-default'
                        : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>
                      {browserPermission === 'granted'
                        ? 'Notifikasi Browser Aktif'
                        : 'Aktifkan Notifikasi Browser'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Test Trigger for Overdue Notifications */}
          {nonOverdueLoans.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
              <h3 className="font-serif text-lg font-semibold text-gray-900">
                Uji Pengingat Keterlambatan
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Simulasikan keterlambatan pengembalian pada salah satu pinjaman aktif untuk menguji pemicu notifikasi otomatis.
              </p>
              <div className="space-y-2 pt-1">
                {nonOverdueLoans.slice(0, 2).map((loan) => {
                  const book = bookMap.get(loan.bookId);
                  if (!book) return null;
                  return (
                    <button
                      key={loan.id}
                      type="button"
                      onClick={() => onSimulateOverdue(loan.id)}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg border border-gray-200 bg-[#F8F9FA] hover:bg-gray-100 text-xs font-medium text-gray-800 cursor-pointer transition-colors"
                    >
                      Simulasikan terlambat: <span className="font-semibold">{book.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

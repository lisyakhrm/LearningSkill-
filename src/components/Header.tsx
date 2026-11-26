import { BookOpen } from 'lucide-react';
import { AppTab } from '../types/library';

interface HeaderProps {
  activeTab: AppTab;
  onNavigate: (tab: AppTab) => void;
  unreadAlertCount: number;
  overdueCount: number;
  hasActiveLoan: boolean;
  onPrimaryAction: () => void;
}

export function Header({
  activeTab,
  onNavigate,
  unreadAlertCount,
  overdueCount,
  hasActiveLoan,
  onPrimaryAction,
}: HeaderProps) {
  const navItems: { id: AppTab; label: string; count?: number; isUrgent?: boolean }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'klinik', label: 'Klinik Belajar' },
    { id: 'pustaka', label: 'Pustaka Saya' },
    {
      id: 'notifikasi',
      label: 'Notifikasi',
      count: unreadAlertCount > 0 ? unreadAlertCount : undefined,
      isUrgent: overdueCount > 0,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('beranda')}
          className="font-serif text-xl font-semibold tracking-tight text-gray-900 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
        >
          Pustaka Aksara
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] ${
                  isActive
                    ? 'text-[#1E3A8A] font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span
                    className={`ml-1.5 font-mono text-xs tabular-nums ${
                      item.isUrgent ? 'text-red-700 font-semibold' : 'text-[#1E3A8A]'
                    }`}
                  >
                    ({item.count})
                  </span>
                )}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[19px] h-0.5 bg-[#1E3A8A]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onPrimaryAction}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E3A8A] text-white text-sm font-medium hover:bg-[#172D6E] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{hasActiveLoan ? 'Lanjut Membaca' : 'Jelajahi Katalog'}</span>
          </button>
        </div>
      </div>

      {/* Compact mobile navigation row */}
      <nav
        aria-label="Navigasi seluler"
        className="md:hidden border-t border-gray-100 px-3 py-1.5 flex items-center justify-between gap-2 overflow-x-auto bg-white"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-2.5 py-2 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#1E3A8A]/10 text-[#1E3A8A] font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
              {item.count !== undefined && (
                <span
                  className={`ml-1 font-mono tabular-nums ${
                    item.isUrgent ? 'text-red-700 font-semibold' : 'text-[#1E3A8A]'
                  }`}
                >
                  ({item.count})
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

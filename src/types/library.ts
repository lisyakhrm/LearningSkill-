export type BookCategory = 'Skill' | 'Self Development' | 'Buku Umum';

export type ClinicTrack =
  | 'Desain & Produk Digital'
  | 'Karier & Kepemimpinan'
  | 'Fokus & Kebiasaan'
  | 'Komunikasi & Negosiasi';

export type AppTab = 'beranda' | 'klinik' | 'pustaka' | 'notifikasi';

export type MyLibrarySubTab = 'pinjaman' | 'favorit' | 'riwayat';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  estimatedMinutes: number;
  pullQuote?: string;
  paragraphs: string[];
}

export interface BookCoverStyle {
  imageSrc?: string;
  bgClass: string;
  inkClass: string;
  accentHex: string;
  motif: 'grid' | 'horizon' | 'prism' | 'wave' | 'compass';
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  year: number;
  pages: number;
  isbn: string;
  category: BookCategory;
  clinicTrack?: ClinicTrack;
  rating: number;
  borrowCount: number;
  isPopular: boolean;
  synopsis: string;
  learningTakeaways?: string[];
  practiceTasks?: string[];
  cover: BookCoverStyle;
  chapters: Chapter[];
}

export type LoanStatus = 'active' | 'returned';

export interface LoanRecord {
  id: string;
  bookId: string;
  borrowedAt: string; // ISO timestamp
  dueDate: string; // ISO timestamp
  returnedAt?: string; // ISO timestamp
  status: LoanStatus;
  extended: boolean;
  durationDays: number;
}

export interface ReadingState {
  currentChapterIndex: number;
  completedChapterIds: string[];
  bookmarkedChapterIds: string[];
  note: string;
  lastReadAt?: string;
}

export interface NotificationSettings {
  remindBeforeDays: number; // e.g. 1 or 2 days before due
  dailyOverdueAlert: boolean;
  showHomeBanner: boolean;
}

export interface DerivedNotification {
  id: string;
  loanId: string;
  bookId: string;
  bookTitle: string;
  type: 'overdue' | 'due_soon';
  daysOverdue: number;
  daysRemaining: number;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

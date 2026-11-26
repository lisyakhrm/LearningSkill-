const MONTHS_ID = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

export function formatDateID(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '-';
  const day = date.getDate();
  const month = MONTHS_ID[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function getDayDifferenceFromNow(targetIso: string, nowMs: number = Date.now()): number {
  const targetDate = new Date(targetIso);
  const nowDate = new Date(nowMs);

  const targetDayStart = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  ).getTime();

  const nowDayStart = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate()
  ).getTime();

  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((targetDayStart - nowDayStart) / msPerDay);
}

export function getLoanDueSummary(dueIso: string, nowMs: number = Date.now()): {
  isOverdue: boolean;
  isDueSoon: boolean;
  daysOverdue: number;
  daysRemaining: number;
  label: string;
} {
  const diffDays = getDayDifferenceFromNow(dueIso, nowMs);

  if (diffDays < 0) {
    const overdue = Math.abs(diffDays);
    return {
      isOverdue: true,
      isDueSoon: false,
      daysOverdue: overdue,
      daysRemaining: 0,
      label: `Terlambat ${overdue} hari`,
    };
  }

  if (diffDays === 0) {
    return {
      isOverdue: false,
      isDueSoon: true,
      daysOverdue: 0,
      daysRemaining: 0,
      label: 'Jatuh tempo hari ini',
    };
  }

  if (diffDays <= 2) {
    return {
      isOverdue: false,
      isDueSoon: true,
      daysOverdue: 0,
      daysRemaining: diffDays,
      label: diffDays === 1 ? 'Jatuh tempo besok' : `Sisa ${diffDays} hari`,
    };
  }

  return {
    isOverdue: false,
    isDueSoon: false,
    daysOverdue: 0,
    daysRemaining: diffDays,
    label: `Sisa ${diffDays} hari`,
  };
}

export function addDaysISO(baseMs: number, days: number): string {
  const d = new Date(baseMs + days * 24 * 60 * 60 * 1000);
  return d.toISOString();
}

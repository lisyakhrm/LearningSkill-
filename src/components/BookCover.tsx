import { useState } from 'react';
import { Book } from '../types/library';

interface BookCoverProps {
  book: Book;
  className?: string;
  compact?: boolean;
}

export function BookCover({ book, className = '', compact = false }: BookCoverProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(book.cover.imageSrc) && !imgFailed;

  if (showImage) {
    return (
      <div
        className={`relative overflow-hidden bg-stone-100 border border-stone-200/80 aspect-[3/4] ${className}`}
      >
        <img
          src={book.cover.imageSrc}
          alt={`Sampul buku ${book.title} karya ${book.author}`}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/15 to-transparent"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden aspect-[3/4] border border-black/10 flex flex-col justify-between ${book.cover.bgClass} ${book.cover.inkClass} ${compact ? 'p-3' : 'p-5'} ${className}`}
    >
      {/* Book spine crease */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/15 via-black/5 to-transparent"
      />

      {/* Minimalist geometric motif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute right-0 bottom-6 w-28 h-28 opacity-20"
        fill="none"
      >
        {book.cover.motif === 'grid' && (
          <g stroke={book.cover.accentHex} strokeWidth="1">
            <rect x="20" y="20" width="80" height="80" />
            <line x1="60" y1="20" x2="60" y2="100" />
            <line x1="20" y1="60" x2="100" y2="60" />
            <circle cx="60" cy="60" r="24" />
          </g>
        )}
        {book.cover.motif === 'horizon' && (
          <g stroke={book.cover.accentHex} strokeWidth="1.2">
            <circle cx="60" cy="68" r="34" />
            <circle cx="60" cy="68" r="22" />
            <line x1="16" y1="68" x2="104" y2="68" />
            <line x1="26" y1="80" x2="94" y2="80" />
          </g>
        )}
        {book.cover.motif === 'prism' && (
          <g stroke={book.cover.accentHex} strokeWidth="1.2">
            <polygon points="60,16 102,88 18,88" />
            <polygon points="60,34 86,88 34,88" />
            <line x1="60" y1="16" x2="60" y2="88" />
          </g>
        )}
        {book.cover.motif === 'wave' && (
          <g stroke={book.cover.accentHex} strokeWidth="1.2">
            <path d="M12 52 Q36 34 60 52 T108 52" />
            <path d="M12 68 Q36 50 60 68 T108 68" />
            <path d="M12 84 Q36 66 60 84 T108 84" />
          </g>
        )}
        {book.cover.motif === 'compass' && (
          <g stroke={book.cover.accentHex} strokeWidth="1.2">
            <circle cx="60" cy="60" r="36" />
            <line x1="60" y1="14" x2="60" y2="106" />
            <line x1="14" y1="60" x2="106" y2="60" />
            <polygon points="60,32 68,60 60,88 52,60" />
          </g>
        )}
      </svg>

      <div className="relative z-10 pl-1">
        <p className="text-[10px] tracking-[0.14em] uppercase opacity-75 truncate">
          {book.category}
        </p>
      </div>

      <div className="relative z-10 pl-1 my-auto">
        <h4
          className={`font-serif font-semibold leading-snug ${compact ? 'text-xs line-clamp-3' : 'text-base sm:text-lg line-clamp-4'}`}
        >
          {book.title}
        </h4>
      </div>

      <div className="relative z-10 pl-1 pt-2 border-t border-current/15">
        <p className={`opacity-80 truncate ${compact ? 'text-[10px]' : 'text-xs'}`}>
          {book.author}
        </p>
      </div>
    </div>
  );
}

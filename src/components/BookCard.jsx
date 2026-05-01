'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import s from './BookCard.module.css';

export default function BookCard({ book }) {
  const [imgError,  setImgError]  = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const router   = useRouter();
  const audioRef = useRef(null);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    if (book.openingAudio) {
      const audio = new Audio(book.openingAudio);
      audio.play().catch(() => {});
      audioRef.current = audio;
    }

    setTimeout(() => {
      router.push(`/book/${book.slug}`);
    }, 3000);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      className={`${s.card} ${isOpening ? s.cardOpening : ''}`}
      style={{ cursor: isOpening ? 'wait' : 'pointer' }}
    >
      <div className={s.coverWrapper}>
        {isOpening && (
          <div className={s.openingOverlay}>
            <span className={s.openingEmoji}>📖</span>
            <span className={s.openingText}>Abrindo…</span>
          </div>
        )}
        {book.cover && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.cover}
            alt={book.title}
            className={s.coverImage}
            style={isOpening ? { opacity: 0.35 } : {}}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={s.coverFallback}>📖</span>
        )}
      </div>

      <div className={s.cardBody}>
        <h2 className={s.cardTitle}>{book.title}</h2>
        {book.description && (
          <p className={s.cardDescription}>{book.description}</p>
        )}
        <p className={s.cardMeta}>{book.pages.length} páginas</p>
      </div>
    </div>
  );
}

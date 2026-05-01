'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import s from './BookReader.module.css';

export default function BookReader({ book }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);
  const audioRef = useRef(null);

  const page = book.pages[currentIndex];
  const totalPages = book.pages.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalPages - 1;

  useEffect(() => {
    setIsPlaying(false);
    setImgError(false);
  }, [currentIndex]);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // iOS requires user gesture — fail silently
      }
    }
  };

  const goNext = () => { if (!isLast)  setCurrentIndex((i) => i + 1); };
  const goPrev = () => { if (!isFirst) setCurrentIndex((i) => i - 1); };

  return (
    <div className={s.wrapper}>

      {/* ── Header ── */}
      <header className={s.header}>
        <Link href="/" className={s.homeBtn} aria-label="Voltar ao início">🏠</Link>
        <span className={s.headerTitle}>{book.title}</span>
        <span className={s.headerPage}>{page.number}/{totalPages}</span>
      </header>

      {/* ── Image ── */}
      <div className={s.imagePanel}>
        {imgError ? (
          <div className={s.imageFallback}>🍅</div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={page.image}
            alt={`Página ${page.number}`}
            className={s.image}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* ── Audio (remounts on page change — iOS-safe) ── */}
      <audio
        key={page.audio}
        ref={audioRef}
        src={page.audio}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* ── Right column: play + text (stacks in portrait, side-by-side in landscape/desktop) ── */}
      <div className={s.rightCol}>

        <button
          onClick={toggleAudio}
          className={s.playBtn}
          style={{
            background: isPlaying ? '#DC2626' : '#FDE047',
            color: '#000',
            boxShadow: isPlaying ? '4px 4px 0 #7f1d1d' : '4px 4px 0 #b45309',
          }}
        >
          <span>{isPlaying ? '⏸' : '▶'}</span>
          <span>{isPlaying ? 'PAUSE!' : 'PLAY!'}</span>
        </button>

        <div className={s.textPanel}>
          {page.paragraphs.map((para, i) => {
            const isDialogue = para.trim().startsWith('👉');
            const isMoral    = para.includes('MORAL FINAL');

            const cls = [
              s.para,
              isDialogue && s.paraDialogue,
              isMoral    && s.paraMoral,
            ].filter(Boolean).join(' ');

            return (
              <p key={i} className={cls}>
                {para}
              </p>
            );
          })}
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className={s.nav}>
        <button
          onClick={goPrev}
          disabled={isFirst}
          className={s.navBtn}
          style={{
            background:  isFirst ? '#CBD5E0' : '#2563EB',
            color:       isFirst ? '#718096' : '#fff',
            boxShadow:   isFirst ? 'none'    : '5px 5px 0 #000',
            cursor:      isFirst ? 'not-allowed' : 'pointer',
            opacity:     isFirst ? 0.5 : 1,
          }}
        >
          ← ANTERIOR
        </button>
        <button
          onClick={goNext}
          disabled={isLast}
          className={s.navBtn}
          style={{
            background:  isLast ? '#CBD5E0' : '#2563EB',
            color:       isLast ? '#718096' : '#fff',
            boxShadow:   isLast ? 'none'    : '5px 5px 0 #000',
            cursor:      isLast ? 'not-allowed' : 'pointer',
            opacity:     isLast ? 0.5 : 1,
          }}
        >
          PRÓXIMO →
        </button>
      </nav>

      {/* ── Page dots ── */}
      <div className={s.dots}>
        {book.pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Página ${i + 1}`}
            className={`${s.dot} ${i === currentIndex ? s.dotActive : ''}`}
            style={{
              background: i === currentIndex ? '#DC2626' : '#FDE047',
            }}
          />
        ))}
      </div>

    </div>
  );
}

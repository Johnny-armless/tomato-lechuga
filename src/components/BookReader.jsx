'use client';

import { useState } from 'react';
import ReaderHeader from './ReaderHeader';
import PageImage   from './PageImage';
import AudioPlayer from './AudioPlayer';
import PageText    from './PageText';
import PageNav     from './PageNav';
import PageDots    from './PageDots';
import s from './BookReader.module.css';

export default function BookReader({ book }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const page  = book.pages[currentIndex];
  const total = book.pages.length;

  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, total - 1));
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  return (
    <div className={s.wrapper}>
      <ReaderHeader title={book.title} currentPage={page.number} totalPages={total} />

      {/* key remounts on page change — resets image error state */}
      <PageImage key={page.image} src={page.image} alt={`Página ${page.number}`} />

      <div className={s.rightCol}>
        {/* key remounts on page change — stops audio and resets play state */}
        <AudioPlayer key={page.audio} src={page.audio} />
        <PageText paragraphs={page.paragraphs} />
      </div>

      <PageNav
        onPrev={goPrev}
        onNext={goNext}
        isFirst={currentIndex === 0}
        isLast={currentIndex === total - 1}
      />

      <PageDots total={total} current={currentIndex} onSelect={setCurrentIndex} />
    </div>
  );
}

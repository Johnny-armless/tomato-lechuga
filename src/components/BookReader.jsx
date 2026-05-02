'use client';

import { useEffect, useRef, useState } from 'react';
import ReaderHeader from './ReaderHeader';
import PageImage   from './PageImage';
import AudioPlayer from './AudioPlayer';
import PageText    from './PageText';
import PageNav     from './PageNav';
import PageDots    from './PageDots';
import s from './BookReader.module.css';

export default function BookReader({ book }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageNineUnlocked, setPageNineUnlocked] = useState(false);
  const [pageNineCanNavigate, setPageNineCanNavigate] = useState(false);
  const [pageNineVideoStarted, setPageNineVideoStarted] = useState(false);
  const audioPlayerRef = useRef(null);
  const audioStartTimeoutRef = useRef(null);
  const videoStartTimeoutRef = useRef(null);

  const page  = book.pages[currentIndex];
  const total = book.pages.length;
  const isPageNine = page.number === 9;
  const showPlayButton = !isPageNine || pageNineUnlocked;
  const isNavigationLocked = isPageNine && pageNineUnlocked && !pageNineCanNavigate;

  const goToIndex = (nextIndex) => {
    setPageNineUnlocked(false);
    setPageNineCanNavigate(false);
    setPageNineVideoStarted(false);
    clearTimeout(audioStartTimeoutRef.current);
    clearTimeout(videoStartTimeoutRef.current);
    setCurrentIndex(nextIndex);
  };

  const goNext = () => goToIndex(Math.min(currentIndex + 1, total - 1));
  const goPrev = () => goToIndex(Math.max(currentIndex - 1, 0));

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [page.number]);

  useEffect(() => {
    if (!isPageNine || pageNineUnlocked) return;

    const handleScroll = () => {
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      if (!reachedBottom) return;

      setPageNineUnlocked(true);
      clearTimeout(audioStartTimeoutRef.current);
      audioStartTimeoutRef.current = setTimeout(() => {
        audioPlayerRef.current?.play();
      }, 3000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPageNine, pageNineUnlocked]);

  useEffect(() => {
    return () => {
      clearTimeout(audioStartTimeoutRef.current);
      clearTimeout(videoStartTimeoutRef.current);
    };
  }, []);

  const handlePageNineAudioPlay = () => {
    if (!isPageNine || pageNineVideoStarted) return;

    clearTimeout(videoStartTimeoutRef.current);
    videoStartTimeoutRef.current = setTimeout(() => {
      setPageNineVideoStarted(true);
    }, 3000);
  };

  const handlePageNineAudioTimeUpdate = (currentTime) => {
    if (!isPageNine || pageNineCanNavigate) return;
    if (currentTime < 5) return;

    setPageNineCanNavigate(true);
  };

  const handlePageNineVideoComplete = () => {
    if (!isPageNine) return;
    setPageNineVideoStarted(false);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.stickyStack}>
        <ReaderHeader title={book.title} currentPage={page.number} totalPages={total} />

        <div className={s.mediaRail}>
          {/* key remounts on page change — resets image error state */}
          <PageImage
            key={`${page.image}-${isPageNine ? 'video' : 'image'}`}
            src={page.image}
            alt={`Página ${page.number}`}
            videoSrc={isPageNine ? '/video/lechuga/video-01.mp4' : undefined}
            videoLoopCount={2}
            shouldPlayVideo={pageNineVideoStarted}
            onVideoComplete={handlePageNineVideoComplete}
          />

          {/* key remounts on page change — stops audio and resets play state */}
          <AudioPlayer
            key={page.audio}
            ref={audioPlayerRef}
            src={page.audio}
            showButton={showPlayButton}
            onPlay={handlePageNineAudioPlay}
            onTimeUpdate={handlePageNineAudioTimeUpdate}
          />
        </div>
      </div>

      <div className={s.scrollArea}>
        <PageText key={page.number} paragraphs={page.paragraphs} />
      </div>

      <div className={s.controls}>
        <PageNav
          onPrev={goPrev}
          onNext={goNext}
          disabled={isNavigationLocked}
          isFirst={currentIndex === 0}
          isLast={currentIndex === total - 1}
        />

        <PageDots
          total={total}
          current={currentIndex}
          onSelect={goToIndex}
          disabled={isNavigationLocked}
        />
      </div>
    </div>
  );
}

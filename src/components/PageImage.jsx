'use client';

import { useRef, useState } from 'react';
import s from './PageImage.module.css';

export default function PageImage({
  src,
  alt,
  videoSrc,
  videoLoopCount = 1,
  shouldPlayVideo = false,
  onVideoComplete,
}) {
  const [error, setError] = useState(false);
  const completedLoopsRef = useRef(0);
  const showVideo = Boolean(videoSrc) && shouldPlayVideo && !error;

  const handleVideoEnded = (event) => {
    completedLoopsRef.current += 1;
    if (completedLoopsRef.current >= videoLoopCount) {
      onVideoComplete?.();
      return;
    }

    event.currentTarget.currentTime = 0;
    event.currentTarget.play().catch(() => {});
  };

  return (
    <div className={s.panel}>
      {error ? (
        <div className={s.fallback}>🍅</div>
      ) : showVideo ? (
        <video
          key={videoSrc}
          src={videoSrc}
          className={s.media}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          onError={() => setError(true)}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={s.media} onError={() => setError(true)} />
      )}
    </div>
  );
}

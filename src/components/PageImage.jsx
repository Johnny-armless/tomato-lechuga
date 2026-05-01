'use client';

import { useState } from 'react';
import s from './PageImage.module.css';

export default function PageImage({ src, alt }) {
  const [error, setError] = useState(false);

  return (
    <div className={s.panel}>
      {error ? (
        <div className={s.fallback}>🍅</div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={s.image} onError={() => setError(true)} />
      )}
    </div>
  );
}

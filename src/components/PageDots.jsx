'use client';

import s from './PageDots.module.css';

export default function PageDots({ total, current, onSelect }) {
  return (
    <div className={s.dots}>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Página ${i + 1}`}
          className={`${s.dot} ${i === current ? s.active : ''}`}
        />
      ))}
    </div>
  );
}

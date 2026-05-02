'use client';

import s from './PageDots.module.css';

export default function PageDots({ total, current, onSelect, disabled = false }) {
  return (
    <div className={s.dots}>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          disabled={disabled}
          aria-label={`Página ${i + 1}`}
          className={`${s.dot} ${i === current ? s.active : ''}`}
        />
      ))}
    </div>
  );
}

'use client';

import s from './PageNav.module.css';

export default function PageNav({ onPrev, onNext, isFirst, isLast }) {
  return (
    <nav className={s.nav}>
      <button onClick={onPrev} disabled={isFirst} className={s.btn}>
        ← ANTERIOR
      </button>
      <button onClick={onNext} disabled={isLast} className={s.btn}>
        PRÓXIMO →
      </button>
    </nav>
  );
}

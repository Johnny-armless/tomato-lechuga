import Link from 'next/link';
import s from './ReaderHeader.module.css';

export default function ReaderHeader({ title, currentPage, totalPages }) {
  return (
    <header className={s.header}>
      <Link href="/" className={s.homeBtn} aria-label="Voltar ao início">🏠</Link>
      <span className={s.title}>{title}</span>
      <span className={s.page}>{currentPage}/{totalPages}</span>
    </header>
  );
}

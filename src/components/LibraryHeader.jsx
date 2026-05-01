import s from './LibraryHeader.module.css';

export default function LibraryHeader() {
  return (
    <div className={s.header}>
      <p className={s.emoji}>📚</p>
      <h1 className={s.title}>MY STORYBOOKS</h1>
      <p className={s.subtitle}>Escolha a sua história!</p>
    </div>
  );
}

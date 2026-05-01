import books from '@/data/books';
import BookCard from '@/components/BookCard';
import s from './Home.module.css';

export default function Home() {
  return (
    <main className={s.wrapper}>

      <div className={s.header}>
        <p className={s.emoji}>📚</p>
        <h1 className={s.title}>MY STORYBOOKS</h1>
        <p className={s.subtitle}>Escolha a sua história!</p>
      </div>

      <div className={s.grid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

    </main>
  );
}

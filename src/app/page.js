import books from '@/data/books';
import LibraryHeader from '@/components/LibraryHeader';
import BookCard from '@/components/BookCard';
import s from './Home.module.css';

export default function Home() {
  return (
    <main className={s.wrapper}>
      <LibraryHeader />
      <div className={s.grid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}

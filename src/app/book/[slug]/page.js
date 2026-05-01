import books from '@/data/books';
import BookReader from '@/components/BookReader';
import { notFound } from 'next/navigation';

export default async function BookPage({ params }) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();
  return <BookReader book={book} />;
}

export async function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

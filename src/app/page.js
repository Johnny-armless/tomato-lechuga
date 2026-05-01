import books from '@/data/books';
import Link from 'next/link';

const B = 'var(--font-lilita)';
const C = 'var(--font-nunito)';

export default function Home() {
  return (
    <main style={{
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      gap: '24px',
    }}>

      {/* Title block */}
      <div style={{
        background: '#DC2626',
        border: '4px solid #000',
        boxShadow: '7px 7px 0 #000',
        padding: '24px 36px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
      }}>
        <div style={{ fontSize: '3.5rem', lineHeight: 1 }}>📚</div>
        <h1 style={{
          fontFamily: B,
          fontSize: '3.2rem',
          letterSpacing: '0.08em',
          color: '#fff',
          lineHeight: 1.1,
          marginTop: '8px',
        }}>
          MY STORYBOOKS
        </h1>
        <p style={{
          fontFamily: C,
          fontWeight: 700,
          color: '#FDE047',
          marginTop: '6px',
          fontSize: '1.05rem',
        }}>
          Choose a story!
        </p>
      </div>

      {/* Book cards */}
      {books.map((book) => (
        <Link
          key={book.id}
          href={`/book/${book.slug}`}
          style={{
            display: 'block',
            background: '#FDE047',
            border: '4px solid #000',
            boxShadow: '6px 6px 0 #000',
            padding: '22px 28px',
            width: '100%',
            maxWidth: '380px',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '8px' }}>📖</div>
          <h2 style={{
            fontFamily: B,
            fontSize: '2rem',
            letterSpacing: '0.06em',
            color: '#000',
          }}>
            {book.title}
          </h2>
          <p style={{ fontFamily: C, color: '#374151', marginTop: '4px', fontWeight: 700 }}>
            {book.pages.length} páginas
          </p>
        </Link>
      ))}
    </main>
  );
}

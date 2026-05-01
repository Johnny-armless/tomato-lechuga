import s from './PageText.module.css';

export default function PageText({ paragraphs }) {
  return (
    <div className={s.panel}>
      {paragraphs.map((para, i) => {
        const isDialogue = para.trim().startsWith('👉');
        const isMoral    = para.includes('MORAL FINAL');
        const cls = [
          s.para,
          isDialogue && s.dialogue,
          isMoral    && s.moral,
        ].filter(Boolean).join(' ');
        return <p key={i} className={cls}>{para}</p>;
      })}
    </div>
  );
}

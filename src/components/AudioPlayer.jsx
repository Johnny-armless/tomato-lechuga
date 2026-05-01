'use client';

import { useState, useRef } from 'react';
import s from './AudioPlayer.module.css';

export default function AudioPlayer({ src }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // iOS requires user gesture — fail silently
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} preload="metadata" />
      <button onClick={toggle} className={`${s.btn} ${playing ? s.playing : ''}`}>
        <span>{playing ? '⏸' : '▶'}</span>
        <span>{playing ? 'PAUSE!' : 'PLAY!'}</span>
      </button>
    </>
  );
}

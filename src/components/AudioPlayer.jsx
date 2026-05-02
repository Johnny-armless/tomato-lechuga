'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import s from './AudioPlayer.module.css';

const AudioPlayer = forwardRef(function AudioPlayer(
  { src, showButton = true, onPlay, onTimeUpdate },
  ref
) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      await audio.play();
      setPlaying(true);
      onPlay?.();
      return true;
    } catch {
      // iOS requires user gesture — fail silently
      return false;
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
  };

  const toggle = async () => {
    if (playing) {
      pause();
      return;
    }

    await play();
  };

  useImperativeHandle(ref, () => ({
    play,
    pause,
  }));

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(event) => onTimeUpdate?.(event.currentTarget.currentTime)}
        preload="metadata"
      />
      {showButton ? (
        <button onClick={toggle} className={`${s.btn} ${playing ? s.playing : ''}`}>
          <span>{playing ? '⏸' : '▶'}</span>
          <span>{playing ? 'PAUSE!' : 'PLAY!'}</span>
        </button>
      ) : null}
    </>
  );
});

export default AudioPlayer;

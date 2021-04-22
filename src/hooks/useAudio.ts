import  { useState, useEffect } from 'react';

/**
 * 
 * @param url 
 * @example 
    const Player = ({ url, setStart }) => {
    const [playing, toggle] = useAudio(url);

    const handleClick = () => {
        toggle();
    };

    return <PlayBtn onClick={handleClick} playing={playing} />;
    };
 */
const useAudio = (url:string) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};


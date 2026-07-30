import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioPlayerContext = createContext();

const DEFAULT_TRACK = {
  id: 'def1',
  title: 'Morning Vibe Blast',
  artist: 'Jordan Carter',
  showName: 'Morning Vibe Blast',
  presenterName: 'Jordan Carter',
  image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=300&q=80',
  audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
};

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio(DEFAULT_TRACK.audioUrl));
  const [currentTrack, setCurrentTrack] = useState(DEFAULT_TRACK);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch((err) => console.log('Audio playback prevented:', err));
    }
  };

  const playTrack = (track) => {
    const audio = audioRef.current;
    if (currentTrack?.id === track.id) {
      togglePlayPause();
      return;
    }
    
    audio.pause();
    setCurrentTrack(track);
    audio.src = track.audioUrl || DEFAULT_TRACK.audioUrl;
    audio.load();
    audio.play().then(() => setIsPlaying(true)).catch(err => console.log(err));
  };

  const seek = (time) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const setVolume = (val) => {
    const audio = audioRef.current;
    audio.volume = val;
    setVolumeState(val);
    if (val > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        togglePlayPause,
        playTrack,
        seek,
        setVolume,
        toggleMute
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);

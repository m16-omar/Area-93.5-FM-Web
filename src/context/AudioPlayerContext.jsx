import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const AudioPlayerContext = createContext();

export const LIVE_STREAM_URL = 'https://city1051-atunwadigital.streamguys1.com/city1051';

export const DEFAULT_LIVE_TRACK = {
  id: 'area_fm_live',
  title: '93.5 Area FM Live',
  artist: 'One Voice, Every Area',
  showName: 'The Fan Zone',
  presenterName: 'Simi Ogunleye',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  audioUrl: LIVE_STREAM_URL,
  isLive: true
};

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio(DEFAULT_LIVE_TRACK.audioUrl));
  const [currentTrack, setCurrentTrack] = useState(DEFAULT_LIVE_TRACK);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    audio.preload = 'auto';
    audio.volume = volume;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);
    const handlePlaying = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e) => {
      console.warn('Audio streaming notice/error:', e);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // Auto-stream playback logic
    const unlockEvents = ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'];
    
    const handleFirstInteraction = () => {
      if (audio.paused) {
        audio.src = LIVE_STREAM_URL;
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Autoplay after interaction notice:', err));
      }
      removeUnlockListeners();
    };

    const addUnlockListeners = () => {
      unlockEvents.forEach(evt => {
        window.addEventListener(evt, handleFirstInteraction, { once: true, passive: true });
      });
    };

    const removeUnlockListeners = () => {
      unlockEvents.forEach(evt => {
        window.removeEventListener(evt, handleFirstInteraction);
      });
    };

    // 1. Attempt immediate autoplay
    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Browser autoplay restriction in effect; auto-stream on the very first user touch/scroll/click
        addUnlockListeners();
      });

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      removeUnlockListeners();
    };
  }, []);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // If playing live stream, reload to get real-time stream without buffer lag
      if (currentTrack?.isLive || currentTrack?.audioUrl === LIVE_STREAM_URL) {
        audio.src = LIVE_STREAM_URL;
        audio.load();
      }
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback prevented:', err));
    }
  }, [isPlaying, currentTrack]);

  const playTrack = useCallback((track) => {
    const audio = audioRef.current;
    if (currentTrack?.id === track.id) {
      togglePlayPause();
      return;
    }
    
    audio.pause();
    setCurrentTrack(track);
    audio.src = track.audioUrl || LIVE_STREAM_URL;
    audio.load();
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(err => console.log('Play track error:', err));
  }, [currentTrack, togglePlayPause]);

  const playLiveStream = useCallback(() => {
    playTrack(DEFAULT_LIVE_TRACK);
  }, [playTrack]);

  const seek = (time) => {
    const audio = audioRef.current;
    if (!currentTrack?.isLive && isFinite(time)) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
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
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
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
        playLiveStream,
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

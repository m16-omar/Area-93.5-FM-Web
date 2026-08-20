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
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(DEFAULT_LIVE_TRACK);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
    }
    const audio = audioRef.current;
    audio.src = DEFAULT_LIVE_TRACK.audioUrl;
    audio.volume = 0.85;
    audio.preload = 'auto';

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

    // Auto-stream starter: attempts direct unmuted play first, falls back to muted stream + unlock on first gesture
    const unlockUserAudio = () => {
      if (audio.paused || audio.muted) {
        audio.muted = false;
        audio.volume = 0.85;
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch((err) => console.log('Audio unlock notice:', err));
      }
      removeListeners();
    };

    const unlockEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown', 'scroll'];

    const addListeners = () => {
      unlockEvents.forEach(evt => {
        window.addEventListener(evt, unlockUserAudio, { once: true, capture: true, passive: true });
        document.addEventListener(evt, unlockUserAudio, { once: true, capture: true, passive: true });
      });
    };

    const removeListeners = () => {
      unlockEvents.forEach(evt => {
        window.removeEventListener(evt, unlockUserAudio, { capture: true });
        document.removeEventListener(evt, unlockUserAudio, { capture: true });
      });
    };

    // 1. Try immediate unmuted play
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser Autoplay policy blocks unmuted audio, start playing muted & immediately attach global gesture unlock
          audio.muted = true;
          audio.play()
            .then(() => {
              setIsPlaying(true);
              setIsMuted(true);
            })
            .catch(() => {});
          
          addListeners();
        });
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      removeListeners();
    };
  }, []);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      setIsMuted(false);
      audio.volume = volume;

      // Reload live stream to eliminate buffer delay
      if (currentTrack?.isLive || currentTrack?.audioUrl === LIVE_STREAM_URL) {
        audio.src = LIVE_STREAM_URL;
        audio.load();
      }
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio play error:', err));
    }
  }, [isPlaying, currentTrack, volume]);

  const playTrack = useCallback((track) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack?.id === track.id) {
      togglePlayPause();
      return;
    }
    
    audio.pause();
    setCurrentTrack(track);
    audio.muted = false;
    setIsMuted(false);
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
    if (audio && !currentTrack?.isLive && isFinite(time)) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (val) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = val;
    }
    setVolumeState(val);
    if (val > 0) {
      if (audio) audio.muted = false;
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted || audio.muted) {
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

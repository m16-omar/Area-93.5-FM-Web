import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import styles from './Sidebar.module.css';

const listenedTracks = [
  { id: 1, title: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars' },
  { id: 2, title: 'Sweater Weather', artist: 'The Neighbourhood' }
];

export const MostListenedWidget = () => {
  return (
    <div className={styles.widgetBox}>
      <span className="section-label">MOST LISTENED</span>

      <div className={styles.mostListenedList}>
        {listenedTracks.map((track) => (
          <div key={track.id} className={styles.mostListenedItem}>
            <div className={styles.rankBadge}>{track.id}</div>
            <div className={styles.trackInfo}>
              <h4 className={styles.trackTitle}>{track.title}</h4>
              <p className={styles.trackArtist}>{track.artist}</p>
            </div>
            <button className={styles.cartBtn} aria-label="Buy Track">
              <FiShoppingCart />
            </button>
          </div>
        ))}
      </div>

      <button className={styles.fullTracklistBtn}>FULL TRACKLIST</button>
    </div>
  );
};

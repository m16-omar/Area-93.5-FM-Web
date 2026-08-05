import React from 'react';
import { PodcastCard } from './PodcastCard';
import styles from './PodcastGrid.module.css';

export const PodcastGrid = ({ episodes }) => {
  if (!episodes || episodes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
        No podcast episodes found in this category.
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {episodes.map((ep) => (
        <PodcastCard key={ep.id} episode={ep} />
      ))}
    </div>
  );
};

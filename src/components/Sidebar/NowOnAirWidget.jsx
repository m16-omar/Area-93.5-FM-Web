import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import styles from './Sidebar.module.css';

export const NowOnAirWidget = () => {
  return (
    <div className={styles.widgetBox}>
      <span className="section-label">NOW ON AIR</span>

      <div className={styles.onAirWidgetCard}>
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
          alt="The Sound Session" 
          className={styles.onAirWidgetImg} 
          loading="lazy" 
        />
        <div className={styles.onAirWidgetOverlay}>
          <span className="badge-outline" style={{ alignSelf: 'flex-start' }}>trends</span>
          <div className={styles.onAirWidgetTitle}>
            <span>The Sound Session</span>
            <FiMoreVertical style={{ cursor: 'pointer' }} />
          </div>
          <p className={styles.onAirWidgetTime}>8:30 am - 12:30 pm</p>
        </div>
      </div>
    </div>
  );
};

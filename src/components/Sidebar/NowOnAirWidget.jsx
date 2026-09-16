import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { getCurrentOnAirShow, getShowSlug } from '../../utils/scheduleHelper';
import styles from './Sidebar.module.css';

export const NowOnAirWidget = () => {
  const navigate = useNavigate();
  const activeShow = useMemo(() => getCurrentOnAirShow(), []);

  return (
    <div className={styles.widgetBox}>
      <span className="section-label">NOW ON AIR</span>

      <div 
        className={styles.onAirWidgetCard}
        onClick={() => navigate(`/shows/${getShowSlug(activeShow.name || activeShow.title)}`)}
        style={{ cursor: 'pointer' }}
      >
        <img 
          src={activeShow.image} 
          alt={activeShow.name || activeShow.title} 
          className={styles.onAirWidgetImg} 
          loading="lazy" 
        />
        <div className={styles.onAirWidgetOverlay}>
          <span className="badge-outline" style={{ alignSelf: 'flex-start' }}>{activeShow.genre || 'TRENDS'}</span>
          <div className={styles.onAirWidgetTitle}>
            <span>{activeShow.name || activeShow.title}</span>
            <FiMoreVertical style={{ cursor: 'pointer' }} />
          </div>
          <p className={styles.onAirWidgetTime}>{activeShow.time}</p>
        </div>
      </div>
    </div>
  );
};

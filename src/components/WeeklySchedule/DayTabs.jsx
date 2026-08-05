import React from 'react';
import styles from './DayTabs.module.css';

export const DayTabs = ({ days, activeDay, onSelectDay }) => {
  return (
    <div className={styles.tabsRow}>
      {days.map((day) => {
        const isActive = activeDay === day;
        return (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
};

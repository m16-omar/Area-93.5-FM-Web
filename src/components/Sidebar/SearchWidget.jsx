import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './Sidebar.module.css';

export const SearchWidget = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.widgetBox}>
      <span className="section-label">SEARCH</span>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search in this website"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchIconBtn} aria-label="Search">
          <FiSearch />
        </button>
      </form>
    </div>
  );
};

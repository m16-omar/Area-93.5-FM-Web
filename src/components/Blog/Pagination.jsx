import React from 'react';
import styles from './Blog.module.css';

export const Pagination = ({ currentPage = 1, totalPages = 3, onPageChange }) => {
  return (
    <div className={styles.paginationContainer}>
      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            key={pageNum}
            className={`${styles.pageBtn} ${currentPage === pageNum ? styles.activePage : ''}`}
            onClick={() => onPageChange && onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      <button 
        className={styles.nextBtn}
        onClick={() => onPageChange && onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        NEXT
      </button>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { FiLink, FiCalendar, FiEye, FiHeart, FiShare2 } from 'react-icons/fi';
import styles from './Blog.module.css';

export const BlogCard = ({ post }) => {
  return (
    <motion.article 
      className={styles.blogCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.imageWrapper}>
        <img src={post.image} alt={post.title} className={styles.featuredImage} loading="lazy" />
        <button className={styles.linkCircleBtn} aria-label="View Post">
          <FiLink />
        </button>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.categoryBadge}>
          <span className="badge-outline">{post.category.toLowerCase()}</span>
        </div>

        <h2 className={styles.postTitle}>{post.title}</h2>

        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <FiCalendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className={styles.metaItem}>
            <FiEye size={14} />
            <span>{post.views}</span>
          </div>
          <div className={styles.metaItem} style={{ cursor: 'pointer' }}>
            <FiHeart size={14} />
            <span>{post.likes}</span>
          </div>
          <div className={styles.metaItem} style={{ cursor: 'pointer' }}>
            <FiShare2 size={14} />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

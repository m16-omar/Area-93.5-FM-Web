import React from 'react';
import { SearchWidget } from './SearchWidget';
import { NowOnAirWidget } from './NowOnAirWidget';
import { MostListenedWidget } from './MostListenedWidget';
import { CategoriesWidget } from './CategoriesWidget';
import { RecentPostsWidget } from './RecentPostsWidget';
import { TagsWidget } from './TagsWidget';
import { NewsletterWidget } from './NewsletterWidget';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebarContainer}>
      <SearchWidget />
      <NowOnAirWidget />
      <MostListenedWidget />
      <CategoriesWidget />
      <RecentPostsWidget />
      <TagsWidget />
      <NewsletterWidget />
    </aside>
  );
};

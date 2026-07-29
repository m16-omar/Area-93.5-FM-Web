import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { BlogList } from '../components/Blog/BlogList';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';

export const BlogSidebar = () => {
  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: 'var(--color-light-bg)' }}>
      <Navbar />
      <PageHeader title="BLOG SIDEBAR" watermark={`BLOG\nNEWS`} />

      {/* Content Container */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 48px 100px' }}>
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <BlogList />
          <Sidebar />
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};

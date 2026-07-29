import React, { useState } from 'react';
import blogPostsData from '../../data/blogPostsData.json';
import { BlogCard } from './BlogCard';
import { Pagination } from './Pagination';

export const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div style={{ flex: 1 }}>
      {blogPostsData.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}

      <Pagination 
        currentPage={currentPage} 
        totalPages={3} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
    </div>
  );
};

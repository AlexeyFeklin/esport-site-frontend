import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './NewsSceleton.module.css';

export const NewsSceleton = (props) => (
  <div className={styles.main}>
    <ContentLoader
      speed={2}
      width={1300}
      height={300}
      viewBox="0 0 1300 300"
      backgroundColor="#1f0075"
      foregroundColor="#021a40"
      {...props}>
      <rect x="0" y="0" rx="20" ry="20" width="1300" height="300" />
      <rect x="10" y="10" rx="0" ry="0" width="289" height="284" />
      <rect x="0" y="0" rx="20" ry="20" width="310" height="300" />
    </ContentLoader>
  </div>
);

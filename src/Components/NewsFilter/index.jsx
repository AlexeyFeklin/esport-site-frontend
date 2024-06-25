import styles from './NewsFilter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setNewsFilters } from '../../redux/slices/newsFilter';
import { useEffect } from 'react';
import { categories } from '../CollectionsStorage';

export const NewsFilter = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.newsFilter.filters.categoryId);

  const setCategory = (value) => {
    dispatch(setNewsFilters({ categoryId: value, currentPage: 1, limit: 5 }));
  };

  useEffect(() => {
    setNewsFilters({ currentPage: 1, limit: 5 });
  }, [category]);

  return (
    <div className={styles.filters}>
      <span>Фильтр по новостям</span>{' '}
      {category !== 0 ? (
        <button className={styles.resetFilters} onClick={() => setCategory(0)}>
          Сбросить фильтр
        </button>
      ) : (
        ''
      )}
      <ul className={styles.category}>
        {categories.map((cat, index) => {
          return (
            <li key={index}>
              <button
                className={category === index ? styles.active : ''}
                onClick={() => {
                  setCategory(index);
                }}>
                {cat}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

import styles from './NewsZone.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersById, selectSelectedUsers } from '../../redux/slices/auth';
import { fetchAllNews, selectNewsAll } from '../../redux/slices/news';
import { NewsZoneCart } from '../NewsZoneCart';
import { selectNewsFilters } from '../../redux/slices/newsFilter';

export const NewsZone = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllNews({ category: 0, page: 1, limit: 1000 }));
  }, []);

  const news = useSelector(selectNewsAll);

  useEffect(() => {
    news.map((news) => {
      dispatch(fetchUsersById(news.userId));
    });
  }, [news]);

  const users = useSelector(selectSelectedUsers);

  const items = news.map((news, index) => (
    <NewsZoneCart key={index} news={news} user={users.find((user) => user._id === news.userId)} />
  ));

  return (
    <>
      <div className={styles.zone_title}>Последние новости</div>
      <div className={styles.roleApplications}>
        {items.length > 0 ? (
          <>
            <NewsZoneCart news={{ isAddBlock: true }} /> {items}
          </>
        ) : (
          <NewsZoneCart news={{ isAddBlock: true }} />
        )}
      </div>
    </>
  );
};

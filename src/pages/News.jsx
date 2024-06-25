import styles from './News.module.css';
import stylesCart from './../Components/NewsCart/NewsCart.module.css';

import { NewsFilter } from '../Components/NewsFilter';
import { NewsCart } from '../Components/NewsCart';
import Pagination from '../Components/Pagination';
import { DescBlock } from '../Components/DescBlock';
import {
  fetchAllNews,
  fetchNewsByCategory,
  selectNewsAll,
  selectNewsStatus,
} from '../redux/slices/news';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { NewsSceleton } from '../Components/NewsSceleton';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import {
  getCountNews,
  selectNewsFilters,
  setNewsCategoryId,
  setNewsFilters,
} from '../redux/slices/newsFilter';

export const News = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.newsFilter.filters.categoryId);
  const news = useSelector(selectNewsAll);
  const status = useSelector(selectNewsStatus);

  const isMounted = useRef(false);

  const newsParams = useSelector(selectNewsFilters);

  const skeleton = [...new Array(5)].map((_, index) => <NewsSceleton key={index} />);
  const items = news.map((item) => (
    <Link to={'/news/' + item._id} className={stylesCart.news_cart}>
      {' '}
      <NewsCart {...item} />
    </Link>
  ));
  const getNews = async () => {
    dispatch(getCountNews(categoryId));
    dispatch(
      fetchAllNews({ category: categoryId, page: newsParams.currentPage, limit: newsParams.limit }),
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getNews();
  }, [newsParams.currentPage, categoryId, newsParams.limit]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>Новости Counter-Strike Беларуси </span>
        </div>
        <div className={styles.news}>
          <NewsFilter />
          <hr />

          {status === 'loading' ? (
            skeleton
          ) : items.length > 0 ? (
            items
          ) : (
            <h1 className={styles.error_message}>
              Произошла ошибка при загрузке новостей или новости отсутвуют! <br />
              😖
            </h1>
          )}

          {Math.ceil(newsParams.countNews / newsParams.limit) > 1 ? (
            <Pagination
              pagesCounts={Math.ceil(newsParams.countNews / newsParams.limit)}
              settingsLimit={[5, 10, 15]}
            />
          ) : (
            ''
          )}
          <DescBlock
            text="В этом разделе мы публикуем анонсы турниров, результаты матчей, списки победителей, гайды,
        статьи и новости. Наши читатели первыми узнают о конкурсах, открытых прослушиваниях и
        наборах киберспортивных комментаторов и стримеров."
          />
        </div>
      </div>
    </main>
  );
};

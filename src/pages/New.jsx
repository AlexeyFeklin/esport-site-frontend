import React, { useEffect } from 'react';
import { DescBlock } from '../Components/DescBlock';
import styles from './New.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneNews } from '../redux/slices/news';
import { categories, imgUrl } from '../Components/CollectionsStorage';
import { Comments } from '../Components/Comments';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import notPhoto from './../assets/img/camera_yqpp2gkt93iq.svg';

export const New = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.selectedNews);
  const { id } = useParams();

  const formattedDate = new Date(news.date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });

  const getNews = (id) => {
    dispatch(fetchOneNews(id));
  };

  useEffect(() => {
    getNews(id);
  }, []);

  return (
    <main>
      <div className={styles.container + ' ' + styles.container_club}>
        <span className={styles.title}>{news.title}</span>
        <div className={styles.high_zone}>
          <div className={styles.image_zone}>
            <div className={styles.main_image}>
              <img src={news.previewPhoto ? `${imgUrl}${news.previewPhoto} ` : notPhoto} alt="" />
            </div>
          </div>
          <div className={styles.info_zone}>
            <div className={styles.main_info}>
              <ul>
                <li>
                  <span className={styles.white_desc}>Категория</span>{' '}
                  <span>#{categories[news.category]}</span>
                </li>
                <li>
                  <span className={styles.white_desc}>Дата</span> <span>{formattedDate}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.desc_zone}>
          <Markdown remarkPlugins={[remarkGfm]}>{news.text}</Markdown>{' '}
        </div>
        <Comments />
        <DescBlock text="В этом разделе мы публикуем анонсы турниров, результаты турниров, списки победителей." />
      </div>
    </main>
  );
};

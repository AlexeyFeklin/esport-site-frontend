import React, { useEffect } from 'react';
import { DescBlock } from '../Components/DescBlock';
import styles from './Club.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneClub } from '../redux/slices/club';
import { cities, imgUrl } from '../Components/CollectionsStorage';
import { Comments } from '../Components/Comments';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const Club = () => {
  const dispatch = useDispatch();
  const club = useSelector((state) => state.clubs.selectedClub);
  const { id } = useParams();

  const getClub = (id) => {
    dispatch(fetchOneClub(id));
  };

  useEffect(() => {
    getClub(id);
  }, []);

  return (
    <main>
      <div className={styles.container + ' ' + styles.container_club}>
        <span className={styles.title}>{club.title}</span>
        <div className={styles.high_zone}>
          <div className={styles.image_zone}>
            <div className={styles.main_image}>
              <img src={imgUrl + club.previewPhoto} alt="" />
            </div>
          </div>
          <div className={styles.info_zone}>
            <div className={styles.main_info}>
              <ul>
                <li>
                  <span className={styles.white_desc}>Город</span> <span>{cities[club.city]}</span>
                </li>
                <li>
                  <span className={styles.white_desc}>Адресс</span> <span>{club.address}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.desc_zone}>
          <Markdown remarkPlugins={[remarkGfm]}>{club.text}</Markdown>{' '}
        </div>

        <Comments />
        <DescBlock text="В этом разделе мы публикуем анонсы турниров, результаты турниров, списки победителей." />
      </div>
    </main>
  );
};

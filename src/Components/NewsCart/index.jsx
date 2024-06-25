import { categories, imgUrl } from '../CollectionsStorage';
import styles from './NewsCart.module.css';

export const NewsCart = ({ previewPhoto, title, category, date, text }) => {
  const formattedDate = new Date(date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <>
      <div className={styles.news_photo}>
        <img src={`${imgUrl + previewPhoto}`} alt="" />
      </div>
      <div className={styles.news_info}>
        <div className={styles.news_title}>
          <span>{title}</span>
        </div>
        <div className={styles.news_white_desc}>
          <span className={styles.news_tag}>#{categories[category]}</span>
          <span className={styles.news_date}>{formattedDate}</span>
        </div>
        <div className={styles.news_desc}>
          <span>{text.length > 323 ? text.slice(0, 290) + '...' : text}</span>
        </div>
      </div>
    </>
  );
};

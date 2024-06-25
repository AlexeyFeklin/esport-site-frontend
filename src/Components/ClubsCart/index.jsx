import { cities, imgUrl } from '../CollectionsStorage';
import styles from './ClubsCart.module.css';
import notPhoto from './../../assets/img/camera_yqpp2gkt93iq.svg';

export const ClubsCart = (props) => {
  const { address, city, previewPhoto, text, title } = props;

  const maxLength = 225;
  let shortenedText =
    props.text.length > maxLength ? props.text.slice(0, maxLength) + '...' : props.text;

  return (
    <div className={styles.club_cart}>
      <div className={styles.club_title}>
        <span>{title}</span>
      </div>
      <div className={styles.club_photo}>
        <img src={props.previewPhoto ? imgUrl + props.previewPhoto : notPhoto} alt="" />
      </div>
      <div className={styles.club_info}>
        <div className={styles.club_white_desc}>
          <ul>
            <li>
              <span className={styles.club_char_desc}>Город</span>
              <span className={styles.club_char}>{cities[city]}</span>
            </li>
            <li>
              <span className={styles.club_char_desc}>Адресс</span>
              <span className={styles.club_char}>{address}</span>
            </li>
          </ul>
        </div>
        <div className={styles.club_desc}>
          <span>{shortenedText}</span>
        </div>
      </div>
    </div>
  );
};

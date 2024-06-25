import { cities, imgUrl, statusTournaments } from '../CollectionsStorage';
import styles from './TournamentsCart.module.css';
import notPhoto from './../../assets/img/camera_yqpp2gkt93iq.svg';

export const TournamentsCart = (props) => {
  const formattedDate = new Date(props.date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });
  const maxLength = 180;
  let shortenedText =
    props.text.length > maxLength ? props.text.slice(0, maxLength) + '...' : props.text;

  return (
    <div className={styles.tournament_cart}>
      <div className={styles.tournament_title}>
        <span>{props.title}</span>
      </div>
      <div className={styles.tournament_photo}>
        <img
          src={props.previewPhoto ? imgUrl + props.previewPhoto : notPhoto}
          className={props.previewPhoto ? '' : styles.svg}
          alt=""
        />
      </div>
      <div className={styles.tournament_info}>
        <div className={styles.tournament_white_desc}>
          <ul>
            <li>
              <span className={styles.tournament_char_desc}>Дата проведения</span>{' '}
              <span className={styles.tournament_char}>{formattedDate}</span>
            </li>
            {props.prizePool ? (
              <li>
                <span className={styles.tournament_char_desc}>Сумма призовых</span>
                <span className={styles.tournament_char}>{props.prizePool}р.</span>
              </li>
            ) : (
              ''
            )}

          </ul>
        </div>
        <div className={styles.tournament_desc}>
          <span>{shortenedText}</span>
        </div>
        <div className={styles.tournament_status}>
          <span>#{statusTournaments[props.status]}</span>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { DescBlock } from '../Components/DescBlock';
import styles from './Tournament.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneTournament } from '../redux/slices/tournament';
import { setModalActive } from '../redux/slices/tournamentFilter';
import remarkGfm from 'remark-gfm';
import notPhoto from './../assets/img/camera_yqpp2gkt93iq.svg';
import Markdown from 'react-markdown';
import { imgUrl, roles } from '../Components/CollectionsStorage';
import { selectIsAuthData } from '../redux/slices/auth';
import { Comments } from '../Components/Comments';

export const Tournament = () => {
  const dispatch = useDispatch();
  const tournament = useSelector((state) => state.tournaments.selectedTournament);
  const { id } = useParams();

  const formattedDate = new Date(tournament.date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });

  const getTournament = (id) => {
    dispatch(fetchOneTournament(id));
  };

  useEffect(() => {
    getTournament(id);
  }, []);

  const user = useSelector(selectIsAuthData);

  return (
    <main>
      <div className={styles.container + ' ' + styles.container_club}>
        <span className={styles.title}>{tournament.title}</span>
        <div className={styles.high_zone}>
          <div className={styles.image_zone}>
            <div className={styles.main_image}>
              <img
                src={tournament.previewPhoto ? `${imgUrl}${tournament.previewPhoto} ` : notPhoto}
                alt=""
              />
            </div>
          </div>
          <div className={styles.info_zone}>
            <div className={styles.main_info}>
              <ul>
                <li>
                  <span className={styles.white_desc}>Сумма призовых</span>{' '}
                  <span>{tournament.prizePool}</span>
                </li>
                <li>
                  <span className={styles.white_desc}>Дата проведения</span>{' '}
                  <span>{formattedDate}</span>
                </li>
              </ul>
            </div>
            <div className={styles.additional_info}>
              {roles[user?.roleId] === 'Игрок' ?
                <div
                  className={styles.SignUpBtn}
                  onClick={() => {
                    dispatch(setModalActive(true));
                  }}>
                  Записаться на турнир
                </div> : ''}
            </div>
          </div>
        </div>

        <div className={styles.desc_zone}>
          <Markdown remarkPlugins={[remarkGfm]}>{tournament.text}</Markdown>
        </div>
        <Comments />
        <DescBlock text="В этом разделе мы публикуем анонсы турниров, результаты турниров, списки победителей." />
      </div>
    </main>
  );
};

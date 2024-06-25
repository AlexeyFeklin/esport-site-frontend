import { Link, useParams } from 'react-router-dom';
import styles from './ClubAdmin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchChangeUserRole, fetchUserById, selectSelectedUser } from '../redux/slices/auth';
import {
  categories,
  cities,
  formatTournaments,
  imgUrl,
  roles,
  statusTournaments,
} from '../Components/CollectionsStorage';
import { selectSelectedNews } from '../redux/slices/news';
import { fetchOneTournament, selecetSelectedTournament } from '../redux/slices/tournament';
import { fetchOneClub, removeClub, selecetSelectedClub } from '../redux/slices/club';

export const ClubAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneClub(id));
  }, []);

  const club = useSelector(selecetSelectedClub);

  // useEffect(() => {
  //   dispatch(fetchUserById(club.createdBy));
  // }, [club]);

  // const user = useSelector(selectSelectedUser);

  const formattedDate = new Date(club?.createdAt).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });
  // const formattedDateCreate = new Date(tournament.createdAt).toLocaleString('ru-RU', {
  //   day: 'numeric',
  //   month: 'long',
  //   hour: 'numeric',
  //   minute: 'numeric',
  // });

  return (
    <div className={styles.control_block}>
      <div className={styles.control_buttons}>
        <Link to="/admin" className={styles.control_btn}>
          <span> Назад в админ панель </span>
        </Link>
        <Link to="/" className={styles.control_btn}>
          <span>На главную </span>
        </Link>
      </div>
      <div className={styles.control_zone}>
        <div className={styles.zone_title}>Клуб</div>
        <div className={styles.zone_title_under}>{club?.title}</div>
        <ul className={styles.zone_title_ranks}>
          <li>
            <div className={styles.question}>Дата добавления</div>
            <div className={styles.answer}>{formattedDate}</div>
          </li>
          <li>
            <div className={styles.question}>Город</div>
            <div className={styles.answer}>{cities[club?.city]}</div>
          </li>
          <li>
            <div className={styles.question}>Адресс</div>
            <div className={styles.answer}>{club?.address}</div>
          </li>
          {/* <li>
            <div className={styles.question}>Организатор</div>
            <div className={styles.answer}>
              {user?.firstName + ' "' + user?.nickname + '" ' + user?.lastName}
            </div>
          </li> */}
          {/* <li>
            <div className={styles.question}>Формат</div>
            <div className={styles.answer}>{formatTournaments[tournament?.format]}</div>
          </li> */}
          {/* <li>
            <div className={styles.question}>Ограничение команд</div>
            <div className={styles.answer}>
              {tournament?.teamLimit === 0 ? 'Отсутсвует' : tournament?.teamLimit}
            </div>
          </li>
          <li>
            <div className={styles.question}>Взнос</div>
            <div className={styles.answer}>
              {tournament?.entryFee === 0 ? 'Отсутсвует' : tournament?.entryFee + 'р.'}
            </div>
          </li>
          <li>
            <div className={styles.question}>Призовой фонд</div>
            <div className={styles.answer}>
              {tournament?.prizePool === 0 ? 'Отсутсвует' : tournament?.prizePool + 'р.'}
            </div>
          </li>
          <li>
            <div className={styles.question}>Статус турнира</div>
            <div className={styles.answer}>
              {statusTournaments[tournament?.status]
                ? statusTournaments[tournament?.status]
                : 'Отсутсвует'}
            </div>
          </li>*/}
        </ul>
        <ul className={styles.roleApplications}>
          <li>
            <div className={styles.question}>Превью клуба</div>
            <div className={styles.answer}>
              <img src={imgUrl + club?.previewPhoto} alt="" />
            </div>
          </li>
          <li>
            <div className={styles.question}>Текст турнира</div>
            <div className={styles.answer}>{club?.text}</div>
          </li>
        </ul>
        <div className={styles.final_buttons}>
          <Link
            to={'/admin'}
            className={styles.failed_btn}
            onClick={() =>
              window.confirm('Вы действительно хотите удалить клуб?')
                ? dispatch(removeClub(club._id))
                : ''
            }>
            Удалить клуб
          </Link>
          <Link
            to={'/admin/club/edit/' + club._id}
            className={styles.succes_btn}
            onClick={() => {}}>
            Изменить клуб
          </Link>
        </div>
      </div>
    </div>
  );
};

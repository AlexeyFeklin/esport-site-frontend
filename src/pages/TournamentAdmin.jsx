import { Link, useParams } from 'react-router-dom';
import styles from './TournamentAdmin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchChangeUserRole, fetchUserById, selectSelectedUser } from '../redux/slices/auth';
import {
  categories,
  formatTournaments,
  imgUrl,
  roles,
  statusTournaments,
} from '../Components/CollectionsStorage';
import { selectSelectedNews } from '../redux/slices/news';
import {
  fetchOneTournament,
  removeTournament,
  selecetSelectedTournament,
  updateTournamentStatus,
} from '../redux/slices/tournament';
import { getTeamsByTournament, selectTeamData } from '../redux/slices/team';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import notPhoto from './../assets/img/camera_yqpp2gkt93iq.svg';

export const TournamentAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    dispatch(fetchOneTournament(id));
  }, [id]);

  const tournament = useSelector(selecetSelectedTournament);

  useEffect(() => {
    dispatch(fetchUserById(tournament.createdBy));
    dispatch(getTeamsByTournament(tournament._id));
  }, [tournament]);

  const teams = useSelector(selectTeamData)?.teams;
  const user = useSelector(selectSelectedUser);

  useEffect(() => {
    const formattedItems = teams
      ? teams.map((team) => {
        return (
          <li className={styles.team}>
            <div className={styles.team_title}>{team.name}</div>
            {team.members.map((player) => {
              return (
                <Link to={'/profile/' + player._id} className={styles.player}>
                  {player.avatarUrl ? (
                    <img src={`${imgUrl}${player.avatarUrl}`} alt="" />
                  ) : (
                    <svg
                      id="Layer_1"
                      enable-background="new 0 0 64 64"
                      viewBox="0 0 64 64"
                      width="60px"
                      fill="#fff">
                      <g>
                        <path d="m58.683 16.319c-.85-.851-1.981-1.319-3.183-1.319h-33v-4.5c0-.829-.671-1.5-1.5-1.5h-8c-.829 0-1.5.671-1.5 1.5v4.5h-3c-1.203 0-2.333.468-3.181 1.317-.851.85-1.319 1.98-1.319 3.183v31c0 1.202.468 2.333 1.318 3.182.849.849 1.979 1.318 3.182 1.318h47c1.202 0 2.332-.468 3.182-1.318s1.318-1.98 1.318-3.182v-31c0-1.203-.469-2.333-1.317-3.181zm-44.183-4.319h5v3h-5zm42.5 38.5c0 .4-.156.777-.439 1.061s-.661.439-1.061.439h-47c-.395 0-.781-.16-1.061-.44-.283-.283-.439-.66-.439-1.06v-31c0-.401.156-.777.44-1.062.283-.282.659-.438 1.06-.438h47c.4 0 .777.156 1.061.44.279.279.439.665.439 1.06z"></path>
                        <path d="m38.5 24c-6.065 0-11 4.935-11 11s4.935 11 11 11 11-4.935 11-11-4.935-11-11-11zm0 19c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                        <path d="m13 23c-.829 0-1.5.671-1.5 1.5v21c0 .828.671 1.5 1.5 1.5s1.5-.672 1.5-1.5v-21c0-.829-.671-1.5-1.5-1.5z"></path>
                        <path d="m52.25 21c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5h.094c.828 0 1.453-.671 1.453-1.5s-.719-1.5-1.547-1.5z"></path>
                      </g>
                    </svg>
                  )}{' '}
                  <div className="player_name">
                    {player.firstName + ' "' + player.nickname + '" ' + player.lastName}
                  </div>
                </Link>
              );
            })}
            <div className="players"></div>
          </li>
        );
      })
      : '';
    setItems(formattedItems);
  }, [teams]);
  const formattedDate = new Date(tournament.date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });
  const formattedDateCreate = new Date(tournament.createdAt).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });

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
        <div className={styles.zone_title}>Турнир</div>
        <div className={styles.zone_title_under}>{tournament?.title}</div>
        <ul className={styles.zone_title_ranks}>
          <li>
            <div className={styles.question}>Дата проведения</div>
            <div className={styles.answer}>{formattedDate}</div>
          </li>
          <li>
            <div className={styles.question}>Дата создания</div>
            <div className={styles.answer}>{formattedDateCreate}</div>
          </li>
          <li>
            <div className={styles.question}>Организатор</div>
            <div className={styles.answer}>
              {user?.firstName + ' "' + user?.nickname + '" ' + user?.lastName}
            </div>
          </li>
          <li>
            <div className={styles.question}>Формат</div>
            <div className={styles.answer}>{formatTournaments[tournament?.format]}</div>
          </li>
          <li>
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
          </li>
        </ul>
        <ul className={styles.roleApplications}>
          <li>
            <div className={styles.question}>Превью турнира</div>
            <div className={styles.answer}>

              <img src={tournament?.previewPhoto ? `${imgUrl}${tournament?.previewPhoto} ` : notPhoto} alt="" />
            </div>
          </li>
          <li>
            <div className={styles.question}>Текст турнира</div>
            <div className={styles.answer}><Markdown remarkPlugins={[remarkGfm]}>{tournament?.text}</Markdown></div>
          </li>
        </ul>
        <ul className={styles.roleApplications}>
          <li>
            <div className={styles.question}>Зарегистрированные команды</div>
            <div className={styles.answer}>
              {items?.length ? teams?.length : '0'}/
              {tournament?.teamLimit ? tournament?.teamLimit : '∞'}
            </div>
          </li>
          {items && items?.length ? (
            <li>
              <div className={styles.question}>Команды</div>
              <div className={styles.answer}>
                <ul className="teams">{items}</ul>
              </div>
            </li>
          ) : (
            ''
          )}
        </ul>
        <div className={styles.final_buttons}>
          {tournament?.status === 1 ? (
            <Link
              to="/admin"
              onClick={() =>
                window.confirm('Вы действительно хотите закончить данный турнир?')
                  ? dispatch(updateTournamentStatus({ id: tournament?._id, status: 2 }))
                  : ''
              }
              className={styles.failed_btn}>
              Закончить турнир
            </Link>
          ) : tournament?.status === 2 ? (
            <Link
              to="/admin"
              className={styles.failed_btn}
              onClick={() =>
                window.confirm('Вы действительно хотите удалить турнир?')
                  ? dispatch(removeTournament(tournament._id))
                  : ''
              }>
              Удалить турнир
            </Link>
          ) : (
            <>
              <Link
                to={'/admin'}
                className={styles.failed_btn}
                onClick={() =>
                  window.confirm('Вы действительно хотите удалить турнир?')
                    ? dispatch(removeTournament(tournament._id))
                    : null
                }>
                Удалить турнир
              </Link>
              <Link
                to={'/admin/tournament/edit/' + tournament._id}
                className={styles.succes_btn}
                onClick={() => { }}>
                Изменить турнир
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

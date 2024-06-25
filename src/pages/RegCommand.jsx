import styles from './RegCommand.module.css';
import avatar from './../assets/img/avaa.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthData, setModalSearchPlayers } from '../redux/slices/auth';
import { useEffect, useState } from 'react';
import { fetchOneTournament, selecetSelectedTournament } from '../redux/slices/tournament';
import { useParams } from 'react-router-dom';
import { formatTournaments, imgUrl } from '../Components/CollectionsStorage';
import { addPlayers, createTeam, selectTeamPlayers } from '../redux/slices/team';

export const RegCommand = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isFull, setIsFull] = useState(false);
  const [titleTeam, setTitleTeam] = useState('');
  const me = useSelector(selectIsAuthData);
  useEffect(() => {
    dispatch(fetchOneTournament(id));
  }, []);
  useEffect(() => {
    dispatch(addPlayers(me));
  }, [me]);
  const tournament = useSelector(selecetSelectedTournament);

  const players = useSelector(selectTeamPlayers);

  useEffect(() => {
    const teamSize = Number(formatTournaments[tournament?.format]?.charAt(0));
    if (players?.length === teamSize) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  }, [players]);
  const sendTeam = () => {
    if (!isFull) {
      alert(
        'Команда не полная! ' +
          players.length +
          '/' +
          parseInt(formatTournaments[tournament?.format]?.charAt(0)) +
          ' игроков!',
      );
    } else if (titleTeam.length < 3) {
      alert('Название команды должно быть больше 3 символов!');
    } else {
      dispatch(
        createTeam({
          name: titleTeam,
          members: players,
          tournamentId: tournament._id,
        }),
      );
      alert('Команда успешно добавлена!');
    }
  };
  return (
    <div>
      <div className={styles.titleBlock}>Турнир</div>
      <div className={styles.titleTournament}>{tournament.title}</div>

      <div className={styles.titleBlock1}>Запись команды</div>
      <div className={styles.regForm}>
        <ul className={styles.quantityBlock}>
          <li>Команда</li>
          <li className={styles.quantityPlayers}>
            Игроки{' '}
            {formatTournaments[tournament.format] === '5x5'
              ? players.length + '/5'
              : formatTournaments[tournament.format] === '4x4'
              ? players.length + '/4'
              : formatTournaments[tournament.format] === '3x3'
              ? players.length + '/3'
              : formatTournaments[tournament.format] === '2x2'
              ? players.length + '/2'
              : players.length + '/1'}
          </li>
        </ul>
        <ul className={styles.nameBlock}>
          <li>Название команды</li>
          <li>
            <input
              type="text"
              placeholder="Название команды..."
              value={titleTeam}
              onChange={(e) => {
                setTitleTeam(e.target.value);
              }}
            />
          </li>
        </ul>
        <ul className={styles.playersBlock}>
          {players.map((player) => {
            return (
              <li>
                {' '}
                {player.avatarUrl ? (
                  <img src={imgUrl + player.avatarUrl} alt="" className={styles.avatar} />
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
                )}
                <span>{player.firstName + ' "' + player.nickname + '" ' + player.lastName}</span>
              </li>
            );
          })}

          {!isFull ? (
            <li className={styles.AddPlayerBtn}>
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 45.402 45.402">
                <g>
                  <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path>
                </g>
              </svg>
              <span
                onClick={() => {
                  dispatch(setModalSearchPlayers(true));
                }}>
                Записать игрока в команду
              </span>
            </li>
          ) : (
            ''
          )}

          <li>
            <div className={styles.send_btn} onClick={() => sendTeam()}>
              Готово
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

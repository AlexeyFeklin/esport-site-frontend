import styles from './RegPlayer.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthData, setModalSearchPlayers } from '../redux/slices/auth';
import { useEffect, useState } from 'react';
import { fetchOneTournament, selecetSelectedTournament } from '../redux/slices/tournament';
import { useParams } from 'react-router-dom';
import { formatTournaments, imgUrl } from '../Components/CollectionsStorage';
import {
  addMemberToTeam,
  addPlayers,
  createTeam,
  getTeamsByTournament,
  removeMemberFromTeam,
  selectTeamData,
  selectTeamPlayers,
} from '../redux/slices/team';

export const RegPlayer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isJoinedTeam, setIsJoinedTeam] = useState(false);
  const [isExitedTeam, setIsExitedTeam] = useState(false);

  const refresh = () => {
    dispatch(getTeamsByTournament(id));
    dispatch(fetchOneTournament(id));
  };
  useEffect(() => {
    refresh();
  }, []);

  const tournament = useSelector(selecetSelectedTournament);
  const teams = useSelector(selectTeamData)?.teams;
  const user = useSelector(selectIsAuthData);

  const [isAuthTeam, setIsAuthTeam] = useState(false);
  useEffect(() => {
    if (teams) {
      teams.forEach((team) => {
        if (team.members.find((member) => member._id === user._id)) {
          setIsAuthTeam(true);
        }
      });
    }
  }, [teams]);

  console.log(isAuthTeam);
  return (
    <div>
      <div className={styles.titleBlock}>Турнир</div>
      <div className={styles.titleTournament}>{tournament.title}</div>

      <div className={styles.titleBlock1}>Доступные команды</div>

      {teams?.map((team) => {
        return (
          team.members.length < Number(formatTournaments[tournament?.format]?.charAt(0)) && (
            <div className={styles.regForm}>
              <ul className={styles.quantityBlock}>
                <li>Команда {team.name}</li>
                <li className={styles.quantityPlayers}>
                  Игроки{' '}
                  {formatTournaments[tournament.format] === '5x5'
                    ? `${team?.members.length}/5`
                    : formatTournaments[tournament.format] === '4x4'
                    ? `${team?.members.length}/4`
                    : formatTournaments[tournament.format] === '3x3'
                    ? `${team?.members.length}/3`
                    : formatTournaments[tournament.format] === '2x2'
                    ? `${team?.members.length}/2`
                    : `${team?.members.length}/1`}
                </li>
              </ul>
              <ul className={styles.playersBlock}>
                {team?.members.map((player) => {
                  return (
                    <li key={player.id}>
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
                      <span>
                        {player.firstName + ' "' + player.nickname + '" ' + player.lastName}
                      </span>
                    </li>
                  );
                })}

                {!isAuthTeam ? (
                  <li
                    onClick={async () => {
                      setIsJoinedTeam(true);
                      await dispatch(addMemberToTeam({ teamId: team._id, memberId: user._id }));
                      await refresh();
                      setIsJoinedTeam(false);
                    }}>
                    {isJoinedTeam ? 'Идет запись...' : 'Записаться в команду'}
                  </li>
                ) : (
                  <li
                    onClick={async () => {
                      if (window.confirm('Вы действительно хотите выйти с команды?')) {
                        setIsExitedTeam(true);
                        await dispatch(
                          removeMemberFromTeam({ teamId: team._id, memberId: user._id }),
                        );
                        await refresh(); // Обновление данных
                        setIsExitedTeam(false);
                      }
                    }}>
                    {isExitedTeam ? 'Идет выход...' : 'Выйти из команды'}
                  </li>
                )}
              </ul>
            </div>
          )
        );
      })}

      {!isAuthTeam ? (
        <div
          className={styles.newTeamBtn}
          onClick={async () => {
            setIsLoading(true);
            await dispatch(
              createTeam({
                name: `team_${user.nickname}`,
                members: user._id,
                tournamentId: tournament._id,
              }),
            );
            await refresh();
            setIsLoading(false);
          }}>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 45.402 45.402">
            <g>
              <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.133-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path>
            </g>
          </svg>
          {isLoading ? 'Создание команды...' : 'Создать новую команду'}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

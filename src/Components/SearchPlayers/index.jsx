import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchPlayers.module.css';
import {
  fetchSearchUsers,
  selectModalSearchPlayers,
  setModalSearchPlayers,
} from '../../redux/slices/auth';
import { useEffect, useState } from 'react';
import { imgUrl, roles } from '../CollectionsStorage';
import { addPlayers } from '../../redux/slices/team';
import notPhoto from './../../assets/img/camera_yqpp2gkt93iq.svg';

export const SearchPlayers = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState();
  const setActive = () => {
    dispatch(setModalSearchPlayers(false));
  };

  const active = useSelector(selectModalSearchPlayers);

  useEffect(() => {
    if (searchValue?.length > 2) {
      dispatch(fetchSearchUsers(searchValue));
    }
  }, [searchValue]);

  const players = useSelector((state) =>
    state.auth.foundPeoples.filter((user) => roles[user.roleId] === 'Игрок'),
  );

  return (
    <div
      className={active ? styles.SearchPlayers + ' ' + styles.active : styles.SearchPlayers}
      onMouseDown={() => {
        setActive();
      }}>
      <div className={styles.menuSearchPlayers} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.formTitle}>Поиск игрока</div>{' '}
        <div
          className={styles.close_btn}
          onMouseDown={() => {
            setActive();
          }}>
          X
        </div>
        <ul className={styles.choosePlayers}>
          <li className={styles.searchInput}>
            <span>Ник</span>{' '}
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Ник игрока..."
            />
          </li>
          <li className={styles.quantityPlayers}>
            <span>Игроков найдено:</span>
            <span>{players.length}</span>
          </li>

          <li className={styles.players}>
            {players.length > 0 ? (
              players.map((player) => {
                return (
                  <div
                    className={styles.playerCart}
                    key={player.id}
                    onClick={() => {
                      dispatch(addPlayers(player));
                      setActive();
                    }}>
                    <img
                      src={player?.avatarUrl ? `${imgUrl}${player?.avatarUrl}` : notPhoto}
                      alt=""
                      className={styles.avatar}
                    />

                    <div className={styles.nickname}>
                      {player.firstName + ' "' + player.nickname + '" ' + player.lastName}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>Игроки не найдены!</div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

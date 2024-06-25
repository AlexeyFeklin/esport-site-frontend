import React from 'react';
import styles from './ModalTournament.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalActive, setModalActive } from '../../redux/slices/tournamentFilter';
import { Link } from 'react-router-dom';
import { selecetSelectedTournament } from '../../redux/slices/tournament';

export const ModalTournament = () => {
  const dispatch = useDispatch();
  const active = useSelector(selectModalActive);

  const setActive = () => {
    dispatch(setModalActive(false));
  };

  const id = useSelector(selecetSelectedTournament)._id;
  return (
    <div
      className={active ? styles.menuTournament + ' ' + styles.active : styles.menuTournament}
      onMouseDown={() => {
        setActive();
      }}>
      <div className={styles.menuTournamentForm} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.formTitle}>Записаться на турнир</div>{' '}
        <div
          className={styles.close_btn}
          onMouseDown={() => {
            setActive();
          }}>
          X
        </div>
        <ul className={styles.chooseButtons}>
          <Link
            to={'tournaments/' + id + '/registerPlayer'}
            className={styles.chooseBtn}
            onClick={() => {
              setActive();
            }}>
            Найти команду
          </Link>
          <Link
            to={'tournaments/' + id + '/registerCommand'}
            className={styles.chooseBtn}
            onClick={() => {
              setActive();
            }}>
            Записать команду
          </Link>
        </ul>
      </div>
    </div>
  );
};

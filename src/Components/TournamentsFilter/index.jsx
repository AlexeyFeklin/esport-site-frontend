import { useEffect, useState } from 'react';
import styles from './TournamentsFilter.module.css';
import { cities, statusTournaments } from '../CollectionsStorage';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTotalTournaments,
  selectTournamentsFilters,
  setTournamentFilters,
} from '../../redux/slices/tournamentFilter';
import { getAllTournaments } from '../../redux/slices/tournament';

export const TournamentsFilter = () => {
  const dispatch = useDispatch();
  const tournamentParams = useSelector(selectTournamentsFilters);

  useEffect(() => {
    dispatch(
      getAllTournaments({
        status: tournamentParams.status,
        city: tournamentParams.city,
        entryFee: tournamentParams.entryFee,
      }),
    );
    dispatch(
      getTotalTournaments({
        status: tournamentParams.status,
        city: tournamentParams.city,
        entryFee: tournamentParams.entryFee,
      }),
    );
  }, [tournamentParams.status, tournamentParams.city, tournamentParams.entryFee]);

  return (
    <div className={styles.filters}>
      <span>Фильтр по турнирам</span>{' '}
      {tournamentParams.city !== 0 ||
      tournamentParams.status !== 0 ||
      tournamentParams.entryFee ||
      0 ? (
        <button
          className={styles.resetFilters}
          onClick={() => {
            dispatch(
              setTournamentFilters({ city: 0, status: 0, entryFee: 0, currentPage: 1, limit: 4 }),
            );
          }}>
          Сбросить фильтры
        </button>
      ) : (
        ''
      )}
      <ul>
        <li>
          <span>Город</span>
          <select
            value={tournamentParams.city}
            onChange={(e) => dispatch(setTournamentFilters({ city: e.target.selectedIndex }))}>
            {cities.map((city, index) => {
              return (
                <option value={index} key={index}>
                  {city}
                </option>
              );
            })}
          </select>
        </li>

        <li>
          <span>Статус</span>
          <select
            value={tournamentParams.status}
            onChange={(e) => {
              dispatch(setTournamentFilters({ status: e.target.selectedIndex }));
            }}>
            {statusTournaments.map((status, index) => {
              return (
                <option value={index} key={index}>
                  {status}
                </option>
              );
            })}
          </select>
        </li>
        <li>
          <span>Взнос </span>
          <input
            type="checkbox"
            checked={tournamentParams.entryFee === 1}
            onChange={(e) =>
              e.target.checked
                ? dispatch(setTournamentFilters({ entryFee: 1 }))
                : dispatch(setTournamentFilters({ entryFee: 0 }))
            }
          />
        </li>
      </ul>
    </div>
  );
};

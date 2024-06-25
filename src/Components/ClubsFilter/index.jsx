import styles from './ClubsFilter.module.css';
import { cities } from './city';
import { useDispatch, useSelector } from 'react-redux';
import { selectClubFilters, setClubFilters } from './../../redux/slices/clubFilter';
import { useEffect } from 'react';

export const ClubsFilter = () => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.clubFilter.filters.city);
  const clubParams = useSelector(selectClubFilters);
  useEffect(() => {
    dispatch(setClubFilters({ currentPage: 1, limit: 4 }));
  }, [clubParams.city]);
  return (
    <div className={styles.filters}>
      <span>Фильтр по Клубам</span>
      {city !== 0 ? (
        <button
          className={styles.resetFilters}
          onClick={() => {
            dispatch(setClubFilters({ city: 0 }));
          }}>
          Сбросить фильтр
        </button>
      ) : (
        ''
      )}

      <ul>
        <li>
          <span>Город</span>
          <select
            value={city}
            onChange={(e) => {
              dispatch(setClubFilters({ city: e.target.selectedIndex }));
            }}>
            {cities.map((item, key) => (
              <option value={key}>{item}</option>
            ))}
          </select>
        </li>
      </ul>
    </div>
  );
};

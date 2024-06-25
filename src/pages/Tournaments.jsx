import styles from './Tournaments.module.css';
import Pagination from '../Components/Pagination';
import { TournamentsCart } from '../Components/TournamentsCart';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { getAllTournaments } from '../redux/slices/tournament';
import { Link } from 'react-router-dom';
import { getTotalTournaments, selectTournamentsFilters } from '../redux/slices/tournamentFilter';
import { TournamentsFilter } from '../Components/TournamentsFilter';

export const Tournaments = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.tournaments.tournaments);
  const tournamentParams = useSelector(selectTournamentsFilters);
  const getTournaments = useCallback(() => {
    dispatch(
      getAllTournaments({
        city: tournamentParams.city,
        format: tournamentParams.format,
        entryFee: tournamentParams.entryFee,
        status: tournamentParams.status,
        page: tournamentParams.currentPage,
        limit: tournamentParams.limit,
      }),
    );
    dispatch(
      getTotalTournaments({
        city: tournamentParams.city,
        format: tournamentParams.format,
        entryFee: tournamentParams.entryFee,
        status: tournamentParams.status,
      }),
    );

    window.scrollTo(0, 0);
  }, [dispatch, tournamentParams.city, tournamentParams.format, tournamentParams.entryFee, tournamentParams.status, tournamentParams.currentPage, tournamentParams.limit]);

  useEffect(() => {
    getTournaments();
  }, [getTournaments]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>Турниры Counter-Strike Беларуси </span>
        </div>
        <TournamentsFilter />

        <hr />
        <div
          className={
            items.length > 0 ? styles.tournaments : styles.tournaments + ' ' + styles.error
          }>
          {items.length > 0 ? (
            items.map((item) => (
              <Link to={'/tournaments/' + item._id}>
                <TournamentsCart {...item} />
              </Link>
            ))
          ) : (
            <h1 className={styles.error_message}>
              Произошла ошибка при загрузке турниров или турниры отсутвуют! <br />
              😖
            </h1>
          )}
        </div>

        {Math.ceil(tournamentParams.countTournaments / tournamentParams.limit) > 1 ? (
          <Pagination
            pagesCounts={Math.ceil(tournamentParams.countTournaments / tournamentParams.limit)}
            settingsLimit={[4, 8, 12]}
          />
        ) : (
          ''
        )}
        <hr className={styles.desc_hr} />
        <div className={styles.block_desc}>
          В этом разделе мы публикуем анонсы турниров, результаты турниров, списки победителей.{' '}
        </div>
      </div>
    </main>
  );
};

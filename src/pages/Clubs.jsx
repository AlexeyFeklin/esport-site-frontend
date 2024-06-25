import styles from './Clubs.module.css';
import vibeImg from './../assets/img/vibe.png';
import actionImg from './../assets/img/action.png';
import skynetImg from './../assets/img/skynet.png';
import { ClubsFilter } from '../Components/ClubsFilter';
import Pagination from '../Components/Pagination';
import { Link } from 'react-router-dom';
import { ClubsCart } from '../Components/ClubsCart';
import { DescBlock } from '../Components/DescBlock';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllClubs } from '../redux/slices/club';
import { getTotalClubCount, selectClubFilters } from '../redux/slices/clubFilter';

export const Clubs = () => {
  const dispatch = useDispatch();
  const cityId = useSelector((state) => state.clubFilter.cityId);
  const clubParams = useSelector(selectClubFilters);

  const items = useSelector((state) => state.clubs.clubs);
  const clubs = items.map((item) => (
    <Link to={'/clubs/' + item._id}>
      <ClubsCart {...item} />
    </Link>
  ));

  const getClubs = async () => {
    dispatch(
      getAllClubs({ page: clubParams.currentPage, limit: clubParams.limit, city: clubParams.city }),
    );
    dispatch(getTotalClubCount({ city: clubParams.city }));

    window.scrollTo(0, 0);
  };

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    getClubs();
  }, [clubParams.city, clubParams.currentPage, clubParams.limit]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>Компьютерные клубы Беларуси </span>
        </div>
        <ClubsFilter />
        <hr />
        <div className={styles.content}>
          <div className={items.length > 0 ? styles.clubs : styles.clubs + ' ' + styles.error}>
            {clubs.length > 0 ? (
              clubs
            ) : (
              <h1 className={styles.error_message}>
                Произошла ошибка при загрузке клубов или клубы отсутвуют!😖
              </h1>
            )}
          </div>
        </div>

        {Math.ceil(clubParams.countClubs / clubParams.limit) > 1 ? (
          <Pagination
            pagesCounts={Math.ceil(clubParams.countClubs / clubParams.limit)}
            settingsLimit={[4, 8, 16]}
          />
        ) : (
          ''
        )}

        <DescBlock text="В этом разделе мы публикуем анонсы турниров, результаты турниров, списки победителей." />
      </div>
    </main>
  );
};

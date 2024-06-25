import { useLocation } from 'react-router-dom';
import styles from './Pagination.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectNewsFilters, setNewsFilters } from '../../redux/slices/newsFilter';
import {
  selectTournamentsFilters,
  setTournamentFilters,
} from '../../redux/slices/tournamentFilter';
import { selectClubFilters, setClubFilters } from '../../redux/slices/clubFilter';

const Pagination = ({ pagesCounts, settingsLimit }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUrl = location.pathname.split('/').filter((item) => item !== '');

  const updateParams = (page, limit) => {
    if (currentUrl[0] === 'news') {
      if (page < 1) {
        page = 1;
      } else if (page > Math.ceil(newsParams.countNews / limit)) {
        page = Math.ceil(newsParams.countNews / limit);
      }
      dispatch(
        setNewsFilters({
          categoryId: newsParams.categoryId,
          limit,
          currentPage: page,
        }),
      );
    }
    if (currentUrl[0] === 'tournaments') {
      if (page < 1) {
        page = 1;
      } else if (page > Math.ceil(tournamentParams.countNews / limit)) {
        page = Math.ceil(tournamentParams.countNews / limit);
      }
      dispatch(
        setTournamentFilters({
          limit,
          currentPage: page,
        }),
      );
    }
    if (currentUrl[0] === 'clubs') {
      if (page < 1) {
        page = 1;
      } else if (page > Math.ceil(clubParams.countClubs / limit)) {
        page = Math.ceil(clubParams.countClubs / limit);
      }
      dispatch(
        setClubFilters({
          limit,
          currentPage: page,
        }),
      );
    }
  };

  const newsParams = useSelector(selectNewsFilters);
  const tournamentParams = useSelector(selectTournamentsFilters);
  const clubParams = useSelector(selectClubFilters);

  let pagesToShow = [];

  if (pagesCounts <= 3) {
    for (let i = 1; i <= pagesCounts; i++) {
      pagesToShow.push(i);
    }
  } else {
    if (currentUrl[0] === 'news') {
      if (newsParams.currentPage === 1) {
        pagesToShow = [1, 2, 3]; // показываем первые три страницы
      } else if (newsParams.currentPage === pagesCounts) {
        pagesToShow = [pagesCounts - 2, pagesCounts - 1, pagesCounts]; // показываем последние три страницы
      } else {
        pagesToShow = [
          newsParams.currentPage - 1,
          newsParams.currentPage,
          newsParams.currentPage + 1,
        ]; // показываем текущую страницу, предыдущую и следующую
      }
    } else if (currentUrl[0] === 'tournaments') {
      if (tournamentParams.currentPage === 1) {
        pagesToShow = [1, 2, 3]; // показываем первые три страницы
      } else if (tournamentParams.currentPage === pagesCounts) {
        pagesToShow = [pagesCounts - 2, pagesCounts - 1, pagesCounts]; // показываем последние три страницы
      } else {
        pagesToShow = [
          tournamentParams.currentPage - 1,
          tournamentParams.currentPage,
          tournamentParams.currentPage + 1,
        ]; // показываем текущую страницу, предыдущую и следующую
      }
    } else if (currentUrl[0] === 'clubs') {
      if (clubParams.currentPage === 1) {
        pagesToShow = [1, 2, 3]; // показываем первые три страницы
      } else if (clubParams.currentPage === pagesCounts) {
        pagesToShow = [pagesCounts - 2, pagesCounts - 1, pagesCounts]; // показываем последние три страницы
      } else {
        pagesToShow = [
          clubParams.currentPage - 1,
          clubParams.currentPage,
          clubParams.currentPage + 1,
        ]; // показываем текущую страницу, предыдущую и следующую
      }
    }
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.left_side}>
        <ul>
          <li
            className={styles.btnControll}
            onClick={() => {
              if (currentUrl[0] === 'news') {
                updateParams(newsParams.currentPage - 1, newsParams.limit);
              } else if (currentUrl[0] === 'tournaments') {
                updateParams(tournamentParams.currentPage - 1, tournamentParams.limit);
              } else if (currentUrl[0] === 'clubs') {
                updateParams(clubParams.currentPage - 1, clubParams.limit);
              }
            }}>
            <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.922 8.5L13.4404 4.23237C13.9087 3.76407 14.1667 3.14151 14.1667 2.47918C14.1667 1.1123 13.0544 0 11.6876 0C11.0276 0 10.4065 0.256295 9.93884 0.722168L3.55969 6.74681C3.21451 7.09162 2.9807 7.52536 2.88318 8.00232C2.84998 8.16764 2.83337 8.33505 2.83337 8.50003C2.83337 8.66502 2.84998 8.8324 2.88318 8.99947C2.98073 9.47504 3.21451 9.90841 3.5666 10.2598L9.93469 16.2737C10.403 16.742 11.0256 17 11.6876 17C13.0544 17 14.1667 15.8877 14.1667 14.5208C14.1667 13.8582 13.9087 13.2356 13.4335 12.7607L8.922 8.5Z" />
            </svg>
          </li>

          {pagesToShow.map((page) => (
            <li
              key={page}
              className={
                currentUrl[0] === 'news'
                  ? newsParams.currentPage === page
                    ? styles.active
                    : ''
                  : currentUrl[0] === 'tournaments'
                  ? tournamentParams.currentPage === page
                    ? styles.active
                    : ''
                  : currentUrl[0] === 'clubs'
                  ? clubParams.currentPage === page
                    ? styles.active
                    : ''
                  : ''
              }
              onClick={() => {
                if (currentUrl[0] === 'news') {
                  updateParams(page, newsParams.limit);
                } else if (currentUrl[0] === 'tournaments') {
                  updateParams(page, tournamentParams.limit);
                } else if (currentUrl[0] === 'clubs') {
                  updateParams(page, clubParams.limit);
                }
              }}>
              {page}
            </li>
          ))}

          <li
            className={styles.btnControll}
            onClick={() => {
              if (currentUrl[0] === 'news') {
                updateParams(newsParams.currentPage + 1, newsParams.limit);
              } else if (currentUrl[0] === 'tournaments') {
                updateParams(newsParams.currentPage + 1, tournamentParams.limit);
              } else if (currentUrl[0] === 'clubs') {
                updateParams(clubParams.currentPage + 1, clubParams.limit);
              }
            }}>
            <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_12_60)">
                <path d="M8.078 8.5L3.55962 12.7676C3.09133 13.2359 2.83331 13.8585 2.83331 14.5208C2.83327 15.8877 3.94558 17 5.31245 17C5.97236 17 6.59353 16.7437 7.06116 16.2778L13.4403 10.2532C13.7855 9.90838 14.0193 9.47464 14.1168 8.99768C14.15 8.83236 14.1666 8.66495 14.1666 8.49997C14.1666 8.33498 14.15 8.1676 14.1168 8.00053C14.0193 7.52496 13.7855 7.09159 13.4334 6.7402L7.06531 0.726283C6.59698 0.25802 5.97442 -7.16185e-07 5.31245 -7.74057e-07C3.94558 -8.93553e-07 2.83327 1.1123 2.83327 2.47918C2.83327 3.14184 3.09129 3.7644 3.5665 4.23927L8.078 8.5Z" />
              </g>
              <defs>
                <clipPath id="clip0_12_60">
                  <rect width="17" height="17" transform="translate(17 17) rotate(-180)" />
                </clipPath>
              </defs>
            </svg>
          </li>
        </ul>
      </div>

      <div className={styles.right_side}>
        <span>Показывать по</span>
        <ul>
          {settingsLimit.map((limit) => (
            <li
              key={limit}
              className={
                currentUrl[0] === 'news'
                  ? newsParams.limit === limit
                    ? styles.active
                    : ''
                  : currentUrl[0] === 'tournaments'
                  ? tournamentParams.limit === limit
                    ? styles.active
                    : ''
                  : currentUrl[0] === 'clubs'
                  ? clubParams.limit === limit
                    ? styles.active
                    : ''
                  : ''
              }
              onClick={() => {
                if (currentUrl[0] === 'news') {
                  updateParams(newsParams.currentPage, limit);
                } else if (currentUrl[0] === 'tournaments') {
                  updateParams(tournamentParams.currentPage, limit);
                } else if (currentUrl[0] === 'clubs') {
                  updateParams(clubParams.currentPage, limit);
                }
              }}>
              {limit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;

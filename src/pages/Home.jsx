import styles from './Home.module.css';
import itAcademyImg from './../assets/img/action.png';
import skynet from './../assets/img/esporrt-transformed.png';
import magentaImg from './../assets/img/magenta.svg';
import bacsImg from './../assets/img/bacs.svg';
import Login from '../Components/Auth/Login';
import Registration from '../Components/Auth/Registration';
import { Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClubs, selectClubs } from '../redux/slices/club';
import { getAllTournaments, selectTournamentsAll } from '../redux/slices/tournament';
import { fetchAllNews, selectNewsAll } from '../redux/slices/news';

export const Home = () => {
  const dispatch = useDispatch();
  const clubs = useSelector(selectClubs);
  const tournaments = useSelector(selectTournamentsAll);
  const news = useSelector(selectNewsAll);
  useEffect(() => {
    dispatch(getAllClubs({ page: 1, limit: 9999 }));
  }, []);

  useEffect(() => {
    dispatch(getAllTournaments({ page: 1, limit: 9999 }));
  }, []);

  useEffect(() => {
    dispatch(fetchAllNews({ page: 1, limit: 9999 }));
  }, []);

  return (
    <main>
      <article className={styles.title}>
        <span>
          Данный интернет-портал посвящен киберспортивной дисциплине Counter-Strike и подлежит
          развитию киберсопрта в Беларуси
        </span>
      </article>
      <section>
        <ul>
          <li>
            <img src={bacsImg} alt="" />
          </li>
          <li>
            <img src={magentaImg} alt="" width="140px" />
          </li>
          <li>
            <img src={itAcademyImg} alt="" width="250px" />
          </li>
          <li>
            <img src={skynet} alt="" width="300px" />
          </li>
        </ul>
      </section>
      <article className={styles.about}>
        <div className={styles.container}>
          <h1>О нас</h1>
          <p>
            Основной целью данного проекта является - популяризация компьютрного спорта в Беларуси.
            На дворе XXI век, время не стоит на месте и настал, тот момент когда киберспорт должен
            стать чем-то обыденным.{' '}
          </p>
        </div>
      </article>
      <section className={styles.stat}>
        <div className={styles.container}>
          <h1>Немного статистики</h1>
          <ul>
            {/* <li>
              <span>8</span>
              <p>гостей за сегодня</p>
            </li> */}
            <li>
              <span>{clubs.length}</span>
              <p>киберклубов в Беларуси</p>
            </li>
            <li>
              <span>{tournaments.length}</span>
              <p>турниров проведено</p>
            </li>
            <li>
              <span>{news.length}</span>
              <p>новостей опубликовано</p>
            </li>
          </ul>
        </div>
      </section>
      <article className={styles.support}>
        <div className={styles.container}>
          <div className={styles.support_info}>
            <h1>Стань частью команды!</h1>
            <ul>
              <li>Проводишь турниры?</li>
              <li>Пишешь интересные посты?</li>
              <li>Следишь за всеми матчами или владеешь инсайдерской инфой?</li>
            </ul>
          </div>
          <div className={styles.support_actions}>
            <ul>
              <li>Регистрируйся </li>
              <svg
                width="38"
                height="84"
                viewBox="0 0 38 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.2322 82.7678C18.2085 83.7441 19.7915 83.7441 20.7678 82.7678L36.6777 66.8579C37.654 65.8816 37.654 64.2986 36.6777 63.3223C35.7014 62.346 34.1184 62.346 33.1421 63.3223L19 77.4645L4.85787 63.3223C3.88156 62.346 2.29864 62.346 1.32233 63.3223C0.346023 64.2986 0.346023 65.8816 1.32233 66.8579L17.2322 82.7678ZM16.5 1.09278e-07L16.5 81L21.5 81L21.5 -1.09278e-07L16.5 1.09278e-07Z"
                  fill="white"
                />
              </svg>
              <li>Подавай заявку в своём профиле</li>
              <svg
                width="38"
                height="84"
                viewBox="0 0 38 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.2322 82.7678C18.2085 83.7441 19.7915 83.7441 20.7678 82.7678L36.6777 66.8579C37.654 65.8816 37.654 64.2986 36.6777 63.3223C35.7014 62.346 34.1184 62.346 33.1421 63.3223L19 77.4645L4.85787 63.3223C3.88156 62.346 2.29864 62.346 1.32233 63.3223C0.346023 64.2986 0.346023 65.8816 1.32233 66.8579L17.2322 82.7678ZM16.5 1.09278e-07L16.5 81L21.5 81L21.5 -1.09278e-07L16.5 1.09278e-07Z"
                  fill="white"
                />
              </svg>
              <li>Становись частью нашей команды</li>
            </ul>
          </div>
        </div>
      </article>
    </main>
  );
};

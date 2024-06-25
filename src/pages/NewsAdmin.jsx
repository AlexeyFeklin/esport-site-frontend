import { Link, useParams } from 'react-router-dom';
import styles from './NewsAdmin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchChangeUserRole, fetchUserById, selectSelectedUser } from '../redux/slices/auth';
import { categories, imgUrl, roles } from '../Components/CollectionsStorage';
import { fetchOneNews, removeNews, selectSelectedNews } from '../redux/slices/news';
import { removeTournament } from '../redux/slices/tournament';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import notPhoto from './../assets/img/camera_yqpp2gkt93iq.svg';

export const NewsAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneNews(id));
  }, []);

  const news = useSelector(selectSelectedNews);

  useEffect(() => {
    dispatch(fetchUserById(news.userId));
  }, [news]);

  const user = useSelector(selectSelectedUser);

  const formattedDate = new Date(news.createdAt).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });


  return (
    <div className={styles.control_block}>
      <div className={styles.control_buttons}>
        <Link to="/admin" className={styles.control_btn}>
          <span> Назад в админ панель </span>
        </Link>
        <Link to="/" className={styles.control_btn}>
          <span>На главную </span>
        </Link>
      </div>
      <div className={styles.control_zone}>
        <div className={styles.zone_title}>Новость</div>
        <div className={styles.zone_title_under}>{news?.title}</div>
        <ul className={styles.zone_title_ranks}>
          <li>
            <div className={styles.question}>Дата</div>
            <div className={styles.answer}>{formattedDate}</div>
          </li>
          <li>
            <div className={styles.question}>Категория</div>
            <div className={styles.answer}>{categories[news?.category]}</div>
          </li>
          <li>
            <div className={styles.question}>Автор</div>
            <div className={styles.answer}>
              {user?.firstName + ' "' + user?.nickname + '" ' + user?.lastName}
            </div>
          </li>
        </ul>
        <ul className={styles.roleApplications}>
          <li>
            <div className={styles.question}>Превью новости</div>
            <div className={styles.answer}>
              <img src={news?.previewPhoto ? `${imgUrl}${news?.previewPhoto} ` : notPhoto} alt="" />
            </div>
          </li>
          <li>
            <div className={styles.question}>Текст новости</div>
            <div className={styles.answer}>
              {<Markdown remarkPlugins={[remarkGfm]}>{news?.text}</Markdown>}
            </div>
          </li>
        </ul>
        <div className={styles.final_buttons}>
          <Link
            to={'/admin'}
            className={styles.failed_btn}
            onClick={() =>
              window.confirm('Вы действительно хотите удалить новость?')
                ? dispatch(removeNews(news._id))
                : ''
            }>
            Удалить новость
          </Link>
          <Link
            to={'/admin/news/edit/' + news._id}
            className={styles.succes_btn}
            onClick={() => { }}>
            Изменить новость
          </Link>
        </div>
      </div>
    </div>
  );
};

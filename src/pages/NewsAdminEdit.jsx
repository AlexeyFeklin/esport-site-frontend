import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './NewsAdminEdit.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from './../redux/axios';

import { createTournament } from '../redux/slices/tournament';
import { categories, cities, formatTournaments, imgUrl } from '../Components/CollectionsStorage';
import { selectIsAuthData } from '../redux/slices/auth';
import {
  createNews,
  fetchOneNews,
  selectNewsStatus,
  selectSelectedNews,
  updateNews,
} from '../redux/slices/news';
import MDEditor from '@uiw/react-md-editor';

export const NewsAdminEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectIsAuthData);
  const { id } = useParams();
  const inputFileRef = useRef(null);
  const status = useSelector(selectNewsStatus);

  useEffect(() => {
    dispatch(fetchOneNews(id));
  }, []);

  const news = useSelector(selectSelectedNews);

  const [title, setTitle] = useState(news?.title);
  const [imageUrl, setImageUrl] = useState(news?.previewPhoto);
  const [text, setText] = useState(news?.text);
  const [category, setCategory] = useState(news?.category);

  useEffect(() => {
    console.log(news);
    setTitle(news?.title);
    setImageUrl(news?.previewPhoto);
    setText(news?.text);
    setCategory(news?.category);
  }, [status]);

  const handleChangeFile = async (e) => {
    console.log(e.target.files);
    try {
      const fileData = new FormData();
      fileData.append('image', e.target.files[0]);
      const { data } = await axios.post('/upload/news', fileData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSubmit = () => {
    dispatch(
      updateNews({
        id: news._id,
        newsData: { userId: user?._id, previewPhoto: imageUrl, title, category, text },
      }),
    );
    window.alert('Новость успешно редактирована!');
  };

  return (
    <div className={styles.control_block}>
      {' '}
      <div className={styles.control_buttons}>
        {' '}
        <Link to="/admin" className={styles.control_btn}>
          {' '}
          <span> Назад в админ панель </span>{' '}
        </Link>{' '}
        <Link to="/" className={styles.control_btn}>
          {' '}
          <span>На главную </span>{' '}
        </Link>{' '}
      </div>
      {status === 'success' && news ? (
        <div className={styles.control_zone}>
          <div className={styles.zone_title}>Создание новости</div>
          <div className={styles.zone_title_under}></div>
          <ul className={styles.zone_title_ranks}>
            <li>
              <div className={styles.question}>Название новости </div>
              <div className={styles.answer}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
            </li>

            <li>
              <div className={styles.question}>Категория</div>
              <div className={styles.answer}>
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </li>

            <li>
              <div className={styles.question}>Превью новости</div>
              <div className={styles.preview_uploadImgae}>
                <img src={`${imgUrl}${imageUrl}`} alt="" />
                {imageUrl?.split('/').pop()}
              </div>
              <div className={styles.loadImgBtn} onClick={() => inputFileRef.current.click()}>
                Загрузить изображение
              </div>
              <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
            </li>
            <li>
              <div className={styles.question}>Текст новости</div>
              <div className={styles.answer}>
                <MDEditor value={text} onChange={setText} />
              </div>
            </li>
          </ul>

          <div className={styles.final_buttons}>
            <a className={styles.succes_btn} onClick={handleSubmit}>
              Изменить новость
            </a>
          </div>
        </div>
      ) : status === 'pending' ? (
        <div>LOADING...</div>
      ) : (
        <></>
      )}
    </div>
  );
};

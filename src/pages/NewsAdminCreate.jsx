import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './NewsAdminCreate.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from './../redux/axios';

import { createTournament } from '../redux/slices/tournament';
import { categories, cities, formatTournaments, imgUrl } from '../Components/CollectionsStorage';
import { selectIsAuthData } from '../redux/slices/auth';
import { createNews, selectNewsStatus } from '../redux/slices/news';
import MDEditor from '@uiw/react-md-editor';

export const NewsAdminCreate = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectIsAuthData);
  const inputFileRef = useRef(null);

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState(0);

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

  const createStatus = useSelector(selectNewsStatus);
  const handleSubmit = () => {
    dispatch(createNews({ userId: user?._id, previewPhoto: imageUrl, title, category, text }));
    window.alert('Новость успешно созданна!');
  };

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
                onChange={(e) => setCategory(e.target.selectedIndex)}>
                {categories.map((category, index) => (
                  <option key={index} value={index}>
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
              {imageUrl.split('/').pop()}
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
          <Link to="" className={styles.succes_btn} onClick={handleSubmit}>
            Создать новость
          </Link>
        </div>
      </div>
    </div>
  );
};

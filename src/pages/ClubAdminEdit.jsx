import React, { useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './ClubAdminEdit.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  fetchOneClub,
  createClub,
  selectClubStatus,
  selecetSelectedClub,
  updateClub,
} from '../redux/slices/club';
import { cities, imgUrl } from '../Components/CollectionsStorage';
import axios from './../redux/axios';
import MDEditor from '@uiw/react-md-editor';

export const ClubAdminEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const inputFileRef = useRef(null);

  useEffect(() => {
    dispatch(fetchOneClub(id));
  }, [id]);

  const club = useSelector(selecetSelectedClub);
  const status = useSelector(selectClubStatus);
  useEffect(() => {
    setImageUrl(club?.previewPhoto);
    setText(club?.text);
    setFormData({
      title: club?.title,
      city: club?.city,
      address: club?.address,
    });
    console.log(club);
    console.log(status);
  }, [status]);
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');

  const handleChangeFile = async (e) => {
    console.log(e.target.files);
    try {
      const fileData = new FormData();
      fileData.append('image', e.target.files[0]);
      const { data } = await axios.post('/upload/clubs', fileData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
    }
  };
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    address: '',
  });

  const handleSubmit = () => {
    dispatch(
      updateClub({
        id: club._id,
        clubData: {
          title: formData.title,
          city: formData.city,
          address: formData.address,
          previewPhoto: imageUrl,
          text: text,
        },
      }),
    );
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
        <div className={styles.zone_title}>Редактирование клуба</div>
        <div className={styles.zone_title_under}></div>
        <ul className={styles.zone_title_ranks}>
          <li>
            <div className={styles.question}>Название клуба</div>
            <div className={styles.answer}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Город</div>
            <div className={styles.answer}>
              <select
                name="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}>
                {cities.map((city, index) => (
                  <option key={index} value={index}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </li>
          <li>
            <div className={styles.question}>Адресс</div>
            <div className={styles.answer}>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
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
            <div className={styles.question}>Описание клуба</div>
            <div className={styles.answer}>
              <MDEditor value={text} onChange={setText} />
            </div>
          </li>
        </ul>

        <div className={styles.final_buttons}>
          <Link to="/admin" className={styles.success_btn} onClick={handleSubmit}>
            Изменить клуб
          </Link>
        </div>
      </div>
    </div>
  );
};

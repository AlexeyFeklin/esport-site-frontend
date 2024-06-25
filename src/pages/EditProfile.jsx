import React, { useRef, useState } from 'react';
import styles from './EditProfile.module.css';
import { cities, imgUrl } from '../Components/CollectionsStorage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdate, selectIsAuthData } from '../redux/slices/auth';
import axios from './../redux/axios';

export const EditProfile = () => {
  const user = useSelector(selectIsAuthData);
  const inputFileRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    nickname: user?.nickname,
    lastName: user?.lastName,
    city: user?.city,
    description: user?.description,
    vkUrl: user?.vkUrl,
    faceitUrl: user?.faceitUrl,
    steamUrl: user?.steamUrl,
    avatarUrl: user?.avatarUrl,
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    window.alert('Профиль успешно обновлен!');
    dispatch(fetchUpdate(formData));
  };
  const handleChangeFile = async (e) => {
    try {
      const fileData = new FormData();
      fileData.append('image', e.target.files[0]);
      const { data } = await axios.post('/upload/users', fileData);
      setFormData({ ...formData, avatarUrl: data.url });
    } catch (err) {
      console.warn(err);
    }
  };

  console.log(formData);

  return (
    <div className={styles.edit}>
      <div className={styles.title}>Редактирование профиля</div>

      <form action="" className={styles.edit_form} onSubmit={handleSubmit}>
        <ul>
          <li>
            <div className={styles.question}>Имя</div>{' '}
            <div className={styles.answer}>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Никнейм</div>
            <div className={styles.answer}>
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Фамилия</div>
            <div className={styles.answer}>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Город</div>
            <div className={styles.answer}>
              {/* <select>
                {cities.map((item, key) => (
                  <option value={key}>{item}</option>
                ))}
              </select> */}
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}>
                {cities.map((item, key) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </li>
          <li>
            <div className={styles.question}>Описание</div>{' '}
            <div className={styles.answer}>
              <textarea
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Ссылка на VK</div>
            <div className={styles.answer}>
              <input
                type="text"
                value={formData.vkUrl}
                onChange={(e) => setFormData({ ...formData, vkUrl: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Ссылка на Faceit</div>
            <div className={styles.answer}>
              <input
                type="text"
                value={formData.faceitUrl}
                onChange={(e) => setFormData({ ...formData, faceitUrl: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Ссылка на Steam</div>
            <div className={styles.answer}>
              <input
                type="text"
                value={formData.steamUrl}
                onChange={(e) => setFormData({ ...formData, steamUrl: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Аватарка</div>
            <div className={styles.answer}>
              <div className={styles.loadImgBtn} onClick={() => inputFileRef.current.click()}>
                Загрузить изображение
              </div>
              <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
            </div>
          </li>
          <div className={styles.preview_uploadImgae}>
            <img src={`${imgUrl}${formData.avatarUrl}`} alt="" />
            {formData.avatarUrl?.split('/').pop()}
          </div>
        </ul>

        <div className={styles.lol}>
          <button className={styles.send_btn}>Готово</button>
        </div>
      </form>
    </div>
  );
};

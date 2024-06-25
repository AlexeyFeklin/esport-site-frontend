import React, { useState } from 'react';
import styles from './EditRole.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createRoleApplication } from './../redux/slices/roleApplication.js';
import { Bracket, BracketGenerator } from 'react-tournament-bracket';
import { BracketTitle } from 'react-tournament-bracket/lib/components/BracketGenerator.js';

export const EditRole = () => {
  const dispatch = useDispatch();
  const [desiredRole, setRole] = useState('');
  const [reason, setReason] = useState('');
  const [experience, setExperience] = useState('');
  const [achievements, setAchievements] = useState('');
  const userId = useSelector((state) => state.auth.data?._id);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createRoleApplication({ userId, desiredRole, reason, experience, achievements }));
    window.alert('Заявка успешно отправлена!');
  };

  return (
    <div className={styles.edit}>
      <div className={styles.title}>Смена роли</div>

      <form action="" className={styles.edit_form} onSubmit={handleOnSubmit}>
        <ul>
          <li>
            <div className={styles.question}>Роль, которую хотите получить</div>{' '}
            <div className={styles.answer}>
              <select value={desiredRole} onChange={(e) => setRole(e.target.value)}>
                <option value="">Выберите роль</option>
                <option value="663c07259edd5258029e70d3">Игрок</option>
                <option value="663c07259edd5258029e70d6">Комментатор</option>
                <option value="663c07259edd5258029e70d9">Организатор</option>
                <option value="663c07259edd5258029e70dc">Модератор</option>
              </select>
            </div>
          </li>
          <li>
            <div className={styles.question}>Почему вы хотите именно эту роль</div>
            <div className={styles.answer}>
              <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
            </div>
          </li>
          <li>
            <div className={styles.question}>Опыт</div>
            <div className={styles.answer}>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Достижения</div>
            <div className={styles.answer}>
              <input
                type="text"
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
              />
            </div>
          </li>
        </ul>
        <div className={styles.lol}>
          <button type="submit" className={styles.send_btn}>
            Готово
          </button>
        </div>
      </form>
    </div>
  );
};

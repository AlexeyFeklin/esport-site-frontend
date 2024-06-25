import { useEffect, useState } from 'react';
import styles from './Admin.module.css';
import { RoleApplicationZone } from '../Components/RoleApplicationZone';
import { NewsZone } from '../Components/NewsZone';
import { useDispatch, useSelector } from 'react-redux';
import { cleaningSelectedUsers, selectIsAuth, selectIsAuthData } from '../redux/slices/auth';
import { TournamentZone } from '../Components/TournamentZone';
import { ClubZone } from '../Components/ClubZone';
import { Link } from 'react-router-dom';
import { roles } from '../Components/CollectionsStorage';
import { OrgTournaments } from './OrgTournaments';
import { CommentZone } from '../Components/CommentZone';

export const Admin = () => {
  const [controlAction, setControlAction] = useState('');
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectIsAuthData);

  useEffect(() => {
    if (roles[user?.roleId] === 'Комментатор') {
      setControlAction(1);
    } else if (roles[user?.roleId] === 'Организатор') {
      setControlAction(2);
    } else setControlAction(0);
  }, [user]);
  useEffect(() => {
    dispatch(cleaningSelectedUsers());
  }, [controlAction]);

  return (
    <>
      {!isAuth ? (
        <div className="userIsNotAuth">
          Вы не авторизированы или не имеет прав доступа к данному блоку!⚠️
          <Link to="/" className="back_btn">
            Вернуться на главную
          </Link>
        </div>
      ) : roles[user?.roleId] === 'Пользователь' || roles[user?.roleId] === 'Игрок' ? (
        <div className="userIsNotAuth">
          Вы не авторизированы или не имеет прав доступа к данному блоку!⚠️
          <Link to="/" className="back_btn">
            Вернуться на главную
          </Link>
        </div>
      ) : (
        <div className={styles.control_block}>
          <div className={styles.control_buttons}>
            {roles[user?.roleId] === 'Комментатор' ? (
              <div
                className={`${styles.control_btn} ${controlAction === 1 ? styles.btn_active : ''}`}
                onClick={() => setControlAction(1)}>
                <span>Работа с новостями</span>
              </div>
            ) : roles[user?.roleId] === 'Организатор' ? (
              <div
                className={`${styles.control_btn} ${controlAction === 2 ? styles.btn_active : ''}`}
                onClick={() => setControlAction(2)}>
                <span>Работа с турнирами</span>
              </div>
            ) : roles[user?.roleId] === 'Модератор' ? (
              <>
                <div
                  className={`${styles.control_btn} ${
                    controlAction === 0 ? styles.btn_active : ''
                  }`}
                  onClick={() => setControlAction(0)}>
                  <span>Заявки на смену роли</span>
                </div>
                <div
                  className={`${styles.control_btn} ${
                    controlAction === 1 ? styles.btn_active : ''
                  }`}
                  onClick={() => setControlAction(1)}>
                  <span>Работа с новостями</span>
                </div>
                <div
                  className={`${styles.control_btn} ${
                    controlAction === 2 ? styles.btn_active : ''
                  }`}
                  onClick={() => setControlAction(2)}>
                  <span>Работа с турнирами</span>
                </div>
                <div
                  className={`${styles.control_btn} ${
                    controlAction === 3 ? styles.btn_active : ''
                  }`}
                  onClick={() => setControlAction(3)}>
                  <span>Работа с клубами</span>
                </div>{' '}
                <div
                  className={`${styles.control_btn} ${
                    controlAction === 4 ? styles.btn_active : ''
                  }`}
                  onClick={() => setControlAction(4)}>
                  <span>Работа с комментариями</span>
                </div>{' '}
              </>
            ) : (
              ''
            )}
          </div>
          <div className={styles.control_zone}>
            {(() => {
              switch (controlAction) {
                case 0:
                  return <RoleApplicationZone />;
                case 1:
                  return <NewsZone />;
                case 2:
                  return roles[user?.roleId] === 'Организатор' ? (
                    <OrgTournaments />
                  ) : (
                    <TournamentZone />
                  );
                case 3:
                  return <ClubZone />;
                case 4:
                  return <CommentZone />;
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      )}
    </>
  );
};

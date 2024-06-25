import { Link, useParams } from 'react-router-dom';
import styles from './RoleApplication.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchOneRoleApplication,
  removeRoleApplication,
  selectedRoleApplcation,
} from '../redux/slices/roleApplication';
import { fetchChangeUserRole, fetchUserById, selectSelectedUser } from '../redux/slices/auth';
import { roles } from '../Components/CollectionsStorage';

export const RoleApplication = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneRoleApplication(id));
  }, []);

  const roleApplication = useSelector(selectedRoleApplcation);

  useEffect(() => {
    dispatch(fetchUserById(roleApplication.userId));
  }, [roleApplication]);

  const user = useSelector(selectSelectedUser);

  const succesRoleApplication = () => {
    dispatch(
      fetchChangeUserRole({
        userId: roleApplication.userId,
        role: { roleId: roleApplication.desiredRole },
      }),
    );
    dispatch(removeRoleApplication(roleApplication._id));
  };

  const failedRoleApplication = () => {
    dispatch(removeRoleApplication(roleApplication._id));
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
        <div className={styles.zone_title}>
          {user?.firstName + ' "' + user?.nickname + '" ' + user?.lastName}
        </div>
        <div className={styles.zone_title_under}>Заявка на смену роли</div>
        <ul className={styles.zone_title_ranks}>
          <li>
            <div>Текущая роль</div>
            <div
              className={
                roles[user?.roleId] === 'Модератор'
                  ? styles.answer + ' moderator'
                  : roles[user?.roleId] === 'Организатор'
                  ? styles.answer + ' organizer'
                  : roles[user?.roleId] === 'Комментатор'
                  ? styles.answer + ' commentator'
                  : roles[user?.roleId] === 'Игрок'
                  ? styles.answer + ' player'
                  : 'user'
              }>
              {roles[user?.roleId]}
            </div>
          </li>
          <li>
            <div>Желаемая роль</div>
            <div
              className={
                roles[roleApplication?.desiredRole] === 'Модератор'
                  ? styles.answer + ' moderator'
                  : roles[roleApplication?.desiredRole] === 'Организатор'
                  ? styles.answer + ' organizer'
                  : roles[roleApplication?.desiredRole] === 'Комментатор'
                  ? styles.answer + ' commentator'
                  : roles[roleApplication?.desiredRole] === 'Игрок'
                  ? styles.answer + ' player'
                  : styles.answer
              }>
              {roles[roleApplication?.desiredRole]}
            </div>
          </li>
        </ul>
        <ul className={styles.roleApplications}>
          <li>
            <div className={styles.question}>Причина</div>
            <div className={styles.answer}>{roleApplication?.reason}</div>
          </li>
          <li>
            <div className={styles.question}>Опыт</div>
            <div className={styles.answer}>{roleApplication?.experience}</div>
          </li>
          <li>
            <div className={styles.question}>Достижения</div>
            <div className={styles.answer}>{roleApplication?.achievements}</div>
          </li>
        </ul>
        <div className={styles.final_buttons}>
          <Link
            to={'/admin'}
            className={styles.failed_btn}
            onClick={() => {
              failedRoleApplication();
            }}>
            Отклонить заявку
          </Link>
          <Link
            to={'/admin'}
            className={styles.succes_btn}
            onClick={() => {
              succesRoleApplication();
            }}>
            Одобрить заявку
          </Link>
        </div>
      </div>
    </div>
  );
};

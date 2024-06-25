import { Link } from 'react-router-dom';
import { imgUrl, roles } from '../CollectionsStorage';
import styles from './RoleApplicationCart.module.css';
import { fetchChangeUserRole, fetchUpdate } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';
import { removeRoleApplication } from '../../redux/slices/roleApplication';
import notPhoto from './../../assets/img/camera_yqpp2gkt93iq.svg';

export const RoleApplicationCart = ({ user, application }) => {
  const dispatch = useDispatch();

  const succesRoleApplication = () => {
    dispatch(
      fetchChangeUserRole({
        userId: application.userId,
        role: { roleId: application.desiredRole },
      }),
    );
    dispatch(removeRoleApplication(application._id));
  };

  const failedRoleApplication = () => {
    dispatch(removeRoleApplication(application._id));
  };

  return (
    <Link to={'/admin/roleApplication/' + application._id} className={styles.roleApplication_Cart}>
      <div className={styles.roleApplication_Cart_info}>
        <div className={styles.photo}>
          <img src={user?.avatarUrl ? `${imgUrl}${user?.avatarUrl} ` : notPhoto} alt="" />
        </div>

        <div className={styles.zone_text}>
          <div className={styles.player_name}>
            {user?.firstName + ' "' + user?.nickname + '" ' + user?.lastName}
          </div>
          <ul className={styles.desiredRoles}>
            <li>
              <div className={styles.question}>Текущая роль</div>{' '}
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
                    : styles.answer
                }>
                {roles[user?.roleId]}
              </div>{' '}
            </li>
            <li>
              <div className={styles.question}>Желаемая роль</div>{' '}
              <div
                className={
                  roles[application?.desiredRole] === 'Модератор'
                    ? styles.answer + ' moderator'
                    : roles[application?.desiredRole] === 'Организатор'
                    ? styles.answer + ' organizer'
                    : roles[application?.desiredRole] === 'Комментатор'
                    ? styles.answer + ' commentator'
                    : roles[application?.desiredRole] === 'Игрок'
                    ? styles.answer + ' player'
                    : styles.answer
                }>
                {roles[application.desiredRole]}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={styles.roleApplication_Cart_buttons}
        onClick={(e) => {
          e.preventDefault();
        }}>
        <svg
          onClick={(e) => {
            e.preventDefault();
            succesRoleApplication();
          }}
          version="1.1"
          id="Capa_1"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 512.008 512.008">
          <g>
            <g>
              <path d="M502.795,60.572c-11.183-9.782-28.214-8.677-38.023,2.533L177.837,391.028L46.603,251.036 c-10.186-10.833-27.217-11.372-38.077-1.213c-10.86,10.159-11.426,27.244-1.24,38.104l151.579,161.684 c5.12,5.416,12.207,8.488,19.672,8.488h0.458c7.626-0.108,14.794-3.449,19.833-9.189L505.355,98.595 C515.137,87.385,514.005,70.381,502.795,60.572z"></path>
            </g>
          </g>
        </svg>

        <svg
          onClick={(e) => {
            e.preventDefault();
            failedRoleApplication();
          }}
          id="Layer_2"
          enable-background="new 0 0 32 32"
          viewBox="0 0 32 32"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg">
          <path d="m31.5 2.42828c0-.51752-.20148-1.00427-.56763-1.36987-.73224-.73224-2.00751-.73224-2.73975 0l-12.19262 12.19263-12.19263-12.19263c-.73224-.73224-2.00751-.73224-2.73975 0-.36608.3656-.56762.85236-.56762 1.36987 0 .51746.20154 1.00421.56763 1.36987l12.19263 12.19263-12.19263 12.19263c-.36609.3656-.56763.85236-.56763 1.36987 0 .51746.20154 1.00421.56763 1.36987.73224.73224 2.00751.73224 2.73975 0l12.19262-12.19262 12.19263 12.19263c.36615.36609.85242.56763 1.36987.56763.51752 0 1.00378-.20154 1.36987-.56763.36615-.36566.56763-.85242.56763-1.36988 0-.51752-.20148-1.00427-.56763-1.36987l-12.19262-12.19263 12.19262-12.19262c.36615-.36566.56763-.85242.56763-1.36988z"></path>
        </svg>
      </div>
    </Link>
  );
};

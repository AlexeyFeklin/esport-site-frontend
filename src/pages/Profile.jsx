import styles from './Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, selectIsAuthData, selectSelectedUser } from '../redux/slices/auth';
import { Link, useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cities, imgUrl, roles } from '../Components/CollectionsStorage';
import { Comment } from '../Components/Comment';
import { createComment, getCommentsByTarget, selectComments } from '../redux/slices/comment';
import { Comments } from '../Components/Comments';
import notPhoto from './../assets/img/camera_yqpp2gkt93iq.svg';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector(selectIsAuthData);

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [id]);
  const user = useSelector(selectSelectedUser);

  useEffect(() => {
    if (user && !('firstName' in user)) {
      navigate('/profile/edit');
    }
  }, [user]);

  return (
    <div>
      <div className={styles.fb}>
        <div
          className={
            user?._id === auth?._id
              ? styles.main_info + ' ' + styles.up_block
              : styles.main_info + ' ' + styles.up_block + ' ' + styles.alien
          }>
          <div className={styles.avatar}>
            <img src={user?.avatarUrl ? imgUrl + user?.avatarUrl : notPhoto} alt="" />
            <div
              className={
                styles.role +
                ' ' +
                (user?.roleId === '663c07259edd5258029e70dc'
                  ? 'moderator'
                  : user?.roleId === '663c07259edd5258029e70d9'
                    ? 'organizer'
                    : user?.roleId === '663c07259edd5258029e70d6'
                      ? 'commentator'
                      : user?.roleId === '663c07259edd5258029e70d3'
                        ? 'player'
                        : '')
              }>
              {user?.roleId === '663c07259edd5258029e70dc'
                ? 'Модератор'
                : user?.roleId === '663c07259edd5258029e70d9'
                  ? 'Орагнизатор'
                  : user?.roleId === '663c07259edd5258029e70d6'
                    ? 'Комментатор'
                    : user?.roleId === '663c07259edd5258029e70d3'
                      ? 'Игрок'
                      : 'Пользователь'}
            </div>
            <ul className={styles.social_media}>
              <li
                className={
                  user?.steamUrl ? styles.social_icon : styles.social_icon + ' ' + styles.unactive
                }>
                <Link to={user?.steamUrl}>
                  <svg
                    version="1.1"
                    fill="#080d1c"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 31.273 31.273">
                    <g>
                      <path d="M25.721,6.393c-3.062,0-5.553,2.49-5.553,5.552c0,0.512,0.092,0.999,0.223,1.47l-2.225,3.511 c-0.295-0.068-0.599-0.113-0.913-0.113c-0.983,0-1.874,0.367-2.575,0.954l-6.634-2.911c0.005-0.079,0.023-0.152,0.023-0.231 c0-2.224-1.811-4.033-4.034-4.033S0,12.4,0,14.625c0,2.225,1.81,4.034,4.033,4.034c0.828,0,1.598-0.25,2.238-0.681l6.966,3.058 c0.102,2.135,1.855,3.846,4.016,3.846c2.224,0,4.033-1.81,4.033-4.034c0-0.167-0.028-0.327-0.05-0.489l3.736-2.936 c0.246,0.035,0.492,0.076,0.748,0.076c3.062,0,5.553-2.491,5.553-5.553C31.273,8.882,28.782,6.393,25.721,6.393z M2.142,14.625 c0-1.042,0.849-1.891,1.891-1.891c1.043,0,1.892,0.848,1.892,1.891c0,1.043-0.849,1.891-1.892,1.891 C2.991,16.516,2.142,15.668,2.142,14.625z M17.253,22.803c-1.08,0-1.958-0.877-1.958-1.957c0-1.079,0.878-1.959,1.958-1.959 c1.079,0,1.957,0.879,1.957,1.959S18.332,22.803,17.253,22.803z M25.721,15.117c-1.75,0-3.172-1.423-3.172-3.172 s1.422-3.172,3.172-3.172s3.172,1.423,3.172,3.172S27.471,15.117,25.721,15.117z"></path>
                    </g>
                  </svg>
                </Link>
              </li>
              <li
                className={
                  user?.steamUrl ? styles.social_icon : styles.social_icon + ' ' + styles.unactive
                }>
                <Link to={user?.vkUrl}>
                  <svg
                    version="1.1"
                    fill="blue"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512">
                    <path d="M440.649,295.361c16.984,16.582,34.909,32.182,50.142,50.436 c6.729,8.112,13.099,16.482,17.973,25.896c6.906,13.382,0.651,28.108-11.348,28.907l-74.59-0.034 c-19.238,1.596-34.585-6.148-47.489-19.302c-10.327-10.519-19.891-21.714-29.821-32.588c-4.071-4.444-8.332-8.626-13.422-11.932 c-10.182-6.609-19.021-4.586-24.84,6.034c-5.926,10.802-7.271,22.762-7.853,34.8c-0.799,17.564-6.108,22.182-23.751,22.986 c-37.705,1.778-73.489-3.926-106.732-22.947c-29.308-16.768-52.034-40.441-71.816-67.24 C58.589,258.194,29.094,200.852,2.586,141.904c-5.967-13.281-1.603-20.41,13.051-20.663c24.333-0.473,48.663-0.439,73.025-0.034 c9.89,0.145,16.437,5.817,20.256,15.16c13.165,32.371,29.274,63.169,49.494,91.716c5.385,7.6,10.876,15.201,18.694,20.55 c8.65,5.923,15.236,3.96,19.305-5.676c2.582-6.11,3.713-12.691,4.295-19.234c1.928-22.513,2.182-44.988-1.199-67.422 c-2.076-14.001-9.962-23.065-23.933-25.714c-7.129-1.351-6.068-4.004-2.616-8.073c5.995-7.018,11.634-11.387,22.875-11.387h84.298 c13.271,2.619,16.218,8.581,18.035,21.934l0.072,93.637c-0.145,5.169,2.582,20.51,11.893,23.931 c7.452,2.436,12.364-3.526,16.836-8.251c20.183-21.421,34.588-46.737,47.457-72.951c5.711-11.527,10.622-23.497,15.381-35.458 c3.526-8.875,9.059-13.242,19.056-13.049l81.132,0.072c2.406,0,4.84,0.035,7.17,0.434c13.671,2.33,17.418,8.211,13.195,21.561 c-6.653,20.945-19.598,38.4-32.255,55.935c-13.53,18.721-28.001,36.802-41.418,55.634 C424.357,271.756,425.336,280.424,440.649,295.361L440.649,295.361z"></path>
                  </svg>
                </Link>
              </li>
              <li
                className={
                  user?.steamUrl ? styles.social_icon : styles.social_icon + ' ' + styles.unactive
                }>
                <Link to={user?.faceitUrl}>
                  <svg viewBox="29.3 101.1 451.7 357.9" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m481 104.8c0-1.8-1.9-3.7-1.9-3.7-1.8 0-1.8 0-3.7 1.9-37.5 58.1-76.8 116.2-114.3 176.2h-326.2c-3.7 0-5.6 5.6-1.8 7.5 134.9 50.5 331.7 127.3 440.4 170.4 3.7 1.9 7.5-1.9 7.5-3.7z"
                      fill="#fd5a00"
                    />
                    <path
                      d="m481 104.8c0-1.8-1.9-3.7-1.9-3.7-1.8 0-1.8 0-3.7 1.9-37.5 58.1-76.8 116.2-114.3 176.2l119.9 1.23z"
                      fill="#ff690a"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
            {user?._id === auth?._id ? (
              <Link to="/profile/edit" className={styles.change_btn}>
                Редактировать профиль{' '}
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 432.544 432.544">
                  <g>
                    <g>
                      <path d="M0,313.775v118.77h118.771l237.541-237.541L237.539,76.232L0,313.775z M103.638,395.999L103.638,395.999l-30.55,0.004 v-36.546H36.545v-30.553l25.981-25.981l67.093,67.092L103.638,395.999z M246.683,124.77c4.182,0,6.276,2.095,6.276,6.28 c0,1.906-0.664,3.521-1.999,4.856L96.214,290.651c-1.333,1.328-2.952,1.995-4.854,1.995c-4.184,0-6.279-2.098-6.279-6.279 c0-1.906,0.666-3.521,1.997-4.856l154.747-154.743C243.154,125.436,244.773,124.77,246.683,124.77z"></path>
                      <path d="M421.976,77.654l-67.091-66.806C347.653,3.619,338.992,0,328.903,0c-10.283,0-18.842,3.619-25.693,10.848l-47.394,47.109 l118.773,118.77l47.394-47.392c7.042-7.043,10.561-15.608,10.561-25.697C432.54,93.743,429.022,85.08,421.976,77.654z"></path>
                    </g>
                  </g>
                </svg>
              </Link>
            ) : (
              ''
            )}
          </div>

          {user?._id === auth?._id ? (
            <Link
              to="/profile/edit/role"
              className={styles.change_btn + ' ' + styles.change_role_btn}>
              Подать заявку на смену роли{' '}
            </Link>
          ) : (
            ''
          )}

          {roles[user?.roleId] === 'Модератор' ||
            roles[user?.roleId] === 'Комментатор' ||
            roles[user?.roleId] === 'Организатор' ? (
            <Link to="/admin/" className={styles.change_btn + ' ' + styles.change_role_btn}>
              Админ панель{' '}
            </Link>
          ) : (
            ''
          )}

          {user?.description ? (
            <div className={styles.profile_description}>
              <div className={styles.profile_description_info}>
                <div className={styles.title}>Описание профиля</div>
              </div>
              <div className={styles.profile_description_text}>{user?.description}</div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={styles.additional_info + ' ' + styles.up_block}>
          <div className={styles.fullname}>
            {user?.firstName} "{user?.nickname}” {user?.lastName}
          </div>
          <ul>
            {/* <li>
              <div className={styles.question}>Место в рейтинге</div>{' '}
              <div className={styles.answer}>
                {' '}
                <span className={styles.green_rank}>51</span>
              </div>
            </li> */}

            <li>
              Город <div className={styles.answer}>{user?.city}</div>
            </li>

            {/* <li>
              K/D{' '}
              <div className={styles.answer}>{user?.kills / (user?.deaths ? user?.deaths : 1)}</div>
            </li> */}
          </ul>
        </div>
      </div>
      <Comments />
    </div>
  );
};

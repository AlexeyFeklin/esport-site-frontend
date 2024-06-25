import styles from './Header.module.css';
import logoImg from './../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchUsers, selectIsAuth, selectIsAuthData } from '../../redux/slices/auth';
import notPhoto from './../../assets/img/camera_yqpp2gkt93iq.svg';
import { imgUrl } from '../CollectionsStorage';

export const Header = ({ setActive, setNotfActive, notfModalActive }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const profileData = useSelector(selectIsAuthData);
  const [activeNavElement, setActiveNavElement] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue.length > 2) {
      dispatch(fetchSearchUsers(searchValue));
    }
  }, [searchValue]);

  const searchElements = useSelector((state) => state.auth.foundPeoples);

  return (
    <header>
      <nav>
        <ul>
          <li
            className={activeNavElement == 0 ? styles.active : ''}
            onClick={() => {
              setActiveNavElement(0);
            }}>
            <Link to="news/">Новости</Link>
          </li>
          <li
            className={activeNavElement == 1 ? styles.active : ''}
            onClick={() => {
              setActiveNavElement(1);
            }}>
            <Link to="tournaments/">Турниры</Link>
          </li>
          <li
            className={activeNavElement == 2 ? styles.active : ''}
            onClick={() => {
              setActiveNavElement(2);
            }}>
            <Link to="clubs">Клубы</Link>
          </li>
        </ul>
      </nav>

      <div
        className={styles.logo}
        onClick={() => {
          setActiveNavElement(null);
        }}>
        <Link to="/">
          <img src={logoImg} alt="" />
        </Link>
      </div>

      <aside>
        <ul>
          <li className={styles.search}>
            <input
              type="text"
              placeholder="Найти игрока"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            {searchElements && searchValue.length > 1 ? (
              <ul className={styles.searchResult}>
                {searchElements.map((user) => {
                  return (
                    <Link
                      to={'/profile/' + user?._id}
                      onClick={() => setSearchValue('')}
                      className={styles.searchResultCart}>
                      <img src={user?.avatarUrl ? imgUrl + user?.avatarUrl : notPhoto} alt="" />
                      <span>{user.firstName + ' "' + user.nickname + '" ' + user.lastName}</span>
                    </Link>
                  );
                })}
              </ul>
            ) : (
              ''
            )}
          </li>
          <li>
            {isAuth ? (
              <div
                className={styles.succes_auth_data}
                onClick={() => {
                  notfModalActive ? setNotfActive(true) : setNotfActive(true);
                }}>
                {profileData.avatarUrl ? (
                  <img
                    src={profileData?.avatarUrl ? imgUrl + profileData?.avatarUrl : notPhoto}
                    alt=""
                    className={styles.profile_avatar}
                  />
                ) : (
                  <svg
                    className={styles.profile_avatar}
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="1"
                      y="1"
                      width="48"
                      height="48"
                      rx="24"
                      stroke="#3500D3"
                      stroke-width="2"
                    />
                    <path
                      d="M24.906 26.0095C24.9329 26.0095 24.9598 26.0095 24.9921 26.0095C25.0029 26.0095 25.0137 26.0095 25.0244 26.0095C25.0406 26.0095 25.0621 26.0095 25.0783 26.0095C26.6558 25.9826 27.9319 25.428 28.8741 24.3674C30.947 22.0306 30.6024 18.0249 30.5647 17.6426C30.4301 14.7728 29.0733 13.3999 27.9534 12.7592C27.1189 12.28 26.1443 12.0215 25.0567 12H25.019C25.0137 12 25.0029 12 24.9975 12H24.9652C24.3676 12 23.1938 12.0969 22.0685 12.7376C20.9379 13.3783 19.5595 14.7513 19.4249 17.6426C19.3872 18.0249 19.0426 22.0306 21.1155 24.3674C22.0524 25.428 23.3284 25.9826 24.906 26.0095ZM20.8625 17.7772C20.8625 17.761 20.8679 17.7449 20.8679 17.7341C21.0455 13.8737 23.7861 13.4591 24.9598 13.4591H24.9814C24.9921 13.4591 25.0083 13.4591 25.0244 13.4591C26.4781 13.4914 28.9495 14.0837 29.1164 17.7341C29.1164 17.7503 29.1164 17.7664 29.1218 17.7772C29.1271 17.8149 29.504 21.4761 27.7919 23.4036C27.1135 24.1682 26.2089 24.545 25.019 24.5558C25.0083 24.5558 25.0029 24.5558 24.9921 24.5558C24.9814 24.5558 24.976 24.5558 24.9652 24.5558C23.7807 24.545 22.8708 24.1682 22.1978 23.4036C20.491 21.4869 20.8571 17.8095 20.8625 17.7772Z"
                      fill="#3500D3"
                    />
                    <path
                      d="M36.0565 32.6536C36.0565 32.6482 36.0565 32.6428 36.0565 32.6374C36.0565 32.5943 36.0511 32.5513 36.0511 32.5028C36.0188 31.4367 35.9488 28.9439 33.6121 28.147C33.596 28.1416 33.5744 28.1363 33.5583 28.1309C31.13 27.5117 29.111 26.1118 29.0894 26.0957C28.761 25.8642 28.3087 25.9449 28.0772 26.2733C27.8457 26.6018 27.9265 27.054 28.2549 27.2856C28.3464 27.3502 30.4893 28.8416 33.1706 29.5308C34.4251 29.9776 34.5651 31.3183 34.6028 32.5459C34.6028 32.5943 34.6028 32.6374 34.6082 32.6805C34.6136 33.165 34.5812 33.9134 34.4951 34.3442C33.6229 34.8395 30.2039 36.5517 25.0029 36.5517C19.8233 36.5517 16.3829 34.8341 15.5052 34.3388C15.4191 33.9081 15.3814 33.1597 15.3922 32.6751C15.3922 32.632 15.3976 32.5889 15.3976 32.5405C15.4353 31.3129 15.5752 29.9722 16.8297 29.5254C19.511 28.8362 21.6539 27.3394 21.7455 27.2802C22.0739 27.0487 22.1547 26.5964 21.9231 26.268C21.6916 25.9395 21.2394 25.8588 20.9109 26.0903C20.8894 26.1064 18.8811 27.5063 16.4421 28.1255C16.4206 28.1309 16.4044 28.1363 16.3882 28.1416C14.0515 28.9439 13.9815 31.4367 13.9492 32.4974C13.9492 32.5459 13.9492 32.5889 13.9438 32.632C13.9438 32.6374 13.9438 32.6428 13.9438 32.6482C13.9385 32.9281 13.9331 34.3657 14.2184 35.0872C14.2723 35.2272 14.3692 35.3456 14.4984 35.4264C14.6599 35.5341 18.5311 38 25.0083 38C31.4854 38 35.3566 35.5287 35.5181 35.4264C35.6419 35.3456 35.7442 35.2272 35.7981 35.0872C36.0673 34.3711 36.0619 32.9335 36.0565 32.6536Z"
                      fill="#3500D3"
                    />
                  </svg>
                )}
                <div className={styles.nick_name}>Привет, {profileData.nickname}!</div>
              </div>
            ) : (
              <button onClick={() => setActive(true)}>Авторизация</button>
            )}
          </li>
        </ul>
      </aside>
    </header>
  );
};

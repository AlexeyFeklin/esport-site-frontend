import { useDispatch, useSelector } from 'react-redux';
import styles from './Noftications.module.css';
import { logout } from '../../redux/slices/auth';
import { Link } from 'react-router-dom';

const Noftications = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm('Вы действильно хотите выйти из аккаунта?')) {
      dispatch(logout());
      setActive(false);
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={active ? styles.notifications + ' ' + styles.active : styles.notifications}>
      <div className={styles.row}>
        {' '}
        <button className={styles.profile_btn}>
          {' '}
          <Link to={'/profile/' + user._id}>Профиль </Link>
        </button>
        <button className={styles.exit_btn} onClick={onClickLogout}>
          Выйти
        </button>
      </div>

      <div className={styles.close_element} onClick={() => setActive(false)}>
        <svg
          id="Layer_1"
          width="15px"
          fill="#fff"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1">
          <path
            d="m506.281 391.141-108.281-144.541-119.475-159.489a28.145 28.145 0 0 0 -45.05 0l-119.475 159.489-108.281 144.541a27.561 27.561 0 0 0 -2.644 29.467 27.562 27.562 0 0 0 25.169 15.55h455.513a28.144 28.144 0 0 0 22.524-45.018z"
            fill-rule="evenodd"></path>
        </svg>
      </div>
    </div>
  );
};

export default Noftications;

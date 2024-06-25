import styles from './Auth.module.css';
import Login from './Login';
import Registration from './Registration';

const Auth = ({ active, setActive, modalType, setModalType }) => {
  return (
    <div
      className={active ? styles.auth + ' ' + styles.active : styles.auth}
      onMouseDown={() => {
        setActive(false);
        setModalType('Login');
      }}>
      <div
        className={active ? styles.auth_form + ' ' + styles.active : styles.auth_form}
        onMouseDown={(e) => e.stopPropagation()}>
        {modalType === 'Login' ? (
          <Login setActive={setActive} setModalType={setModalType} />
        ) : (
          <Registration setActive={setActive} setModalType={setModalType} />
        )}
      </div>
    </div>
  );
};
export default Auth;

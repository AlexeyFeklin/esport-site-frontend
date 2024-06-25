import styles from './../Auth.module.css';
import logoImg from './../../../assets/img/logo.png';
import { useForm } from 'react-hook-form';
import TextField from './../TextField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

const Login = ({ setActive, setModalType }) => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      alert('Не удалось авторизоваться!');
    } else {
      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    }
  };

  if (isAuth) {
    setActive(false);
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={styles.logo}>
        <img src={logoImg} alt="" />
      </div>
      <div className={styles.form_row}>
        <div className={styles.form_title}>Вход</div>
        <ul className={styles.form_inputs}>
          <li className={styles.close_btn} onClick={() => setActive(false)}>
            X
          </li>
          <form onSubmit={handleSubmit(onSubmit)}>
            <li>
              <TextField
                label="Почта"
                placeholder="mail@mail.com"
                type="mail"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                register={register}
                field="email"
                conditions={{
                  required: 'Укажите почту!',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Некорректный формат email',
                  },
                }}
              />
            </li>
            <li>
              <TextField
                label="Пароль"
                placeholder="********"
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                register={register}
                field="password"
                conditions={{
                  required: 'Укажите пароль!',
                }}
              />
            </li>

            <li className={styles.send_btn}>
              <button disabled={!isValid} type="submit">
                Готово
              </button>
            </li>
          </form>
          <li>
            <span>Войти с помощью</span>
          </li>
          <li
            onClick={() => {
              setModalType('Registration');
            }}>
            <span>Нет аккаунта?</span>
            <span>Зарегестрироваться</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Login;

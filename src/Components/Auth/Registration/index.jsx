import { useForm } from 'react-hook-form';
import logoImg from './../../../assets/img/logo.png';
import styles from './../Auth.module.css';
import TextField from '../TextField';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../../../redux/slices/auth';

const Registration = ({ setActive, setModalType }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      password_repeat: '',
    },
    mode: 'onBlur',
  });

  const password = watch('password');

  const submit = async (value) => {
    const { password_repeat, ...values } = value;
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      alert('Не удалось зарегестрироваться!');
    } else {
      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    }
  };

  return (
    <>
      <div className={styles.logo}>
        <img src={logoImg} alt="" />
      </div>
      <div className={styles.form_row}>
        <div className={styles.form_title}>Регистрация</div>
        <ul className={styles.form_inputs}>
          <li
            className={styles.close_btn}
            onClick={() => {
              setModalType('Login');
              setActive(false);
            }}>
            X
          </li>
          <form onSubmit={handleSubmit(submit)}>
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
                  minLength: { value: 8, message: 'Пароль должен содержать не менее 8 символов' },
                }}
              />
            </li>
            <li>
              <TextField
                label="Подтвердите пароль"
                placeholder="********"
                type="password"
                error={Boolean(errors.password_repeat)}
                helperText={errors.password_repeat?.message}
                register={register}
                field="password_repeat"
                conditions={{
                  required: 'Подтвердите пароль!',
                  validate: (value) => value === password || 'Пароль введен не верно!',
                }}
              />
            </li>
            <li className={styles.send_btn}>
              <button disabled={!isValid} type="submit">
                Готово
              </button>
            </li>
          </form>

          <li onClick={() => setModalType('Login')}>
            <span>Есть аккаунт?</span>
            <span>Войти</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Registration;

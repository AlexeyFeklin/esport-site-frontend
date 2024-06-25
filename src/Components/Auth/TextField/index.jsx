import styles from './../Auth.module.css';

const TextField = ({
  label,
  placeholder,
  type,
  error,
  helperText,
  register,
  field,
  conditions,
}) => {
  return (
    <>
      <span>{label}</span>
      {error ? <div className={styles.error}>{helperText}</div> : ''}
      <input
        className={error ? styles.error : ''}
        type={type}
        placeholder={placeholder}
        {...register(field, conditions)}
      />
    </>
  );
};

export default TextField;

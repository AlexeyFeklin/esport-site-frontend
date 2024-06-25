import styles from './DescBlock.module.css';

export const DescBlock = ({ text }) => {
  return (
    <>
      {' '}
      <hr className={styles.desc_hr} />
      <div className={styles.block_desc}>{text}</div>
    </>
  );
};

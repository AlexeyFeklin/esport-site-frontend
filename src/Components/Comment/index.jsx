import styles from './Comment.module.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUserByIdForComment } from '../../redux/slices/comment';
import notPhoto from './../../assets/img/camera_yqpp2gkt93iq.svg';
import { Link } from 'react-router-dom';
import { imgUrl } from '../CollectionsStorage';

export const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUserByIdForComment(comment?.userId)).then((response) => {
      setUser(response.payload);
    });
  }, [comment?.userId]);

  const date = new Date(comment?.createdAt);

  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const outputDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return (
    <div className={styles.comment}>
      <Link to={'/profile/' + user?._id}>
        <div className={styles.comment_avatar}>
          <img src={user?.avatarUrl ? `${imgUrl}${user?.avatarUrl} ` : notPhoto} alt="" />
        </div>
      </Link>
      <div className={styles.comment_text}>
        <div className={styles.comment_info}>
          <Link to={'/profile/' + user?._id}>
            <div className={styles.comment_nick}>
              {user?.firstName + ' "' + user?.nickname + '" ' + user?.lastName}
            </div>
          </Link>

          <div className={styles.comment_time}>{outputDate}</div>
        </div>
        <div className={styles.comment_desc}>{comment?.text}</div>
      </div>
    </div>
  );
};

import { Link } from 'react-router-dom';
import { imgUrl } from '../CollectionsStorage';
import styles from './CommentZoneCart.module.css';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../redux/slices/comment';
import notPhoto from './../../assets/img/camera_yqpp2gkt93iq.svg';

export const CommentZoneCart = ({ user, comment }) => {
  const dispatch = useDispatch();

  return (
    <Link to={'/admin/comment/' + comment?._id} className={styles.roleApplication_Cart}>
      <div className={styles.roleApplication_Cart_info}>
        <img src={user?.avatarUrl ? `${imgUrl}${user?.avatarUrl} ` : notPhoto} alt="" />
        <div className={styles.zone_text}>
          <div className={styles.player_name}>
            {user?.firstName + ' "' + user?.nickname + '" ' + user?.lastName}
          </div>
          {
            <ul className={styles.desiredRoles}>
              <li>
                <div className={styles.question}>
                  {comment.text.length > 50 ? comment.text.slice(0, 40) + '...' : comment.text}
                </div>{' '}
              </li>
            </ul>
          }
        </div>
      </div>

      <div
        className={styles.roleApplication_Cart_buttons}
        onClick={(e) => {
          e.preventDefault();
        }}>
        <svg
          onClick={() =>
            window.confirm('Вы действительно хотите удалить комментарий?')
              ? dispatch(deleteComment(comment._id))
              : ''
          }
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

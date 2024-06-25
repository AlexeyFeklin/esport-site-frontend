import { useLocation } from 'react-router-dom';
import styles from './Comments.module.css';
import { createComment, getCommentsByTarget, selectComments } from '../../redux/slices/comment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Comment } from '../Comment';
import { selectIsAuth, selectIsAuthData } from '../../redux/slices/auth';

export const Comments = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathArray = location?.pathname.split('/');
  const user = useSelector(selectIsAuthData);
  let target = '';
  let targetId = '';
  const isAuth = useSelector(selectIsAuth);

  if (pathArray[1] === 'profile') {
    target = 'User';
    targetId = pathArray[2];
  } else if (pathArray[1] === 'news') {
    target = 'News';
    targetId = pathArray[2];
  }
  if (pathArray[1] === 'tournaments') {
    target = 'Tournament';
    targetId = pathArray[2];
  }
  if (pathArray[1] === 'clubs') {
    target = 'Club';
    targetId = pathArray[2];
  }

  useEffect(() => {
    dispatch(getCommentsByTarget({ target, targetId }));
  }, [targetId]);

  const [comment, setComment] = useState('');
  const handleSendComment = () => {
    dispatch(
      createComment({
        userId: user?._id,
        text: comment,
        target: target,
        targetId: targetId,
      }),
    );
  };
  const comments = useSelector(selectComments);

  const commentsElement = comments.map((comment) => {
    return <Comment comment={comment} isChild={false} />;
  });

  return (
    <div className={styles.profile_comments}>
      <div className={styles.title_block}>Комментарии</div>
      {commentsElement.length > 0 ? (
        commentsElement
      ) : (
        <h1 style={{ textAlign: 'center', margin: '10%' }}>
          Комментарии отсутствуют! <br /> Будьте первыми! <br />
          😉
        </h1>
      )}
      {isAuth && (
        <div className={styles.write_comment_block}>
          <input
            type="text"
            placeholder="Напишите комментарий..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <div className={styles.send_comment_btn} onClick={() => handleSendComment()}>
            Отправить{' '}
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 512 512">
              <g>
                <g>
                  <path d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

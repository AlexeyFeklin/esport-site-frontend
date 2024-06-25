import styles from './CommentZone.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments, selectCommentStatus, selectComments } from '../../redux/slices/comment';
import { CommentZoneCart } from '../CommentZoneCart';
import { comment } from '@uiw/react-md-editor';
import { fetchUsersById, selectSelectedUsers } from '../../redux/slices/auth';

export const CommentZone = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    dispatch(getAllComments());
  }, []);

  const comments = useSelector(selectComments);

  useEffect(() => {
    comments.map((comment) => {
      dispatch(fetchUsersById(comment.userId));
    });
  }, [comments]);

  const users = useSelector(selectSelectedUsers);

  useEffect(() => {
    setItems(
      comments.map((comment, index) => (
        <CommentZoneCart
          key={index}
          comment={comment}
          user={users.find((user) => user._id === comment.userId)}
        />
      )),
    );
  }, [users]);

  useEffect(() => {
    getAllComments();
  }, [comment.length]);

  return (
    <>
      <div className={styles.zone_title}>Комментарии</div>
      <div className={styles.roleApplications}>{items.length > 0 ? items : ''}</div>
    </>
  );
};

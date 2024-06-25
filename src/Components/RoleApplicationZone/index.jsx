import styles from './RoleApplicationZone.module.css';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllRoleApplications,
  selectRoleApplcations,
} from '../../redux/slices/roleApplication';
import { fetchUsersById, selectSelectedUsers } from '../../redux/slices/auth';
import { RoleApplicationCart } from './../RoleApplicationCart';

export const RoleApplicationZone = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRoleApplications());
  }, []);

  const roleApplications = useSelector(selectRoleApplcations);

  useEffect(() => {
    roleApplications.map((appication) => {
      dispatch(fetchUsersById(appication.userId));
    });
  }, [roleApplications]);

  const users = useSelector(selectSelectedUsers);

  const items = roleApplications.map((application, index) => (
    <RoleApplicationCart
      key={index}
      application={application}
      user={users.find((user) => user._id === application.userId)}
    />
  ));

  return (
    <>
      <div className={styles.zone_title}>Заявки на смену роли</div>
      <div className={styles.roleApplications}>
        {items.length > 0 ? items : 'Заявок не обнаружено!'}
      </div>
    </>
  );
};

import styles from './ClubsZone.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllClubs, selectClubs } from '../../redux/slices/club';
import { ClubsZoneCart } from '../ClubsZoneCart';

export const ClubZone = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClubs({ limit: 999 }));
  }, []);

  const clubs = useSelector(selectClubs);

  const items = clubs.map((club, index) => (
    <ClubsZoneCart
      key={index}
      club={club}
      // user={users.find((user) => user._id === tournament.createdBy)}
    />
  ));

  return (
    <>
      <div className={styles.zone_title}>Клубы</div>
      <div className={styles.roleApplications}>
        {items.length > 0 ? (
          <>
            <ClubsZoneCart club={{ isAddBlock: true }} /> {items}
          </>
        ) : (
          <ClubsZoneCart club={{ isAddBlock: true }} />
        )}
      </div>
    </>
  );
};

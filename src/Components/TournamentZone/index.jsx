import styles from './TournamentZone.module.css';
import { useEffect,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersById, selectSelectedUsers } from '../../redux/slices/auth';
import { getAllTournaments, selectTournamentsAll } from '../../redux/slices/tournament';
import { TournamentZoneCart } from '../TournamentZoneCart';

export const TournamentZone = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTournaments({ limit: 9999 }));
  }, []);

  const tournaments = useSelector(selectTournamentsAll);

  useEffect(() => {
    tournaments.map((tournament) => {
      dispatch(fetchUsersById(tournament.createdBy));
    });
  }, [tournaments]);

  const users = useSelector(selectSelectedUsers);

  const items = tournaments.map((tournament, index) => (
    <TournamentZoneCart
      key={index}
      tournament={tournament}
      user={users.find((user) => user._id === tournament.createdBy)}
    />
  ));

  return (
    <>
      <div className={styles.zone_title}>Последние турниры</div>
      <div className={styles.roleApplications}>
        {items.length > 0 ? (
          <>
            <TournamentZoneCart tournament={{ isAddBlock: true }} /> {items}
          </>
        ) : (
          <TournamentZoneCart tournament={{ isAddBlock: true }} />
        )}
      </div>
    </>
  );
};

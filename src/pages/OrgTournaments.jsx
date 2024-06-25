import styles from './OrgTournaments.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTournamentsByCreator, selectTournamentsAll } from '../redux/slices/tournament';
import { fetchUsersById, selectIsAuthData, selectSelectedUsers } from '../redux/slices/auth';
import { TournamentZoneCart } from '../Components/TournamentZoneCart';

export const OrgTournaments = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectIsAuthData);

  useEffect(() => {
    dispatch(getAllTournamentsByCreator(user._id));
  }, [user]);

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
      <div className={styles.zone_title}>Мои турниры</div>
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

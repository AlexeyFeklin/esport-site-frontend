import { Link } from 'react-router-dom';
import { imgUrl,  statusTournaments } from '../CollectionsStorage';
import styles from './TournamentZoneCart.module.css';
import {
  selectIsAuthData,
} from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';

import {
  removeTournament,
  updateTournamentStatus,
} from '../../redux/slices/tournament';

export const TournamentZoneCart = ({ user, tournament }) => {
  const dispatch = useDispatch();

  const userNow = useSelector(selectIsAuthData);

  const formattedDate = new Date(tournament?.date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });
  const formattedDateCreate = new Date(tournament?.createdAt).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <Link
      to={
        tournament?.isAddBlock ? '/admin/tournament/create' : '/admin/tournament/' + tournament?._id
      }
      className={styles.roleApplication_Cart}>
      <div className={styles.roleApplication_Cart_info}>
        {tournament?.isAddBlock ? (
          <svg
            id="Layer_1"
            enable-background="new 0 0 64 64"
            width={'112px'}
            fill="#fff"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="m58.683 16.319c-.85-.851-1.981-1.319-3.183-1.319h-33v-4.5c0-.829-.671-1.5-1.5-1.5h-8c-.829 0-1.5.671-1.5 1.5v4.5h-3c-1.203 0-2.333.468-3.181 1.317-.851.85-1.319 1.98-1.319 3.183v31c0 1.202.468 2.333 1.318 3.182.849.849 1.979 1.318 3.182 1.318h47c1.202 0 2.332-.468 3.182-1.318s1.318-1.98 1.318-3.182v-31c0-1.203-.469-2.333-1.317-3.181zm-44.183-4.319h5v3h-5zm42.5 38.5c0 .4-.156.777-.439 1.061s-.661.439-1.061.439h-47c-.395 0-.781-.16-1.061-.44-.283-.283-.439-.66-.439-1.06v-31c0-.401.156-.777.44-1.062.283-.282.659-.438 1.06-.438h47c.4 0 .777.156 1.061.44.279.279.439.665.439 1.06z"></path>
              <path d="m38.5 24c-6.065 0-11 4.935-11 11s4.935 11 11 11 11-4.935 11-11-4.935-11-11-11zm0 19c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
              <path d="m13 23c-.829 0-1.5.671-1.5 1.5v21c0 .828.671 1.5 1.5 1.5s1.5-.672 1.5-1.5v-21c0-.829-.671-1.5-1.5-1.5z"></path>
              <path d="m52.25 21c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5h.094c.828 0 1.453-.671 1.453-1.5s-.719-1.5-1.547-1.5z"></path>
            </g>
          </svg>
        ) : (
          <img src={imgUrl + tournament?.previewPhoto} alt="" />
        )}
        <div className={styles.zone_text}>
          <div className={styles.player_name}>
            {tournament?.isAddBlock ? 'Добавить новый турнир' : tournament?.title}
          </div>
          {tournament?.isAddBlock ? (
            ''
          ) : (
            <ul className={styles.desiredRoles}>
              <li>
                <div className={styles.question}>Дата проведения</div>{' '}
                <div className={styles.answer}>{formattedDate}</div>{' '}
              </li>
              <li>
                <div className={styles.question}>Дата создания</div>{' '}
                <div className={styles.answer}>{formattedDateCreate}</div>
              </li>
              <li>
                <div className={styles.question}>Организатор</div>{' '}
                <div className={styles.answer}>
                  {tournament?.createdBy === userNow?._id ? (
                    <div className={styles.green}>
                      {user?.firstName + ' "' + user?.nickname + '" ' + user?.lastName + ' (ВЫ)'}
                    </div>
                  ) : (
                    user?.firstName + ' "' + user?.nickname + '" ' + user?.lastName
                  )}
                </div>
              </li>
              <li>
                <div className={styles.question}>Статус</div>{' '}
                <div className={styles.answer}>
                  {statusTournaments[tournament?.status] === 'Идущий' ? (
                    <div className={styles.green}> {statusTournaments[tournament?.status]}</div>
                  ) : (
                    statusTournaments[tournament?.status]
                  )}
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>

      {tournament?.isAddBlock ? (
        ''
      ) : (
        <div
          className={styles.roleApplication_Cart_buttons}
          onClick={(e) => {
            e.preventDefault();
          }}>
          {statusTournaments[tournament?.status] === 'Идущий' ? (
            <svg
              viewBox="-16 0 512 512"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() =>
                window.confirm('Вы действительно хотите закончить данный турнир?')
                  ? dispatch(updateTournamentStatus({ id: tournament?._id, status: 2 }))
                  : ''
              }>
              <path d="m480 315v-270c0-8.285156-6.714844-15-15-15h-375v300h375c8.285156 0 15-6.714844 15-15zm-300-15h-60v-60h60zm0-180h-60v-60h60zm90 90h-60v-60h60zm90 90h-60v-60h60zm0-180h-60v-60h60zm90 90h-60v-60h60zm0 0"></path>
              <path d="m30 512c16.570312 0 30-13.433594 30-30v-452c0-16.570312-13.429688-30-30-30s-30 13.429688-30 30v452c0 16.566406 13.429688 30 30 30zm0 0"></path>
            </svg>
          ) : statusTournaments[tournament?.status] === 'Прошедший' ? (
            <svg
              onClick={() =>
                window.confirm('Вы действительно хотите удалить турнир?')
                  ? dispatch(removeTournament(tournament._id))
                  : ''
              }
              id="Layer_2"
              enable-background="new 0 0 32 32"
              viewBox="0 0 32 32"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m31.5 2.42828c0-.51752-.20148-1.00427-.56763-1.36987-.73224-.73224-2.00751-.73224-2.73975 0l-12.19262 12.19263-12.19263-12.19263c-.73224-.73224-2.00751-.73224-2.73975 0-.36608.3656-.56762.85236-.56762 1.36987 0 .51746.20154 1.00421.56763 1.36987l12.19263 12.19263-12.19263 12.19263c-.36609.3656-.56763.85236-.56763 1.36987 0 .51746.20154 1.00421.56763 1.36987.73224.73224 2.00751.73224 2.73975 0l12.19262-12.19262 12.19263 12.19263c.36615.36609.85242.56763 1.36987.56763.51752 0 1.00378-.20154 1.36987-.56763.36615-.36566.56763-.85242.56763-1.36988 0-.51752-.20148-1.00427-.56763-1.36987l-12.19262-12.19263 12.19262-12.19262c.36615-.36566.56763-.85242.56763-1.36988z"></path>
            </svg>
          ) : (
            <>
              <Link to={'/admin/tournament/edit/' + tournament._id}>
                <svg
                  version="1.1"
                  fill="white"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 432.544 432.544">
                  <g>
                    <g>
                      <path d="M0,313.775v118.77h118.771l237.541-237.541L237.539,76.232L0,313.775z M103.638,395.999L103.638,395.999l-30.55,0.004 v-36.546H36.545v-30.553l25.981-25.981l67.093,67.092L103.638,395.999z M246.683,124.77c4.182,0,6.276,2.095,6.276,6.28 c0,1.906-0.664,3.521-1.999,4.856L96.214,290.651c-1.333,1.328-2.952,1.995-4.854,1.995c-4.184,0-6.279-2.098-6.279-6.279 c0-1.906,0.666-3.521,1.997-4.856l154.747-154.743C243.154,125.436,244.773,124.77,246.683,124.77z"></path>
                      <path d="M421.976,77.654l-67.091-66.806C347.653,3.619,338.992,0,328.903,0c-10.283,0-18.842,3.619-25.693,10.848l-47.394,47.109 l118.773,118.77l47.394-47.392c7.042-7.043,10.561-15.608,10.561-25.697C432.54,93.743,429.022,85.08,421.976,77.654z"></path>
                    </g>
                  </g>
                </svg>
              </Link>

              <svg
                onClick={() =>
                  window.confirm('Вы действительно хотите удалить турнир?')
                    ? dispatch(removeTournament(tournament._id))
                    : ''
                }
                id="Layer_2"
                enable-background="new 0 0 32 32"
                viewBox="0 0 32 32"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m31.5 2.42828c0-.51752-.20148-1.00427-.56763-1.36987-.73224-.73224-2.00751-.73224-2.73975 0l-12.19262 12.19263-12.19263-12.19263c-.73224-.73224-2.00751-.73224-2.73975 0-.36608.3656-.56762.85236-.56762 1.36987 0 .51746.20154 1.00421.56763 1.36987l12.19263 12.19263-12.19263 12.19263c-.36609.3656-.56763.85236-.56763 1.36987 0 .51746.20154 1.00421.56763 1.36987.73224.73224 2.00751.73224 2.73975 0l12.19262-12.19262 12.19263 12.19263c.36615.36609.85242.56763 1.36987.56763.51752 0 1.00378-.20154 1.36987-.56763.36615-.36566.56763-.85242.56763-1.36988 0-.51752-.20148-1.00427-.56763-1.36987l-12.19262-12.19263 12.19262-12.19262c.36615-.36566.56763-.85242.56763-1.36988z"></path>
              </svg>
            </>
          )}
        </div>
      )}
    </Link>
  );
};

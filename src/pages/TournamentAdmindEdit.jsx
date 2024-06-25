import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './TournamentAdminCreate.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from './../redux/axios';
import {
  createTournament,
  fetchOneTournament,
  selecetSelectedTournament,
  selectTournamentsStatus,
  updateTournament,
} from '../redux/slices/tournament';
import { cities, formatTournaments, imgUrl } from '../Components/CollectionsStorage';
import { selectIsAuthData } from '../redux/slices/auth';
import { getAllClubsByCity, selectClubs } from '../redux/slices/club';
import MDEditor from '@uiw/react-md-editor';

export const TournamentAdminEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectIsAuthData);
  const { id } = useParams();
  const status = useSelector(selectTournamentsStatus);
  useEffect(() => {
    dispatch(fetchOneTournament(id));
  }, [id]);

  const tournament = useSelector(selecetSelectedTournament);

  const inputFileRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(tournament?.previewPhoto);
  const [text, setText] = useState(tournament?.text);
  const [formData, setFormData] = useState({
    status: tournament?.status,
    title: tournament?.title,
    city: tournament?.city,
    location: tournament?.location,
    date: tournament?.date,
    format: tournament?.format,
    teamLimit: tournament?.teamLimit,
    entryFee: tournament?.entryFee,
    prizePool: tournament?.prizePool,
  });

  useEffect(() => {
    if (formData.city) {
      dispatch(getAllClubsByCity(formData.city));
    }
  }, [formData.city]);

  const clubsLocations = useSelector(selectClubs);
  const handleChangeFile = async (e) => {
    console.log(e.target.files);
    try {
      const fileData = new FormData();
      fileData.append('image', e.target.files[0]);
      const { data } = await axios.post('/upload/tournaments', fileData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
    }
  };
  const handleSubmit = () => {
    dispatch(
      updateTournament({
        id: tournament._id,
        tournamentData: {
          createdBy: user?._id,
          previewPhoto: imageUrl,
          text,
          ...formData,
        },
      }),
    );
  };

  useEffect(() => {
    setFormData({
      status: tournament?.status,
      title: tournament?.title,
      city: tournament?.city,
      location: tournament?.location,
      date: tournament?.date,
      format: tournament?.format,
      teamLimit: tournament?.teamLimit,
      entryFee: tournament?.entryFee,
      prizePool: tournament?.prizePool,
    });
    setImageUrl(tournament?.previewPhoto);
    setText(tournament?.text);
  }, [status]);

  return (
    <div className={styles.control_block}>
      <div className={styles.control_buttons}>
        <Link to="/admin" className={styles.control_btn}>
          <span> Назад в админ панель </span>
        </Link>
        <Link to="/" className={styles.control_btn}>
          <span>На главную </span>
        </Link>
      </div>
      <div className={styles.control_zone}>
        <div className={styles.zone_title}>Редактирование турнира</div>
        <div className={styles.zone_title_under}></div>
        <ul className={styles.zone_title_ranks}>
          <li>
            <div className={styles.question}>Название турнира </div>
            <div className={styles.answer}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Дата и время турнира</div>
            <div className={styles.answer}>
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date: date })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="yyyy-MM-dd HH:mm"
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Город </div>
            <div className={styles.answer}>
              <select
                name="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}>
                {cities.map((city, index) => (
                  <option key={index} value={index}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </li>
          {clubsLocations.length ? (
            <li className={styles.location}>
              <div className={styles.question}>
                Место проведения <div className="optional">(необзятаельно)</div>
              </div>
              <div className={styles.answer}>
                <select
                  name="location"
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  value={formData.location}>
                  <option value={''}>---</option>
                  {clubsLocations.map((club, index) => (
                    <option key={index} value={club._id}>
                      {club.title}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          ) : (
            ''
          )}
          <li>
            <div className={styles.question}>Формат турнира</div>
            <div className={styles.answer}>
              <select
                name="format"
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value })}>
                {formatTournaments.map((format, index) => (
                  <option key={index} value={index}>
                    {format}
                  </option>
                ))}
              </select>
            </div>
          </li>
          <li>
            <div className={styles.question}>Ограничение по командам</div>
            <div className={styles.answer}>
              <input
                type="number"
                value={formData.teamLimit}
                onChange={(e) => setFormData({ ...formData, teamLimit: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Взнос</div>
            <div className={styles.answer}>
              <input
                type="number"
                step="10"
                value={formData.entryFee}
                onChange={(e) => setFormData({ ...formData, entryFee: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Общий призовой фонд</div>
            <div className={styles.answer}>
              <input
                type="number"
                step="10"
                value={formData.prizePool}
                onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
              />
            </div>
          </li>
          <li>
            <div className={styles.question}>Превью турнира</div>
            <div className={styles.preview_uploadImgae}>
              <img src={`${imgUrl}${imageUrl}`} alt="" />
              {imageUrl?.split('/').pop()}
            </div>
            <div className={styles.loadImgBtn} onClick={() => inputFileRef.current.click()}>
              Загрузить изображение
            </div>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
          </li>
          <li>
            <div className={styles.question}>Описание турнира</div>
            <div className={styles.answer}>
              <MDEditor value={text} onChange={setText} />
            </div>
          </li>
        </ul>

        <div className={styles.final_buttons}>
          <Link to="/admin" className={styles.succes_btn} onClick={handleSubmit}>
            Редактировать турнир
          </Link>
        </div>
      </div>
    </div>
  );
};

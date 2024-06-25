import './App.css';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { News } from './pages/News';
import { Tournaments } from './pages/Tournaments';
import { Clubs } from './pages/Clubs';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { fetchAuthMe } from './redux/slices/auth';
import { Profile } from './pages/Profile';
import { Club } from './pages/Club';
import { New } from './pages/New';
import { Tournament } from './pages/Tournament';
import { EditProfile } from './pages/EditProfile';
import { EditRole } from './pages/EditRole';
import { Admin } from './pages/Admin';
import { RoleApplication } from './pages/RoleApplication';
import { NewsAdmin } from './pages/NewsAdmin';
import { TournamentAdmin } from './pages/TournamentAdmin';
import NET from 'vanta/src/vanta.net';
import * as THREE from 'three';
import { ClubAdmin } from './pages/ClubAdmin';
import { ClubAdminCreate } from './pages/ClubAdminCreate';
import { TournamentAdminCreate } from './pages/TournamentAdminCreate';
import { NewsAdminCreate } from './pages/NewsAdminCreate';
import { RegCommand } from './pages/RegCommand';
import { RegPlayer } from './pages/RegPlayer';
import { TournamentAdminEdit } from './pages/TournamentAdmindEdit';
import { NewsAdminEdit } from './pages/NewsAdminEdit';
import { ClubAdminEdit } from './pages/ClubAdminEdit';
import { CommentAdmin } from './pages/CommentAdmin';

function App() {
  const dispatch = useDispatch();
  const [vantaEffect, setVantaEffect] = useState(null);

  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          THREE: THREE,
          // ... остальные параметры
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]); // Добавляем vantaEffect в массив зависимостей

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]); // Добавляем dispatch в массив зависимостей

  return (
    <>
      {' '}
      <div className="bc" ref={myRef}>
        {' '}
      </div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="news/" element={<News />} />
          <Route path="news/:id" element={<New />} />
          <Route path="tournaments/" element={<Tournaments />} />
          <Route path="tournaments/:id" element={<Tournament />} />
          <Route path="tournaments/:id/registerPlayer" element={<RegPlayer />} />
          <Route path="tournaments/:id/registerCommand" element={<RegCommand />} />
          <Route path="clubs/" element={<Clubs />} />
          <Route path="clubs/:id" element={<Club />} />
          <Route path="profile/" element={<Profile />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="profile/edit/" element={<EditProfile />} />
          <Route path="profile/edit/role/" element={<EditRole />} />
          <Route path="admin/" element={<Admin />} />
          <Route path="admin/roleApplication/:id" element={<RoleApplication />} />
          <Route path="admin/news/:id" element={<NewsAdmin />} />
          <Route path="admin/tournament/:id" element={<TournamentAdmin />} />
          <Route path="admin/clubs/:id" element={<ClubAdmin />} />
          <Route path="admin/comment/:id" element={<CommentAdmin />} />
          <Route path="admin/clubs/create" element={<ClubAdminCreate />} />
          <Route path="admin/tournament/create" element={<TournamentAdminCreate />} />
          <Route path="admin/news/edit/:id" element={<NewsAdminEdit />} />
          <Route path="admin/tournament/edit/:id" element={<TournamentAdminEdit />} />
          <Route path="admin/club/edit/:id" element={<ClubAdminEdit />} />
          <Route path="admin/news/create" element={<NewsAdminCreate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

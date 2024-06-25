import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header';
import Notifications from '../Components/Noftications';
import { useEffect, useState } from 'react';
import Auth from '../Components/Auth';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsAuthData, selectIsRegistrated } from '../redux/slices/auth';
import { ModalTournament } from '../Components/ModalTournament';
import { SearchPlayers } from '../Components/SearchPlayers';

export const MainLayout = () => {
  const isAuth = useSelector(selectIsAuth);
  const isReg = useSelector(selectIsAuthData);

  const navigate = useNavigate();

  const [authModalActive, setAuthModalActive] = useState(false);
  const [authModalType, setAuthModalType] = useState('Login');

  const [notfModalActive, setNotfModalActive] = useState(false);

  return (
    <>
      <Header
        setActive={setAuthModalActive}
        setNotfActive={setNotfModalActive}
        notfModalActive={notfModalActive}
      />
      {isAuth ? (
        <Notifications active={notfModalActive} setActive={setNotfModalActive} />
      ) : (
        <Auth
          modalType={authModalType}
          setModalType={setAuthModalType}
          active={authModalActive}
          setActive={setAuthModalActive}
        />
      )}
      <ModalTournament />
      <SearchPlayers />
      <main>
        {/* {Boolean(isReg?.firstName) ? '' : navigate('/profile/edit')} */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

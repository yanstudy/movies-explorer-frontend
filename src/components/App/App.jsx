import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { editUser, getCurrentUser, logOut } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('loggedIn') || false
  );

  const [currentUser, setCurrentUser] = useState({});

  const location = useLocation();
  const isAuthRoute =
    location.pathname.includes('/signup') ||
    location.pathname.includes('/signin');

  const getUser = async () => {
    await getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(localStorage.setItem('loggedIn', true));
      })
      .catch((err) => console.log(err));
  };

  const logOutCb = async () => {
    await logOut()
      .then((data) => {
        console.log(data.message);
        setCurrentUser(null);
        setIsLoggedIn(localStorage.removeItem('loggedIn'));
      })
      .catch((err) => console.log(err));
  };

  const editUserCb = (user) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        {!isAuthRoute && <Header isLoggedIn={currentUser} />}
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute onlyAuth user={currentUser}>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute onlyAuth user={currentUser}>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute onlyAuth user={currentUser}>
                <SavedMovies />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute onlyAuth user={currentUser}>
                <Profile
                  quitCb={logOutCb}
                  onEditUser={editUserCb}
                  user={currentUser}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/signup'
            element={
              <ProtectedRoute user={currentUser}>
                <Register onGetCurrentUser={getUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/signin'
            element={
              <ProtectedRoute user={currentUser}>
                <Login onGetCurrentUser={getUser} />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>

        {!isAuthRoute && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

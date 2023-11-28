import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { getCurrentUser, getMovies, logOut } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { filterMovies, getShortMovies } from '../../utils/utils';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('loggedIn') || false
  );
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [unfilteredSavedMovies, setUnfilteredSavedMovies] = useState([]);
  const [isCheckedSavedMovies, setIsCheckedSavedMovies] = useState(false);
  const [keyWordSavedMovies, setKeyWordSavedMovies] = useState('');
  const [isSearchPerformedSavedMovies, setIsSearchPerformedSavedMovies] =
    useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const isAuthRoute =
    location.pathname.includes('/signup') ||
    location.pathname.includes('/signin');

  // Получить информацию о текущем пользователе
  const getUser = () => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        localStorage.setItem('loggedIn', true);
      })
      .catch((err) => console.log(err));
  };

  // Получить все сохранённые фильмы
  const getSavedMovies = useCallback(() => {
    getMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies();
    }
  }, [isLoggedIn, getSavedMovies]);

  const logOutCb = async () => {
    await logOut()
      .then((data) => {
        console.log(data.message);
        setCurrentUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('movies');
        localStorage.removeItem('isChecked');
        localStorage.removeItem('keyword');
        localStorage.removeItem('loggedIn');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const editUserCb = (user) => {
    setCurrentUser(user);
  };

  // Поиск по сохранённым фильмам
  const onSearchMyMovies = (keyword) => {
    setKeyWordSavedMovies(keyword);
    setSavedMovies((allMovies) => {
      return filterMovies(allMovies, keyword);
    });
    setIsSearchPerformedSavedMovies(true);
  };

  const onCheckboxChangeSavedMovies = () => {
    setIsCheckedSavedMovies((prevIsChecked) => !prevIsChecked);

    if (isCheckedSavedMovies) {
      const filteredMovies = filterMovies(
        unfilteredSavedMovies,
        keyWordSavedMovies
      );
      setSavedMovies(filteredMovies);
    } else {
      setSavedMovies((prevMovies) => {
        const shortMovies = getShortMovies(prevMovies);
        setUnfilteredSavedMovies(prevMovies);
        return shortMovies;
      });
    }
    setIsSearchPerformedSavedMovies(true);
  };

  // Запросить и установить текущего пользователя
  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUser()
        .then((user) => {
          setCurrentUser({ ...user, isAuthCheck: true });
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const handleRemoveMovie = (id) => {
    setSavedMovies((prevSavedMovies) =>
      prevSavedMovies.filter((movie) => movie._id !== id)
    );
  };

  const addNewMovieToCardList = (movie) => {
    setSavedMovies((prevMovies) => [...prevMovies, movie]);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        {!isAuthRoute && <Header user={currentUser} />}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path='/movies'
            element={
              <ProtectedRoute onlyAuth user={currentUser}>
                <Movies
                  savedMovies={savedMovies}
                  onRemoveMovie={handleRemoveMovie}
                  addNewMovieToList={addNewMovieToCardList}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute onlyAuth user={currentUser}>
                <SavedMovies
                  showSavedMovies={getSavedMovies}
                  savedMovies={savedMovies}
                  saved={true}
                  onRemoveMovie={handleRemoveMovie}
                  onSearchMyMovies={onSearchMyMovies}
                  onCheckboxChange={onCheckboxChangeSavedMovies}
                  isSearchPerformed={isSearchPerformedSavedMovies}
                />
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

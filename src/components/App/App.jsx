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
import { getCurrentUser, getMovies, logOut } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { getFilmsApi } from '../../utils/MoviesApi';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('loggedIn') || false
  );
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem('movies')) || []
  );
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorDuringSearchMovies, setErrorDuringSearchMovies] = useState('');
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const location = useLocation();
  const isAuthRoute =
    location.pathname.includes('/signup') ||
    location.pathname.includes('/signin');

  // Получить информацию о текущем пользователе
  const getUser = async () => {
    await getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(localStorage.setItem('loggedIn', true));
      })
      .catch((err) => console.log(err));
  };

  const getUserRegister = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(localStorage.setItem('loggedIn', true));
  };

  // Получить все сохранённые фильмы
  const getSavedMovies = () => {
    getMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => console.log(err));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    localStorage.setItem('isChecked', !isChecked);
    if (movies) {
      setMovies((prevMovies) => {
        const filteredMovies = prevMovies.filter((film) => film.duration <= 40);
        return filteredMovies;
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies();
    }
  }, []);

  // Получить все фильмы, удовлетворяющие поиску
  const getFilms = (keyWord) => {
    setIsLoadingMovies(true);
    getFilmsApi()
      .then((films) => {
        console.log(films);
        const filteredMovies = films.filter(
          (film) =>
            film.nameRU.toLowerCase().includes(keyWord.toLowerCase()) ||
            film.nameEN
              .toLowerCase()
              .includes(' ' + keyWord.toLowerCase() + ' ')
        );
        const shortFilms = filteredMovies.filter((film) => film.duration <= 40);
        if (isChecked) {
          setMovies(shortFilms);
          setIsLoadingMovies(false);
          setIsSearchPerformed(true);
          localStorage.setItem('movies', JSON.stringify(shortFilms));
        } else {
          setMovies(filteredMovies);
          setIsLoadingMovies(false);
          setIsSearchPerformed(true);
          localStorage.setItem('movies', JSON.stringify(filteredMovies));
        }

        localStorage.setItem('isChecked', isChecked);
        localStorage.setItem('keyword', keyWord);
      })
      .catch((err) => {
        setIsLoadingMovies(false);
        setIsSearchPerformed(true);
        setErrorDuringSearchMovies(
          `Во время запроса произошла ошибка. 
          Возможно, проблема с соединением или сервер недоступен. 
          Подождите немного и попробуйте ещё раз`
        );
      });
  };

  const logOutCb = async () => {
    await logOut()
      .then((data) => {
        console.log(data.message);
        setCurrentUser(null);
        setIsLoggedIn(localStorage.removeItem('loggedIn'));
        localStorage.removeItem('movies');
        localStorage.removeItem('isChecked');
        localStorage.removeItem('keyword');
      })
      .catch((err) => console.log(err));
  };

  const editUserCb = (user) => {
    setCurrentUser(user);
  };

  // Проверить есть ли параметры поиска в localStorage. Если есть - взять оттуда
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    const isCheckedValue = localStorage.getItem('isChecked') === 'true';
    if (storedMovies) {
      setMovies(storedMovies);
      setIsChecked(isCheckedValue);
      setIsSearchPerformed(true);
    }
  }, []);

  // Поиск по сохранённым фильмам
  const onSearchMyMovies = (keyWord) => {
    setSavedMovies((allMovies) => {
      const filteredMovies = allMovies.filter((film) =>
        film.nameRU
          .toLowerCase()
          .includes(
            keyWord.toLowerCase() ||
              film.nameEN.toLowerCase().includes(keyWord.toLowerCase())
          )
      );
      return filteredMovies;
    });
  };
  // Запросить и установить текущего пользователя
  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const handleAddingNewMovieToList = (newMovie) => {
    setSavedMovies((prevState) => [...prevState, newMovie]);
  };

  const handleRemoveMovie = (id) => {
    setSavedMovies((prevSavedMovies) =>
      prevSavedMovies.filter((movie) => movie._id !== id)
    );
  };

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
                <Movies
                  onSearchMovies={getFilms}
                  isLoadingMovies={isLoadingMovies}
                  isSearchPerformed={isSearchPerformed}
                  movies={movies}
                  errorDuringSearchMovies={errorDuringSearchMovies}
                  savedMovies={savedMovies}
                  onCheckboxChange={handleCheckboxChange}
                  isChecked={isChecked}
                  addNewMovieToList={handleAddingNewMovieToList}
                  onRemoveMovie={handleRemoveMovie}
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
                  movies={movies}
                  saved={true}
                  onRemoveMovie={handleRemoveMovie}
                  isChecked={isChecked}
                  onSearchMyMovies={onSearchMyMovies}
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
                <Register onGetCurrentUser={getUserRegister} />
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

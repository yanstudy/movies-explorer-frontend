import './App.css';
import { useState } from 'react';
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const isAuthRoute =
    location.pathname.includes('/signup') ||
    location.pathname.includes('/signin');

  return (
    <div className='App'>
      {!isAuthRoute && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      {!isAuthRoute && <Footer />}
    </div>
  );
}

export default App;

export const filterMovies = (movies, keyword) => {
  return movies.filter(
    (film) =>
      film.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
      film.nameEN.toLowerCase().includes(keyword.toLowerCase())
  );
};

export const getShortMovies = (movies) => {
  return movies.filter((film) => film.duration <= 40);
};

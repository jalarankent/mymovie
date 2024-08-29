import React, { useState, useEffect } from 'react';
import Moviecard from './Moviecard';
import './App.css';
import './MovieCard.css';

const API_URL = "https://www.omdbapi.com?apikey=5cab2eae";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies(movie);
  }, [movie]);

  const handleHomeClick = () => {
    setMovies([]);
    setMovie("");
  };

  return (
    <div className='app'>
      <h2 className="navbar">
        <a href="#" onClick={handleHomeClick}>Home</a>
        <a href="#">Movies</a>
        <a href="#">Anime</a>
        <a href="#">Genres</a>
        <a href="#">TV Shows</a>
      </h2>

      <h1>KentMovie.com</h1>
      <img src="https://cdn.dribbble.com/users/652746/screenshots/1773134/kino_01.gif" style={{ height: "100px", width: "140px", borderRadius: "30px" }} />
      <div className='search'>
        <input placeholder='search for movies' onChange={(e) => setMovie(e.target.value)} />
        <button onClick={() => searchMovies(movie)}>Search</button>
        <img src="https://icon-library.com/images/search-icon-png/search-icon-png-7.jpg" style={{ height: "60px", width: "50px" }} alt='search' />
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((m) => (
            <Moviecard
              key={m.imdbID} 
              props={m}
            />
          ))}
        </div>
      ) : movie.trim() !== "" ? (
        <div className='empty'>
          <h4>No Movie Found!</h4>
        </div>
      ) : null}
    </div>
  );
};

export default App;
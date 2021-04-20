import React, { useState } from 'react';
import MovieCard from './MovieCard';

export default function SearchMovies() {
  //states - query, movies
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (event) => {
    event.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=2b5f8f1e12d7b989c1a3b4c252162b15&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url); // Await for the response from the url searched.
      const data = await res.json(); // Await for the conversion to json.
      const results = data.results;
      setMovies(results);
      //console.log(movies);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)} //Each time the user digits, query receives the actual value on this input.
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {/* Map: Loop through each child element in the 'movie array' and to something with them. */}
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </>
  );
}

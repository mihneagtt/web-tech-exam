import React from 'react';
import Movie from './Movie'
const MovieList = ({movies,onDelete}) => {
  return <>
    {movies.map((movie) => (<Movie onDelete={onDelete} movie={movie} />))}
  </>;
};

export default MovieList;

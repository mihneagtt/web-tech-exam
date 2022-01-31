import React from 'react';
import Movie from './Movie'
const MovieList = ({movies,onDelete, onEdit}) => {
  return <>
    {movies.map((movie) => (<Movie onDelete={onDelete} movie={movie} onEdit={onEdit} />))}
  </>;
};

export default MovieList;

import React from 'react';
import { Button } from 'primereact/button';
const Movie = ({movie,onDelete,onEdit}) => {
  return <div className="border-2 border-orange-300 border-round px-6 my-3">
    <div className="flex flex-row justify-content-between">
    <h3>{movie.title}</h3>
    <h3>{movie.category}</h3>
    <h3>{movie.publicationDate}</h3>
    <div className="flex flex-row">
    <Button className="align-self-center mx-4"label="Edit" />
    <Button className="align-self-center p-button-danger mx-4"label="Delete" onClick={()=>onDelete(movie.id)} />
    <Button className="align-self-center p-button-success mx-4"label="Show Crew" onClick={()=>onEdit(movie,movie.id)} />
    </div>
    </div>
  </div>;
};

export default Movie;

import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import {useState} from 'react'
const Movies = ({onAdd}) => {
const [movieTitle,setMovieTitle] = useState('');
const [movieCategory,setMovieCategory] = useState('');
const [movieDate,setMovieDate] = useState('');
const movieCategories = [
  {label: 'Comedy', value: 'Comedy'},
  {label: 'Action', value: 'Action'},
  {label: 'Drama', value: 'Drama'}
];

const onSubmit = (e)=>{
  e.preventDefault();
  if(!movieTitle) alert('The title is empty')
  else{
    const newMovie = {
      title: movieTitle,
      category: movieCategory,
      publicationDate: movieDate
    }
    onAdd(newMovie);
    setMovieTitle('');
    setMovieCategory('');
    setMovieDate('');
  }
  
  }
  return <form onSubmit={(e)=>onSubmit(e)} className="border-2 border-orange-300 border-round px-6 pb-5">
  <h4>Add a new movie:</h4>
  <div className="grid">
  <div className="col-12 md:col-6 lg:col-3 ">
  <label className="p-checkbox-label mr-3">Movie title:</label>
  <InputText value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
  </div>
  <div className="col-12 md:col-6 lg:col-3">
  <label className="p-checkbox-label mr-3 block ">Movie category:</label>
  <Dropdown value={movieCategory} options={movieCategories} onChange={(e) => setMovieCategory(e.value)} placeholder="Select a Category"/>
  </div>
  <div className="col-12 md:col-6 lg:col-3">
  <label className="p-checkbox-label mr-3">Movie publication date:</label>
  <Calendar dateFormat="yy-dd-mm" value={movieDate} onChange={(e) => setMovieDate(e.value)} monthNavigator yearNavigator yearRange={`1888:${new Date().getFullYear()}`}></Calendar>
  </div>
  <div className="col-12 md:col-6 lg:col-3">
  <Button type="submit" className="ml-3"label="Add Movie" />
  </div>
  </div>
  </form>
  
};

export default Movies;

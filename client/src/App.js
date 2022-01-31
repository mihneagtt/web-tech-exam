import Movies from './components/Movies'
import MovieList from './components/MovieList'
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css"
import {useState,useEffect} from 'react'
function App() {
  const [movies,setMovies] = useState([]);

  const getMovies = async () =>{
    const response = await fetch(`/movies`);
    const data = await response.json();
    setMovies(data);
}
useEffect(()=>{
  getMovies();
},[]);

const addMovie = async (movie) =>{
    try{
      const response = await fetch(`/movies`,{
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify(movie)
      });
      if(!response.ok){
        throw response
      }
    }catch(err){
      console.warn(err)
    }
    getMovies();
  }
  const deleteMovie = async (id) =>{
    try{
      const response = await fetch(`/movies/${id}`,{
        method: 'DELETE',
      });
      if(!response.ok){
        throw response
      }
      getMovies();
    }catch(err){
      console.warn(err)
    }
  }


  return (
    <div className="m-5">
      <h1 className="">Movie Manager App</h1>
      <Movies onAdd={addMovie} />
      <MovieList movies={movies} onDelete={deleteMovie} />
    </div>
  );
}

export default App;

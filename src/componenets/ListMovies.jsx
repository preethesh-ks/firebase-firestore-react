import React,{useState,useEffect} from 'react'
import {collection ,doc,getDocs,deleteDoc} from 'firebase/firestore'
import { db } from '../init-firebase'
import { movieCollectionref } from '../lib/firestore.collection'
const ListMovies = () => {
        const [Movies, setMovies] = useState([])
        useEffect(() => {
        
        getMovies();
          
        }, [])
        
        useEffect(() => {
         console.log(Movies);
          
        }, [Movies])
        
 const getMovies =() => {
                // const movieCollectionRef = collection(db,'movies')
                getDocs(movieCollectionref).then(response => {
                    console.log(response.docs);
                    const movs = response.docs.map(doc => ({
                        data:doc.data(),
                        id:doc.id,
                    }))
                    setMovies(movs)
                })
                .catch(error => console.log(error.message))
        }

const deleteMovie = (id) =>{
  const docRef = doc(db,'movies',id)
  deleteDoc(docRef).then(()=>console.log('documnet deleted'))
  .catch(error => console.log(error.message))
  //alert(id)
}

  return (
    <div>
      <h4>ListMovies</h4>
      <button onClick={()=> getMovies()}>Refresh Movies</button>
      <ul>
            {Movies.map(movie => <li key={movie.id}>{movie.id} :{movie.data.name}
            <button onClick={()=> deleteMovie(movie.id)}>delete</button>
            </li>)}
      </ul>
    </div>
  )
}

export default ListMovies

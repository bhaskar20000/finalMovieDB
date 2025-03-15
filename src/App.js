import {useState} from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'

import './App.css'
import MovieContext from './Context'

import Home from './Components/Home'
import Toprated from './Components/TopRated'
import Upcoming from './Components/Upcoming'
import SingleMovie from './Components/SingleMovie'
import SearchPage from './Components/SearchMovie'

// write your code here
const App = () => {
  const [currentMovieObj, updateMovie] = useState({
    movieId: 0,
    searchData: '',
  })

  const updateMovieId = value => {
    updateMovie(prev => ({
      ...prev,
      movieId: value,
    }))
  }

  const updateSearchValue = value => {
    updateMovie(prev => ({
      ...prev,
      searchData: value,
    }))
  }

  return (
    <MovieContext.Provider
      value={{
        currentMovieObj,
        updateMovieId,
        updateSearchValue,
      }}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/top-rated" component={Toprated} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/movies/search" component={SearchPage} />
        <Route exact path="/movies/:movieid" component={SingleMovie} />
      </Switch>
    </MovieContext.Provider>
  )
}

export default App

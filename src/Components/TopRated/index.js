import {useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import MovieContext from '../../Context'
import Navbar from '../Navbar'

import './index.css'

const responseList = {
  isSuccess: 'SUCCESS',
  isLoading: 'LOADING',
  isFailure: 'FAILURE',
}

const paginationList = [
  {
    pageNum: 1,
  },
]

const Popularcard = props => {
  const {eachmovie} = props
  const {updateMovieId} = useContext(MovieContext)

  const {title, moviePoster, id, rating} = eachmovie

  const onMovieTabClick = () => {
    updateMovieId(id)
  }

  const imageUrl = `https://image.tmdb.org/t/p/w300/${moviePoster}`
  return (
    <li className="li-home-element">
      <img className="li-image-element" src={imageUrl} />
      <p className="li-para-element">{title}</p>
      <p className="li-rating-element">
        <span className="span-style">RATING: </span>
        {Math.round(rating * 10) / 10}
      </p>
      <Link
        className="each-link-card"
        onClick={onMovieTabClick}
        to={`/movies/${id}`}
      >
        <button className="view-detail">View Details</button>
      </Link>
    </li>
  )
}

const Toprated = () => {
  const [moviesObj, updateMovieObj] = useState({
    movieData: [],
    responseStatus: responseList.isLoading,
  })

  const [pageNumber, updatePage] = useState(1)

  console.log(`Page Num : ${pageNumber}`)

  const onPrevClick = () => {
    if (pageNumber <= 1) {
      updatePage(1)
    } else {
      updatePage(pageNumber - 1)
    }
  }

  const onNextClick = () => {
    updatePage(pageNumber + 1)
  }

  const PageButton = props => {
    const {eachValue} = props
    const {pageNum} = eachValue
    const onpageClick = () => {
      updatePage(pageNum)
    }
    return (
      <button onClick={onpageClick} className="pagination-button">
        {pageNum}
      </button>
    )
  }

  useEffect(() => {
    const fetchDetailsHome = async () => {
      const urlhome = `https://api.themoviedb.org/3/movie/top_rated?api_key=883ef4828cba3f4d12947e02c71d11b3&language=en-US&page=${pageNumber}`
      try {
        const response = await fetch(urlhome)
        if (response.ok) {
          const data = await response.json()
          const {results} = data
          console.log(results)
          const updatedResultsList = results.map(eachitem => ({
            title: eachitem.title,
            moviePoster: eachitem.poster_path,
            rating: eachitem.vote_average,
            id: eachitem.id,
          }))
          updateMovieObj({
            movieData: updatedResultsList,
            responseStatus: responseList.isSuccess,
          })
        }
      } catch (e) {
        console.log(e.message)
      }
    }
    fetchDetailsHome()
  }, [pageNumber])

  const getCorrectSection = () => {
    switch (moviesObj.responseStatus) {
      case responseList.isLoading:
        return (
          <div className="Loader-class">
            <Loader type="Oval" color="#e0d666" />
          </div>
        )

      case responseList.isSuccess:
        return (
          <>
            <ul className="ul-container">
              {moviesObj.movieData.map(eachitem => (
                <Popularcard eachmovie={eachitem} key={eachitem.id} />
              ))}
            </ul>
          </>
        )

      case responseList.isFailure:
        return (
          <div>
            <h1>Something went wrong</h1>
          </div>
        )

      default:
        return (
          <div>
            <h1>Something went wrong</h1>
          </div>
        )
    }
  }

  return (
    <div className="home-main-container">
      <Navbar />
      {getCorrectSection()}
      <div className="outer-pagination">
        <div className="pagination-container">
          <button
            type="button"
            data-testid="button"
            onClick={onPrevClick}
            className="pagination-button"
          >
            Prev
          </button>
          <p className="pagenumber-para">{pageNumber}</p>
          <button
            type="button"
            data-testid="button"
            onClick={onNextClick}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toprated

import {Link, useHistory} from 'react-router-dom'
import {useState, useContext} from 'react'
import {BsSearch} from 'react-icons/bs'
import MovieContext from '../../Context'

import './index.css'

const navlist = [
  {
    displayText: 'POPULAR',
    link: '/',
    id: 1,
  },
  {
    displayText: 'TOP RATED',
    id: 2,
    link: '/top-rated',
  },
  {
    displayText: 'UPCOMING',
    id: 3,
    link: '/upcoming',
  },
]

const Navbar = () => {
  const {updateSearchValue} = useContext(MovieContext)
  const [currentTab, updateTab] = useState('POPULAR')
  const [enteredValue, updateValue] = useState('')
  const history = useHistory()

  const onEnter = event => {
    updateValue(event.target.value)
  }

  const onSearch = () => {
    if (enteredValue === '') {
      alert('Please enter movie name!')
    }
    updateSearchValue(enteredValue)
    updateValue('')
  }

  const Navitem = props => {
    const {eachnav} = props
    const {displayText, link} = eachnav

    const onTabClick = () => {
      updateTab(displayText)
    }

    const borderStyle = currentTab === displayText ? 'click-style' : ''

    return (
      <Link
        onClick={onTabClick}
        className={`link-style ${borderStyle}`}
        to={link}
      >
        <p className={`nav-heading ${borderStyle}`}>{displayText}</p>
      </Link>
    )
  }

  return (
    <nav className="nav-container">
      <div className="title-container">
        <Link className="link-style-title" to="/">
          <h1 className="movies-tube-heading">movieDB</h1>
        </Link>
        <div className="input-container">
          <input
            onChange={onEnter}
            className="input-search-element"
            type="search"
            value={enteredValue}
            placeholder="Enter movie name..."
          />
          <Link
            className="link-style-search"
            onClick={onSearch}
            to="/movies/search"
          >
            <button type="button" className="search-button">
              Search
            </button>
          </Link>
        </div>
      </div>
      <ul className="nav-headings-container">
        {navlist.map(eachitem => (
          <Navitem eachnav={eachitem} key={eachitem.id} />
        ))}
      </ul>
    </nav>
  )
}

export default Navbar

// styles
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'

// styles
import './navbar.scss'

export default function Navbar() {
  return (
    <header className='header'>
      <Link to="/" className='logo'>Restaurant</Link>
      <Link className='favorites-logo' to='/favorites'><FaHeart /></Link>
    </header>
  )
}
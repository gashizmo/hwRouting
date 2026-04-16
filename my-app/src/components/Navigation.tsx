
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
        <Link to="/">Main</Link>
        <Link to="/about">About Us</Link>
        <Link to="/users">Users</Link>
    </nav>
  )
}

export default Navigation
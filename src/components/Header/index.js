import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <div className="navbar">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        className="logo"
        alt="website logo"
      />
    </Link>
  </div>
)

export default Header

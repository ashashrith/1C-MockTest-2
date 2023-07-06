import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {item} = props
  const {logoUrl, name, id} = item

  return (
    <li className="li">
      <Link to={`/courses/${id}`}>
        <img src={logoUrl} alt="name" className="logo-img" />
      </Link>
      <h1 className="name">{name}</h1>
    </li>
  )
}

export default CourseItem

import React from 'react'
import { Link } from 'react-router-dom'

const FourOhFour = (props) => {
  return (
    <div className='FourOhFour'>
      <h1>404!</h1>
      <p>
        Sorry, the page could not be found.
        <br />
        Try <Link className='FourOhFour__link' to={`/search`}>search</Link> or the <Link className='FourOhFour__link' to={`/`}>homepage</Link>
      </p>
    </div>
  )
}

export default FourOhFour

import React from 'react'

const Footer = () => {
  return (
    <footer className='Footer flex-center'>
      <h2 className='Footer__text'>YelpCamp 2018</h2>
      <p>
        1234 Main St NW, Edmonton, AB T6J 1K1
        <br /><span className='bold'>Phone</span>: 1 800 555 5555
        <br /><span className='bold'>Email</span>: contact@yelpcamp.com
      </p>

      <h2 className='Footer__about'>YelpCamp was created as part of <a className='Footer__link' href="#">
       The Web Developer Bootcamp </a>.
       This website has no affiliation with Yelp, Inc. in any way
     </h2>

      <h2 className='Footer__about'>Made with 💚 and ☕ in Edmonton, Canada</h2>

      <div className='Footer__social'>
        <a className='Footer__social-link' href='#'><i className="fab fa-twitter Footer__twitter"></i></a>
        <a className='Footer__social-link' href='#'><i className="fab fa-github-square Footer__github"></i></a>
        <a className='Footer__social-link' href='#'><i className="fab fa-stack-overflow Footer__stackoverflow"></i></a>
        <a className='Footer__social-link' href='#'><i className="fab fa-linkedin Footer__linkedin"></i></a>
      </div>
    </footer>
  )
}

export default Footer
